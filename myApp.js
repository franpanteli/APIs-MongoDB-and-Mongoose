require('dotenv').config();

// Question 1, Install and Set Up Mongoose - require mongoose as mongoose
let mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Question 1, Install and Set Up Mongoose - this line of code uses the connect method to link the app to the MongoDB Atlas database which was set up for it
mongoose.connect('mongodb+srv://franpanteli:panteli%40panteli@franpanteli.aqokq0o.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Question 2, define the personSchema schema 
/*
	This solution at first glance: 
		-> We are writing a block of code which sets a schema 
 		-> The schema that we are setting is for people
		-> We can define instances of people using this schema 
		-> We define this new schema using new Schema {}
		-> Each of the elements in this schema contains the different attributes of a person (their name, age and favourite foods)
		-> We are also defining the syntax for this 
			-> The name of the person is contained in a JSON object 
				-> The type of this is a string 
				-> The person cannot be stored without a name -> but they can be stored without the other information here 
			-> The ages of the people are numbers 
			-> The favoriteFoods of the person is listed in a string 
		-> We are then setting up the model 
			-> This syntax is used to do this -> let Person = mongoose.model("Person", personSchema);
			-> We are setting the variable Person equal to the Mongoose model defined with the person schema
			-> The first argument which is used in this is the same as the name of the variable which it's been set equal to

	More technically:
		-> We are creating a Mongoose schema and creating a Mongoose model based on the schema 
		-> Schemas are like blueprints for models -> we define the schemas
		-> And then we can create instances of those schemas which are models 
		-> The schema for a person <- everything you would know about them 
		-> A model <- an instance of the schema 
		-> We first create the schema and then create the Mongoose model based on that schema

		-> Creating the schema: 
			-> Our schema is called `personSchema`
			-> This defines the structure of the document in the MongoDB collection (the properties the person should have)
			-> We are defining each of the properties that a document of the person will have 

		-> Creating the model: 
			-> We are creating a Mongoose model named `Person`
			-> The first argument is the name of the MongoDB collection that the model represents 
			-> We have linked the myApp.js file to the Mongo database which we created earlier 
			-> The second argument to this is the schema which defines the structure of documents in the collection 
		-> This code first defines a Mongoose schema for a `Person` document with specific properties -> and then creates a Mongoose model based on that schema 
		-> This allows us to interact with the MongoDB collection called "people" using the "Person" model  
*/

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

/*
	Question 3, creating and saving a document from the person schema 

	This solution at first glance: 
		-> We are creating a person from the model 
		-> We first created a schema, then a model, then documents (instances) that we could use within it 
		-> This is us creating a person using the model 
		-> We also need to save the person 
		-> The first block of code creates the person 
			-> This creates the person like you would create an instance of a class in Python (but we are using js)
		-> The second block of code saves the person 
			-> This takes an error message / argument as the data
			-> We are making sure that the person we are defining has the same syntax as in the model which this was originally defined for 
	
	More technically:
		-> All schema here were defined in Mongoose 
		-> We are first creating an instance of the Person model using the schema from earlier 
			-> To do this, we are giving the code information about the attributes of the person for the model 
		-> Then we save the person 
			-> We are saving them to the database which is linked to at the top of the myApp.js file and in the .env file for the project in this repository 
			-> Save is a method which we are calling on the instance of the model -> this saves the person to our database 
				-> The argument of the save function is an error parameter, combined with the data which we are operating on 
				-> The first argument is err -> and if there is an error, then the first line inside the second block of code is logging this to the console 
				-> If there is no error, then the argument of the third line in the second block of code is null and the data is returned 
				-> That first argument represents the error (we are logging that there is no error in the save in this case) 
			-> done() 
				-> This is called once the save function is complete -> this is used to notify the caller when the operation is done when performing asynchronous operations  
				-> This is also for Node.js 
	-> We have 
		-> Created a new instance of a person 
		-> This has specific attributes (like objects in a Python class)
		-> We are then saving this person to the MongoDB database using Mongoose 
		-> Then we are using the done callback to handle the result from this
*/

const createAndSavePerson = (done) => {
  const fran = new Person({
    name: "Fran",
    age: 23,
    favoriteFoods: ["dark chocolate", "seeds", "vanilla yogurt"]
  })
  fran.save(function(err, data) {
    if (err) return console.error(err);
    done(null , data);
  })
};
















const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null , data);
  }) 
};

const findPeopleByName = (personName, done) => {
  let queryObject = {"name": personName}
  Person.find(queryObject, function(err, data) {
    if(err) return console.error(err);
    done(null , data);
  })
};

const findOneByFood = (food, done) => {
  let queryObject = {favoriteFoods: food}
  Person.findOne(queryObject, function(err, data) {
    if (err) return console.error(err);
    done(null , data);
  })
  
};

const findPersonById = (personId, done) => {
  let queryObject = {_id: personId}
  Person.findOne(queryObject, function(err, data) {
    if (err) return console.error(err);
    done(null , data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, function(err, person) {
    if(err) return console.error(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson) {
      if (err) console.error(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  let queryObject = {"name": personName}
  Person.findOneAndUpdate(queryObject, {age: ageToSet}, 
  {new:true}, function(err, updatedPerson) {
    if (err) console.error(err);
    done(null, updatedPerson);
  }) 
  
};

const removeById = (personId, done) => {
  let queryObject = {_id: personId}
  Person.findByIdAndRemove(queryObject, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  let queryObject = {"name": nameToRemove}
  Person.remove(queryObject, function(err, response) {
    if (err) return console.error(err)
    done(null, response);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  let queryObject = {favoriteFoods: foodToSearch}
  Person.find(queryObject)
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data) {
    if (err) return console.error(err);
    done(err, data)
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
