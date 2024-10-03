# GetFit
 App for exploring Exercise and exercise variations, along with creating and exploring existing routines.

 # State of the APP:
 So far, Most of the backend is functional, while the frontend is in infancy with only a few of the main forms and pages available. Only styling for the layout and ease of testing has been applied.

 # Want to run this app? Heres what you need:
 VSCode ( or any code editor of choice )
 Node.JS
 MongoDB / MongoDB Compass

 # Setup
 First thing we will do is configure our Mongo DB using Compass.
 Once you have Mongo and Mongo Compass, all you want to do is add a new connection, create a Mongo connection string (remember this string for later). Then create a simple database with collections. Your database should be called "GetFit" and you should have at a minimum three collections: "Exercises", "Routines", and "Users". Refer to the image below to see how it looks when completed

 ![image](https://github.com/user-attachments/assets/b942ba4c-eef9-47c0-9d61-7c2929c1a6aa)

 Once Mongo is configured, we can then download the project and open it in our code editor of choice (in hindsight this should be the first step, but the order doesn't matter so 🤷‍♂️). Our project contains 3 main folders: client, server, and scripts. client and server are self explanatory (frontend code, backend code) but you might ask what script is. This project takes advantage of exercises.json, another open source project that acts as a repository for exercise data. In the interest of keeping things simple, scripts is some short code to take exercise.json and transfer it into our MongoDB.

 to set up scripts, first add in a .env file. The content should be as follows:

 ```
 MONGO_URI= *YOUR MONGO CONNECTION STRING*
 ```

Also, remember to initialize before running any files in terminal:

 ```
 cd ./scripts
 npm i
 ```

 Once you've intialized scripts and added your .env file, running the following line in the scripts directory will populate your database with exercise data:

 ```
 node index.js
 ```

