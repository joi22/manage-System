import axios from "axios";
import { useState } from "react";

const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

export default function InitialNutritionForm({ userId, onNext }) {
  const [notes, setNotes] = useState("");
  const [meals, setMeals] = useState([
    { type: "breakfast", items: [{ name: "", quantity: "", calories: "", macros: { protein: "", carbs: "", fat: "" } }] },
  ]);
  const [errors, setErrors] = useState({});

  const addMeal = (type) => {
    if (meals.find((m) => m.type === type)) return;
    setMeals([...meals, { type, items: [{ name: "", quantity: "", calories: "", macros: { protein: "", carbs: "", fat: "" } }] }]);
  };

  const addItemToMeal = (mealType) => {
    setMeals(
      meals.map((meal) =>
        meal.type === mealType
          ? {
              ...meal,
              items: [
                ...meal.items,
                { name: "", quantity: "", calories: "", macros: { protein: "", carbs: "", fat: "" } },
              ],
            }
          : meal
      )
    );
  };

  const updateItem = (mealType, index, field, value) => {
    setMeals(
      meals.map((meal) => {
        if (meal.type !== mealType) return meal;
        const newItems = [...meal.items];
        if (field === "protein" || field === "carbs" || field === "fat") {
          newItems[index].macros[field] = value;
        } else {
          newItems[index][field] = value;
        }
        return { ...meal, items: newItems };
      })
    );
  };

  const removeItem = (mealType, index) => {
    setMeals(
      meals.map((meal) =>
        meal.type === mealType
          ? { ...meal, items: meal.items.filter((_, i) => i !== index) }
          : meal
      )
    );
  };

  // Validation: all meal types must have at least 1 item and all fields filled
  const validate = () => {
    let valid = true;
    let newErrors = {};

    meals.forEach((meal, mealIndex) => {
      if (!meal.items.length) {
        valid = false;
        newErrors[`meal_${meal.type}`] = `At least one item is required for ${meal.type}`;
      }
      meal.items.forEach((item, i) => {
        if (!item.name) {
          valid = false;
          newErrors[`meal_${meal.type}_item_${i}_name`] = "Name is required";
        }
        if (!item.quantity) {
          valid = false;
          newErrors[`meal_${meal.type}_item_${i}_quantity`] = "Quantity is required";
        }
        if (!item.calories || isNaN(item.calories)) {
          valid = false;
          newErrors[`meal_${meal.type}_item_${i}_calories`] = "Valid calories required";
        }
        ["protein", "carbs", "fat"].forEach((macro) => {
          if (item.macros[macro] === "" || isNaN(item.macros[macro])) {
            valid = false;
            newErrors[`meal_${meal.type}_item_${i}_${macro}`] = `Valid ${macro} is required`;
          }
        });
      });
    });

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      await axios.post("http://localhost:3000/api/nutrition", {
        userId,
        date: new Date(),
        notes,
        meals: meals.map((meal) => ({
          type: meal.type,
          items: meal.items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            calories: Number(item.calories),
            macros: {
              protein: Number(item.macros.protein),
              carbs: Number(item.macros.carbs),
              fat: Number(item.macros.fat),
            },
          })),
        })),
      });
      onNext();
    } catch (error) {
      console.error("Error submitting nutrition log:", error);
    }
  };

  return (
    <div className="p-40 rounded shadow-md text-white space-y-6">
      <h2 className="text-xl font-bold mb-4">Enter Your Nutrition Log</h2>

      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="mt-2 w-full p-2 border border-gray-700 rounded bg-gray-900 text-white"
      />

      <div>
        <h3 className="font-semibold mb-2">Meals</h3>
        {meals.map((meal) => (
          <div key={meal.type} className="mb-4 border border-gray-700 p-3 rounded">
            <h4 className="text-lg font-semibold mb-2 capitalize">{meal.type}</h4>
            {errors[`meal_${meal.type}`] && (
              <p className="text-red-500 text-sm">{errors[`meal_${meal.type}`]}</p>
            )}
            {meal.items.map((item, i) => (
              <div key={i} className="mb-3 space-y-1 bg-gray-800 p-2 rounded">
                <input
                  type="text"
                  placeholder="Item Name *"
                  value={item.name}
                  onChange={(e) => updateItem(meal.type, i, "name", e.target.value)}
                  className="w-full p-1 rounded bg-gray-900"
                />
                {errors[`meal_${meal.type}_item_${i}_name`] && (
                  <p className="text-red-500 text-xs">{errors[`meal_${meal.type}_item_${i}_name`]}</p>
                )}

                <input
                  type="text"
                  placeholder="Quantity *"
                  value={item.quantity}
                  onChange={(e) => updateItem(meal.type, i, "quantity", e.target.value)}
                  className="w-full p-1 rounded bg-gray-900"
                />
                {errors[`meal_${meal.type}_item_${i}_quantity`] && (
                  <p className="text-red-500 text-xs">{errors[`meal_${meal.type}_item_${i}_quantity`]}</p>
                )}

                <input
                  type="number"
                  placeholder="Calories *"
                  value={item.calories}
                  onChange={(e) => updateItem(meal.type, i, "calories", e.target.value)}
                  className="w-full p-1 rounded bg-gray-900"
                />
                {errors[`meal_${meal.type}_item_${i}_calories`] && (
                  <p className="text-red-500 text-xs">{errors[`meal_${meal.type}_item_${i}_calories`]}</p>
                )}

                <div className="flex space-x-2">
                  {["protein", "carbs", "fat"].map((macro) => (
                    <div key={macro} className="flex-1">
                      <input
                        type="number"
                        placeholder={`${macro.charAt(0).toUpperCase() + macro.slice(1)} *`}
                        value={item.macros[macro]}
                        onChange={(e) => updateItem(meal.type, i, macro, e.target.value)}
                        className="w-full p-1 rounded bg-gray-900"
                      />
                      {errors[`meal_${meal.type}_item_${i}_${macro}`] && (
                        <p className="text-red-500 text-xs">{errors[`meal_${meal.type}_item_${i}_${macro}`]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => removeItem(meal.type, i)}
                  className="mt-1 text-red-500 text-sm"
                >
                  Remove Item
                </button>
              </div>
            ))}

            <button
              onClick={() => addItemToMeal(meal.type)}
              className="bg-blue-600 px-3 py-1 rounded text-white"
            >
              Add Item
            </button>
          </div>
        ))}

        <div className="flex space-x-2">
          {mealTypes
            .filter((type) => !meals.find((meal) => meal.type === type))
            .map((type) => (
              <button
                key={type}
                onClick={() => addMeal(type)}
                className="bg-green-600 px-3 py-1 rounded text-white"
              >
                Add {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-green-600 py-2 px-4 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </div>
  );
}
