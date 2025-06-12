---
title: Redroid部署记录
description: Redroid部署记录
date: 2025-05-24
tags:
  - Note
categories:
  - 笔记
next: false
prev: false
---
# Redroid在Ubuntu 22.04上部署的一些笔记

## 启动必要模块 (血泪教训，这东西不是持久的)

或者说，你可以创建一个systemd服务让他开机自动运行，具体教程就不说了

```shell
sudo modprobe ashmem_linux # 在Ubuntu 22.04测试失败，网上说使用androidboot.use_memfd=1替代即可
sudo modprobe binder_linux devices=binder,hwbinder,vndbinder
```

## * 拉取Docker镜像

```shell
docker run -itd --privileged   --pull always   -v ~/android9-data:/data   -p 5555:5555   --name redroid9   --restart always hub.rat.dev/redroid/redroid:9.0.0-latest   androidboot.redroid_width=1280   androidboot.redroid_height=720   androidboot.redroid_gpu_mode=host androidboot.use_memfd=1 androidboot.redroid_net_ndns=1 androidboot.redroid_net_dns1=223.5.5.5 androidboot.redroid_net_dns2=8.8.8.8
```

在这里我使用了 `hub.rat.dev`加速拉取，有条件的可以去掉

大致解释：

1. `-v ~/android-data:/data `你实际挂载的路径，前面为宿主机，后面为容器中（不可更改）
2. `-p 127.0.0.1:5555:5555` 映射到宿主机的端口，前面为宿主机，后面为容器内
3. `androidboot.redroid_gpu_mode=host ` 启用显卡支持（NV显卡除外）

**启动完成之后，你应该可以使用 `adb connect localhost:5555`连接到容器内虚拟机**

## * Scrcpy的下载和安装：

[前往Github下载](https://github.com/Genymobile/scrcpy "Scrcpy Github")

安装好之后，你就可以直接连接到容器中的安卓虚拟机了

# 一些额外的操作：

对于直接暴露在公网的服务器，我不建议直接把adb端口暴露开来，我们可以使用ssh反代链接

具体操作如下：

```shell
ssh -N -L 5555:127.0.0.1:5555 user@server-ip
```

这将会在你的本地电脑启动一个反向代理，你可以直接在自己的电脑上面链接：

`scrcpy -s 127.0.0.1:5555`
