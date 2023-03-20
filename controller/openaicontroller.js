
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatgenerate=async(req,res)=>{
    const {question}=req.body
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question, 
        max_tokens: 40,
        temperature: 0,
    }).then((response)=>{
       console.log(response.data.choices[0].text);
       const ans=response.data.choices[0].text;
       res.status(200).json({answer:ans})

    
    });

    

   

console.log("start");
    

}


const generateimage=async(req,res)=>{
    const {prompt,size}=req.body;
    const imgsize=size==="small"?"256x256":size==="medium"?"512x512":"1024x1024"
    try {
        const response= await openai.createImage({
            prompt:prompt,
            n:1,
            size:imgsize
        });
        const imageurl=response.data.data[0].url
        res.status(200).json({
            sucess:true,
            data:imageurl
        })

    } catch (error) {
        if (error.response){
            console.log(error.response.status);
            console.log(error.response.data);
        } else{
            console.log(error.message);
        }
        res.status(400).json({
            sucess:false,
            error:"image can not be generated"
        })
    }
   

}
module.exports={generateimage,chatgenerate};