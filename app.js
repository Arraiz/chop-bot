//process.env["NTBA_FIX_319"] = 1
const telegramBot = require('node-telegram-bot-api');
const download = require('download-file');
const TOKEN = "490238036:AAHFmxMSvUVyw_ewy_YklblKfQxeNOUmoTQ";
const fs = require('fs');
var Jimp = require("jimp");
const path = './media/';
const dlPath = 'https://api.telegram.org/file/bot' + TOKEN + '/';
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
    let caption;
    let chatID;
    file = bot.getFile(msg.photo[2].file_id);
    
    caption=msg.caption;
    chatID=msg.chat.id;
    console.log(chatID);
    
    
    //promesa
    file.then(function (res) {
        //descargamos la imagen
        var options = {
            directory: path,
            filename: res.file_id + '.jpg'
        }
        console.log(dlPath + res.file_path);

        download(dlPath + res.file_path, options, function (err) {
            if (err) {
                console.log(err);
            } else {
                Jimp.read('./media/' + res.file_id + '.jpg')
                    .then(function (image) {
                        loadedImage = image;
                        return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                    })
                    .then(function (font) {
                        let return_image = loadedImage.print(font, 10, 10, caption)
                            .write('./media/' + res.file_id + '_edited' + '.jpg');
                            bot.sendPhoto(msg.chat.id, './media/' + res.file_id + '_edited' + '.jpg');
                           
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }
        });
    });
});


/*
Jimp.read('./media/' + 'file_4'+'.jpg')
                    .then(function (image) {
                        loadedImage = image;
                        return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                    })
                    .then(function (font) {
                        loadedImage.print(font, 10, 10, 'BOOTIE FACE')
                            .write('./media/' + 'file_4_edited.jpg');
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
                    */