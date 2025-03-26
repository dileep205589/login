const jwt = require("jsonwebtoken");
const UserModel = require("../model/user");


const checkAuth = async(req, res ,next) => {
//   console.log("hello auth");

const {token} = req.cookies
// console.log(token)

if(!token){
    req.flash('error','Unauthorised user please Login')
    res.redirect('/')

}else{
    const verifyToken = jwt.verify(token , 'dileepmeena1234')
    // console.log(verifyToken)
    const data = await UserModel.findOne({_id:verifyToken.ID})
    //console.log(data)
    req.userData =data

  next() // next method router pr paucha dega
}
};
module.exports = checkAuth;