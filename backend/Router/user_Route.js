const   express = require('express')

const usercontroller = require('../Controller/user_controller')

const router= express.Router()

router.get('/', usercontroller.getuser)
router.post('/register', usercontroller.register)
router.post('/login', usercontroller.Login)



module.exports=router