import express from 'express'
import morgan from 'morgan'
import {checkSchema} from 'express-validator'
import { protect } from './modules/aut'
import { createNewUser, signin } from './handlers/user'
import { handleInputError } from './modules/middleware'
import { validatorForUser, validatorSign } from './modules/validationSchemas'
import cors from 'cors'
import router from './router'

const app = express()

const corsOptions = {
    origin: ['http://localhost:3000', 'null'], // Add 'null' as an allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and HTTP authentication if needed
    optionsSuccessStatus: 204 // HTTP status code to respond with for preflight requests
};
app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res) => {
    res.json({message:"'Welcome to Tata-API'"})
})

//app.post('/createUser',checkSchema(validatorForUser),handleInputError,createNewUser)
app.post('/createUser',createNewUser)
app.post('/signin', checkSchema(validatorSign),handleInputError,signin)
app.use('/api',protect,router)


export default app