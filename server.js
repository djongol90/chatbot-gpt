const express = require('express');
const bodyParser = require('body-parser')
const OpenAI = require('openai');
const TelegramBot = require('node-telegram-bot-api');

const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY
})

const TOKEN = process.env.TELEGRAMTOKEN;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const bot = new TelegramBot(TOKEN, {polling: true});


bot.on('message',async(msg) => {
    console.log(msg);
    const response = await runChatGPTResponse(msg.text);

    bot.sendMessage(msg.chat.id, response);

//     bot.sendMessage(570236690, "M "+ msg.chat.first_name + 
//     "a envoyé un message a votre bot, le message : "+ msg.text)
//    bot.sendMessage(msg.chat.id,"Bonjour Mr " + msg.chat.first_name);
})

const runChatGPTResponse = async (question) => {
    const response = await openai.chat.completions.create(
        {
            model: 'gpt-3.5-turbo',
            messages: [{
                role: 'user',
                content: question
            }]
        }
    );
    return response.choices[0].message.content
}


// app.get('/:qest', async(req, res) => {
//     const question = req.params.qest
//     const response = await openai.chat.completions.create(
//         {
//             model: 'gpt-3.5-turbo',
//             messages: [{
//                 role: 'user',
//                 content: question
//             }]
//         }
//     )
//     res.json({
//         chatgptResponse: response.choices[0].message.content
//     })
// })




app.listen(3000, () => {
    console.log("Le serveur est lancé!")
})