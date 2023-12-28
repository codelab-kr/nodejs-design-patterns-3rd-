console.log('required sample-package');

module.exports = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => {
    if (b === 0) {
      throw new Error('0으로 나눌 수 없습니다.');
    }
    return a / b;
  }
}