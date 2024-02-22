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

/*
	Question 5, searching the MongoDB database of people for specific people (documents)  

	This solution at first glance: 
		-> We are searching for people in the database by their name 
		-> We are asking the server to respond with the data which matches this request in array form 
		-> This entire search request looks like we are defining the value of a constant (variable in js syntax)
		-> The first line inside this block of code defines another variable 
			-> This takes the form of the object which we want to return 
			-> This is a js object with the person's name in string form 
			-> JSON is a Java object which returns the data when communicating between clients and servers for reasons such as these 
		-> We then look up the person in that database whose name we want to fill in the returned object we just defined 
			-> If the person isn't in the database, we return an error message
			-> This error message is logged to the console in this section of the code 
			-> If the person is in the database then their name is returned -> in which case we are logging that this is done to the database 

	More technically:
		-> We are defining a function called `findPeopleByName` that takes two arguments 
			-> the first is the name to search for and the second is a callback function 
		-> We create a query object <- this is what the first line inside that block is doing (the one which defines the other variable const)
			-> This is the general form of the object which we want the database search to return 
			-> This is returning the documents in the MongoDB collection where the "name" of the elements in that collection match the ones which are being searched for in the code which the entire response to this question is surrounded by 
			-> We then search the database using Person.find 
				-> This is a method that searches the database for documents which match the query 
				-> The first argument specifies the criteria for the search -> searching for documents with a specific `name`
				-> The second argument is a callback function that will be executed once the search operation is complete
				-> This function checks for errors which happened during the search -> if it is clean then `done` is call-back with `null` as there were no errors when doing this 
				-> `done` is the callback function -> this is passed as a parameter to `findPeopleByName`
					-> This is expected to handle the result of the asynchronous operation -> getting documents from the database based on name 
					-> This is commonly used in Node.js to handle asynchronous operations and tell the caller when the operation has been completed 
		-> The purpose of this is to find and retrieve documents in the MongoDB database using Mongoose's `Person.find` method 
		-> This searches for documents where `name` matches the `personName` field which was entered into it 
		-> Then we invoke the `done` callback to handle the results of the operation and to pass in the retrieved data 
*/

const findPeopleByName = (personName, done) => {
  let queryObject = {"name": personName}
  Person.find(queryObject, function(err, data) {
    if(err) return console.error(err);
    done(null , data);
  })
};

/*
	Question 6, finding a single person in the database with unique interests 

	This solution at first glance: 
		-> We are looking for one person in the database 
		-> The person we are looking for has a unique food element as their favourite 
		-> To do this, we are using the findOneByFood function
		-> We are defining a function called findOneByFood, which takes the arguments food and done 
		-> Similar to the previous database search, we then define a query object 
			-> This is the form of the object which we want to search for in the database 
			-> The argument of this is the same as the argument which we are passing into the code which wraps around the entire block of code 
		-> We then use the Person.findOne method 
			-> The arguments to this are the query object which we previously setup 
				-> We are asking the database to find an element, in this form
				-> The second function to the database search is the error function 
				-> This is a callback function which will log an error to the console if something goes wrong in our search 
				-> This will also return done, if the search works as we want it to 
		-> This is the same approach we used in the previous question, but we are finding a person by one of the food items which they liked, rather than their name 
			-> The next question is using this process again, but to find the person by their ID in the database <- a person in the database being a document  

	More technically:
		-> This is an example of defining a function in JavaScript 
		-> It finds a single document from the MongoDB database collection 
		-> Input parameters <- these are `food` and `done`
			-> `done` is the callback function to handle the result 
		-> qeuryObject <- this creates a query object using Mongoose syntax 
			-> This is the condition for the search -> documents in the collection where the `favouriteFoods` array contains `food`
		-> Database query 
			-> We are using Mongoose's findOne method to query the 'Person' collectiom -> to find one document 
			-> It is searching for the one document which matches the 'Person' collection in the MongoDB database 
		-> Error handling 
			-> When we are doing this, we are checking if there is an error during the database search 
			-> In which case this error will be logged to the console 
		-> Callback 
			-> This is done using done(null, data) 
			-> Null is the error argument <- no error 
			-> Data is the data from the result of the search 
			-> This is the callback function 
		-> This entire function is searching for a person based on one of their favourite foods 
			-> This is a property of the person document in the MongoDB database 
			-> We are doing this using Mongoose's `findOne` method -> and then passing the result of the search into the callback function called `done`
*/

const findOneByFood = (food, done) => {
  let queryObject = {favoriteFoods: food}
  Person.findOne(queryObject, function(err, data) {
    if (err) return console.error(err);
    done(null , data);
  })
};

