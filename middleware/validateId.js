module.exports.validateId = (req,res,next) => {
    const id =  req.params.id;
    if( isNaN(id)){
        return res.status(400).send("Invalid Id .Pleas try with a valid id ");

    }
    else {
        next()
    }

}