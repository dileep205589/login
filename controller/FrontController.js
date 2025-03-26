
const UserModle = require('../model/user')
const TeacherModel = require('../model/teacher')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

class FrontController {
   static register = (req, res) => {
      try {
         res.render('register', { message: req.flash('error') })
         console.log(req.body)
      } catch (error) {
         console.log(error)
      }
   }

   // static register1 = (req, res) => {
   //    try {
   //       res.render('register1', { message: req.flash('error') })
   //       console.log(req.body)
   //    } catch (error) {
   //       console.log(error)
   //    }
   // }
   
   static login = (req, res) => {
      try {
         res.render('login' , { message: req.flash('success'), msg: req.flash('error')})
      } catch (error) {
         console.log(error)
      }
   }

   static home = (req, res) => {
      try {
         res.render('home')
      } catch (error) {
         console.log(error)
      }
   }

   ////////////////////////////////////////////////////

   // Create (POST)

   // static insertStudent = async (req, res) => {
   //    try {
   //       console.log(req.body)
   //    } catch (error) {
   //       console.log(error)
   //    }
   // }

//    static insertStudent = async (req, res) => {
//       try {
//           console.log(req.body)
//           const data = new UserModle(req.body);
//           await data.save();
//           res.status(201).json(data);
//       } catch (err) {
//           res.status(500).json({ message: "Failed to create item", error: err });
//       }
//   };

   //  Create (POST)
   //  static insertStudent = async (req, res) => {
   //      try {
   //          console.log(req.body)
   //          const data = new UserModle(req.body);
   //          console.log(data)
   //          await data.save();
   //          res.status(201).json(data);
   //      } catch (err) {
   //          res.status(500).json({ message: "Failed to create item", error: err });
   //      }
   //    //   res.redirect('/')
   //  };


   //  Create (POST)///////////////////
   //     static insertStudent = async (req, res) => {
   //       try {
   //           console.log(req.body)
   //           const   {name , email , password  , confirmPassword} =req.body
   //           await UserModle.create({
   //             name ,
   //             email,
   //             password
   //           })
   //           res.redirect('/')

   //       } catch (err) {
   //          res.status(500).json({ message: "Failed to create item", error: err });
   //       }
   //   };
   ////////////////////////////////   

   // // // Create (POST)

   static insertStudent = async (req, res) => {
      try {
         const { name, email, password, confirmPassword } = req.body
         const user = await UserModle.findOne({ email: email })
         console.log(user)
         if (user) {
            req.flash('error', "Email Already Exit")
            return res.redirect('/register' )
         }
         if (password !== confirmPassword) {
            req.flash('error', "Password and ConfirmPassword Does not Match")
            return res.redirect('/register')
         }
         const hashPassword = await bcrypt.hash(password, 10)
         await UserModle.create({
            name,
            email,
            password: hashPassword
         })
         req.flash('success', "Registration Successfully insert !  Please Login")
         res.redirect('/')
      } catch (error) {
         console.log(error)
      }
   }

////////////////////////////////////////////////////////////////////////
// // Create (POST)  //////////////other methos /////////////
//  static insertStudent = async (req, res) => {
//    try {
//       const { name, email, password, confirmPassword } = req.body
//       const user = await UserModle.findOne({ email: email })
//       console.log(user)
//       const hashPassword = await bcrypt.hash(password, 10)
//       await UserModle.create({
//          name,
//          email,
//          password: hashPassword
//       })
//       req.flash('success', "Registration Successfully insert !  Please Login")
//       res.redirect('/')
//    } catch (error) {
//       console.log(error)
//    }
// }
/////////////////////////////////////////////////////////////////////////
// static verifyLogin = async (req , res) =>{
//    try {
//       // console.log(req.body)
// const {email , password } = req.body
// const user = await UserModle.findOne({ email })
// console.log(user)
// if(!user) {
//    req.flash("error" ,  "You are not register User")
//    return res.redirect("/home")
// }
//    } catch (error) {
//       console.log(error)
//    }
// }

// static verifyLogin = async (req, res) => {
//    try {
//      const { email, password } = req.body; // Get email and password from request body
//      // Check if the user exists in the database
//      const user = await UserModle.findOne({ email });
//      console.log(user)
//      // If no user is found, send error message and redirect
//      if (!user) {
//        req.flash('error', 'You are not a registered user');
//        return res.redirect('/');
//      }
//      // Compare the provided password with the hashed password in the database
//      const isPasswordValid = await bcrypt.compare(password, user.password);
 
//      // If password is incorrect, send error message and redirect
//      if (!isPasswordValid) {
//        req.flash('error', 'Invalid email or password');
//        return res.redirect('/');
//      }

//      // If email and password are correct, proceed to the next step
//      req.flash('success', 'Login successful');
//      return res.redirect('/home'); // Redirect to a logged-in page, e.g., dashboard
 
//    } catch (error) {
//      console.error(error); // Log error for debugging
//      req.flash('error', 'An error occurred. Please try again later.');
//      return res.redirect('/'); // Redirect to home or an error page
//    }
//  };

static verifyLogin = async (req, res) => {
   try {
     const { email, password } = req.body;
     if (email && password) {
       const user = await UserModle.findOne({ email: email });

       if (user != null) {
         const isMatched = await bcrypt.compare(password, user.password);
         console.log(isMatched);

         if (isMatched) {
           if (user.role == "admin") {
             // token create
             let token = jwt.sign({ ID: user.id }, "dileepmeena1234");

             //  console.log(token)
             res.cookie("token", token);
             res.redirect("admin/dashboard");
           }

           if (user.role == "student") {
             // token create
             let token = jwt.sign({ ID: user.id }, "dileepmeena1234");
             //  console.log(token)
             res.cookie("token", token);
             res.redirect("/home");
           }

         }
       } else {
         req.flash("error", "you are not a registered user");
         return res.redirect("/");
       }
     } else {
       req.flash("error", "All Fields Required");
       res.redirect("/");
     }
   } catch (error) {
     console.log(error);
   }
 };

 static Logout = async (req, res) => {
   try {
     res.clearCookie("token"); // clearcookie ---> token ko clear krna
     res.redirect("/");
   } catch (error) {
     console.log(error);
   }
 };

 static Logout = async (req, res) => {
   try {
     res.clearCookie("token"); // clearcookie ---> token ko clear krna
     res.redirect("/");
   } catch (error) {
     console.log(error);
   }
 };

///////////////////////////////////////////////////////
//  app.post('/upload-multiple', upload.array('files', 10), 

//   static homepage  = async (req, res) => {
//    return res.render('homepage')
// }

// static getStudent = async (req, res) => {
//    try {
//        const data = await UserModle.find();
//        console.log(data)
//        res.status(200).json(data);
//    }
//    catch (err) {
//        res.status(500).json({ message: "Failed  to  get Items ", error: err })
//    }
// };

};


module.exports = FrontController