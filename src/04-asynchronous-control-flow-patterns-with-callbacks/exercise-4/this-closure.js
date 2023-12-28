// // var relationship1 = {
// //   name: 'zero',
// //   friends: ['nero', 'hero', 'xero'],
// //   logFriends: function () {
// //     var that = this; // relationship1을 가리키는 this를 that에 저장
// //     this.friends.forEach(function (friend) {
// //       console.log(that.name, friend);
// //     });
// //   }};
// // relationship1.logFriends();
// // 예상 출력 = 실제 출력
// // zero nero
// // zero hero
// // zero xero

// // 일반함수에서 this는 함수가 호출되는 방식에 따라 결정됨
// // 위 예시처럼 함수가 객체의 메서드로 호출되면  this 는 그 객체를 가리킴(that 참고)


// var relationship11 = {
//   name: 'zero',
//   friends: ['nero', 'hero', 'xero'],
//   logFriends: function () {
//     console.log(this); // 객체의 매서드로서 일반함수가 호출되었으므로 this 는 relationship11 객체
//     this.friends.forEach(function (friend) { // 아래 설명 참조
//       console.log(this)
//       console.log(this, friend); //  이거 아님 --> 여기서 디스는 friends 같은데 friends 배열의 이름은 뭐지?? undified --> undefined ?? (이 힘수를 실행시키는 주체가 friends??)
//     });
//   }};
// relationship11.logFriends();
// // 예상 출력 = 실제 출력
// // undefined nero
// // undefined hero
// // undefined xero

// // forEach 안의 함수처럼, 일반함수가 단독으로 호출되거나 콜백함수로 사용되는 경우
// // this 는 전역객체 (브라우저에서는 window, node.js에서는 global, strict mode에서는 undefined 임)
// // 위 예제에서의 this는 undefined 이고 .name 하면 에러남

// // call, apply, bind 메서드를 사용하면 this는 이 메서드의 첫 번째 인수로 지정된 객체를 가리킴




// // console.log(this) // window 객체 => {} 빈 배열??
// // console.log(this.name) // window 객체의 이름?? window ?? => undefined

// var relationship2 = {
//   name: 'zero',
//   friends: ['nero', 'hero', 'xero'],
//   logFriends() {
//     console.log(this); // relationship2을 가르킬 것 같음 => 맞음
//     this.friends.forEach( friend => {
//       console.log(this.name, friend); // 여기서 디스를 window 객체라고 예상했는데 relationship2 임 (바깥 스코프인 logFriends()의 this를 그대로 물려받아서 this는 relationship2 )
//     });
//   }};
// relationship2.logFriends();

// // 예상 출력
// // relationship2 ...
// // undefined nero
// // undefined hero
// // undefined xero

// // // 실제 출력
// // {
// //   name: 'zero',
// //   friends: [ 'nero', 'hero', 'xero' ],
// //   logFriends: [Function: logFriends]
// // }
// // zero nero
// // zero hero
// // zero xero


// // 화살표 함수에서의 this는 함수가 정의된 시점의 this를 가리킴 (= 렉시컬 this)
// // 화살표 함수는 자신만의 this를 생성하지 않으며 가장 가까운 일반함수 또는 전역 스코프의 this를 사용함
// // 따라서 call, apply, bind 메서드를 사용하여도 this를 변경할 수 없으며, 이 메서드의 첫번째 인수는 무시됨


// // 위 예시처럼, 일반적으로, 매서드 내에서 콜백함수로 this를 사용해야 하는 경우 화살표 함수를 사용함
// // 이렇게 하면 콜백 함수에서 this가 메서드를 호출한 객체를 가르키게 할 수 있음



// // closure
//// 클로저란, 함수와 그 함수가 선언된 렉시컬 스코프와의 연결이다.
//// 클로저는 함수가 선언된 스코프의 변수를 기억하고, 이 변수에 접근할 수 있게 한다.
//// 이는 함수가 선언된 스코프 밖에서 호출되더라도, 선언된 스코프의 변수에 접근할 수 있음을 의미한다.

//// 클로저는 크게 3가지 방식으로 활용될 수 있다.
//// 1. 데이터 은닉과 캡슐화: getter, setter를 사용하여 데이터를 private 변수를 은닉 
//// 2. 함수 팩토리로 동적 함수를 생성: 팩토리 함수가 리턴한 함수가 기존 팩토리함수의 변수에 접근
//// 3. 비동기 콜백에서 상태를 유지: 비동기 SPC 함수의 콜백함수가 선언된 함수의 변수에 접근

// // function regularFunction() {
// //   console.log(this);
// // }

// // regularFunction(); 

// function outerFunction(outerVariable) {
//   return function innerFunction(innerVariable) {
//     console.log('outerVariable:', outerVariable);
//     console.log('innerVariable:', innerVariable);
//   }
// }

// const newFunction = outerFunction('outside');
// newFunction('inside');  

// outerVariable: outside
// innerVariable: inside

// for (var i = 0; i < 5; i++) {
//   setTimeout(function(x) {
//     return function() {
//       console.log(x);
//     };
//   }(i), 2000);
// }

// 2초마다 x --> 2초 대기하다가 한 번에
// 0 
// 1
// ..
// 4

// for (var i = 0; i < 5; i++) {
//   console.log(i)
//   setTimeout(function() {
//       console.log(i);
//   }, 2000)
// }
// 0
// 1
// 2
// 3
// 4 
// -- 2초 대기 후 한번에 
// 5
// 5
// 5
// 5
// 5


for (var i = 0; i < 5; i++) {
  setTimeout(function(x) {
    return function() {
     console.log(x);
    };
  }(i), 1000 * i);
}
// 1초마다 
// 0
// 1 
// 2 
// 3 
// 4

setTimeout(function() {console.log('ddd')}, 1000)

function add(a, b, cb) {
  cb(a + b);
}

