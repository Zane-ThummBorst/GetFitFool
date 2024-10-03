const request = require('supertest')
const app = require("../app")
const { describe, test, it } = require('@jest/globals')
const {MongoClient} = require("mongodb");
require("dotenv").config();
const client = new MongoClient("mongodb://127.0.0.1:27017/GDead", { monitorCommands: true })
client.connect()


describe("Test creating a new Routine", ()=>{
    test('Successful Routine creation', async() =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: "test", name: 'test Routine', summary:"this is my routine"})
        expect(response.statusCode).toBe(200)
    })
    test('Successful Routine creation with no summary', async() =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: "1234", name: 'Billy Bob Thorton split'})
        expect(response.statusCode).toBe(200)
    })
    test('no request Body', async() =>{
        const response = await request(app).post('/routines/createRoutine')
        expect(response.statusCode).toBe(400)
    })
    test('bad user ID', async() =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: 1234, name: 'Billy Bob Thorton split', summary:"this is my routine"})
        expect(response.statusCode).toBe(400)
    })
    test('bad name', async() =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: "1234", name: null, summary:"this is my routine"})
        expect(response.statusCode).toBe(400)
    })
})

const testUpdateRoutine1 = {
    "schedule": {
            "Monday":{
                "exercises":[
                    { 
                        "number_of_sets": 5, // shared
                        "rep_range": [12, 16], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "date", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                          ],
                        "primaryMuscles": ["quadriceps"]
                          
                    },
                    { 
                        "number_of_sets": 3, // shared
                        "rep_range": [12, 16], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "date", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                          ],
                        "primaryMuscles": ["quadriceps"]
                        
                    },
                    { 
                        "number_of_sets": 3, // shared
                        "rep_range": [12, 16], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                          ],
                        "primaryMuscles": ["quadriceps"]
                    }
                ],
                "notes": "notes on the day"
            },
            "Tuesday":{},
            "Wednesday":{},
            "Thursday":{},
            "Friday":{},
            "Saturday":{},
            "Sunday":{}
        }
    }

const testUpdateRoutine4 = {
    "schedule": {
            "Monday":{
                "exercises":[
                    { 
                        "number_of_sets": 5, // shared
                        "rep_range": [12, 'son of a gun!'], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "date", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                            ],
                        "primaryMuscles": ["quadriceps"]
                            
                    },
                    { 
                        "number_of_sets": 3, // shared
                        "rep_range": [12, 16], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "date", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                            ],
                        "primaryMuscles": ["quadriceps"]
                        
                    },
                    { 
                        "number_of_sets": 3, // shared
                        "rep_range": [12, 16], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                            ],
                        "primaryMuscles": ["quadriceps"]
                    }
                ],
                "notes": "notes on the day"
            },
            "Tuesday":{},
            "Wednesday":{},
            "Thursday":{},
            "Friday":{},
            "Saturday":{},
            "Sunday":{}
        }
    }
const testUpdateRoutine6 = {
    "uuid": "2f904cca-78f2-481d-9ffc-dfb91ddcf956",
    }
const testUpdateRoutine7 = {
    "schedule": {
            "Monday":{
                "exercises":[
                    { 
                        "number_of_sets": 5, // shared
                        "rep_range": [12, 16], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "date", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                            ],
                        "primaryMuscles": ["quadriceps"]
                            
                    },
                    { 
                        "number_of_sets": 3, // shared
                        "rep_range": [12, 16], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "date", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                            ],
                        "primaryMuscles": ["quadriceps"]
                        
                    },
                    { 
                        "number_of_sets": 3, // shared
                        "rep_range": [12, 16], // shared
                        "starting_Weight": 20, // personal
                        "personal_best": 40, // personal
                        "notes": [{"date": "", "note": "stuff for the day"}], // personal
                        "summary": "any summary for exersise like why you want it/ why its placed here", // shared
                        "name": "Barbell Walking Lunge",
                        "images":  [
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/1.jpg",
                            "https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/Barbell_Walking_Lunge/images/2.jpg"
                            ],
                        "primaryMuscles": ["quadriceps"]
                    }
                ],
                "notes": "notes on the day"
            },
            "Wednesday":{},
            "Thursday":{},
            "Friday":{},
            "Saturday":{},
            "Sunday":{}
        }
    }


