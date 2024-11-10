---
title: 什么是 proxy 代理？
date: 2023-11-26
tags:
  - javaScript
categories:
  - 前端
sticky: 1
---

## 1. 什么是 proxy 代理

代理（Proxy）是 JavaScript 中一种非常强大而灵活的功能。代理允许你**拦截并覆盖对象的默认行为**，提供了一种拦截、定制和扩展对象操作的机制。

**简单说，就是在访问对象属性或者赋值时，可以做一些额外的操作。**

代理通过使用 `Proxy` 对象来创建。
`Proxy` 接受两个参数：**目标对象**（被代理的对象）和一个**处理程序对象**（handler）。处理程序对象又分为了**get()捕获器**和**set()捕获器**。

先看一个简单的栗子，创建一个空代理，不会做任何的额外操作。
handler 是一个空对象，没有任何拦截效果，访问 proxy 就等同于访问 target。

```javascript
const target = {
  msg: "hello",
};
const handler = {};
const proxy = new Proxy(target, handler);
//属性会访问同一个值
console.log(target.msg); //hello
console.log(proxy.msg); //hello

target.msg = "morning";
console.log(target.msg); //morning
console.log(proxy.msg); //morning
// 严格相等可以用来区分代理对象和目标对象
console.log(target === proxy); // false
```

Proxy 实例也可以作为其他对象的原型对象。

```javascript
const proxy = new Proxy(
  {},
  {
    get: function (target, propKey) {
      return "lili";
    },
  }
);

let obj = Object.create(proxy); // proxy设为obj的原型对象
console.log(obj.name); // lili
```

obj 对象本身并没有 name 属性，所以会查找原型链，在 proxy 对象上读取该属性，导致被拦截，因为在 get()捕获器中修改了默认行为。

**要想定义额外的操作**，要在`handler`中定义捕获器。通过代理对象访问属性，会触发 get()捕获器; 通过代理对象给属性赋值。会触发`set()`捕获器。

```javascript
const John = {
  name: "John",
  age: 20,
};
const handler = {
  // 这里就额外输出了属性名
  get: function (target, property, receiver) {
    console.log(`property: ${property}`);
    return Reflect.get(target, property, receiver); //获取对象的属性值
  },
  set: function (target, property, value, receiver) {
    if (property === "age") {
      if (value < 18) {
        throw new Error("年龄必须大于等于 18");
      }
    }
    return Reflect.set(target, property, value, receiver); //设置对象的属性
  },
};
const proxy = new Proxy(John, handler);

// 直接通过对象访问属性，不会触发代理的 get 捕获器
console.log(John.name); // 输出 'John'
// 通过代理对象访问属性，会触发代理的 get 捕获器
console.log(proxy.name); // 输出 'property: name' 和 'John'

proxy.age = 23;
console.log(proxy.age); //输出 'property: age' 和 23
proxy.age = 16; //Uncaught Error: 年龄必须大于等于 18
```

## 2. Proxy 支持的拦截操作

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截 propKey`in`proxy 的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete` proxy[propKey]的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而 Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
  `defineProperty(target, propKey, propDesc)`：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **apply(target, object, args)** ：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

## 3. Reflect.get()

在 JavaScript 中，我们通常通过点符号（`obj.property`）或方括号（`obj['property']`）来访问对象的属性。而 `Reflect.get()` 也是获取对象的属性值。

### **Reflect.get(target, propertyKey, receiver)**

- `target`：目标对象，即从这个对象中获取属性值。
- `propertyKey`：属性键，即要获取的属性的键名。
- `receiver`：可选，如果提供，那么 `receiver` 将作为 `this` 值传递给目标对象的 getter 方法。如果省略，将使用 `target` 作为 `this` 值。

```javascript
const person = { name: "John", age: 30 };

// 通过点符号
const name1 = person.name;

// 通过方括号
const name2 = person["name"];

//使用 Reflect.get 获取属性值
const name3 = Reflect.get(person, "name");
```

## 4. Reflect.get()与常见获取对象属性值有什么不同？

相同点：当**访问不存在属性时**都会返回`undefined`

```javascript
const person = { age: 30 };

console.log(person.name); // 输出 undefined
console.log(Reflect.get(person, "name")); // 输出 undefined
```

不同点：`Reflect.get()`会**触发代理的捕获器**，而用点符号、方括号去访问不会。

```javascript
const person = { age: 30 };
const handler = {
  get: function (target, property) {
    console.log(`property: ${property}`);
    return Reflect.get(target, property);
  },
};
console.log(Reflect.get(person, "name")); // 输出 "property: name"，并且返回 undefined
console.log(person.name); // 输出 undefined
```

## 5. proxy 代理的应用

### 1. **拦截和定制对象操作**

通过代理，你可以使用捕获器（例如 `get`、`set`、`apply` 等）来**拦截和定制对象上的操作**。也就是在操作执行前后执行自定义逻辑，比如记录日志、验证数据、实现观察者模式等。

```javascript
const handler = {
  get: function (target, property, receiver) {
    console.log(`Getting property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set: function (target, property, value, receiver) {
    console.log(`Setting property: ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
};

const proxy = new Proxy({}, handler);
proxy.name = "John"; // 输出 "Setting property: name to John"
console.log(proxy.name); // 输出 "Getting property: name" 和 "John"
```

### 2. 数据验证和保护

通过代理，可以实现对对象属性的**更严格的验证**，以确保数据的完整性和安全性。

```javascript
const validator = {
  set: function (target, prop, value) {
    if (prop === "age" && (typeof value !== "number" || value <= 0)) {
      throw new Error("请输入正确的年龄！");
    }
    return Reflect.set(target, prop, value);
  },
};

const person = new Proxy({}, validator);
person.age = 30; // 设置成功
person.age = "thirty"; // 抛出错误：请输入正确的年龄！
```

### 3. 观察者模式

通过代理，可以实现观察者模式，即对**对象的变化进行监听**，并在**变化发生时执行相应的操作**。

```javascript
function createObservable(obj, onChange) {
  return new Proxy(obj, {
    set: function (target, prop, value, receiver) {
      onChange(prop, value);
      return Reflect.set(target, prop, value, receiver);
    },
  });
}

const user = { name: "John", age: 30 };
const observedUser = createObservable(user, (prop, value) => {
  console.log(`Property ${prop} changed to ${value}`);
});

observedUser.age = 31; // 输出 "Property age changed to 31"
```

### 4. 动态属性生成

通过代理，可以动态生成属性的值，而不是静态地存储它们。

```javascript
const dynamicProperties = new Proxy(
  {},
  {
    get: function (target, prop, receiver) {
      if (!(prop in target)) {
        target[prop] = `Dynamic value for ${prop}`;
      }
      return Reflect.get(target, prop, receiver);
    },
  }
);

console.log(dynamicProperties.name); // 输出 "Dynamic value for name"
```
