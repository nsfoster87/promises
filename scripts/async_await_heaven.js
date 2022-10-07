// STEP 1: solve this with promise chains
// STEP 2: (optional) refactor to promise.allSettled
// STEP 3: (optional) refactor to async/await

// nothing should be edited below this line until the next comment marker
function fastFunction() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("fastFunction error");
    }, 100);
  });
}

function slowFunction() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("slowFunction worked");
    }, 300);
  });
}

function immediateFunction() {
  return new Promise(function (resolve, reject) {
    resolve("immediateFunction worked");
  });
}

// nothing should be edited above this line

function runSequentially(funcs, cb, next) {
  // pass in `messageHandler` as the callback to this function
  // invoke the 3 functions at the top of this file within this function
  // your code here...
  Promise.all(funcs.map(async (func) => {
    return await func().then(data => cb(null, data)).catch(err => cb(err));
  }))
  .then(result => next(result))
  .catch(err => console.log(err));
}

function messageHandler(err, data) {
  // use this function to define the callback that will be passed to `runSequentially`
  // this function supplies the "messageHandler handled " message
  // your code here...
  const successOrFailure = err ? 'failure' : 'success';
  const dataOrErr = err ? err : data;
  return `messageHandler handled this ${successOrFailure}: ${dataOrErr}`;
}

// after defining everything, invoke like this:
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

function fastFunction() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("fastFunction worked");
    }, 100);
  });
}

function slowFunction() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("slowFunction error");
    }, 300);
  });
}

function immediateFunction() {
  return new Promise(function (resolve, reject) {
    reject("immediateFunction error");
  });
}

 * after changing the functions as above...
 * expected output of invoking `runSequentially`:

  "messageHandler handled this failure: slowFunction error"
  "messageHandler handled this success: fastFunction worked"
  "messageHandler handled this failure: immediateFunction error"

*/
module.exports = {
  runSequentially,
  messageHandler,
  fastFunction,
  slowFunction,
  immediateFunction
};