/*
	Question 7, searching the MongoDB database for a specific person with an ID

	This solution at first glance: 
		Documents in the database have an ID, this is what we are searching the database by:
			-> Each of the documents in the MongoDB database has a search ID 
			-> Each of the elements has an ID -> and we are using the ID to search for the element in the database (for the person who matches that ID)
			-> The previous question was searching for a unique favourite which a person in the database had
			-> This is searching for a unique person by their ID in the database
			-> In both cases we are searching for something which is specific to them -> in one case it is an item they like (the previous question) and in this one it is their ID in the database 
			-> In the question before this, it was their name we were searching for 
		
		We are using the same method for this as in the previous question:
			-> To search the database
			-> We first define the query object -> this is the syntax of the thing which we are looking for in the database
			-> In this case that is a person ID, and in the previous two it was first their name and then a unique item which they liked 
			-> This is what we are searching the database for, and it's defined as a variable / constant 
			-> Then we are using the .findOne method to search the database for that queries object 
			-> Inside this, we are returning the error message if the search doesn't work -> and using the done() callback if it does 
			-> This is the same process used in the previous three parts of the question, except that we are just querying the database for different items -> the name of the person, a unique item which they like or in this case their unique ID in the database  

	More technically:
		-> We are defining a function called `findPersonById` <- this is how this is done using JavaScript syntax 
		-> We are retrieving a person from the MongoDB database, based on the ID of the document which represents them 
		-> The index of this person is the argument to the function which we are defining 
		-> The other argument which the function takes is done <- the callback function to handle the result
		-> Then we define the query object 
			-> This was created using the Mongoose syntax
			-> This tells us the condition for the search -> we are looking for documents in the 'Person' collection where the `_id` matches the `personID`
		-> Then the database query
			-> We are searching (querying) the database using Mongoose's `findOne` method 
			-> We are querying the `Person` collection in the connected MongoDB database
			-> This searches for one document (entry in the database) only which matches the conditions in the `queryObject`
		-> Error handling 
			-> This checks if there is an error during the database operation 
			-> If an error occurs, we log this error to the console 
		-> We are using the done callback 
			-> done(null, data) -> we are using `null` as the first (error) argument 
			-> The result is `data`, if the function finds the query in the MongoDB database 
		-> This function searches for a person in the 'Person' collection, based on a specified person's ID using Mongoose's `findOne` method 
		-> The result of this is passed to the provided callback function `done`
*/

const findPersonById = (personId, done) => {
  let queryObject = {_id: personId}
  Person.findOne(queryObject, function(err, data) {
    if (err) return console.error(err);
    done(null , data);
  })
};

/*
	Question 8, updating one of the elements in the database with the new favourite of a person

	What this section of code does:
		-> We are finding and editing information in the MongoDB database
		-> This is a database of people
		-> Each of those people is represented by a document in the database 
		-> findEditThenSave <- this is a JavaScript function which finds a person in the database, then edits the document in the database which represents that person and then saves the change to the database  
		-> We are editing the database from the backend / server end 
		-> We are adding "hamburger" to the list of the person's favouriteFoods
		-> We can search for the person in the database by any of the answers to the three previous questions -> the name of the person, an item which they like that is unique to them in the database, or the ID for the document which represents them in that database 
		-> We are then saving the document which represents the person with the files that have their preferences 


	How this works:
		-> We are defining a function which finds a person in the database, then edits information about them, then saves that information 
		-> The arguments of this are the ID of the document which represents the person in the database, and the callback function 
		-> We define a variable (const) which stores the food we want to add
		-> Then we have a function 
			-> This takes the same argument as the overarching function
			-> The first line in this logs an error message to the console if the person isn't in the database 
			-> The second line in this adds that element to the document which returns the person
			-> The last block of code in the embedded function adds the person's updated information to the database 

	Other points:
		-> It's a MongoDB database
		-> The person whose data we are changing is represented by an ID we use to search that database -> we are using findPersonById to do this (finding the document in the database by the ID)
		-> The database is calling back with the information we requested
		-> `done` is a callback function -> executed once the rest of the code is run 
			-> The first argument is the error and the second is the result
		-> We are first storing the value of the thing we want to add to the person's document in a constant -> and then adding it in 
		-> We are only saving the changes made to the person's document if there are no errors when searching for them -> and hence why we search for errors first
			-> This was called error handling 
*/

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

/*
	Question 9, updating someone's age in the MongoDB database using a different (newer) method as in question 8
		-> Question 8 did a similar thing, just with a method for older versions

	What this section of code does:
		-> We are updating a document using mode.findOneAndUpdate()
		-> The document is an element in the MongoDB database, which represents a person 
		-> This is a method which works with more modern versions -> the method from the previous question also updated a document, but with a different approach 
		-> We are searching for an ID and updating the information in the document which is stored at that ID in the MongoDB database 
		-> We are finding the name of a person and setting the person's age
		-> We are returning the updated object -> with new: true so that the returned object is the modified document, rather than the default one 

	How this works:
		-> We are defining a JavaScript function 
		-> The argument of this is the person whose name we want to edit the document for in the database, and the done function for error handling in the second argument 

		Setting contestants:
			-> We then define a constant whose variable is a value we want to change in the database 
			-> We then define another constant which stores the name of the person whose information we want to update in the database <- the name we use is the same as the first argument of the overarching function 
			-> We have constants both for searching the database for the person whose information we want to update, and for the information we want to update it with (first, age data)
		
		Finding and updating their information in the database:
			-> We then find the person whose information in the database we want to update
			-> This is done using .findOneAndUpdate, using the syntax which was set out in the question -> with the variables whose values we just defined 
			-> Inside this, we query for errors -> if there are errors when updating this information, we are logging them to the console and not saving the changes to the database 
			-> Then if there are no errors, we complete error handling with the done() function which saves the changes to the MongoDB database 


	Other points:
		-> The query object is the object which finds the person by their name -> the object we are searching the database for 
		-> It's a MongoDB database
		-> queryObject, {age: ageToSet} <- search for this object, and change the age
			-> We are using this to define the criteria for the object we want to search for
		-> {new:true}, function(err, updatedPerson <- we are creating a new document with the information we want to add to it, and then returning that 
		-> Again checking for the errors is called error handling 
			-> If the function contains errors, we aren't updating the data in the MongoDB database for the person
		-> `done` is the callback function <- a function which handles the result 
		-> We have defined an entire function in JavaScript for the MongoDB database, which takes a person and changes their age in the database 
			-> The person being a document in the database 
*/

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
