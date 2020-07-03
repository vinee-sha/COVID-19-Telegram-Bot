var TelegramBot = require('node-telegram-bot-api');
const { watchFile } = require('fs');
const { waitForDebugger } = require('inspector');

var token = '1232348443:AAFu7G8ZyXaUkgZEBgq0ytYeMKI3NvLgJn8';

const bot = new TelegramBot(token, { polling: true });
var x = '0'


bot.on('message', function(msg) {

    bot.sendMessage(msg.chat.id, "Text any of the below alphabet to get :  \n\n A. FAQ on COVID-19 \n \n B. Number of cases of a given country\n\n C. Locations of the local hospitals \n");

    bot.on('message', function(msg1) {

        if (msg1.text == 'a' || msg1.text == 'A') {

            bot.sendMessage(msg.chat.id, "\n \n Text any of the below number to get the answer \n\n 1. What is Covid? \n\n 2. Why the name COVID-19? \n\n 3. Where did the virus start? \n\n 4. What are the symptoms? \n\n 5. How did it spread? \n\n 6. What are the precautions? \n\n 7. What is CommunitySpread? \n\n 8. When should we be tested? \n\n 9. What is Negative test results? \n\n 10. What is CDC & CDC Response? \n\n 11. How will it effect children? \n\n 12. What are the tips to wash your hands? \n\n 13. What is the current news on COVID-19? \n\n 14. What are the Disinfecting Surfaces? \n\n 15. How to reduce family risk? \n\n 16. What is the effect on animal contact? \n\n 17. What is the risk to pets? \n\n 18. What should children eat? \n\n 19. How to prepare family to reduce risk? \n\n 20. How will it spread via food? \n\n 21. Will the products from china lead to virus? \n\n 22. Is it necessary to wear facemask? \n\n 23. What to do when someone is infected? \n\n 24. Who has more risk? \n\n 25. How will it effect from person to person? \n\n");
            x = 'a'
            msg1.text = x
            bot.on('message', function(msg2) {
                msg1.text = x

                chatbot(msg1.text, msg.chat.id, msg2.text)

                update.message.reply_text("message", quote = False)
                msg1.text = x
            })
            update.message.reply_text("message", quote = False)
            msg1.text = x

        } else if (msg1.text == 'b' || msg1.text == 'B') {
            const covidcases = require('./CovidCases');
            bot.sendMessage(msg.chat.id, '\n \n Give the correct country name to find the details of cases till now');
            x = 'b'
            msg1.text = x
            bot.on('message', function(msg2) {
                msg1.text = x

                chatbot(msg1.text, msg.chat.id, msg2.text)

                update.message.reply_text("message", quote = False)
                msg1.text = x
            });
            update.message.reply_text("message", quote = False)
            msg1.text = x

        } else if (msg1.text == 'c' || msg1.text == 'C') {
            const getLatLong = require('./getLatLong');
            const getLocalHosp = require('./getLocalHosp');
            bot.sendMessage(msg.chat.id, '\n \n Give the correct city name to find the local hospitals');
            x = 'c'
            msg1.text = x
            bot.on('message', function(msg2) {
                msg1.text = x

                chatbot(msg1.text, msg.chat.id, msg2.text)

                update.message.reply_text("message", quote = False)
                msg1.text = x
            })
            update.message.reply_text("message", quote = False)
            msg1.text = x
        }
    })
})


function chatbot(msg1text, msgchatid, msg2text) {
    if (msg1text == 'a' || msg1text == 'A') {
        const covidfaq = require('./covidFAQ');
        var data = covidfaq.intents
        var message1 = data[msg2text - 1].values[0]
        bot.sendMessage(msgchatid, message1);
    } else if (msg1text == 'b' || msg1text == 'B') {
        const covidcases = require('./CovidCases');
        covidcases.covidcases(msg2text, function(error, locjson) {
            try {
                if (error) {
                    console.log(error)
                    throw error
                } else {
                    if (locjson.confirmed == undefined) {
                        throw error
                    }
                    bot.sendMessage(msgchatid, 'Confirmed cases : ' + locjson.confirmed + '\n\nDeaths : ' + locjson.deaths + '\n\nRecovered cases : ' + locjson.recovered + '\n\nActive cases : ' + locjson.active)
                }
            } catch (error) {
                console.log(error)
            }
        })
    } else if (msg1text == 'c' || msg1text == 'C') {
        const getLatLong = require('./getLatLong');
        const getLocalHosp = require('./getLocalHosp');
        getLatLong.geoloc(msg2text, function(error, locjson) {
            try {
                if (error) {
                    console.log(error)
                    throw error
                } else {
                    getLocalHosp.localHosp(locjson, function(error, latLongCoun) {

                        if (error) {
                            console.log(error)
                            throw error
                        } else {
                            var latlong = latLongCoun.array;
                            var names = latLongCoun.namearray

                            bot.sendLocation(chat_id = msgchatid, latitude = latlong[0].lat, longitude = latlong[0].lon).then(() => {
                                bot.sendMessage(msgchatid, names[0]).then(() => {
                                    bot.sendLocation(chat_id = msgchatid, latitude = latlong[1].lat, longitude = latlong[1].lon).then(() => {
                                        bot.sendMessage(msgchatid, names[1]).then(() => {
                                            bot.sendLocation(chat_id = msgchatid, latitude = latlong[2].lat, longitude = latlong[2].lon).then(() => {
                                                bot.sendMessage(msgchatid, names[2]).then(() => {
                                                    bot.sendLocation(chat_id = msgchatid, latitude = latlong[3].lat, longitude = latlong[3].lon).then(() => {
                                                        bot.sendMessage(msgchatid, names[3]).then(() => {
                                                            bot.sendLocation(chat_id = msgchatid, latitude = latlong[4].lat, longitude = latlong[4].lon).then(() => {
                                                                bot.sendMessage(msgchatid, names[4]).then(() => {
                                                                    bot.sendLocation(chat_id = msgchatid, latitude = latlong[5].lat, longitude = latlong[5].lon).then(() => {
                                                                        bot.sendMessage(msgchatid, names[5]).then(() => {
                                                                            bot.sendLocation(chat_id = msgchatid, latitude = latlong[6].lat, longitude = latlong[6].lon).then(() => {
                                                                                bot.sendMessage(msgchatid, names[6]).then(() => {
                                                                                    bot.sendLocation(chat_id = msgchatid, latitude = latlong[7].lat, longitude = latlong[7].lon).then(() => {
                                                                                        bot.sendMessage(msgchatid, names[7])
                                                                                    });
                                                                                })
                                                                            });
                                                                        })
                                                                    });
                                                                })
                                                            });
                                                        })
                                                    });
                                                })
                                            });
                                        })
                                    });

                                })
                            });
                        }


                    })
                }
            } catch (error) {

                console.log(error)

            }

        })
    }
}