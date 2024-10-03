const app = require("./app");
require('dotenv').config();

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  
})