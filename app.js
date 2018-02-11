//process.env["NTBA_FIX_319"] = 1
const telegramBot = require('node-telegram-bot-api');
const download = require('download-file');
const TOKEN = "490238036:AAHFmxMSvUVyw_ewy_YklblKfQxeNOUmoTQ";
const fs = require('fs');
const path = './media/';
const dlPath = 'https://api.telegram.org/file/bot'+TOKEN+'/';
const options = {
    polling: true,
    timeout: 0
};

//creamos el bot con modo sondeo "polling"
bot = new telegramBot(TOKEN, options);

bot.on('text', (msg) => {
    const chatId = msg.chat.id;
  
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'Received your message');
  });


//escuchamos las fotos
bot.on('photo', (msg) => {
    let file;
    file= bot.getFile(msg.photo[2].file_id);
    //promesa
    file.then(function(res){
        console.log(res);
        //descargamos la imagen
        var options={
            directory:path,
            filename:res.file_id.jpg
        }
        console.log(dlPath+res.file_path);
        
        download(dlPath+res.file_path,options,function(err){
            if(err){
                console.log(err);  
            }
        })
    });
   
    
});