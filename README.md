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

 Now lets move on to setting up the server. first navigate to the server directory.

 ```
 cd ../server
 ```

 Then, like scripts, we are going to need to set up a .env file for server to use. This one will contain a little bit more information:

 ```
 COLLECTION_URI=Routines
 SECRET_KEY= *YOUR SECRET KEY*
 MONGO_URI= *YOUR CONNECTION STRING*
 ORIGIN= *YOUR FRONTEND ORIGIN URL (NECESSARY FOR CORS)*
 PORT= *YOUR PORT NUMBER YOU WISH TO RUN THE SERVER ON*
 ```

 Most of the information above you'll need to choose on yourself, but in summary: your secret key is used for signing JWT's and can be anything you want it to be, origin will be whatever your root url is for the frontend ex. https://localhost::3000, and Port is which ever port number you wish the application to run on ex. 4000, 1234 etc.

 Again, make sure to initialize using npm i. Once this is done you can run the following line to have your backend server running:
 ```
 npm run watch
 ```

 Last but not least, the client. The client will follow the same steps of create a .env, initalize, and using the start command. The .env file is as follows:

 ```
 REACT_APP_API_URL= *YOUR URL THAT THE SERVER IS RUNNING ON*
 ```

 If your server is running on port 4000, then you would set the above to "http://localhost:4000"

 Once the .env is set up, you can initialize the project with npm i and use the following command to run the client:

 ```
 npm start
 ```

If everything is set up properly, You should be all set! Be warned, most of the application is left unfinished and is a WIP. As of writing this readme you have the option of searching for exercises and creating/editing your own routines with some details. The main page looks like this:

![image](https://github.com/user-attachments/assets/c45d2378-d413-4e8a-962e-d94019a472b6)


Again, a lot of Quality of life has been neglected since the core features are still being developed, so expect issues, errors, and hiccups!

Right now the main flow for creating a saving a routine is as follows:

Create an account using the register form

navigate to the create routine and add in some basic details

go to your personal routines and select the routine you just created

Start adding in some exercises and save your routine!






