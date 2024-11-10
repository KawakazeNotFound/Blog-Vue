---
title: 什么是稀疏数组和密集数组？
date: 2024-02-22
tags:
  - javaScript
categories:
  - 前端
sticky: 1
---

## 1. 稀疏数组

稀疏数组（Sparse Array）：稀疏数组是指数组中包含**未定义**的元素，或者说其中某些位置没有被分配值。

```javascript
let a = new Array(5);
console.log(a); //[empty × 5]
console.log(a.length); //5

a.forEach((item) => {
  console.log(item, "item"); //不输出
});
console.log(a[1]); //undefined

a[0] = 1;
a[2] = 2;
console.log(a); //[1, empty, 2, empty × 2]
```

**为什么在访问具体单个元素时返回 undefined?**

可以从 **JS 引擎解析**的角度去看。在 v8 源码上对于 empty 的描述是一个**空的对象引用**，但 JS 基本类型中并无这种类型，故用 `undefined` 来代替。这种表现就像我们在控制台访问一个不存在变量时，通常得到的就是 undefined。

## 2. 密集数组

密集数组（Dense Array）：指数组中的元素占据了连续的内存空间，并且数组的长度与数组中元素的数量相等。换句话说，密集数组中没有未定义的元素，**每个索引位置都有一个明确的值。**

```javascript
let b = Array.from({ length: 5 });
console.log(b); //[undefined, undefined, undefined, undefined, undefined]
console.log(b.length); //5

b.forEach((item) => {
  console.log(item, "item"); //会输出
});
console.log(b[1]); //undefined
b[0] = 1;
b[2] = 2;
console.log(b); // [1, undefined, 2, undefined, undefined]
```

> `Array.from()` 绝不会创建稀疏数组。如果缺少一些索引属性，那么这些属性在新数组中将是 undefined。

## 3. 常见的稀疏数组和密集数组的创建方式

### 3.1 创建稀疏数组

**跳过一些索引**： 通过直接赋值创建数组时，可以跳过一些索引，从而创建稀疏数组。

```javascript
let sparseArray = [];
sparseArray[0] = "a";
sparseArray[2] = "c";
console.log(sparseArray); //['a',empty,'c']
```

**使用 Array 构造函数**： 可以使用 Array 构造函数创建稀疏数组，并指定数组的**长度**。

```javascript
let sparseArray = new Array(3);
console.log(sparseArray); //[empty × 3]
```

### 3.2 创建密集数组

**直接赋值创建**： 通过直接赋值创建数组，确保所有索引都被赋值。

```javascript
let denseArray = [1, 2, 3, 4, 5];
```

**使用 Array 构造函数**： 使用 Array 构造函数创建数组，并在参数中指定数组的**元素**。

```javascript
let denseArray = new Array("a", "b", "c");
```

**填充元素**： 使用数组方法如`fill()`或 splice() 来填充数组，确保所有索引都有值。

```javascript
let denseArray = new Array(5).fill(null); // 元素填充为null
console.log(denseArray); //[null, null, null, null, null]
```

## 4. 稀疏数组与密集数组的相互转换

🔸**密集数组 =>稀疏数组**
**使用 delete 操作符**： 删除密集数组中的某些元素

```javascript
let arr = [1, 2, 3];
delete arr[1];
console.log(arr); //[1, empty, 3]
```

**重新分配数组长度**

```javascript
let arr = [1, 2, 3];
arr.length = 5;
console.log(arr); //[1, 2, 3, empty × 2]
```

🔸**稀疏数组 => 密集数组**
**Array.apply()**

```javascript
const arr = new Array(5); // 稀疏数组
const newArr = Array.apply(null, arr);
console.log(newArr); //[undefined, undefined, undefined, undefined, undefined]
```

**Array.from()进行转换**

```javascript
const arr = new Array(5); // 稀疏数组
const newArr = Array.from(arr);
console.log(newArr); //[undefined, undefined, undefined, undefined, undefined]
```

**扩展运算符**

```javascript
const arr = new Array(5); // 稀疏数组
const newArr = [...arr];
console.log(newArr); //[undefined, undefined, undefined, undefined, undefined]
```

## 5. 稀疏数组和密集数组的优缺点

### 5.1 稀疏数组的优缺点

🔸 优点：
**节省内存空间**： 稀疏数组允许数组长度大于实际存储的元素数量，因此可以节省内存空间，特别是在处理大型数据集时更为显著。
**灵活性**： 可以方便地**将新元素插入到数组的任意位置，无需调整其他元素的索引**，因为未定义的元素不占用实际的存储空间。

🔸 缺点：
**性能影响**： 对稀疏数组进行迭代或操作时，可能会因为存在未定义的空洞而导致额外的性能开销，需要小心处理。

> 当遍历稀疏数组时，需要检查每个元素是否已定义，以避免处理未定义的空洞。这可能需要额外的比较操作和条件检查，从而增加执行时间。另外，在对稀疏数组进行某些操作时，如排序或过滤，未定义的空洞也需要被考虑进去，这可能会**增加算法的复杂度和执行时间。**

**容易混淆**： 稀疏数组可能会导致一些意想不到的行为，例如在遍历时需要额外的判断**来跳过未定义的元素**，可能会引入错误。(比如在使用`map, forEach, filter`等方法时，遇到 empty 元素的时候，callback 函数是不会执行的)

### 5.2 密集数组的优缺点

🔸 优点：
**性能优势**： 密集数组在**访问**和**迭代**时性能较好，因为它们没有未定义的空洞，数组元素在内存中是连续存储的。
**简单直观**： 密集数组的索引与元素一一对应，更易于理解和维护。
🔸 缺点：
**内存占用较高**： 密集数组的长度与实际存储的元素数量一致，可能会占用较多的内存空间，特别是在大规模数据集上。
**不够灵活**： 插入或删除元素时，可能需要调整数组中其他元素的索引，导致性能下降。

### 5.3 总结

**数组较小**且**元素是连续的**，适合**密集数组**。
**数据多**或**频繁动态操作元素**，适合**稀疏数组**。
