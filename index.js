//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

let newItems =[];

//mongodb connection
mongoose.connect("mongodb://localhost:27017/todolist");

const toDoListSchema = new mongoose.Schema ({
  itemName: String
});
const toDoList = mongoose.model("ToDoList", toDoListSchema);
retrieveDBItems();

//server get and post request handling
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  let today = new Date();

let options = {
  weekday: "long",

};

let day = today.toLocaleDateString("en-US", options);
//update newItems list from mongoose



//use ejs to render the new list
  res.render('list', {
    kindOfDay: day,
    userNewItems: newItems,
  });
});
app.post("/", function(req, res) {

let newItem = req.body.newItem;
addItem(newItem);

  console.log(newItem);
  //ugly fix to the issue of not having a real time update is a manual delay.
  // function timeout() {setTimeout(function(){retrieveDBItems(); res.redirect("/");}, 200)}
  // timeout();
  retrieveDBItems();
   res.redirect("/");



});

app.listen(3000, function() {
  console.log("server started on port 3000");

});



//functions
async function addItem(newItem){
  const item1 = new toDoList({
    itemName: newItem
  });
   await item1.save().then()
};

 function retrieveDBItems() {

  toDoList.find( function(err, items){
  if (err){
    console.log(err);
  }else {
newItems = items
    items.forEach( (item) => console.log(item.itemName));

    return newItems;
  }
});
// mongoose.connection.close();
}
