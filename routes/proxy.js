const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")
const router = express.Router() 
const servers = require("../utils/servers") ; 
const results = require("../utils/healthy") ; 
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

let healthyServers  = [] 



router.all("*" , (req , res) => { 

    if(healthyServers.length === 0) { 
        return res.status(500).send("No healthy Servers available") ;
    }

    const target = getServer()
    proxyOptions.target = `http://${target.host}:${target.port}`
    console.log("proxy " ,proxyOptions)
    // forwarding req
   createProxyMiddleware(proxyOptions) ; 
}) ; 

async function updateHealthyServers() { 
    
    console.log( await results) ; 
  
}

updateHealthyServers() ; 

// heath check period 
setInterval(updateHealthyServers, 10000) ; 

module.exports = router ; 