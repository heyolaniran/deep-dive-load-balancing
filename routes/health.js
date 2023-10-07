const express = require("express")  ; 
const router = express.Router() ; 
const axios = require("axios") ;
const servers = require("../utils/servers")
const results = require("../utils/healthy")
router.get('/health', async (req, res) => {

    //return res in json 

    res.json(results) ; 
})

module.exports = router