const handleSignin = (req,res,db,bcrypt)=>{

    const {email,password} = req.body;
    if(! email || ! password){
      return res.status(400).json("Incorrect form submission")
  }

    db('login').where({
        email:email
      })
      .select('*')
      .then(user=>{
        if(user.length){
            
            const valid = bcrypt.compareSync(password,user[0].hash);
            if(valid){
                return db('users').where({
                    email:email
                  })
                  .select('*')
                  .then(userinfo=>{
                    res.json(userinfo[0]);
                  })
                  .catch(err=>res.status(400).json("Error in fetching user..."));

                
            }else{
                res.status(400).json("Invalid credentials...")
            }
        
        
        
        
        }else{
            res.status(400).json("No such user...")
        }
        
      })
      .catch(err=>res.status(400).json("Error in signing in..."));

}

module.exports = {
    handleSignin:handleSignin
}