describe('test Update routine functionality', ()=>{
    let testUuid
    beforeAll(async() =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: "random uuid", name: 'test Routine', summary:"this is my routine"})
        testUuid = response.body
    })

    test('successfully update routine', async() =>{
        const response = await request(app).put('/routines/UpdateScheduleRoutine').send({...testUpdateRoutine1,uuid: testUuid})
        expect(response.statusCode).toBe(200)
    })
    test('attempt to update a routine that doesnt exist', async() =>{
        const response = await request(app).put('/routines/UpdateScheduleRoutine').send({...testUpdateRoutine1,uuid: "Peter Griffin"})
        expect(response.statusCode).toBe(404)
    })
    test('bad input (bad uuid value)', async() =>{
        const response = await request(app).put('/routines/UpdateScheduleRoutine').send({...testUpdateRoutine1,uuid: null})
        expect(response.statusCode).toBe(400)
    })
    test('bad input (string value for second rep range index on third monday exercise)', async() =>{
        const response = await request(app).put('/routines/UpdateScheduleRoutine').send({...testUpdateRoutine4, uuid: testUuid})
        expect(response.statusCode).toBe(400)
    })
    test('no request body', async() =>{
        const response = await request(app).put('/routines/UpdateScheduleRoutine')
        expect(response.statusCode).toBe(400)
    })
    test('missing fields (no schedule field)', async() =>{
        const response = await request(app).put('/routines/UpdateScheduleRoutine').send({uuid: testUuid})
        expect(response.statusCode).toBe(400)
    })
    test('missing fields (missing tuesday field)', async() => {
        const response = await request(app).put('/routines/UpdateScheduleRoutine').send({...testUpdateRoutine7, uuid: testUuid})
        expect(response.statusCode).toBe(400)
    })


})

describe('test updating general info for routines', () =>{
    let testUuid
    beforeAll(async() =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: "random uuid", name: 'test Routine', summary:"this is my routine"})
        testUuid = response.body
    })
    
    test('update successfully', async() =>{
        const response = await request(app).put('/routines/UpdateGeneralInfoRoutine')
        .send({name: "Bill split", owner: "Gus", summary: "gus bill split", uuid: testUuid, type: "Strength"  })
        expect(response.statusCode).toBe(200)
    })
    test('missing a field', async() =>{
        const response = await request(app).put('/routines/UpdateGeneralInfoRoutine')
        .send({name: "Bill split", owner: "Gus", uuid: testUuid, type: "Strength"  })
        expect(response.statusCode).toBe(400)
    })
    test('no request body', async() =>{
        const response = await request(app).put('/routines/UpdateGeneralInfoRoutine')
        expect(response.statusCode).toBe(400)
    })
    test('entry does not exist', async() =>{
        const response = await request(app).put('/routines/UpdateGeneralInfoRoutine')
        .send({name: "Bill split", owner: "Gus", summary: "gus bill split", uuid: "Peter Griffin", type: "Strength"  })
        expect(response.statusCode).toBe(404)
    })
    test("bad input (wrong type)", async() =>{
        const response = await request(app).put('/routines/UpdateGeneralInfoRoutine')
        .send({name: "Bill split", owner: false, summary: "gus bill split", uuid: testUuid, type: "Strength"  })
        expect(response.statusCode).toBe(400)
    })


})

describe('Test deleting Routine entries', () =>{
    let testUuid;
    beforeAll(async () =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: "test", name: 'test Routine', summary:"this is my routine"})
        testUuid = response.body;
    })

    test("Successful delete", async() =>{
        const response = await request(app).delete('/routines/deleteRoutine').send({uuid: testUuid})
        expect(response.status).toBe(200)
    })

    test("bad request (uuid does not exist)", async() =>{
        const response = await request(app).delete('/routines/deleteRoutine').send({uuid: "its me, the uuid"})
        expect(response.status).toBe(404)
    })
    test("bad request (no body)", async() =>{
        const response = await request(app).delete('/routines/deleteRoutine').send()
        expect(response.status).toBe(400)
    })
    test("bad request (uuid is wrong type)", async() =>{
        const response = await request(app).delete('/routines/deleteRoutine').send({uuid: 24})
        expect(response.status).toBe(400)
    })

})

describe('test Cloning other routines', () =>{
    let testUuid;
    beforeAll(async () =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: "test", name: 'test Routine', summary:"this is my routine"})
        testUuid = response.body;
    })

    test('successfully clone an entry', async() =>{
        const response = await request(app).post('/routines/cloneRoutine').send({newOwner: 'the new guy', routineUuid: testUuid})
        expect(response.status).toBe(200)
    })
    test('sucessfully clone an entry for public sharing', async() =>{
        const response = await request(app).post('/routines/cloneRoutine').send({newOwner: 'the new guy', routineUuid: testUuid, isPublic: true})
        expect(response.status).toBe(200)
    })
    test('Attempt to clone a non existing routine', async() =>{
        const response = await request(app).post('/routines/cloneRoutine').send({newOwner: 'the new guy', routineUuid: 'bogus', isPublic: true})
        expect(response.status).toBe(404)
    })
    test('no request body', async() =>{
        const response = await request(app).post('/routines/cloneRoutine')
        expect(response.status).toBe(400)
    })
    test('bad input', async() =>{
        const response = await request(app).post('/routines/cloneRoutine').send({newOwner: undefined, routineUuid: testUuid, isPublic: true})
        expect(response.status).toBe(400)
    })

})

