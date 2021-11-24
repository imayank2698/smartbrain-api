const displayProfile = (req,res,db)=>{
    
    const {id} = req.params;
    
    db('users').where({
        id: id,
      })
      .select('*')
      .then(user=>{
          if(user.length){
            res.json(user)
          }else{
            res.status(400).json("Error getting user");
          }

      })
      .catch(err=>res.status(400).json("Not Found"));


}

module.exports = {
    displayProfile:displayProfile
}