const fs = require("fs")
const https = require("https")
const options = {
    key : fs.readFileSync("./ssl/key.pem"), 
    cert: fs.readFileSync("./ssl/cert.pem")
}
https.createServer(options, app).listen(443, (
    console.log("Load balancer started securely on port 443")
))