describe('test getting routines by ID list', () =>{
    let testUuidList = [];
    beforeAll(async() =>{
        for(let i = 0; i < 20; i++){
            const response = await request(app).post('/routines/createRoutine').send({userId: "test", name: 'test Routine', summary:"this is my routine"})
            testUuidList.push(response.body)
        }
    })

    test('get entries given testUuid list', async() =>{
        const response = await request(app).post('/routines/GetRoutines').send({routineUuids: testUuidList})
        expect(response._body.length).toBe(20)
    })

    test('given an empty list of UUIDs', async() =>{
        const response = await request(app).post('/routines/GetRoutines').send({routineUuids: []})
        expect(response.status).toBe(404)
    })
    test('bad inpuit (not a list)', async() =>{
        const response = await request(app).post('/routines/GetRoutines').send({routineUuids: "Florida the State"})
        expect(response.status).toBe(400)
    })
    test('no request body', async() =>{
        const response = await request(app).post('/routines/GetRoutines')
        expect(response.status).toBe(400)
    })
    test('nonexistent uuids', async() =>{
        const response = await request(app).post('/routines/GetRoutines').send({routineUuids: ['a', 'b', 'c']})
        expect(response.status).toBe(404)
    })
})

describe('getting public routines with filters', () =>{
    let testUuidList = [];
    beforeAll(async() =>{
        for(let i = 0; i < 20; i++){
            const response = await request(app).post('/routines/createRoutine').send({userId: "test", name: 'test Routine', summary:"this is my routine"})
            let resId = response.body
            if(i%2 == 0){
                const response2 = await request(app).post('/routines/cloneRoutine').send({newOwner: 'the new guy', routineUuid: resId, isPublic: true})
                testUuidList.push(response2.body)
            }
        }
    })

    test("successfully retrieve public routines", async() =>{
        const response = await request(app).post('/routines/getPublicRoutines').send({})
        expect(response._body.length).toBe(11)
    })

    test("No entries match query", async() =>{
        const response = await request(app).post('/routines/getPublicRoutines').send({type:["what a master piece"]})
        console.log(response._body)
        expect(response.status).toBe(404)
    })
    test("bad inputs", async() =>{
        const response = await request(app).post('/routines/getPublicRoutines').send({type: 40})
        expect(response.status).toBe(400)
    })
    test("bad inputs (advanced)", async() =>{
        const response = await request(app).post('/routines/getPublicRoutines').send({exerciseList: ['a','b','c','d', true]})
        expect(response.status).toBe(400)
    })
})

describe('adding and subtracting to likes and clones', ()=>{
    let testUuid;
    beforeAll(async () =>{
        const response = await request(app).post('/routines/createRoutine').send({userId: "test", name: 'test Routine', summary:"this is my routine"})
        testUuid = response.body;
    })

    test("adding a like", async()=>{
        const response = await request(app).post("/routines/increment").send({uuid: testUuid, incrementField: "likes", operation: 1})
        expect(response._body.likes).toBe(1);
    })
    test("removing a like", async()=>{
        const response = await request(app).post("/routines/increment").send({uuid: testUuid, incrementField: "likes", operation: -1})
        expect(response._body.likes).toBe(0);
    })
    test("adding to clone",async()=>{
        const response = await request(app).post("/routines/increment").send({uuid: testUuid, incrementField: "clones", operation: 1})
        expect(response._body.clones).toBe(1);
    })
    test("bad input",async()=>{
        const response = await request(app).post("/routines/increment").send({uuid: testUuid, incrementField: 500, operation: 1})
        expect(response.status).toBe(400);
    })
    test("no body", async()=>{
        const response = await request(app).post("/routines/increment")
        expect(response.status).toBe(400);
    })
    test("field does not exist", async() =>{
        const response = await request(app).post("/routines/increment").send({uuid: testUuid, incrementField: "dislikes", operation: 1})
        expect(response.status).toBe(400);
    })
    test("inc/dec value is not a valid number", async()=>{
        const response = await request(app).post("/routines/increment").send({uuid: testUuid, incrementField: "likes", operation: 24})
        expect(response.status).toBe(400);
    })
    test("cannot find entry (invalid uuid)", async() =>{
        const response = await request(app).post("/routines/increment").send({uuid: "peter Griffin", incrementField: "likes", operation: 1})
        expect(response.status).toBe(404);
    })
})




// this makes me want to transition to a test DB instead (which is probably the best choice!) For now dow what you can
// describe('get public routines list', () =>{
//     test('get public routines')
//     test('get public routines when there are none (?)')
//     test('get public routines when there is more than the limit')
//     test('bad input')
// })

afterAll(async() =>{
    const db = client.db('GetFit')
    const collection = db.collection(process.env.COLLECTION_URI)
    await collection.deleteMany({})
})