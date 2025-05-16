const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Model/user_schema");

let usercontroller = {
  register: async (req, res) => {
    const { firstname, lastname, email, password,} = req.body;
    console.log(req.body)
    const user = await User.findOne({ email });
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        message: "please fill all the fields",
        status: false,
      });
    } else if (password.length < 6) {
      return res.status(400).json({
        message: "password must be at least 6 characters",
        status: false,
      });
    } else if (user) {
      return res.status(400).json({
        message: `this email ${user.email} is already registered`,
        status: false,
      });
    } else {
      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: passwordHash,
      });
      await newUser.save();
      res.status(201).json({
        message: "user registered successfully",
        status: true,
        user:newUser
      })

    }
  },
  Login: async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    if (!email || !password) {
      return res.status(400).json({
        message: "please fill all the fields",
        status: false,
      });
    } else {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(400).json({
            message: `this email ${email} is Not Found Please register`,
            status: false,
          });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(400).json({
              message: "Invalid credentials",
              status: false,
            });
          }
          const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT,
            { expiresIn: "1h" }
          );

          const safeUser = {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
          };

          res.status(200).json({
            message: "Login successful",
            status: true,
            user: safeUser,
            token: token,
          });
        }
      } catch (error) {
        res.status(500).json({
          message: "error Logging In user",
          status: false,
        });
      }
    }
  },
  updateUsers: async (req, res) => {

    const { id } = req.params;
    const { email, profile_imag, password } = req.body;
    console.log(email, profile_imag, password)
    try {
      const updateData = {
        email,
        profile_imag,
      };

      if (password && password.length >= 6) {
        updateData.password = await bcrypt.hash(password, 10);
      } else if (password && password.length < 6) {
        return res.status(400).json({
          message: "password must be at least 6 characters",
          status: false,
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      }).select("-password");

      res.status(200).json({
        message: "Profile updated successfully",
        status: true,
        user: updatedUser,
      });
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({
        message: "Error updating profile",
        status: false,
      });
    }
  },
};

module.exports = usercontroller;
