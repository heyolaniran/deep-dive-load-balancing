const axios = require("axios").default 

axios.interceptors.request.use( request => {
    request.meta = request.meta || {}
    request.meta.requestStartedAt = new Date().getTime();
    return request;
}
  
)

axios.interceptors.response.use( response => {
     response.duration = new Date().getTime() - response.config.meta.requestStartedAt+ ` ms`
    return response;
}
  
)

const { response } = require("express");
const servers = require("./servers") ; 

const healthyCheck =  async () => {
    const results  = [] ; 
    for(let i=0 ; i < servers.length ; i++) { 
        const server = servers[i] ; 
        try {
            const response = await axios.get(`http://${server.host}:${server.port}/health`) ; 
            if(response.status === 200 ) {
                results.push({
                    id: server.id , 
                    status : 'passing' , 
                    duration : response.duration
                }) ; 
            } else { 
                results.push({
                    id: server.id , 
                    status : 'failing', 
                    duration : response.duration
                }) ; 
            }
    

        } catch (error) {
            results.push({
                id: server.id , 
                status : 'failing' , 
                duration : response.duration
            }) ;
        }
        
    }

   return await results
}

module.exports =   healthyCheck() ; 

