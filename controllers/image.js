const clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'df3a1befdbf74e8ba119fed99bfcca9d'
});

const handleImageAPI = (req,res) =>{
    const {input} = req.body;
    app.models.predict(Clarifai.FACE_DETECT_MODEL,input)
        .then(response=>{
            res.json(response);
        })
        .catch(err=>res.status(400).json("Error in clarify API server call"));
}



const handleImage = (req,res,db) =>{
    
    const {id} = req.body;

    db('users').where(
        'id', '=', id)
        .increment(
            {
                entries:1
            })
        .returning('*')    
        .then(user=>{
            res.json(user[0]);
        })
        .catch(err=>res.status(400).json("Not Found"));
    

}


module.exports = {
    handleImage : handleImage,
    handleImageAPI : handleImageAPI
}