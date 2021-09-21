import  Account  from "../Model/account.js";

let validateUser = (req, res, next) => {

if(req.headers.authorization == undefined){
    return res.json({
        isAuth: false,
        error: true
    })
}
let token = req.headers.authorization.split(" ")[1];

  Account.validateToken(token, (err, account) => {
    if (err) {
      throw err;
    }
    if (!account) {
      return res.json({
        isAuth: false,
        error: true,
      });
    }

    req.token = token;
    req.user = account;
    next()
  });
};


export default validateUser;