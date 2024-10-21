const express = require("express")
const router = express.Router();
const axios = require("axios");
const crypto = require("crypto");
const {MongoClient} = require("mongodb");
const { param, body, check,validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Authorization = require('../middleware/Authorization')
require("dotenv").config();
const saltRounds = 10;


const client = new MongoClient(process.env.MONGO_URI, { monitorCommands: true })
client.connect()



// we are building this for each day, but want the end result to be one list!
const validationList = () =>{
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let validationList = [check("schedule").exists(), check("uuid").exists().isString().trim().escape()]
    days.forEach(day =>{
        validationList.push(check(`schedule.${day}`).exists())
        validationList.push(check(`schedule.${day}.notes`).isString().optional())
        validationList.push(check(`schedule.${day}.exercises.*.info.number_of_sets`).isInt())
        validationList.push(check(`schedule.${day}.exercises.*.info.starting_weight`).isInt())
        validationList.push(check(`schedule.${day}.exercises.*.info.personal_best`).isInt())
        validationList.push(check(`schedule.${day}.exercises.*.info.rep_range.*`).isInt())
        validationList.push( check(`schedule.${day}.exercises.*.info.notes.*.date`).isString())
        validationList.push( check(`schedule.${day}.exercises.*.info.notes.*.note`).isString())
        validationList.push( check(`schedule.${day}.exercises.*.info.summary`).isString())
        validationList.push( check(`schedule.${day}.exercises.*.info.name`).isString())
        validationList.push( check(`schedule.${day}.exercises.*.info.images.*`).isString())
        validationList.push( check(`schedule.${day}.primaryMuscles.*.images.*`).isString())
    })

    return validationList
}


router.post("/createRoutine", Authorization.isAuthorized, [
    body('name').isString().trim().escape(),
    body('summary').isString().optional()
    ],
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }    
        const { name, summary } = req.body
        const userId = req.userId
        const schedule = {
            Monday: {exercises: [], notes: ""},
            Tuesday: {exercises: [], notes: ""},
            Wednesday: {exercises: [], notes: ""},
            Thursday: {exercises: [], notes: ""},
            Friday: {exercises: [], notes: ""},
            Saturday: {exercises: [], notes: ""},
            Sunday: {exercises: [], notes: ""},
        }

        const uuid = crypto.randomUUID()
        
        const entry = {
            owner: userId,
            name: name,
            summary: summary ? summary: '',
            uuid: uuid,
            schedule: schedule,
            public: false,
            likes: 0,
            clones: 0,
            totalExercises: 0,
            Days: [],
            type: "", // categories of routines (strength, strech, calestenics)
        }

        const db = client.db('GetFit')
        const collection = db.collection(process.env.COLLECTION_URI)
        await collection.insertOne(entry)
        .then(response =>{
            res.status(200).json(uuid);
        })
        .catch(error =>{
            res.status(500).json(error);
        }) 
})



router.put("/UpdateScheduleRoutine", validationList(), async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ errors: errors.array() });
    }
    console.log("here?")
    const {schedule, uuid, } = req.body;

    let totalExercises = 0;
    let daysList = []
    let days = Object.keys(schedule)
    days.forEach(day =>{
        if(schedule[day].exercises.length != 0){
            daysList.push(day)
            totalExercises += schedule[day].exercises.length
        }
    })
    const db = client.db('GetFit')
    const collection = db.collection(process.env.COLLECTION_URI)
    await collection.findOneAndUpdate({uuid: uuid}, {$set: {schedule: schedule, Days: daysList, totalExercises: totalExercises }})
    .then(response =>{
        if(!response)
            res.status(404).json("resource does not exist")
        else
            res.status(200).json(response)
    })
    .catch(error =>{
        res.status(500).json(error);
    }) 
})

router.put("/UpdateGeneralInfoRoutine",
    [
        body('owner').isString().trim().escape().exists(),
        body('name').isString().trim().escape().exists(),
        body('summary').isString().trim().escape().exists(),
        body('uuid').isString().trim().escape().exists(),
        body('type').isString().trim().escape().exists(),
    ],
        async(req,res) =>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const {owner, name, summary, uuid, type} = req.body

            const db = client.db('GetFit')
            const collection = db.collection(process.env.COLLECTION_URI)

            await collection.findOneAndUpdate({uuid: uuid}, {$set: {owner: owner, name: name, summary: summary, type: type}})
            .then(response =>{
                if(!response)
                    res.status(404).json("resource does not exist")
                else
                    res.status(200).json(response)
            })
            .catch(error =>{
                res.status(500).json(error);
            }) 
})

router.post("/deleteRoutine",[ body('uuid').isString().trim().escape().exists()], async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {uuid} = req.body
    const db = client.db('GetFit')
    const collection = db.collection(process.env.COLLECTION_URI)

    collection.deleteOne({uuid: uuid})
    .then(response =>{
        if(!response.deletedCount){
            res.status(404).json("resource does not exist")
        }else{
            res.status(200).json(response)
        }
    })
    .catch(error =>{
        res.status(500).json(error)
    })
})


