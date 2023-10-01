const express = require("express")  ; 
const router = express.Router() ; 
const axios = require("axios") ;
const servers = require("../utils/servers")
router.get('/health', async (req, res) => {
    const results  = [] ; 

    //check healthy servers 

    for(let i=0 ; i < servers.length ; i++) { 
        const server = servers[i] ; 

    }
})