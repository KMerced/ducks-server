const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const Joi = require("joi");
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

let ducks = [
    {
    "_id":1,
    "name": "Batman Duck",
    "type": "novelty",
    "brand": "None",
    "line": "None",
    "date": "10/??/????",
    "story": "I don't remember the exact date I got this duck, but I know it was during the yearly Halloween event that was held at the big gym at Fort Jackson. I believe I won this by winning a game that wasn't the Bobbing For Apples one. I believe they sometimes gave out ducks as a prize if you won a game.",
    "img": "images/batman.jpg"

},

{
    "_id":2,
    "name": "Beige Easter Duck",
    "type": "brand name",
    "brand": "Infantino",
    "line": "???",
    "date": "??/??/????",
    "story": "I have no idea when or where I got this duck to be honest. I do remember playing with this duck as a kid together with my other rubber toys, especially the rubber killer whale. Out of the two I do have, this one I favor more.",
    "img": "images/beige_easter.jpg"
},

{
    "_id":3,
    "name": "Blue Duck",
    "type": "novelty",
    "brand": "None",
    "line": "None",
    "date": "??/??/????",
    "story": "I don't have an idea when I got this duck either, but I at least have a guess for this duck. I think these used to be sold at Walmart in packs of 3 and my mom bought one for me when I was a toddler. My mom told me that every time I saw rubber ducks while she was shopping, I'd say they were mine and she would have to tell me they actually weren't.",
    "img": "images/blue.jpg"
},

{
    "_id":4,
    "name": "Butterfly Duck",
    "type": "brand name",
    "brand": "Bullseyes Playground",
    "line": "Spring 2025",
    "date": "07/31/2025",
    "story": "N/A",
    "img": "images/butterfly.jpg"
},

{
    "_id":5,
    "name": "Construction Worker Duck",
    "type": "novelty",
    "brand": "None",
    "line": "None",
    "date": "??/??/????",
    "story": "I have no idea when I got this duck. It's been in my possession since I was a child, but I have no leads as to how I got it. It's kind of an anomaly among my collection because of this, a mystery that might never be solved, a puzzle where you will never find the final piece.",
    "img": "images/construction_worker.jpg"
},

{
    "_id":6,
    "name": "Fairy Duck",
    "type": "brand name",
    "brand": "Bullseyes Playground",
    "line": "Spring 2025",
    "date": "07/31/2025",
    "story": "N/A",
    "img": "images/fairy.jpg"
},

{
    "_id":7,
    "name": "Firefly Duck",
    "type": "brand name",
    "brand": "Bullseyes Playground",
    "line": "Spring 2025",
    "date": "07/31/2025",
    "story": "N/A",
    "img": "images/firefly.jpg"
},

{
    "_id":8,
    "name": "Football Duck",
    "type": "brand name",
    "brand": "Bullseye's Playground",
    "line": "Fall 2025",
    "date": "08/26/2025",
    "story": "I'm not entirely sure why there was a football duck in this year's lineup. I checked online for previous years and this is the only year where there was a football duck. My guess is that it has something to do with college football season starting in the fall. Regardless, I still like the duck!",
    "img": "images/football.jpg"
},

{
    "_id":9,
    "name": "Frankies Fun Park Green Glitter Duck",
    "type": "jumbo",
    "brand": "Frankie's Fun Park",
    "line": "None",
    "date": "01/11/2024",
    "story": "This was a duck I won by getting enough tickets from Frankie's Fun Park on my 18th birthday. I remember blowing about $35 on playing the skee-ball game over and over just so I could get enough tickets to redeem the duck. Looking back, I definitely overspent, but I don't mind since I had fun the whole time!",
    "img": "images/frankie_green_glitter.jpg"
},

{
    "_id":10,
    "name": "Mini Dovakiin Duck",
    "type": "brand name",
    "brand": "Tubbz Cosplaying Ducks",
    "line": "Skyrim Series: Mini",
    "date": "06/09/2025",
    "story": "I ordered this duck together with the Yuji Itadori duck for my younger sister's birthday (my younger sister is really into Jujutsu Kaisen). Skyrim is my favorite videogame of all time, so when I heard this duck existed in their lineup, I knew I had to pick it up. Seeing this duck really brings back memories of playing Skyrim when I was in middle school. It reminds me of simpler times when you came home from school, rushed to finish your math homework, then turned on the Xbox 360 to start playing. The memories of walking around the roads of Whiterun hold and listening to 'From Past to Present' play in the background is an experience you don't get anywhere else. I still play the game today, ableit heavily modded to make up for the game's flaws. I plan to buy the bigger boxed edition of this duck in the future as well!",
    "img": "images/mini_dovakiin.jpg"
},

{
    "_id":11,
    "name": "Munchkins Bath Duck",
    "type": "misc",
    "brand": "Munchkins",
    "line": "None",
    "date": "??/??/????",
    "story": "I'll be honest here, I have no clue when I got this duck. I do remember though, that my mom would put this duck in the bathtub when I was in there for my younger self to play with. If the water became too hot, the 'HOT' base at the bottom would show it's color a bit. Funnily though, I remember this happening a lot with the duck so either the duck was giving false alarms, or the water was genuinely hot",
    "img": "images/munchkin_bath.jpg"
},

{
    "_id":12,
    "name": "Outlaw Duck",
    "type": "novelty",
    "brand": "None",
    "line": "None",
    "date": "10/??/????",
    "story": "I honestly have no idea when or where I got this duck. If I had to guess though, it was during the yearly Halloween event that was held at the big gym in Fort Jackson. I probably won it by winning one of the many games they had for kids to play.",
    "img": "images/outlaw.jpg"
},

{
    "_id":13,
    "name": "Pink Glitter Witch Duck",
    "type": "brand name",
    "brand": "Bullseye's Playground",
    "line": "Fall 2025",
    "date": "08/26/2025",
    "story": "N/A",
    "img": "images/pink_glitter_witch.jpg"
},

{
    "_id":14,
    "name": "Pumpkin Duck",
    "type": "brand name",
    "brand": "Bullseye's Playground",
    "line": "Fall 2025",
    "date": "08/26/2025",
    "story": "This was the first of the Halloween ducks I got for 2025. I rushed to buy the whole set of ducks the moment I saw they were available on the Target website (as they tend to sell out within days at my local Target). I went as soon as I was done with all my classes and there were barely any left, likely bought up by scalpers. I was lucky that there were still enough to get the full set of 5. Had I come the next day, I'm confident the store would've sold out.",
    "img": "images/pumpkin.jpg"
},

{
    "_id":15,
    "name": "Purple With Green Bill Duck",
    "type": "brand name",
    "brand": "Infantino",
    "line": "None",
    "date": "??/??/????",
    "story": "I'll be honest here, I have no idea what this duck is even supposed to be. I've had this duck in my possession since I was a child, but I don't remember playing with it much.",
    "img": "images/purple_with_green_bill.jpg"
},

{
    "_id":16,
    "name": "Scout Duck",
    "type": "brand name",
    "brand": "Bullseye's Playground",
    "line": "Spring 2025",
    "date": "07/31/2025",
    "story": "This was one of many of the Bullseye's Playground ducks I would get my hands on. I first found out about these ducks from the r/rubberducks community on Reddit and the molds looked cool, so I decided I'd start collecting this brand. Since then, I've been collecting more of these ducks as Target releases them.",
    "img": "images/scout.jpg"
},

{
    "_id":17,
    "name": "Skeleton Duck",
    "type": "brand name",
    "brand": "Bullseye's Playground",
    "line": "Fall 2025",
    "date": "08/26/2025",
    "story": "N/A",
    "img": "images/skeleton.jpg"
},

{
    "_id":18,
    "name": "Witch Duck",
    "type": "novelty",
    "brand": "None",
    "line": "None",
    "date": "10/??/????",
    "story": "I don't remember the exact date I got this duck, but I know it was during the yearly Halloween event that was held at the big gym at Fort Jackson. If you won their version of Bobbing For Apples (which has rubber ducks in the water instead of apples), you got to keep the duck you 'bobbed' for!",
    "img": "images/witch.jpg"
},

{
    "_id":19,
    "name": "Zombie Duck",
    "type": "brand name",
    "brand": "Bullseye's Playground",
    "line": "Fall 2025",
    "date": "08/26/2025",
    "story":"N/A",
    "img": "images/zombie.jpg"
}
]

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

  app.post("/api/ducks/", upload.single("img"), (req,res)=>{
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

    //Give the incoming duck a new ID so that it actually adds to the array instead of doing some weird stuff.
    const newId = ducks.length > 0 ? ducks[ducks.length - 1]._id + 1 : "";

    const duck = {
        _id: newId,
        name:req.body.name,
        type:req.body.type,
        brand:req.body.brand,
        line:req.body.line,
        date:req.body.date,
        story:req.body.story,
        img: req.file ? `images/${req.file.filename}` : ""
    };

    ducks.push(duck);
    res.status(200).send(duck);
});


const validateDuck = (duck) => {
    const schema = Joi.object({
        name:Joi.string().required().min(1),
        type:Joi.string().required().min(1),
        brand:Joi.string().required().min(1),
        line:Joi.string().required().min(1),
        date:Joi.string().required().min(10).max(10),
        story:Joi.string().required().min(1)

    });

    return schema.validate(duck);
};

app.get("/api/ducks/", (req, res)=>{
    console.log("A get request was performed.")
    res.send(ducks);
});

app.get("/api/ducks/:id", (req, res)=>{
    console.log("Another get request was performed.");
    const duck = ducks.find((duck=>duck._id === parseInt(req.params.id)));
    res.send(duck);
});





app.listen(3002, ()=> {
    console.log("If you see this, the server should be running.");
});