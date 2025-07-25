const express = require ('express');
const authRouter=require("./routes/authroutes");
const userRouter = require("./routes/userroutes");
const hostRouter = require("./routes/hostroutes");
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const session=require("express-session");
const cors = require('cors');
const app = express();
const MongoDBStore=require("connect-mongodb-session")(session);

// Enable CORS with credentials
app.use(cors({
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true
}));
// Parse JSON bodies
app.use(bodyParser.json());
const MONGO_DB_URL="mongodb+srv://grishjindal22:TigerHill@cluster0.t52zxt9.mongodb.net/chatapp?retryWrites=true&w=majority";
app.use(express.urlencoded( { extended: true }));
const store = new MongoDBStore({
    uri: MONGO_DB_URL,
    collection: "sessions"
})
app.use(session({
    secret:"By Grish",
    resave: false,
    saveUninitialized: false, // changed to false to avoid storing empty sessions
    store: store,
    name: 'sessionId', // custom name for the session ID
    proxy: true // if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
}))
app.use(express.json());
app.use('/auth',authRouter);
app.use('/user', userRouter);
app.use('/host', hostRouter);
const PORT = 5001;
mongoose.connect(MONGO_DB_URL).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});