const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.mongoose
.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>{
  console.log("Successfully connected to MongoDB");
  initial()
}).catch(err =>{
  console.log("Error connecting to MongoDB: " + err.message);
  process.exit();
})
const initial = ()=> {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
// var corsOptions = {
  //     origin: "http://localhost:8081"
  //   };
  
  
  app.get('/',(req,res)=>{
    res.json({msg:"welcome to mfdev application!"});
    
  })
  require('./app/routes/auth.routes')(app);
  require('./app/routes/user.routes')(app);
  
  const port = process.env.PORT || 3000;
  app.listen(port,()=>{
    console.log("listening on port " + port);
});