//jshin esversion: 6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  var today = new Date();
  var day = "";

  switch (today.getDay()) {
    case 0: {
      day = "Sunday";

    }
    break;
  case 1: {
    day = "Monday";

  }
  break;
  case 2: {
    day = "Tuesday";

  }
  break;
  case 3: {
    day = "Wednesday";

  }
  break;
  case 4: {
    day = "Thursday";

  }
  break;
  case 5: {
    day = "Friday";

  }
  break;
  case 6: {
    day = "Saturday";

  }
  break;

  default: console.log("error day is:" +today.getDay());

  }
  res.render('list', {
    kindOfDay: day
  })


  // if (today.getDay() === 6 || today.getDay() ===0){
  //   day = "Weekend";
  //   res.render('list', {kindOfDay: day})
  //
  // }else {
  //   day = "Weekday"
  //   res.render('list', {kindOfDay: day})
  //
  // }


});


app.listen(3000, function() {
  console.log("server started on port 3000");

});