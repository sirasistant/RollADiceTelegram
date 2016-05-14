var TelegramBot = require('node-telegram-bot-api');

var bot = new TelegramBot( process.env.DICE_BOT_TOKEN, {polling: true});

var sendMessage = function(chatId,text,replyTo){
  bot.sendMessage(chatId,text,replyTo?{reply_to_message_id:replyTo,reply_markup:JSON.stringify({force_reply:false,selective:true})}:{}).then(function(){});
};

var handleMessage=function(message){
  var text=message.text||"";
  var chatId=message.chat.id;
    switch(true){
      case text.search(/\/roll/i)==0:
        var sides = 6;
        var splits = text.split(" ");
        if(splits.length==2){
          var possibleNumber = parseInt(splits[1]);
          if(possibleNumber!=NaN&&possibleNumber>0){
            sides = possibleNumber;
          }
        }
        sendMessage(chatId,sides+" sides -> "+ (Math.floor(Math.random()*sides)+1));
      break;
    }
};

bot.on('message', handleMessage);