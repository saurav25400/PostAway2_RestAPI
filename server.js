import app from './index.js';
import './env_config.js';
import { connectionUsingMongoose } from './config/mongodb.config.js';

const port=5000;
app.listen(port,(req,res)=>{
    console.log('server is started at port '+port);
    connectionUsingMongoose();
});