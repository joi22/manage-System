const   express = require('express')

const usercontroller = require('../Controller/user_controller')

const router= express.Router()

router.post('/register', usercontroller.register)
router.post('/login', usercontroller.Login)
router.put('/update/:id', usercontroller.updateUsers)


module.exports=router