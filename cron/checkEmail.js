const cron = require('node-cron');
const { google } = require("googleapis");
const credentials = require("../credentials.json");
const { EmailAuthToken } = require("../models/index");
const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);

cron.schedule('* * * * *', async() => {
    // fetch token set the token to the OAuth class
    
    const fetchToken = await EmailAuthToken.findAll({});

    fetchToken.forEach(async(element) => {
        let credentials = JSON.parse(element.credentials);
        oAuth2Client.setCredentials(credentials);
        
        // got stuck am tired

        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client});

        gmail.users.messages.list({
            q: "",
            
        })

        
    });

  console.log('running a task every minute');
});