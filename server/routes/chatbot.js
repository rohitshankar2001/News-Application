const express = require("express");
const router = express.Router();

const { HfInference } = require('@huggingface/inference');

const inference = new HfInference(process.env.HUGGINGFACEHUB_API_TOKEN)
const model_link = "mistralai/Mistral-7B-Instruct-v0.3"

async function chatResponse(prompt){
    if(!prompt){
        return ""
    }
    const out = await inference.chatCompletion({
        model: model_link,
        messages: [{ role: "user", content: prompt}],
        max_tokens: 100
    });
    console.log(out.choices[0].message)
    return out.choices[0].message;
}

router.post('/', async (req,res) =>{
    console.log("Received data:", req.body);
    let content = await chatResponse(req.body["text_sent"])
    res.send(content['content'])
})


module.exports = router;
