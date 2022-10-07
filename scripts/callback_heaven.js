console.clear();
// nothing should be edited below this line until the next comment marker
function fastFunction(cb) {
  setTimeout(function () {
    cb("fastFunction error");
  }, 100);
}

function slowFunction(cb) {
  setTimeout(function () {
    cb(null, "slowFunction worked");
  }, 300);
}

function immediateFunction(cb) {
  cb(null, "immediateFunction worked");
}

// nothing should be edited above this line

function runSequentially(cb) {
  // you are now inside the definition of runSequentially
  // pass in `messageHandler` as the callback to this function when it's invoked below
  // invoke the 3 functions at the top of this file within this function

  // your code here...
}

function messageHandler(err, data) {
  // use this function to define the callback that will be passed to `runSequentially`
  // this function supplies the "messageHandler handled..." message
  // your code here...
}

// and finally here is the invocation of runSequentially
// after defining everything, invoke it like this:
// runSequentially(/* put something in here */);

/*
  expected output of invoking `runSequentially`:

  "messageHandler handled this success: slowFunction worked"
  "messageHandler handled this failure: fastFunction error"
  "messageHandler handled this success: immediateFunction worked"

*/

/*
 * BY THE WAY WHEN YOU THINK YOU ARE DONE...
 * You should be able to change fastFunction slowFunction and immediateFunction
 * as follows, and everything should still work:

function fastFunction(cb) {
  setTimeout(function () {
    cb(null, "fastFunction worked");
  }, 100);
}

function slowFunction(cb) {
  setTimeout(function () {
    cb("slowFunction error");
  }, 300);
}

function immediateFunction(cb) {
  cb("immediateFunction error");
}

 * after changing the functions as above...
 * expected output of invoking `runSequentially`:

  "messageHandler handled this failure: slowFunction error"
  "messageHandler handled this success: fastFunction worked"
  "messageHandler handled this failure: immediateFunction error"

*/
module.exports = {
  runSequentially,
  messageHandler
};