//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();



//mongodb connection
mongoose.connect("mongodb://localhost:27017/todolist");

const itemsSchema = new mongoose.Schema({
  itemName: String
});
const toDoList = mongoose.model("ToDoList", itemsSchema);

const listsSchema = new mongoose.Schema({
  listName: String,
  items: [itemsSchema]
});
const userList =  mongoose.model("List", listsSchema)
//server get and post request handling
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  let today = new Date();

  let options = {
    weekday: "long",

  };

  let day = (today.toLocaleDateString("en-US", options)+"'s List");
  //update newItems list from mongoose

  toDoList.find(function(err, items) {
    if (err) {
      console.log(err);
    } else {
      items
      //items.forEach( (item) => console.log(item.itemName));
      //use ejs to render the new list
      res.render('list', {
        header: day,
        userNewItems: items,
      });
    }
  });
});
app.get("/:newList", function(req, res){
  const newList = req.params.newList;

});


app.post("/", function(req, res) {

  let newItem = req.body.newItem;
  addItem(newItem);

  console.log(newItem);
  //ugly fix to the issue of not having a real time update is a manual delay.
  // function timeout() {setTimeout(function(){retrieveDBItems(); res.redirect("/");}, 200)}
  // timeout();
  res.redirect("/");



});
app.post("/delete", function(req, res) {
  const selectedItem = req.body.value;
  toDoList.deleteOne({
    itemName: selectedItem
  }, function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("server started on port 3000");

});



//functions
async function addItem(newItem) {
  try {
    const item1 = new toDoList({
      itemName: newItem
    });
    await item1.save();
  } catch (err) {
    console.log(err);
  }
};
