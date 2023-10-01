const express = require("express")
const proxy = require("http-proxy-middleware")
const router = express.Router() 

const servers = [
    {
        host: 'localhost', 
        port : '3000', 
        weight : 1
    } , 
    {
        host: 'localhost', 
        port : '3001',
        weight: 1
    }
    // More servers 
] ; 

// proxy configuration 
const proxyOptions = {
    target : '', 
    changeOrigin : true , 
    onProxyReq : (proxyReq , req) => {
        proxyReq.setHeader('X-Special-Proxy-Header', 'foobar') 
    } , 
    loglevel : 'debug'
}

// servers index 
let servIndex = 0 ; 
function getServer() { 
    servIndex = (servIndex +1) % servers.length

    return servers[servIndex]
}

// proxys req 

router.all("*" , (req , res) => { 
    const target = getServer()
    proxyOptions.target = `http://${target.host}:${target.port}`

    // forwarding req
    proxy(proxyOptions)(req, res); 
}) ; 

module.exports = router ; 