const axios = require("axios")

const servers = require("./servers") ; 

const healthyCheck =  async () => {
    const results  = [] ; 
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

    return await results
}

module.exports =   healthyCheck() ; 

