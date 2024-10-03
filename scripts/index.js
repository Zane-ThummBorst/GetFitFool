const axios = require('axios');

const fs = require('fs');
const { readdirSync } = fs;
let exerciseList = [];

const {MongoClient} = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017/GDead", { monitorCommands: true })
client.connect()



// grabs alll directory names
const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const exactImages = source =>{ // exersie image folder
  const result = readdirSync(source, { withFileTypes: true }).length;
  return result == 2
}

const image_url = (exerciseName, imageNumber) =>{
  return `https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/${exerciseName}/images/${imageNumber-1}.jpg`
}
const getExercise = async(exerciseName) =>{
    const db = client.db('GetFit')
    const showsCollection = db.collection('Exercises')
    await axios.get(`https://raw.githubusercontent.com/wrkout/exercises.json/master/exercises/${exerciseName}/exercise.json`)
    .then(response =>{
      let result = response.data
      let imageList = []
      for(let i = 1; i <= 2; i++){
        imageList.push(image_url(exerciseName, i))
      }
      result = {...result, images: imageList}
        showsCollection.insertOne(result) 
    })

}



const main = async() =>{
  
  let list = getDirectories('./exercises.json/exercises')
  for(let i = 0; i < list.length; i++){
    // let two = exactImages(`./exercises.json/exercises/${list[i]}/images`)
    // if(!two){
    //   console.log(list[i])
    // }
    await getExercise(list[i])
  }


}



main()





