---
title: 什么是Symbol？
date: 2023-12-27
tags:
  - javaScript
categories:
  - 前端
sticky: 1
---

`Symbol` 是 ECMAScript 6（ES6）引入的一种新的**基本数据类型**。`Symbol `类型的值是**唯一**且**不可变的**。目的是确保**对象属性**使用唯一标识符，不会发生属性冲突的危险。

## 1. 使用 Symbol() 创建

调用 `Symbol()`函数时，也可以传入一个字符串参数作为对符号的描述，将来可以通过这个字符串来调试代码。但是，这个字符串参数与符号定义或标识完全无关。

```typescript
let sym1 = Symbol();
let sym2 = Symbol("description");

console.log(typeof sym1); //symbol
console.log(sym1); //Symbol()
console.log(sym2); //Symbol('description')

const s1 = Symbol("foo");
const s2 = Symbol("foo");
const s3 = Symbol();
const s4 = Symbol();

console.log(s1 === s2); //false
console.log(s3 === s4); //false
```

**注意**：`Symbol()`函数不能与 `new `关键字一起作为构造函数使用，这样做是为了避免创建包装对象。Symbol 的设计初衷是为了创建**唯一的标识符**，而不是作为构造函数创建对象。
`new Symbol()`会导致 `TypeError`，因为 Symbol 不是构造函数。

```typescript
const s1 = new Symbol(); // Uncaught TypeError: Symbol is not a constructor
```

## 2. 使用 Symbol.for()创建可共享 Symbol

`Symbol.for` 会检查**全局 Symbol 注册表**，如果存在相同描述的 Symbol，则返回已存在的 Symbol；否则，创建一个新的 Symbol。[什么是幂等操作？](https://blog.csdn.net/qq_52395343/article/details/135047210?spm=1001.2014.3001.5502)

```typescript
let s1 = Symbol.for("foo"); // 创建新的Symbol
let s2 = Symbol.for("foo"); // 通过描述符在全局注册表中获取Symbol
console.log(s1 === s2); // true
```

`Symbol.for()`对**每个字符串键**都执行**幂等操作**。无论在何处调用 `Symbol.for`('foo')，都会返回**相同的全局共享** Symbol。  
而每次调用 `Symbol()` 都会创建一个**新的、不共享**的 Symbol。即使描述符相同，每次调用 Symbol('foo') 都会返回一个不同的 Symbol。

```typescript
const s1 = Symbol("foo");
const s2 = Symbol("foo");
const s3 = Symbol.for("foo");

console.log(s1 === s2); // false
console.log(s2 === s3); // false
```

## 3. 在实际开发中的运用

### 3.1 作为对象属性的键

由于 Symbol 的唯一性，它可以用作对象的属性名，且不容易被意外覆盖。

```typescript
// 创建一些 Symbol 属性
const symbol1 = Symbol("symbol1");
const symbol2 = Symbol("symbol2");

const obj = {
  [symbol1]: "value1",
  [symbol2]: "value2",
};
```

### 3.2 定义常量

使用 Symbol 可以创建全局唯一的常量，避免**命名冲突**。

```typescript
const LogLevel = {
  INFO: Symbol("INFO"),
  WARNING: Symbol("WARNING"),
  ERROR: Symbol("ERROR"),
};

function logMessage(message, level = LogLevel.INFO) {
  // 根据不同的日志级别执行不同的操作
  if (level === LogLevel.INFO) {
    console.log(`INFO: ${message}`);
  } else if (level === LogLevel.WARNING) {
    console.warn(`WARNING: ${message}`);
  } else if (level === LogLevel.ERROR) {
    console.error(`ERROR: ${message}`);
  }
}

logMessage("Something happened", LogLevel.WARNING);
```

### 3.3 实现类似私有成员

通过将 Symbol 用作属性名，可以模拟实现类似私有成员的概念。

```typescript
const privateProperty = Symbol("privateProperty");

class MyClass {
  constructor() {
    this[privateProperty] = "I am private!";
  }

  getPrivateProperty() {
    return this[privateProperty];
  }
}

const instance = new MyClass();
console.log(instance.getPrivateProperty()); // 输出：I am private!
console.log(instance[privateProperty]); // undefined，无法直接访问私有属性
```

### 3.4 使用内置 Symbol 值

JavaScript 提供了一些内置的 `Symbol `值，例如 `Symbol.iterator`、`Symbol.toPrimitive` 等，它们用于定义对象的默认迭代行为、类型转换等。
拿 Symbol.iterator 举个栗子：
它是一个内置的 Symbol 值，它用于**定义对象的默认迭代器**。
**迭代器是一个对象**，它实现了一个 `next`方法，该方法返回包含 `value` 和 `done` 属性的对象，`value` 表示当前迭代的值，`done`属性表示迭代是否完成。

```typescript
const myObject = {
  values: [1, 2, 3],
  [Symbol.iterator]: function () {
    let index = 0;
    const values = this.values;

    return {
      next: function () {
        return index < values.length
          ? { value: values[index++], done: false }
          : { value: undefined, done: true };
      },
    };
  },
};

for (const value of myObject) {
  console.log(value);
}
```

## 4. Symbol 的遍历

**注意**：Symbol 是不可被枚举的，因此使用 `for...in`循环或 `Object.keys()` 无法遍历出 Symbol 属性。
`Object.getOwnPropertySymbols(obj)`，可以获取所 Symbol 属性值, 返回值是一个数组。

```typescript
const symbol1 = Symbol("symbol1");
const symbol2 = Symbol("symbol2");

const obj = {
  [symbol1]: "value1",
  [symbol2]: "value2",
  greeting: "hello",
};

// 获取对象的所有 Symbol 属性
const symbolProperties = Object.getOwnPropertySymbols(obj);
console.log(symbolProperties); // [Symbol(symbol1), Symbol(symbol2)]
console.log(Object.keys(obj)); // ['greeting']
```

`Reflect.ownKeys(obj)`，可以获取包含 Symbol 在内的所有键。

```typescript
// 获取包含 Symbol的所有键
const allKeys = Reflect.ownKeys(obj);
console.log(allKeys); //[Symbol(symbol1), Symbol(symbol2)，'greeting']
```

同样，也可以使用`Object.keys`和`Object.getOwnPropertySymbols`的组合的数组。

```typescript
const allKeys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
console.log(allKeys);
```

✨**JavaScript 高级知识点：**
[1.什么是闭包和作用域链？](https://blog.csdn.net/qq_52395343/article/details/134627404)
[2.什么是 arguments 对象？](https://blog.csdn.net/qq_52395343/article/details/134587480)
[3.什么是 proxy 代理？](https://blog.csdn.net/qq_52395343/article/details/134628960)
[4.类数组对象是什么？](https://blog.csdn.net/qq_52395343/article/details/134749385)
[5.Array.from()的 6 种常见用法](https://blog.csdn.net/qq_52395343/article/details/134740199)
