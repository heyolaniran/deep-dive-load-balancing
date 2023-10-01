const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const router = express.Router() 
const servers = require("../utils/servers") ; 

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
    console.log("proxy " ,proxyOptions)
    // forwarding req
   createProxyMiddleware(proxyOptions) ; 
}) ; 

module.exports = router ; 