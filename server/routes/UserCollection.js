 
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
 
 /*
    USER COLLECTION NEEDS
    -   create user (done)
    -   login user (test)
    -   get userInfo (done)
    -   update user info (done)
    -   delete user (done)
    -   add to liked and personal values (done)

 */
   

router.post('/createUser',[
      body('username').exists().isString().trim().escape().isLength({ min: 4, max: 20 }),
      body('password').exists().isString().trim().escape().custom(value =>{
         // https://stackoverflow.com/questions/26322867/how-to-validate-password-using-following-conditions
         return /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /[0-9]/.test(value) &&
                /[^A-Za-z0-9]/.test(value) &&
                value.length >= 8 && value.length <= 20;
      }),
      body('email').isEmail()
    ],
       async(req,res) =>{
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
             return res.status(400).json({ errors: errors.array() });
         }

         const {username, password, email} = req.body

         let hashPassword;
         await bcrypt.hash(password, saltRounds)
         .then(hash =>{
             hashPassword = hash;
         }).catch(error =>{
             res.json("balls")
         })

         const userId = crypto.randomUUID()

         const entry = {
            user_id: userId,
            username: username,
            password: hashPassword,
            email: email,
            liked_routines: [],
            personal_routines: []
         }

         const db = client.db('GetFit')
         const collection = db.collection('Users')

         collection.insertOne(entry)
         .then(response =>{
            const token = jwt.sign({ userId: userId }, process.env.SECRET_KEY);
            res.status(200).json(token)
         })
         .catch(error =>{
            res.status(500).json('internal server error')
         })
    })


    router.post('/getUser', Authorization.isAuthorized, async(req,res) =>{
      const userId = req.userId
      const db = client.db('GetFit')
      const collection = db.collection('Users')

      collection.findOne({user_id: userId})
      .then(response =>{
         if(!response)
            res.status(404).json("no entry found")
         else
            res.status(200).json(response)
      })
      .catch(error =>{
         res.status(500).json('internal server error')
      })

    }) 

router.post('/updateUser', Authorization.isAuthorized, [
      body('username').optional().isString().trim().escape().isLength({ min: 4, max: 20 }),
      body('password').optional().isString().trim().escape().custom(value =>{
         // https://stackoverflow.com/questions/26322867/how-to-validate-password-using-following-conditions
         return /[A-Z]/.test(value) &&
                /[a-z]/.test(value) &&
                /[0-9]/.test(value) &&
                /[^A-Za-z0-9]/.test(value) &&
                value.length >= 8 && value.length <= 20;
      }),
      body('email').isEmail().optional()
    ],
     async(req,res) =>{

         const {username, password, email} = req.body

         const errors = validationResult(req);
         if (!errors.isEmpty() || (!username && !password && !email)) {
             return res.status(400).json({ errors: errors.array() });
         }

         let updateQuery = {}
         if(username){
            updateQuery = {...updateQuery, username: username}
         }
         if(password){
            let hashPassword;
            await bcrypt.hash(password, saltRounds)
            .then(hash =>{
                hashPassword = hash;
            }).catch(error =>{
                res.json("balls")
            })
            updateQuery = {...updateQuery, password: hashPassword}
         }

         if(email){
            updateQuery = {...updateQuery, email: email}
         }

         const db = client.db('GetFit')
         const collection = db.collection('Users')

         await collection.findOneAndUpdate({user_id: req.userId},{$set: updateQuery }, { returnDocument: 'after' } )
         .then(response =>{
            if(!response){
               console.log('HERSERAEFSEFA')
               res.status(404).json("entry not found")
            }else{
               res.status(200).json(response)
            }
         })
         .catch(error =>{
            res.status(500).json(error)
         })
    })

    //test
    router.delete('/deleteUser', Authorization.isAuthorized, async(req,res) =>{
         const db = client.db('GetFit')
         const collection = db.collection('Users')

         await collection.deleteOne({user_id: req.userId})
         .then(response =>{
            if(!response.deletedCount)
               res.status(404).json('user not found')
            else
               res.status(200).json(response)
         })
         .catch(error =>{
            res.status(500).json('internal server error')
         })
    })

router.put('/LikesAndClones', Authorization.isAuthorized,[
   body('routineId').isString().exists().trim().escape(),
   body("operation").exists().isString().custom(value =>{
      const choices = ['$push', '$pull']
      return choices.indexOf(value) != -1
   }),
   body("operationField").exists().isString().custom(value =>{
      const choices = ['liked_routines', 'personal_routines']
      return choices.indexOf(value) != -1
   })
]
   , async(req,res) =>{

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
      }

      const{routineId, operation, operationField} = req.body
      
      const db = client.db('GetFit')
      const collection = db.collection('Users')

      await collection.findOneAndUpdate(
         {user_id: req.userId},
         {[operation]: {[operationField]: routineId}},
         { returnDocument: 'after' }
      )
      .then(response =>{
         if(!response)
            res.status(404).json("user not found")
         else
            res.status(200).json(response)
      })
      .catch(error =>{
         res.status(500).json('internal server error')
      })
})

router.post('/loginUser',[
   body("email").isString().trim().escape(),
   body("password").isString().trim()],
   async(req,res)=>{
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
       }
       const {email, password} = req.body
       const db = client.db('GetFit')
       const users = db.collection('Users')
       await users.findOne({email: email})
       .then( response => {
           if(!response.user_id){
               res.status(404).send({ error: "User not found" });
           }
           let user_id = response.user_id;
           let passwordHash = response.password;
           bcrypt.compare(password, passwordHash, (err, result) =>{
               if(result){
                   const token = jwt.sign({ userId: user_id }, process.env.SECRET_KEY );
                   res.json(token)
               }else{
                   res.status(401).send({ error: "password was Incorrect" });
               }
           })
       }).catch(error =>{
           res.status(500).send("internal server error");
       })
   })
    module.exports = router