const user= require ('../models/User')

class userMethod {
    // get all user
  async  list (req, res){
       try {
        var Alluser= await user.find()
        res.status(200).json(Alluser)
       } catch (error) {
        console.log(error)
       }
    }

   async delete (req, res){
        try {
            await user.deleteOne({_id:req.params.id})
            res.redirect('/me/managerUser')
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports= new userMethod