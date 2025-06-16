const { Parser } = require("json2csv");
const Workout = require("../Model/workout");
const PDFDocument = require("pdfkit");
const Nutrition = require("../Model/Nutrition");

exports.getCSVReport = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const workouts = await Workout.find({ userId });
    const nutrition = await Nutrition.find({ userId });

    // Flatten workouts
    const workoutData = workouts.flatMap((w) =>
      w.exercises.map((ex) => ({
        type: "Workout",
        title: w.title,
        category: w.category,
        tags: w.tags.join(", "),
        exerciseName: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight,
        notes: ex.notes,
        createdAt: w.createdAt,
      }))
    );

    // Flatten nutrition
    const nutritionData = nutrition.flatMap((n) =>
      n.meals.flatMap((meal) =>
        meal.items.map((item) => ({
          type: "Nutrition",
          date: n.date,
          mealType: meal.type,
          itemName: item.name,
          quantity: item.quantity,
          calories: item.calories,
          protein: item.macros.protein,
          carbs: item.macros.carbs,
          fat: item.macros.fat,
        }))
      )
    );

    const data = [...workoutData, ...nutritionData];

    if (data.length === 0) {
      return res.status(404).json({ error: "No data to export" });
    }

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("fitness-report.csv");
    res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate CSV" });
  }
};
exports.getPDFReport = async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId);
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const workouts = await Workout.find({ userId });
    const nutrition = await Nutrition.find({ userId });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=fitness-report.pdf"
    );

    doc.pipe(res);
    doc.fontSize(18).text("Fitness Report", { underline: true });
    doc.moveDown();

    // Workouts
    doc.fontSize(14).text("Workouts", { underline: true });
    workouts.forEach((w) => {
      if (!w.exercises || w.exercises.length === 0) {
        doc
          .fontSize(12)
          .text(`• Workout titled "${w.title}" has no exercises`)
          .moveDown();
        console.log(`Workout "${w.title}" has no exercises`);
      } else {
        w.exercises.forEach((ex) => {
          doc
            .fontSize(12)
            .text(`• Title: ${w.title}`)
            .text(`  Category: ${w.category}`)
            .text(`  Tags: ${w.tags.join(", ")}`)
            .text(`  Exercise: ${ex.name}`)
            .text(
              `  Sets: ${ex.sets} | Reps: ${ex.reps} | Weight: ${ex.weight}`
            )
            .text(`  Notes: ${ex.notes || "N/A"}`)
            .text(`  Created At: ${w.createdAt.toDateString()}`)
            .moveDown();
        });
      }
    });

    doc.addPage();

    // Nutrition
    doc.fontSize(14).text("Nutrition", { underline: true });
    if (nutrition.length === 0) {
      doc.fontSize(12).text("No nutrition logs found.\n");
    } else {
      nutrition.forEach((n) => {
        n.meals.forEach((meal) => {
          meal.items.forEach((item) => {
            doc
              .fontSize(12)
              .text(`• Date: ${new Date(n.date).toDateString()}`)
              .text(`  Meal Type: ${meal.type}`)
              .text(`  Item: ${item.name}`)
              .text(`  Quantity: ${item.quantity || "N/A"}`)
              .text(`  Calories: ${item.calories || 0}`)
              .text(
                `  Macros — Protein: ${item.macros.protein || 0}g, Carbs: ${
                  item.macros.carbs || 0
                }g, Fat: ${item.macros.fat || 0}g`
              )
              .moveDown();
          });
        });
      });
    }

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
};
