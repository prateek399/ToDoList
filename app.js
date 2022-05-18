//jshint esversion-6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


var items = [];
var workItems = [];


//home
app.get("/", function(req, res) {
  const today = new Date();

  const options ={ weekday: 'long', month: 'long', day: 'numeric' };

  let day = today.toLocaleDateString("en-us", options);

  res.render("list", {ListTitle: day, newListItems: items}); //, {newListItems: items}
});

app.post("/", function(req,res) {
  //console.log(req.body);
  if(req.body.list == "Work") {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/Work");
  } else {
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
  }
});


//Work
app.get("/Work", function(req,res) {
  res.render("list", {ListTitle: "Work List", newListItems: workItems}); //, {newListItems: items}
});

app.post("/Work", function(req,res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/Work");
})

//about

app.get("/about", function(req,res) {
  res.render("about");
})




app.listen(3000, function(req, res) {
  console.log("server is running on port 3000");
});
