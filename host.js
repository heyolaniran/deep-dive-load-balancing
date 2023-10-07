const express = require("express") 
const app = express()  


app.get('/health', (req , res) => { 
    res.json("test ")
})

app.listen(3001, () => { 
    console.log("Backend server running successfully on port 3001") ; 
})