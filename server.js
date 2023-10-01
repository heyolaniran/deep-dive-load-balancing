const express = require("express") 
const app = express()  

app.get('/app', (req , res) => {
    res.json(`Hello from server ${process.env.HOSTNAME}`) ; 
})

app.listen(3000, () => { 
    console.log("Backend server running successfully on port 3000") ; 
})