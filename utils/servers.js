const servers = [
    {
        id : 1, 
        host: 'localhost', 
        port : '3000', 
        weight : 1
    } , 
    { 
        id: 2, 
        host: 'localhost', 
        port : '3001',
        weight: 1
    }
    // More servers 
] ; 

module.exports = servers ; 