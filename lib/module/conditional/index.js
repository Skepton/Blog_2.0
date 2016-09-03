module.exports = function(conditinal, req){
  switch (conditinal) {
    case "isLoggedin":
      return req.user ? true : false;
      break;
    case "isAdmin":
      return (req.user && req.user.dataValues.admin) ? true : false;
      break;
    default:
  }
}
