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

let healthyServers  = await results

// Weighted Round Robin 


let totals = [] ; 
function initWeights() {  
    totals = []
    let runningTotal = 0 

    for(let i= 0; i<healthyServers.length ; i++) { 
        runningTotal += healthyServers[i].weight 
        totals.push(runningTotal)
    }
}

// servers index 

function getServer() { 
  const random = Math.floor(Math.random() * totals[totals.length -1]) +1 ; 

  for(let i= 0 ; i < totals.length ; i++) {
    if(random <= totals[i])
        return healthyServers[i] ; 
  }
}

// proxys req 



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

  console.log(await results)
  return  healthyServers = await results ; 
  
    
}

updateHealthyServers() ; 
console.log(healthyServers)
// heath check period 
setInterval(updateHealthyServers, 10000) ; 

module.exports = router ; 