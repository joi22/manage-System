// controllers/onboardingController.js
const Onboarding = require('../Model/Onboarding');

// Step 1: Fitness Goal and Experience
const onboardingStep1 = async (req, res) => {
  try {
    console.log(req.body)
    const { userId, goal, experience } = req.body;

    if (!goal || !userId) {
      return res.status(400).json({ message: 'Goal, experience, and userId are required' });
    }

    const onboardingData = await Onboarding.findOneAndUpdate(
      { userId },
      { goal, experience },
      { new: true, upsert: true } // upsert = create if not exists
    );

    res.status(200).json({ message: 'Step 1 completed', onboarding: onboardingData });
  } catch (error) {
    console.error('[Onboarding Step 1]', error);
    res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};

// Step 2: Training Frequency
const onboardingStep2 = async (req, res) => {
  try {
    const { userId, experience } = req.body;

    if (!experience || !userId) {
      return res.status(400).json({ message: 'User ID and experience are required' });
    }

    const updatedOnboarding = await Onboarding.findOneAndUpdate(
      { userId },
      { experience },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Step 2 completed', onboarding: updatedOnboarding });
  } catch (error) {
    console.error('[Onboarding Step 2]', error);
    res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};

// Step 3: Training Routine Type
const onboardingStep3 = async (req, res) => {
  try {
    console.log(req.body)
    const { userId, routine } = req.body;

    if (!routine) {
      return res.status(400).json({ message: 'Routine is required' });
    }

    const updatedOnboarding = await Onboarding.findOneAndUpdate(
      {userId},
      { routine },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Step 3 completed', Onboarding });
  } catch (error) {
    console.error('[Onboarding Step 3]', error);
    res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};

const getGoal = async (req, res) => {
  try {
    const { userId } = req.params;

    const onboarding = await Onboarding.findOne({ userId });

    if (!onboarding) {
      return res.status(404).json({ message: 'Onboarding not found' });
    }

    res.status(200).json({ goal: onboarding.goal });
  } catch (error) {
    console.error('[Get Goal]', error);
    res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};

const markOnboardingComplete = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { onboardingComplete: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Onboarding marked complete." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  onboardingStep1,
  onboardingStep2,
  onboardingStep3,
  getGoal,
  markOnboardingComplete
};
