const { google } = require("googleapis");
const credentials = require("../credentials.json");
const { User, EmailAuthToken } = require("../models/index");
const oAuth2Client = new google.auth.OAuth2(
  credentials.web.client_id,
  credentials.web.client_secret,
  credentials.web.redirect_uris[0]
);
const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

export default class {
  static async generateAuthUrl(req, res) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });

    return { authUrl: authUrl };
  }
  static async callbackResponse(req, res) {
    const { code } = req.query;
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to variable for later program executions
      const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
      gmail.users.getProfile(
        {
          userId: "me",
        },
        async (err, res) => {
          if (err) return console.log("The API returned an error:" + err);
          cache.set('response', res.statusText)
          // add to db
          // find store owner with  support mail
          try {
            const findOwner = await User.findOne({
              where: {
                supportEmail: res.data.emailAddress,
              },
            });
            const insertData = await EmailAuthToken.create({
              userId: findOwner.id,
              credentials: JSON.stringify(token),
            });
          } catch (error) {
            console.log(error)
          }
        }
      );
    });

        let statusValue = await cache.get('response');

    return { statusValue };
  }
}
