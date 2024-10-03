const express = require('express')
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const {MongoClient} = require('mongodb');
const { param, body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Filter = require('bad-words')
// const filter = new Filter();
const saltRounds = 10;

require('dotenv').config();


const client = new MongoClient(process.env.MONGO_URI, { monitorCommands: true })
client.connect()


/* 
purpose: given a name of an exercise, return database entry with corresponding name
parameters: 
    - name (String)
*/

router.post('/getExercise',[body("name").isString().trim().escape()], async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {name} = req.body

    const db = client.db('GetFit')
    const collection = db.collection('Exercises')

    await collection.findOne({name: name})
    .then(response =>{
        if(!response)
            res.status(404).json('Entry does not exist')
        else
            res.json(response)
    })
    .catch(error =>{
        res.status(500).json('Service Unavailable at this time')
    })
})


/* 
The purpose of this endpoint is tor sort for th list of potentiall exercises
- shoulkd only return whatis necessary for that list (some things that are not necessary)
    - instructions and thats it
    - maybe have an expanded view modal tip?
    - maybe ahve a seperate page?

*/
router.post('/getManyExercises',
    [
        body("input").isString().trim().escape().optional(),
        body("mechanic").isArray().optional().custom(value =>{
            return value.every(item =>{
                return typeof item === 'string'
            })
        }),
        body("category").isArray().optional().custom(value =>{
            return value.every(item =>{
                return typeof item === 'string'
            })
        }),
        body("equipment").isArray().optional().custom(value =>{
            return value.every(item =>{
                return typeof item === 'string'
            })
        }),
        body("level").isArray().optional().custom(value =>{
            return value.every(item =>{
                return typeof item === 'string'
            })
        }),
        body("primaryMuscles").isArray().optional().custom(value =>{
            return value.every(item =>{
                return typeof item === 'string'
            })
        }) 
    ],
    async(req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {input, level, equipment, mechanic, primaryMuscles, category, limit, offset} = req.body
        const query = []
        if(input)
            query.push({name: {$regex : input, $options : 'i'}})
        if(level)
            query.push({level: {$in: level}})
        if(equipment)
            query.push({equipment: {$in: equipment}})
        if(mechanic)
            query.push({mechanic: {$in : mechanic}})
        if(primaryMuscles)
            query.push({primaryMuscles: {$elemMatch: {$in: primaryMuscles}}})
        if(category)
            query.push({category: {$in : category}})


        const db = client.db('GetFit')
        const collection = db.collection('Exercises')

        try{
            const size = await collection.countDocuments(query.length > 0 ? {$and: query} : {});
            console.log(size)
            const result = await collection.find(query.length > 0 ? {$and: query} : {}).limit(limit).skip(offset).toArray()
            res.json({size: size, result: result})
        }catch(e){

        }

        // await collection.find(query.length > 0 ? {$and: query} : {}).limit(limit).skip(offset).toArray()
        // .then(response =>{
        //     if(!response){
        //         res.status(404).json('No entries fit this criteria')
        //     }else{
        //         res.json({size: response.length, result: response})
        //     }
        // })
        // .catch(error =>{
        //     console.log(error)
        //     res.status(500).json('Service Unavailable at this time')
        // })
        
})

router.get('/metadata', async(req,res) =>{

    const result = {}
    const equipmentPipeline =[ {
        $group: {
            _id: null,
            equipmentList : {$push: "$equipment"}
        }
    }]

    const categoryPipeline =[ {
        $group: {
            _id: null,
           categoryList : {$push: "$category"}
        }
    }]

    const mechanicPipeline =[ {
        $group: {
            _id: null,
            mechanicList : {$push: "$mechanic"}
        }
    }]

    const primaryMusclePipeline =[ 
    {
        $unwind: "$primaryMuscles" // Deconstruct the 'primaryMuscles' array
    },   
    {    
        $group: {
            _id: null,
            primaryMuscleList: {$push: "$primaryMuscles"}
        }
    },
]

    const db = client.db("GetFit")
    const collection = db.collection("Exercises")
    try{


        let primaryMuscleList = await collection.aggregate(primaryMusclePipeline).toArray()
        primaryMuscleList = [...new Set(primaryMuscleList[0].primaryMuscleList)]
        result['primaryMuscleList'] = primaryMuscleList

        let equipmentList = await collection.aggregate(equipmentPipeline).toArray()
        equipmentList = [...new Set(equipmentList[0].equipmentList)]
        result['equipmentList'] = equipmentList

        let mechanicList = await collection.aggregate(mechanicPipeline).toArray()
        mechanicList = [...new Set(mechanicList[0].mechanicList)]
        result['mechanicList'] = mechanicList

        let categoryList = await collection.aggregate(categoryPipeline).toArray()
        categoryList = [...new Set(categoryList[0].categoryList)]
        result['categoryList'] = categoryList


        res.json(result)
    }catch{

    }

})



module.exports = router