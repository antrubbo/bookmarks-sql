const checkName = (req, res, next) => {
    if (req.body.name) {
        console.log("name is ok");
        next()
    } else {
        res.status(400).json({ error: "Name is required" });
    }
};

const checkBoolean = (req, res, next) => {
    if (req.body.is_favorite) {
        console.log("bool is ok");
        next()
    } else {
        res.status(400).json({ error: "Favorite is required" });
    }
} 
  
module.exports = { checkName, checkBoolean };