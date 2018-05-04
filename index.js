'use-strict'
const express = require('express'),
      bodyParser = require('body-parser'),
      app = express().use(bodyParser.json());

app.listen(process.env.PORT || 4001, () => console.log('Webhook ouvindo'));

app.post('/webhook', (req, res) => {
    let body = req.body;
    if(body.object == 'page'){
        body.entry.foreach((entry)=> {
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });
        res.status(200).send('EVENT_RECEIVED');
    }else {
        res.sendStatus(404);
    }
});

app.get('/webhook', (req, res)=> {
    let VERIFY_TOKEN = '73115575';

    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if(mode && token){
        if(mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        }else {
            res.status(403);
        }
    }
});