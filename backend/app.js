const express = require('express');
const passport = require('passport');
const session = require('express-session');
const passportSteam = require('passport-steam');
const e = require('express');
const axios = require("axios")
const SteamStrategy = passportSteam.Strategy;
const app = express();
const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({});

require('dotenv').config()
const port = 4000;

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

// Initiate Strategy
passport.use(new SteamStrategy({
    returnURL: 'http://localhost:4000/auth/steam/return',
    realm: 'http://localhost:3000/',
    apiKey: 'your steam API key'
  },
  function(identifier, profile, done) {
    User.findByOpenID({ openId: identifier }, function (err, user) {
      return done(err, user);
    });
  }
));

app.use(session({
	secret: 'Petitions',
	saveUninitialized: true,
	resave: false,
	cookie: {
		maxAge: 3600000
	}
}));

app.use(passport.initialize());

app.use(passport.session());

// Initiate app
app.listen(port, () => {
	console.log('Listening, port ' + port);
});



// Routes
app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/')
});

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/')
	
});

app.get('/page',(req,res) =>{
	const username = "Ammar0000"
	const hours = "31402"
	res.redirect(`https://165.232.120.15/join?username=${username}&hourplayed=${hours}`)
})








async function getHours(key,steamid)  {
    const res = await axios.get('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/',
     { params: { key: key,steamid:steamid, format:'json' } });
    hoursPlayed = res.data.response.games.map((val)=>{
        newVal = 0
        if (val.appid ==346110){
            newVal= val.playtime_forever
        }
        return newVal
    }).filter(function(x) { return x !== 0; }).pop() || 0 
    console.log(hoursPlayed)
	return hoursPlayed
};

