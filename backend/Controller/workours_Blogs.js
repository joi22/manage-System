const axios = require("axios");

let Controller_Blog = {
   getExercises : async (req, res) => {
  try {
    const response = await axios.get("https://api.api-ninjas.com/v1/exercises?type=cardio", {
      headers: {
        "X-Api-Key": process.env.BLOG_FITNESS, // load from .env
      },
    });


    res.json(response.data); // Return to frontendcon
    console.log(res)
  } catch (error) {
    console.error("API call failed:", error.message);
    res.status(500).json({ error: "Failed to fetch exercises" });
  }
   }

}

module.exports = Controller_Blog;