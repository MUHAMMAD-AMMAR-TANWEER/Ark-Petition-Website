

const axios = require("axios")

// 
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
};
getHours('342526B76FAC938ED641DFBA45F12FA5','76561198122066212')
