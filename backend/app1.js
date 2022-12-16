const express = require('express');
const passport = require('passport');
const session = require('express-session');
const passportSteam = require('passport-steam');
const formData = require("./models/FormData")
const fs = require("fs")
const https = require("https")
const SteamStrategy = passportSteam.Strategy;
const app = express();
const axios = require("axios")
const cors = require("cors")
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json())


const port = 4000;
const baseUrl = 'https://164.92.86.165'

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

// Initiate Strategy
passport.use(new SteamStrategy({
	returnURL: baseUrl +":" +port  + '/api/auth/steam/return',
	realm: baseUrl +":" +port  + '/',
	apiKey: '342526B76FAC938ED641DFBA45F12FA5'
	}, function (identifier, profile, done) {
		process.nextTick(function () {
			profile.identifier = identifier;
			return done(null, profile);
		});
	}
));

app.use(session({
	secret: 'Whatever_You_Want',
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
	// res.send(req.user);
    const realname = req.user["_json"]["personaname"]
	const steamid = req.user["_json"]["steamid"]
    	getHours('342526B76FAC938ED641DFBA45F12FA5',steamid).then((reponse)=>{
		console.log("Hours played",reponse)	
		// res.send(`the response is ${reponse}`)
		// res.sendFile('');
		const url = `${baseUrl}join?username=${realname}&hourplayed=${reponse}`	
		res.redirect(url)
	}).catch((e)=>{
		res.redirect(baseUrl)
	})

});

app.post("/ace", (req,res)=>{
    platform = req.body.Platform
    username = req.body.Username
    email = req.body.Email
    hours = req.body.Hours
    comment = req.body.Comment



    if(!platform || !username || !email || !hours || !comment){
        res.status(200).send("Please Send Data")
        console.log(platform)
        console.log(username)
        console.log(email)
        console.log(hours)
        console.log(comment)
    }
    // newData =  data({Platform:platform, Username:username,Email:email,Hours:hours,Comment:comment})
    // newData.save()
    else{
    newData = new formData({Platform:platform, UserName:username,Email:email,Hours:hours,Comment:comment})
    newData.save()
    console.log(typeof(formData))
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send("ace")
    }


    
})



// Routes
app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/')
});

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/')
});


// https
//   .createServer(
//     {
//       key: fs.readFileSync("./privkey.pem"),
//       cert: fs.readFileSync("./fullchain.pem"),
//     },
//     app
//   )
//   .listen(8080, async () => {
//     console.log("Server Started");
//   });













async function getHours(key,steamid)  {
    const res = await axios.get('https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/',
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