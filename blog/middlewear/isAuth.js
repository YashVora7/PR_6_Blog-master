const isAuth = (req, res, next) => {
    let { role } = req.cookies;
    if (role == "admin") {
      next();
    } else if (!role) {
      res.send("login first");
    } else {
      res.send("You are not authorized to access this page.");
    }
  };
  
  const islogin = (req, res, next) => {
    let { id } = req.cookies;
    if (id) {
      next();
    } else {
      res.redirect("/user/login");
    }
  }; 
  
  const check = (req, res, next) => {
    let { title, content, image } = req.body;
    if (title && content && image) {
      next();
    } else {
      res.status(400).send("All fields are required");
    }
  }
  
  
  
  module.exports = {isAuth , islogin , check} ;