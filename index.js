const fs = require("fs")
const https = require("https")
const proxyRouter = require("./routes/proxy")
const app = require("express")() ; 
const options = {
    key : fs.readFileSync("./ssl/key.pem"), 
    cert: fs.readFileSync("./ssl/cert.pem")
}
https.createServer(options, app).listen(443, (
    console.log("Load balancer started securely on port 443")
))

app.use('/app', proxyRouter) ; 


