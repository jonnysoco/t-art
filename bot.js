const express = require('./node_modules/express');
const app = express();
const path = require('./node_modules/path');
app.set('port', (process.env.PORT || 5000));
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});


const Twit = require('./node_modules/twit');
const TH = new Twit({ // Twit Handler
    consumer_key : process.env.consumer_key,
    consumer_secret : process.env.consumer_secret,
    access_token : process.env.access_token,
    access_token_secret : process.env.access_token_secret
});

const _self = {
    id: 893498060663336964,
    screen_name: 'ratetherenter'
}

const stream = TH.stream('statuses/filter', {
    track: ['robert-askam', 'robert-askam.co.uk','www.robert-askam.co.uk']
});

stream.on('tweet', (tweet) => {   
    
    TH.post('favorites/create',{
        id:tweet.id_str
    },function (err,response) { 
        console.log(err);
        console.log(response);
    });

//     TH.post('statuses/retweet/:id', {
//         id: tweet.id_str
//     });
    return; 

    // TH.post('statuses/update', {
    //     status: `@${tweet.user.screen_name} Thanks for sharing :)`,
    //     in_reply_to_status_id: tweet.id_str 
    // });
    
});
