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
const port = 3000;

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

// Initiate Strategy
passport.use(new SteamStrategy({
	returnURL: 'http://localhost:' + port + '/api/auth/steam/return',
	realm: 'http://localhost:' + port + '/',
	apiKey: process.env.WEB_API_KEY
	}, function (identifier, profile, done) {
		process.nextTick(function () {
			profile.identifier = identifier;

			return done(null, profile);
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

app.get('/', (req, res) => {
	// res.send(req.user["_json"]);// [steamid] [personaname] [realname]
	const realname = req.user["_json"]["personaname"]
	const steamid = req.user["_json"]["steamid"]
	res.send(req.user)
	// getHours('342526B76FAC938ED641DFBA45F12FA5',steamid).then((reponse)=>{
	// 	console.log("Hours played",reponse)	
	// 	// res.send(`the response is ${reponse}`)
	// 	// res.sendFile('');
	// 	const url = `http://localhost:3001/join?username=${realname}&hourplayed=${reponse}`	
	// 	res.redirect(url)
	// }).catch((e)=>{
	// 	res.redirect('http://localhost:3001/')
	// })
	// res.send(hours)
	// console.log("Hours played",hours)
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
	res.redirect(`http://localhost:3001/join?username=${username}&hourplayed=${hours}`)
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