router.post("/cloneRoutine",
    [
        body('newOwner').isString().trim().escape(),
        body('routineUuid').isString().trim().escape(), 
        body('isPublic').isBoolean().optional(),
    ],
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        const {newOwner, routineUuid, isPublic} = req.body

        const db = client.db('GetFit')
        const collection = db.collection(process.env.COLLECTION_URI)

        try{
            let response = await collection.findOne({uuid: routineUuid})
            if(!response){
                res.status(404).json("The entry you are trying to clone does not exist")
            }else{
                response.owner = newOwner;
                response.uuid = crypto.randomUUID();
                response._id = undefined;           
                if(isPublic){
                    response.public = true;
                }else{
                    response.public = false;
                }

                let days = Object.keys(response.schedule)
                days.forEach(day =>{
                    if(response.schedule[day].exercises){
                        let exercises = response.schedule[day].exercises
                        for(let i = 0; i < exercises.length; i++){
                            response.schedule[day].exercises[i].info.notes = []
                        }
                    }
                })

                const response2 = await collection.insertOne(response)
                if(!response2){
                    res.status(500).json("internal server error")
                }else{
                    res.status(200).json(response.uuid)
                }
            }

        }catch(error){
            console.log(error)
            res.status(500).json(error)
        }

    })


//test
router.post('/increment',[
    body('uuid').isString().trim().escape(),
    body('incrementField').isString().exists().trim().escape().custom(value=>{
        const choices = ['likes', 'clones']
        return choices.indexOf(value) !== -1
    }),
    body('operation').isInt().exists().custom(value =>{
        return value === 1 || value === -1
    })
], async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {uuid, incrementField, operation} = req.body
    const db = client.db('GetFit')
    const collection = db.collection(process.env.COLLECTION_URI)
    collection.findOneAndUpdate({uuid: uuid}, {$inc : {[incrementField]: operation}},{ returnDocument: 'after' })
    .then(response =>{
        if(!response)
            res.status(404).json("no entry matches query")
        else
            res.status(200).json(response)
    })
    .catch(error =>{
        res.status(500).json('internal server error')
    })
})

// test
router.post('/GetRoutines', [body("routineUuids").isArray().exists(), body("routineUuids.*").isString().trim().escape()], async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {routineUuids} = req.body
    const db = client.db('GetFit')
    const collection = db.collection(process.env.COLLECTION_URI)

    await collection.find({uuid: {$in: routineUuids}}).toArray()
    .then(response =>{
        if (response.length === 0)
            res.status(404).json("no entries")
        else
            res.status(200).json(response)
    })
    .catch(error =>{
        res.status(500).json("internal error")
    })

})

// test
router.post('/getPublicRoutines',[
    body("exerciseList").isArray().optional(),
    body("exerciseList.*").isString().trim().escape().optional(),
    body("numberOfDays").isInt().optional(),
    body("totalExercisesRange").isArray().optional(),
    body("totalExercisesRange.*").isInt().optional(),
    body("sortField").isString().trim().escape().optional(),
    body("sortOrder").isInt().optional(),
    body("type").isArray().optional(),
    body("type.*").isString().trim().escape().optional(),
    body("offset").isInt().optional(),

],
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const {exerciseList, numberOfDays, totalExercisesRange, sortField, sortOrder, type, offset} = req.body
        const pipeline = [{$match: {public: true}}]

        if(numberOfDays)
            pipeline.push( {$match : { Days: { $size: numberOfDays } }} )
        if(totalExercisesRange)
            pipeline.push({ $match: {totalExercises: { $gte: totalExercisesRange[0], $lte: totalExercisesRange[1]}} })
        if(type)
            pipeline.push({$match: {type: {$in: type}}})

        // this is fucked
        if(exerciseList){
            pipeline.push( {
                $match: {
                    $or: [
                            {"schedule.Monday.exercises.info.name": {$in: exerciseList}},
                            {"schedule.Tuesday.exercises.info.name":  {$in: exerciseList}},
                            {"schedule.Wednesday.exercises.info.name":  {$in: exerciseList}},
                            {"schedule.Thursday.exercises.info.name":  {$in: exerciseList}},
                            {"schedule.Friday.exercises.info.name":  {$in: exerciseList}},
                            {"schedule.Saturday.exercises.info.name":  {$in: exerciseList}},
                            {"schedule.Sunday.exercises.info.name":  {$in: exerciseList}},
                        ]

                }
            })
        }
        if(sortField)
            pipeline.push({$sort: {[sortField] : sortOrder}})

        pipeline.push({$skip: offset})
        pipeline.push({$limit: 20})

        try {
            const db = client.db('GetFit')
            const collection = db.collection(process.env.COLLECTION_URI)
            const result = await collection.aggregate(pipeline).toArray()
            pipeline.pop()
            pipeline.pop()
            pipeline.push({$count: 'totalDocuments'})

            const result2 = await collection.aggregate(pipeline).toArray()

            if(result.length == 0)
                res.status(200).json({publicRoutines: [], count: 0})
            else
                res.status(200).json({publicRoutines: result, count: result2[0].totalDocuments})
        } catch (error) {
                console.log(error)
                res.status(500).json('internal server error')
        }
})

module.exports = router
