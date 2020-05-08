import mongoose from "mongoose";
import config from "./config.json";
import initForum from "./forum/init";


//підключення до бази даних
const connectionUrl = config.db.url+config.db.name;
mongoose.connect (connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(()=>{
    //виклик ініціалізації списку форумів
    initForums.run().then( ()=>{
        console.log(`Database vas initialised`);  
    }); 
})
.catch(error=>{console.log(error)});