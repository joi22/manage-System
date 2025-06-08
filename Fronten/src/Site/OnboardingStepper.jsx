import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import FitnessGoalForm from "./comp/FitnessGoalForm";
import StrengthExperienceForm from "./comp/StrengthExperienceForm";
import TrainingRoutineForm from "./comp/TrainingRoutineForm";
import InitialProgressForm from "./comp/InitialProgressForm";
import InitialNutritionForm from "./comp/InitialNutritionForm";

export default function OnboardingStepper() {
    const { user } = useContext(UserContext);
    const userId = user?._id;

    const [step, setStep] = useState(1);

    if (!userId) {
        return <div className="text-center text-white">Loading user data...</div>;
    }

    return (
        <>
            {step === 1 && <FitnessGoalForm userId={userId} onNext={() => setStep(2)} />}
            {step === 2 && <StrengthExperienceForm userId={userId} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <TrainingRoutineForm userId={userId} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
            {step === 4 && <InitialProgressForm userId={userId} onNext={() => setStep(5)} onSkip={() => setStep(5)} />}
            {step === 5 && <InitialNutritionForm userId={userId} onFinish={() => alert("Onboarding complete!")} onBack={() => setStep(4)} />}
        </>
    );
}
