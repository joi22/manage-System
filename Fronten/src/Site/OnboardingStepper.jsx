import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import FitnessGoalForm from "./comp/FitnessGoalForm";
import StrengthExperienceForm from "./comp/StrengthExperienceForm";
import TrainingRoutineForm from "./comp/TrainingRoutineForm";

export default function OnboardingStepper() {
    const { user } = useContext(UserContext); // get user from context
    const userId = user?._id;   // or user.id based on your backend

    const [step, setStep] = useState(1);

    if (!userId) {
        return <div className="text-center text-white">Loading user data...</div>;
    }

    return (
        <>
            {step === 1 && <FitnessGoalForm userId={userId} onNext={() => setStep(2)} />}
            {step === 2 && <StrengthExperienceForm userId={userId} onNext={() => setStep(3)} onBack={() => setStep(1)} />}
            {step === 3 && <TrainingRoutineForm userId={userId} onBack={() => setStep(2)} />}
        </>
    );
}
