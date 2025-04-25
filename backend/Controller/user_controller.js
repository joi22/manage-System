let usercontroller ={
    getuser:(req,res)=>{
        res.json({
            message:"user successfully",
            satus:true
        })
    }
}

module.exports = usercontroller;