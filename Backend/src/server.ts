import express from 'express'

const app = express()
//app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/',(req,res) => {
    res.json({message:"Welcome"})
})

//app.post('/user',body(['username','password','role']).isString().notEmpty(),handleInputError,createNewUser)
//app.post('/signin',body(['username','password']).isString().notEmpty(),handleInputError,signin)

//app.use('/api',protect,authorizeJWT('admin'),router)

export default app