const Auth = require("../models/authModel");
const bcrypt = require("bcryptjs");
const chalk = require('chalk')

exports.signUp = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('1')
    if(!username) throw new Error('username is required 1')
    console.log('2')
    let hashedPassword;
    if(password) {
      console.log('3')
      hashedPassword = await bcrypt.hash(password, 12);
      console.log('hashedPassword : ', hashedPassword)
    } else {
      console.log('4')
      throw new Error('password is required 2')
    }
    console.log('5')
    const user = await Auth.create({
      username,
      password: hashedPassword,
    });
    console.log('6')
    console.log(user);
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log('sign up error : ', error);

    // 에러 처리 루틴.
    let msg = JSON.stringify(error);
    if (error.code == 11000) {
      console.log("username already exists 3="+error);
      msg = "username already exists 3= "+error;
    }
    if (!error.code && error.errors?.username) {
      console.log("username is required 4", error.code);
      msg = "username is required = 4"+error;
    }
    if (!error.code && error.errors?.password) {
      console.log("password is required 5", error.code);
      msg = "password is required = 5"+error;
    }
    console.log('7')
    res.status(400).json({
      status: "fail",
      message: msg,
    });
  }
};

exports.listAllUsers = async (req, res) => {
  try {
    const users = await Auth.find();
    console.log(users);
    res.status(200).json({
      users,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
      message: e,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Auth.findOne({ username });
    if (!user) {
      console.log("user do not exist");
      return res.status(401).json({
        status: "fail",
      });
    }
    console.log('found user : ', user)
    const passwordVerified = await bcrypt.compare(password, user.password);
    console.log('passwordVerified : ', passwordVerified)
    if (passwordVerified) {
      req.session.username = username  // #유투브 18에서 설정한 express-session이 설정돼 있어야 한다.
      req.session.theme = {
        // express-session에 다른 변수도 넣을 수 있다.
        theme: "dark",
        font: "d2coding",
      };
      
      console.log("login user : ", req.session.username);
      console.log("theme : ", req.session.theme);
      return res.status(200).json({
        status: "success",
        user: req.session.username,
      });
    } else {
      console.log("incorrect password");
      return res.status(400).json({
        status: "fail",
        message: "incorrect password",
      });
    }
  } catch (e) {
    console.log('login catch error : ', e);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.logout = (req, res) => {
  console.log(chalk.red(`username is ${req.session.username}`))
  if(req.session.username) {
    console.log(`${req.session.username} is logged out`)
    req.session.username = null
    res.status(200).json({
      status: "success",
      message: "successfully logged out",
    });
  } else {
    console.log(chalk.cyan('The user was not logged in'))
    res.status(400).json({
      status: "fail",
      message: "user is not logged in",
    });
  }
};

exports.whoami = (req, res) => {
  if(req.session.username) {
    console.log(chalk.magenta(`username is ${req.session.username}`));
    res.status(200).json({
      status: "success",
      user: req.session.username,
    })
  } else {
    console.log(chalk.magenta('user is not logged in'))
    res.status(400).json({
      status: "fail",
      message: "user is not logged in",
    });
  }
}
