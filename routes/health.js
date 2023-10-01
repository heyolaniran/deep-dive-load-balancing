const express = require("express")  ; 
const router = express.Router() ; 
const axios = require("axios") ;
const servers = require("../utils/servers")
router.get('/health', async (req, res) => {
    const results  = [] ; 

    //check healthy servers 

    for(let i=0 ; i < servers.length ; i++) { 
        const server = servers[i] ; 
        try {
            const response = await axios.get(`http://${server.host}:${server.port}`) ; 
            if(response.status === 200 ) {

                results.push({
                    id: server.id , 
                    status : 'passing'
                }) ; 
            } else { 
                results.push({
                    id: server.id , 
                    status : 'failing'
                }) ; 
            }

        } catch (error) {
            results.push({
                id: server.id , 
                status : 'failing'
            }) ; 
        }


    }

    //return res in json 

    res.json(results) ; 
})

module.exports = router