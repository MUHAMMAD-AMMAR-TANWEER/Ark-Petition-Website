const express = require("express")
const { ark_petition_signs } = require("./models")
const bodyParser = require('body-parser');
const validator = require("validator")
const helmet = require("helmet")
const cors = require("cors");
const { brotliDecompress } = require("zlib");
const passport = require('passport');
const session = require('express-session');
const passportSteam = require('passport-steam');
const fs = require("fs")
const https = require("https")
const SteamStrategy = passportSteam.Strategy;


const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

const port = 4000
const baseUrl = 'http://164.92.86.165'




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

app.get('/', (req, res) => {
	// res.send(req.user);
    const realname = req.user["_json"]["personaname"]
	const steamid = req.user["_json"]["steamid"]
    	getHours('342526B76FAC938ED641DFBA45F12FA5',steamid).then((reponse)=>{
		console.log("Hours played",reponse)	
		// res.send(`the response is ${reponse}`)
		// res.sendFile('');
		const url = `${baseUrl}/join?username=${realname}&hourplayed=${reponse}`	
		res.redirect(url)
	}).catch((e)=>{
		res.redirect(baseUrl)
	})

});

async function emailIsInDB(email) {
    try {
        const row = await ark_petition_signs.findOne({
            where: {
                email: email
            }
        })
        console.log("email: ", row)
        if (row !== null && row !== undefined) {
            return true
        }
        return false
    } catch (err) {
        return false
    }
}

async function usernameIsInDB(username) {
    try {
        const row = await ark_petition_signs.findOne({
            where: {
                username: username
            }
        })
        if (row !== null && row !== undefined) {
            return true
        }
        return false
    } catch (err) {
        return false
    }
}


app.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/')
});

app.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
	res.redirect('/')
});

app.post("/sign", async(req, res) => {

    try {
        let body = req.body

        if (!validator.isEmail(body.email)) {
            res.send({ error: "Not a valid email" })
        }

        if (await emailIsInDB(body.email)) {
            res.send({ error: "Already signed, email" })
        }

        if (await usernameIsInDB(body.username)) {
            res.send({ error: "Already signed,username" })
        }

        if (
            body.platform != "Steam" &&
            body.platform != "Xbox" &&
            body.platform != "Playstation"
        ) {
            res.send({ error: "Invalid platform" })
        }

        if (body.time == 0 || body.time == null || body.time == undefined) {
            res.send({ error: "You must have played ark to sign" })
        }

        let entry = await ark_petition_signs.create({
            platform: body.platform,
            username: body.username,
            email: body.email,
            time_played: body.time,
            comment: body.comment
        })

        res.send({
            message: "Entry complete"
        })
    } catch (err) {
        res.send({ error: err })
    }
})

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


https
  .createServer(
    {
      key: fs.readFileSync("./key.pem"),
      cert: fs.readFileSync("./cert.pem"),
    },
    app
  )
  .listen(port, async () => {
    console.log("Server Started");
  });


// app.listen(port, () => {
//     console.log("Waiting")
// })