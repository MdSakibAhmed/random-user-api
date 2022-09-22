const users = require("../assets/randomUsers.json");
const fs = require("fs");
const { use } = require("../routes/user.route");


// Get a random user
module.exports.getRandomeUser = (req, res) => {
  const randIndex = Math.floor(Math.random() * users.length);
  console.log(randIndex);
  res.status(400).json(users[randIndex]);
};


// get all user
module.exports.getAllUser = (req, res) => {
  const { number } = req.query;
  if (number) {
    const limitedUsers = users.slice(0, number);
    return res.status(400).json(limitedUsers);
  }

  return res.status(400).json(users);
};

// save a new user
module.exports.saveUser = (req, res) => {
  const { name, gender, contact, address, photoUrl } = req.body;
  let data = fs.readFileSync("assets/randomUsers.json", "utf-8");
  data = JSON.parse(data);
  const newData = {
    Id: data.length + 1,
    gender,
    name,
    contact,
    address,
    photoUrl,
  };
  data.push(newData);

  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFile("assets/randomUsers.json", jsonString, (err) => {
    if (err) {
      console.log("some error happened");
      res.status(300).send("Internal server error");
    } else {
      res.status(200).send({ success: true });
      console.log("successfully writen data");
    }
  });
};


// Update a user 
module.exports.updateRandomUser = (req, res) => {
  const { name, gender, address, photoUrl, contact } = req.body;
  let data = fs.readFileSync("assets/randomUsers.json", "utf-8");
  data = JSON.parse(data);
  const objToUpdate = data.find((obj) => obj.Id == req.params.id);
  objToUpdate.Id = objToUpdate.Id;
  objToUpdate.gender = gender || objToUpdate.gender;
  objToUpdate.name = name || objToUpdate.name;
  objToUpdate.contact = contact || objToUpdate.contact;
  objToUpdate.address = address || objToUpdate.address;
  objToUpdate.photoUrl = photoUrl || objToUpdate.photoUrl;

  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFile("assets/randomUsers.json", jsonString, (err) => {
    if (err) {
      console.log("some error happened");
      res.status(300).send("Internal server error");
    } else {
      res.status(200).send({ success: true });
      console.log("successfully updated data");
    }
  });
};

// Delete user
module.exports.deleteUser = (req, res, next) => {
  const id = req.params.id;
  let data = fs.readFileSync("assets/randomUsers.json", "utf-8");
  data = JSON.parse(data);
  const afterRemoved = data.filter((obj) => obj.Id != id);
  const jsonString = JSON.stringify(afterRemoved, null, 2);
  fs.writeFile("assets/randomUsers.json", jsonString, (err) => {
    if (err) {
      console.log("some error happened");
      res.status(300).send("Internal server error");
    } else {
      res.status(200).send({ success: true });
      console.log("successfully deleted user");
    }
  });
};


// bulk-update

module.exports.updateMultipleUser = (req,res,next) => {
  const {ids,obj} = req.body;

  const {name,gender,contact,address,photoUrl} = obj;
  let data = fs.readFileSync("assets/randomUsers.json", "utf-8");
  data = JSON.parse(data);

  ids.forEach(id => {
    const user = data.find(user => user.Id == id);
    user.gender = gender || user.gender;
    user.name = name || user.gender;
    user.contact = contact || user.contact;
    user.address = address || user.address;
    user.photoUrl = photoUrl || user.photoUrl;
  })

  const jsonString = JSON.stringify(data, null, 2);
  fs.writeFile("assets/randomUsers.json", jsonString, (err) => {
    if (err) {
      console.log("some error happened");
      res.status(300).send("Internal server error");
    } else {
      res.status(200).send({ success: true });
      console.log("successfully updated all users  data");
    }
  });



}
