const Support = require('../Model/Support');

exports.submitSupport = async (req, res) => {
  try {
    const userId = req.params.Id;
    const { message, email } = req.body;

    if (!message || !email) {
      return res.status(400).json({ error: "Email and message are required." });
    }

    const newSupport = new Support({
      user: userId,
      message,
      email,
    });

    await newSupport.save();

    res.status(200).json({ message: "Support request submitted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit support request." });
  }
};
