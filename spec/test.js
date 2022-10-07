const cb = require('../scripts/callback_heaven');
const p = require('../scripts/promise_heaven');
const async_await = require('../scripts/async_await_heaven');

describe('callback_heaven', function() {
  it('should run all async functions sequentially using callbacks', function() {
    const expected = [
      'messageHandler handled this success: slowFunction worked',
      'messageHandler handled this failure: fastFunction error',
      'messageHandler handled this success: immediateFunction worked'
    ];
    const result = cb.runSequentially(cb.messageHandler);
    expect(result).to.eql(expected);
  });
});

describe('promise_heaven', function() {
  it('should run all async functions sequentially using promises', function () {
    const expected = [
      'messageHandler handled this success: slowFunction worked',
      'messageHandler handled this failure: fastFunction error',
      'messageHandler handled this success: immediateFunction worked'
    ];
    const result = p.runSequentially(p.messageHandler);
    expect(result).to.eql(expected);
  });

  it('should run all async functions sequentially using async and await', function() {
    const expected = [
      'messageHandler handled this success: slowFunction worked',
      'messageHandler handled this failure: fastFunction error',
      'messageHandler handled this success: immediateFunction worked'
    ];
    const result = async_await.runSequentially(async_await.messageHandler);
    expect(result).to.eql(expected);
  });
});