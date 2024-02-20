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

/*
	Question 4, creating many instances of the model (creating 'many people')  

	This solution at first glance: 
		-> The process used throughout this section of the course has been: 
			-> Define a schema <- this created people (e.g including the name and age of the person, we set the attributes which we wanted to store)
			-> Define a model using the schema
			-> Create an object from this model <- i.e creating a single person using the model  
			-> Save the object from this model 
		-> This part of the question creates many objects from the model, rather than one 
			-> This is achieved using the Mode.create() method 
			-> This looks like the way you would define a variable (const = ...)
			-> The argument to this is an array 
			-> For each element in this array, we are using the same block of code we used to create a single instance of the model 
			-> So for each element in the array which is input into the model, we are creating a single person (instance of the model) in the database 
			-> This saves all of those people to the database 
				-> This is done using the same error function which is passed into this code as an argument 
				-> We are logging these errors to make sure that the people are successfully saved to the database
				-> And if no errors are returned when doing this, then we save this to the database -> we don't save them to the database of people if there are errors returned when doing this 
				-> This ensures that the entire database is cleanly formatted 
			-> We are using the same code which the previous question used to create an instance of a person -> except we are passing an entire array of people into that function 

	More technically:
		-> We are inserting documents into the MongoDB database 
		-> Each of these people is a document 
		-> The argument into the function is an array for these multiple people 
			-> Each of these people is represented as an object 
		-> The main function we are running is called the callback function 
			-> There is a function (the second argument) which is run once the block of code is executed 
			-> It is logging errors to the console in case there is a mistake while the code is being saved 
		-> When this is done, the callback function done() is used
			-> This is a callback 
			-> This handles the result of the asynchronous operation <- the multiple people we are inserting into the database 
			-> We are notifying the caller when the operation is done and handing asynchronous operations in Node.js 
		-> We are inserting an array of people into the MongoDB database using Mongoose's Person.create method 
			-> Once this is done, the done callback is used to handle the result of the operation 
			-> If there are errors involved when saving this, they will be logged into the console in this stage 
*/

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
