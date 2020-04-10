const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true});

// insert data

// 1. Create new schema. (structure of the data we gonna save)
const fruitSchema =  new mongoose.Schema(
    {
         name: {
             type: String,
             required: [true, "Please check your data entry, no name specified"]
         },

         rating: {
             type: Number,
             min: 1,
             max: 10,
             required: true
         },

         review: {
             type: String,
             required: true
         }
    }
);

// 2. We use schema to create mongoose model
// 1st param is model name, collection name will
// be model name in plural form "fruits"
// so, it's basically creating blueprint for collection element
// to achive collection name mongoose uses lodash (we used it before, kebab)
const Fruit = mongoose.model("Fruit", fruitSchema);

// 3. Create collection element which must stick to the model schema
const fruit = new Fruit({
    name: "Peach",
    rating: 10,
    review: "Peaches are so yummy!"
});

// 4. Save fruit document into fruits collection inside fruitsDB
//fruit.save();


// CHALLENGE, creating peoples collection

// creating schema
const personSchema = new mongoose.Schema (
    {
        name: String,
        age: Number,
        favoriteFruit: fruitSchema
    }
);

// creating model Person and collection people(INTERESTING)
const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Great fruit."
});

//pineapple.save();

// create collection element
const person = new Person(
    {
        name: "Amy",
        age: 12,
        favoriteFruit: pineapple
    }
);

// save person to the people collection of the fruitDB
// person. save();

const lemon = new Fruit(
    {
        name: "Lemon",
        rating: 10,
        review: "Sour, but gold!"
    }
);

lemon.save();

Person.updateOne(
    {
        name: "John"
    },
    {
        favoriteFruit: lemon
    },
    (err) => {
        if(err) console.log(err);
        else {
            console.log("Succesfully updated the document");
        }
    }
);


// Creating more fruits
const kiwi = new Fruit(
    {
        name: "Kiwi",
        rating: 10,
        review: "The best fruit!"
    }
);

const orange = new Fruit(
    {
        name: "Orange",
        rating: 4,
        review: "Too sour for me"
    }
);

const banana = new Fruit(
    {
        name: "Banana",
        rating: 3,
        review: "Weird texture"
    }
);

// save all fruits
// for more methods on model https://mongoosejs.com/docs/api.html#Model
/* Fruit.insertMany([
        kiwi,
        orange,
        banana
    ], 

    (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Succesfully saved all the fruits to fruitsDB");
        }
}); */

// Reading from database using mongoose 

// Reading with no filters, returns javascript array
Fruit.find((err,fruits) => {
    if(err) console.log(err)
    else {
        console.log(fruits);
        fruits.forEach((fruit) => {
            console.log(fruit.name);
        });
    }
});


// Data Validation with Mongoose
// https://mongoosejs.com/docs/validation.html


// Update 
Fruit.updateOne(
    {
        _id: "5e907dd377a7221540aff7db"
    },
    {
        rating: "6",
        review: "You know what. I LOVE THIS FRUIT!"
    },
    (err) => {
        if(err) console.log(err);
        else {
            console.log("Succesfully updated the document");
        }
    }
);

// Delete
Fruit.deleteOne(
    {
        name: "Peach"
    },
    (err) => {
        if(err) console.log(err);
        else {
            console.log("Succesfully deleted the document.");
            mongoose.connection.close();
        }
    }
);

/*Person.deleteMany(
    {
        name: "John"
    },
    (err) => {
        if(err) console.log(err);
        else {
            console.log("Succesfully deleted the document");
        }
    }
);*/

// Establishing Relationships and Embedding Documents 
// check person schema, where we added a new field, which
// contain and object of fruitSchema
