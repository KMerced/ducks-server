const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

const storage = multer.diskStorage({
    //Will add the image to the images folder directly, mostly for in the future when (hopefully) it will add ducks to the array or to a JSON or something
    destination: (req, file, cb) => {
      cb(null, "public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },

  });
  

  const upload = multer({ storage: storage });

  mongoose
    .connect("mongodb+srv://KMerced:IqUhRBwES6z9sA@duckdb.ysozaqy.mongodb.net/Ducks")
    .then(() => {
      console.log("Connected to the MongoDB database!");
    })
    .catch((error) => {
      console.log("Something went wrong with connecting to the MongoDB database, here's what happened: ", error);
    });

    const duckSchema = new mongoose.Schema({
        name:String,
        type:String,
        brand:String,
        line:String,
        date:String,
        story:String,
        img:String
    });

    const Duck = mongoose.model("Duck",duckSchema,"Ducks");

    app.get("/api/ducks/", async(req, res)=>{
        //The sort parameter will sort the ducks alphabetically. 
        //I'm doing it here because by default, MongoDB won't do it alphabetically, so when a duck is added, it'll appear as the last one in the list regardless of name.
        //Having it not alphabetical irritates me to no end, so I'm doing it on the server-side for simplicity.
 
        //Start with no filter by default so it will show all the ducks if there's no filter on the frontend.
        const duckFilter = {};

        //If the frontend gives a filter, then only send ducks that match that filter.
        //For now, it's just type and brand, but will add more filters as-needed. No need to add them all if I don't need to right now.
        if(req.query.type) {
            duckFilter.type = req.query.type;
        }
        if(req.query.brand) {
            duckFilter.brand = req.query.brand;
        }
        const ducks = await Duck.find(duckFilter).sort({name:1});
        res.send(ducks);
        console.log("A get request was performed.");
});

app.get("/api/ducks/:id", async(req, res)=>{
    console.log("Another get request was performed.");
    try {
        const duck = await Duck.findById(req.params.id);

        if (!duck) {
            return res.status(404).send("Duck not found");
        }

        res.send(duck);
    } catch (error) {
        res.status(400).send("Invalid duck ID");
    }
});

  app.post("/api/ducks/", upload.single("img"), async(req,res)=>{
    console.log("Something has come in!");
    const result = validateDuck(req.body);
    
    //Output for debugging to see exactly what's being sent. Was getting errors on the client.
    console.log("Here's what came in: ")
    console.log(req.body);

    if(result.error){
        console.log("Something has gone wrong with the thing coming in!");
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const duck = new Duck({
        name:req.body.name,
        type:req.body.type,
        brand:req.body.brand,
        line:req.body.line,
        date:req.body.date,
        story:req.body.story,
        img: req.file ? `images/${req.file.filename}` : ""
    });

    const newDuck = await duck.save();
    res.status(200).send(newDuck);
});

//Stuff for adding  and editing ducks
app.put("/api/ducks/:id",upload.single("img"),async(req,res) => {

    const isValidUpdate = validateDuck(req.body, true);

        if(isValidUpdate.error){
        console.log("I can't find any information about this duck!");
        res.status(400).send(isValidUpdate.error.details[0].message);
        return;
    };

    //Makes it so that there's nothing to be updated at first.
    const updateParams = {};
    //Then if there's something in the fields, then pass it along, otherwise, keep whatever was already in MongoDB.
    if(req.body.name) {
        updateParams.name = req.body.name;
    }
    if(req.body.type) {
        updateParams.type = req.body.type;
    }
    if(req.body.brand) {
        updateParams.brand = req.body.brand;
    }
    if(req.body.line) {
        updateParams.line = req.body.line;
    }
    if(req.body.date) {
        updateParams.date = req.body.date;
    }
    if(req.body.story) {
        updateParams.story = req.body.story;
    }
    if(req.file) {
        updateParams.img = `images/${req.file.filename}`;
    }

    const success = await Duck.updateOne({_id:req.params.id},updateParams);

    if(!success){
        res.status(404).send("There's no duck to edit here...");
        return;
    }

    const duck = await Duck.findById(req.params.id);
    res.status(200).send(duck);
});

//Stuff for deleting ducks
app.delete("/api/ducks/:id", async(req,res)=>{
    const duck = await Duck.findByIdAndDelete(req.params.id);
    
    if(!duck) {
        res.status(404).send("I can't find the duck you want to delete, it seems...");
        return;
    }

    res.status(200).send(duck);
});

//Updated Joi so that if a duck is being edited, it makes everything optional, but if it's just adding a duck, everything remains required.
const validateDuck = (duck, isUpdate=false) => {
    const schema = Joi.object({
        name: isUpdate ? Joi.string().min(0):Joi.string().required().min(1),
        type: isUpdate ? Joi.string().min(0):Joi.string().required().min(1),
        brand: isUpdate ? Joi.string().min(0):Joi.string().required().min(1),
        line: isUpdate ? Joi.string().min(0):Joi.string().required().min(1),
        date: isUpdate ? Joi.string().min(0).max(10):Joi.string().required().min(10).max(10),
        story: isUpdate ? Joi.string().min(0):Joi.string().required().min(1)

    });

    return schema.validate(duck);
};

app.listen(3002, ()=> {
    console.log("If you see this, the server should be running.");
});