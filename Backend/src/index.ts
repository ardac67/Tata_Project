import * as dotenv from "dotenv";
dotenv.config();
import app from './server'

app.listen(3001,() => {
    console.log('Welcome to Tata-API')
})