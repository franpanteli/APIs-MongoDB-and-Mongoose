require('dotenv').config();
let mongoose = require('mongoose')
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://admin:Adminmongodb@cluster0.lsljwqu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const amir = new Person({
    name: "Amir",
    age: 27,
    favoriteFoods: ["pizza", "latzania", "burger"]
  })
  amir.save(function(err, data) {
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
