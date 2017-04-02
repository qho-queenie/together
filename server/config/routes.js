var fs = require("fs");
var path = require("path");
var controllerPath = path.join(__dirname, "./../controllers");
var controllers = require(path.join(__dirname, "./../config/controller_combiner.js"));
var session = require("express-session");

console.log(controllers);

routeFunctions = {
  get:{
    '/' : controllers.index,
    '/home' : controllers.home,
    '/test_group_algo' : controllers.test_group_algo
  },
  post:
  {
      '/send_e' : controllers.send_email
  }
};

function doForEveryRoute(req, res, callback)
{
  console.log("-----------------------------");
  console.log(`Route: ${req.path}`);
  console.log(`Session ID: ${req.sessionID}`);
  console.log("-----------------------------");
  console.log(callback);
  try{
    if(callback){
      callback(req, res);
    }
    else{
      console.log("Route doesn't exist.");
    }
  }catch(e){
    console.log(e);
  }
}

module.exports = function(app){

  app.get('*.*', function(req, res){
    console.log(`file: ${req.path}`);
    res.sendFile(req.path);
  });

  app.get('*', function(req, res){
    //stuff for only get
    doForEveryRoute(req, res, routeFunctions.get[req.path]);
  });

  app.post('*', function(req, res){
    //stuff for only post
    doForEveryRoute(req, res, routeFunctions.post[req.path]);
  });
}