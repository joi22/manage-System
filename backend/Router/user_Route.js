const   express = require('express')

const usercontroller = require('../Controller/user_controller')

const router= express.Router()

router.get('/', usercontroller.getuser)



module.exports=router