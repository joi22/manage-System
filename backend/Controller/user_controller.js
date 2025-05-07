const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../Model/user_schema')

let usercontroller = {
    register: async (req, res) => {

        const { username, email, password, role } = req.body;
        const user = await User.findOne({ Email: email })

        if (!username || !email || !password || !role) {
            return res.status(400).json({
                message: "please fill all the fields",
                status: false
            })

        } else if (password.length < 6) {
            return res.status(400).json({
                message: "password must be at least 6 characters",
                status: false,
            })
        } else if (user) {
            return res.status(400).json({
                message: `this email ${user.Email} is already registered`,
                status: false
            })
        } else {
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new User({
                Username: username,
                Email: email,
                Password: passwordHash,
                Role: role
            })

            try {
                await newUser.save()
                res.status(201).json({
                    message: "user registered successfully",
                    status: true
                })
            } catch (error) {
                res.status(500).json({
                    message: "error registering user",
                    status: false
                })
            }
        }
    },
    Login: async (req, res) => {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                message: "please fill all the fields",
                status: false

            })
        } else {
            try {
                const user = await User.findOne({ Email: email })
                if (!user) {
                    return res.status(400).json({
                        message: `this email ${email} is Not Found Please register`,
                        status: false
                    })
                } else {
                    const isMatch = await bcrypt.compare(password, user.Password)
                    if (!isMatch) {
                        return res.status(400).json({
                            message: "Invalid credentials",
                            status: false
                        })
                    }
                    const token = jwt.sign({ id: user._id, role: user.Role }, process.env.JWT, { expiresIn: '1h' })

                    res.status(200).json({
                        message: "Login successful",
                        status: true,
                        user,
                        token: token
                    })
                }

            } catch (error) {
                res.status(500).json({
                    message: "error Logging In user",
                    status: false
                })

            }
        }
    },
    getuser: (req, res) => {
        res.json({
            message: "user successfully",
            satus: true
        })
    },



}



module.exports = usercontroller;