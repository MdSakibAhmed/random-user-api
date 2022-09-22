const userModel = require("../utilities/userModel");

module.exports.validateProperty = (req,res,next) => {
let isMatched;
const obj = Object.keys(userModel)
for (let index = 0; index < obj.length; index++) {
    const element = obj[index];
    isMatched = element in req.body;
    console.log(isMatched);
    if(!isMatched) break;
    
}
if(isMatched){
    return next()
}
else{
    return res.status(400).send("Missing required property.Please use all required property to perform data insertion");
}
}