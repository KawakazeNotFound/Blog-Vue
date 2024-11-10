---
title: Vue中的watchEffect作用是什么？
date: 2023-04-22
tags:
  - javaScript
categories:
  - 前端
sticky: 1
---

**watchEffect** 是 Vue 3 中一种**自动追踪数据变化**的机制。当你在 **watchEffect** 的回调函数中访问响应式数据时，Vue 会自动追踪这些访问，并在这些数据发生变化时重新运行 **watchEffect** 的回调函数。
应用场景：
在 **watchEffect** 中，通常不建议直接进行数据的赋值。赋值还是在 watch 中进行，**watchEffect** 主要用于进行一些副作用。

## 1. 自动追踪数据变化

watchEffect 会自动追踪在其回调函数中访问的响应式数据，并在这些数据发生变化时重新运行回调。这适用于那些需要自动响应数据变化的场景。

## 2. 日志输出

在开发过程中，你可能希望在某些数据变化时输出日志信息，以便调试。使用 **watchEffect** 可以方便地在控制台输出数据的变化。

```javascript
watchEffect(() => {
  console.log("Data changed:", myData.value);
});
```

## 3. 网络请求

当某个数据发生变化时，你可能需要发起网络请求获取最新的数据。**watchEffect** 可以用于触发这类异步操作。

```javascript
watchEffect(() => {
  fetchDataFromServer(myData.value);
});
```

## 4. 副作用逻辑

** 对于那些不涉及修改响应式数据的副作用逻辑，如执行一些计算、触发动画等，**watchEffect\*\* 是一个方便的选择。

```javascript
watchEffect(() => {
  // 执行一些计算或触发动画
  computeSomething();
});
```
