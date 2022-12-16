const axios = require("axios")

axios.post("https://localhost:4000/sign", {
    email: "Jonathanelse@yahoo.com",
    username: "Jonny",
    platform: "Xbox",
    time: 1,
    comment: "This is a test"
}).then(res => {
    console.log("Res: ", res)
})