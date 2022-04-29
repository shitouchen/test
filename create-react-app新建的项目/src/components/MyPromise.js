// 多次调用

const PENDING = 'pending'; //等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
  constrouctor(executor) {
    executor(this.resolve, this.reject)
  }

  status = PENDING
  value = undefined;
  value = undefined;
  // 在等待时，调用then 给其赋值默认值，这时就要赋值为数组了
  successCallback = [];
  failCallback = [];
  resolve = (value) => {
    if (this.status !== PENDING) return;
    this.status = FULFILLED;
    this.value = value;
    // 判断成功回调是否存在 如果存在 调用
    while (this.successCallback.length) this.successCallback.shift()(this.value)
  }
  reject = (reason) => {
    if (this.status !== PENDING) return;
    this.status = REJECTED;
    this.reason = reason;
    // 判断失败回调是否存在 如果存在 调用
    while (this.failCallback.length) this.failCallback.shift()(this.value)
  }
  then(successCallback, failCallback) {
    // 上述代码中只对成功和失败做了处理，但是未考虑pendIng的情况
    if (this.status === FULFILLED) {
      successCallback(this.value);
    } else if (this.status === REJECTED) {
      failCallback(this.reason);
    } else if (this.status === PENDING) {
      // 将成功回调和失败回调存储起来
      this.successCallback.push(successCallback);
      this.failCallback.push(failCallback);
    }
  }
}

export default MyPromise;