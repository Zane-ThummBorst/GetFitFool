
const express = require('express')
const app = express()
// const ShowsCollections = require('./routes/ShowsCollections')
const ExerciseCollection = require('./routes/ExerciseCollection')
const RoutineCollection = require('./routes/RoutineCollection')
const UserCollection = require('./routes/UserCollection')

require('dotenv').config();


let cors = require('cors');
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use("/exercises", ExerciseCollection)
app.use("/routines", RoutineCollection)
app.use("/users", UserCollection)


app.get('/', (req, res) => {
    res.send('PF closed down!!!!')
})

module.exports = app

