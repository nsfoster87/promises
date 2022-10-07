const cb = require('../scripts/callback_heaven');
const p = require('../scripts/promise_heaven');
const async_await = require('../scripts/async_await_heaven');

describe('callback_heaven', function() {
  it('should run all async functions sequentially using callbacks', function(done) {
    const funcs = [cb.slowFunction, cb.fastFunction, cb.immediateFunction];
    const expected = [
      'messageHandler handled this success: slowFunction worked',
      'messageHandler handled this failure: fastFunction error',
      'messageHandler handled this success: immediateFunction worked'
    ];
    cb.runSequentially(funcs, cb.messageHandler, (result) => {
      expect(result).toEqual(expected);
      done();
    });
  });
  it('should still work when flipping successes and failures', function(done) {
    const fastFunc = (cb) => setTimeout(() => cb(null, "fastFunction worked"), 100);
    const slowFunc = (cb) => setTimeout(() => cb("slowFunction error"), 300);
    const immediateFunc = (cb) => cb("immediateFunction error");
    const funcs = [slowFunc, fastFunc, immediateFunc];
    const expected = [
      'messageHandler handled this failure: slowFunction error',
      'messageHandler handled this success: fastFunction worked',
      'messageHandler handled this failure: immediateFunction error'
    ];
    cb.runSequentially(funcs, cb.messageHandler, (result) => {
      expect(result).toEqual(expected);
      done();
    });
  });
});

describe('promise_heaven', function() {
  it('should run all async functions sequentially using promises', function (done) {
    const funcs = [p.slowFunction, p.fastFunction, p.immediateFunction];
    const expected = [
      'messageHandler handled this success: slowFunction worked',
      'messageHandler handled this failure: fastFunction error',
      'messageHandler handled this success: immediateFunction worked'
    ];
    p.runSequentially(funcs, p.messageHandler, (result) => {
      console.log(`expected: ${expected}`);
      console.log(`result: ${result}`);
      expect(result).toEqual(expected);
      done();
    });
  });

  it('should still work when flipping successes and failures', function(done) {
    const fastFunc = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("fastFunction worked"), 100);
      });
    };
    const slowFunc = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject("slowFunction error"), 300);
      });
    };
    const immediateFunc = () => new Promise((resolve, reject) => reject("immediateFunction error"));

    const funcs = [slowFunc, fastFunc, immediateFunc];
    const expected = [
      'messageHandler handled this failure: slowFunction error',
      'messageHandler handled this success: fastFunction worked',
      'messageHandler handled this failure: immediateFunction error'
    ];
    p.runSequentially(funcs, p.messageHandler, (result) => {
      expect(result).toEqual(expected);
      done();
    });
  });
});

describe('async_await_heaven', function() {
  it('should run all async functions sequentially using async and await', function(done) {
    const funcs = [async_await.slowFunction, async_await.fastFunction, async_await.immediateFunction];
    const expected = [
      'messageHandler handled this success: slowFunction worked',
      'messageHandler handled this failure: fastFunction error',
      'messageHandler handled this success: immediateFunction worked'
    ];
    async_await.runSequentially(funcs, async_await.messageHandler, (result) => {
      console.log(`expected: ${expected}`);
      console.log(`result: ${result}`);
      expect(result).toEqual(expected);
      done();
    });
  });

  it('should still work when flipping successes and failures', function(done) {
    const fastFunc = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => resolve("fastFunction worked"), 100);
      });
    };
    const slowFunc = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => reject("slowFunction error"), 300);
      });
    };
    const immediateFunc = () => new Promise((resolve, reject) => reject("immediateFunction error"));

    const funcs = [slowFunc, fastFunc, immediateFunc];
    const expected = [
      'messageHandler handled this failure: slowFunction error',
      'messageHandler handled this success: fastFunction worked',
      'messageHandler handled this failure: immediateFunction error'
    ];
    async_await.runSequentially(funcs, async_await.messageHandler, (result) => {
      expect(result).toEqual(expected);
      done();
    });
  });
});