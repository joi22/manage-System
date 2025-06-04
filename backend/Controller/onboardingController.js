const Onboarding = require("../Model/Onboarding");

const onboard = {
    // Save fitness goal
saveGoal: async (req, res) => {
    const { userId, goal } = req.body;

    try {
        const updated = await Onboarding.findOneAndUpdate(
            { userId },
            { goal },
            { upsert: true, new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to save goal", error: err });
    }
},

// Save experience
 saveExperience: async (req, res) => {
    const { userId, experience } = req.body;

    try {
        const updated = await Onboarding.findOneAndUpdate(
            { userId },
            { experience },
            { upsert: true, new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to save experience", error: err });
    }
},

// Save routine
 saveRoutine: async (req, res) => {
    const { userId, routine } = req.body;

    try {
        const updated = await Onboarding.findOneAndUpdate(
            { userId },
            { routine },
            { upsert: true, new: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Failed to save routine", error: err });
    }
},

// Get full onboarding data
getGoal: async (req, res) => {
    const { userId } = req.params;

    try {
        const data = await Onboarding.findOne({ userId });
        if (!data) return res.status(404).json({ message: "No onboarding data found" });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Error fetching onboarding data", error: err });
    }
}
}

module.exports = onboard;
