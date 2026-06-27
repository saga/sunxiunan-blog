---
title: 重新学习JavaScript（1）
description: "学习JavaScript，就从MDN开始，其中包含了大量的值得深入学习和理解的内容。在这篇博客我介绍一些最近看 &hellip; \n继续阅读“重新学习JavaScript（1）”"
published: 2020-04-08
category: tech
updated: 2020-04-09
---

学习JavaScript，就从MDN开始，其中包含了大量的值得深入学习和理解的内容。在这篇博客我介绍一些最近看到的。

1，class expression

首先就是类表达式[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class) 说实话这是我最近才知道的用法。它的语法如下，非常类似正常的类定义语句（class declaration statement），但是可以赋值给一个变量。如果使用typeof查一下就知道，MyClass类型还是function

```
const MyClass = class [className] [extends otherClassName] {
    // class body
};
```

类表达式可以重复定义，这个和类定义方式不同。另外className可以省略，如果命名了，那这个名字也只在class body有效，这个和function expression是一样的 [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function) 。

2, this

this在JavaScript面试中几乎是必考的点，[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) 这里值得注意的几点，一个是call和apply怎么记忆呢？最简单的办法就是apply第二个参数接受的是数组类型，也就是array，a对a就能容易记住了。

下面这段代码，其中有个知识点就是如果第一个参数不是object类型，就会调用内部的ToObject函数，比如7就会变成Number，而字符串字面值‘foo’就会转成String。

```
function bar() {
  console.log(Object.prototype.toString.call(this));
}
bar.call(7);     // [object Number]
bar.call('foo'); // [object String]
```

而bind需要注意的是只会绑定一次

```
function f() {
  return this.a;
}
var g = f.bind({a: 'azerty'});
console.log(g()); // azerty
var h = g.bind({a: 'yoo'}); // bind only works once!
console.log(h()); // azerty
```

3，Destructuring assignment解构赋值

这个词有点难理解，多看看里面的示例会好很多，大致上分成两类数组解构和对象解构 [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring\_assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

下面这个用法有点费解，最后得到的两个变量不是a和b，而是aa和bb。

```
const {a: aa = 10, b: bb = 5} = {a: 3};
console.log(aa); // 3
console.log(bb); // 5
```

继续加深理解

```
const user = {
  id: 42,
  displayName: 'jdoe',
  fullName: {
    firstName: 'John',
    lastName: 'Doe'
  }
};
function userId({id}) {
  return id;
}
function whois({displayName, fullName: {firstName: name}}) {
  return `${displayName} is ${name}`;
}
console.log(userId(user)); // 42
console.log(whois(user));  // "jdoe is John"
```

注意与下面的例子的区别，主要在参数的声明格式上。一个用的等号，一个用的冒号。

```
function drawChart({size = 'big', coords = {x: 0, y: 0}, radius = 25} = {}) {
  console.log(size, coords, radius);
}
drawChart({
  coords: {x: 18, y: 30},
  radius: 30
});
```

这个例子更复杂些，属性是计算得来

```
let key = 'z';
let {[key]: foo} = {z: 'bar'};
console.log(foo); // "bar"
```

还可以用rest 属性… 顺序也没有关系，只要能和属性名对上就行

```
let {c, a, ...rest} = {a: 10, b: 20, c: 30, d: 40}
a; // 10
c; // 30
rest; // { b: 20, d: 40 }
```

```
const foo = { 'fizz-buzz': true };
const { 'fizz-buzz': fizzBuzz } = foo;
console.log(fizzBuzz); // "true"
```

数组解构和对象解构组合起来

```
const props = [
  { id: 1, name: 'Fizz'},
  { id: 2, name: 'Buzz'},
  { id: 3, name: 'FizzBuzz'}
];
const [,, { name }] = props;
console.log(name); // "FizzBuzz"
```
