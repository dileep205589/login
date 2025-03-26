
const TeacherModel = require('../model/teacher');
const UserModle = require('../model/user')

const bcrypt = require('bcrypt')

        class  AdminController {
        static dashboard = async (req, res) => {
          try {
            res.render("admin/dashboard");
          } catch (error) {
            console.log(error);
          }
        };

}

module.exports = AdminController