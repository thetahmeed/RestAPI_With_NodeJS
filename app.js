





const mExpress = require('express')
const mMongoose = require('mongoose')
const mMorgan = require('morgan')
const mBodyParser = require('body-parser')                      // to extracts the data, those are given by the body
const mCors = require('cors')                                   // to access API from all port

// Connecting with mongoDB
mMongoose.connect('mongodb+srv://tahmeedul:cK4H6VVF9fPQPYF6@cluster0.mvhfs.mongodb.net/contacts?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true})

// Checking database is connected or not 
const mDb = mMongoose.connection
// if not connected to mongoDB
mDb.on('error', (err) => {
    console.log('Not connected')
})
// if connected to mongoDB
mDb.once('open', () => {
    console.log('Connected to mongoDB')
})


// Importing mContactsRoute
const mContactsRoute = require('./api/routes/contactsroute')
// Importing mUserRoute
const mUserRoute = require('./api/routes/user')


const mApp = mExpress()

// Using middleware
mApp.use(mCors())
mApp.use(mMorgan('dev'))
mApp.use(mBodyParser.urlencoded({extended: true}))
mApp.use(mBodyParser.json())


/*
// custom middleware
mApp.use((req, res, next) => {
    res.send('<h1>Coming soon...</h1>')
    // if you don't call the 'next()' then no below route will be exicute
    //next()                                                   
})
*/



mApp.use('/contacts', mContactsRoute)

mApp.use('/user', mUserRoute)

mApp.get('/', (req, res) => {
    res.send('Hello World!')
    
})



const PORT = process.env.PORT || 8080
mApp.listen(PORT, () => {
    console.log(`I am on Port ${PORT}`)
})