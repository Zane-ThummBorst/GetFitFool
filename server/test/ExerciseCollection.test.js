const request = require('supertest')
const app = require("../app")
const { describe, test, it } = require('@jest/globals')

/*
    try catch breaks tests i think so SWEET
*/

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
  });

describe('Get Exercise Tests', ()=>{
    test('Retrieves entry successfully',async ()=>{
            const response = await request(app).post('/exercises/getExercise').send({name: "Alternating Renegade Row"})
            expect(response.statusCode).toBe(200)            
        })
    test('Given a number', async() =>{
            const response = await request(app).post('/exercises/getExercise').send({name: 24})
            expect(response.statusCode).toBe(400)  
    })
    test('Given an entry that doesnt exist', async()=>{
            const response = await request(app).post('/exercises/getExercise').send({name: "Most Effecitve Exercise known to man"})
            expect(response.statusCode).toBe(404) 
    })

    test('Request has no body', async()=>{
            const response = await request(app).post('/exercises/getExercise')
            expect(response.statusCode).toBe(400)
    })

    test('Given a null value', async()=>{
            const response = await request(app).post('/exercises/getExercise').send({name: null})
            expect(response.statusCode).toBe(400)
    })
})

describe('Get list of exercises with filters', () =>{
    test('basic Query', async()=>{
        const response = await request(app).post('/exercises/getManyExercises')
        expect(response._body.size).toBe(873)
    })
    test('query with some filters', async()=>{
        const response = await request(app).post('/exercises/getManyExercises').send({input:'dumb'})
        expect(response._body.size).toBe(91)
    })
    test('advanced query', async()=>{
        const response = await request(app).post('/exercises/getManyExercises').send({input:'dumb', level: ['beginner'], category: 'strength'})
        expect(response._body.size).toBe(64)
    })
    test('empty result', async()=>{
        const response = await request(app).post('/exercises/getManyExercises').send({input:'dumb', level: ['beginner'], category: 'strength', equipment: ['barbell']})
        expect(response._body.size).toBe(0)
    })
    test('bad inputs for primitives',async()=>{
        const response = await request(app).post('/exercises/getManyExercises').send({input:24, level: ['beginner'], category: false, equipment: ['barbell']})
        expect(response.statusCode).toBe(400)
    })
    test('bad inputs for arrays', async()=>{
        const response = await request(app).post('/exercises/getManyExercises').send({input:'dumb', level: null, category: 'strength', equipment: ['barbell']})
        expect(response.statusCode).toBe(400)
    })

    test('wrong array primitive type', async()=>{
        const response = await request(app).post('/exercises/getManyExercises').send({input:'dumb', level: [24], category: 'strength', equipment: ['barbell']})
        expect(response.statusCode).toBe(400)
    })
})