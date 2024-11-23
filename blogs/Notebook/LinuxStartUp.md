---
title: Linux开机启动脚本
description: Linux开机启动脚本
date: 2024-11-23
tags:
  - Note
categories:
  - 笔记
next: false
prev: false
---



### Step1: 激活 rc.local.service

输入 `sudo vim /lib/systemd/system/rc-local.service`，编辑 `rc-local.service`

在该文件后方添加字段：

```
[Install]
WantedBy=multi-user.target  
Alias=rc-local.service
```

再建立软连接 `ln -s /lib/systemd/system/rc.local.service /etc/systemd/system/`

随后启动服务

```
sudo systemctl enable rc.local
sudo systemctl start rc.local
```

### Step2: 新建 rc.local

输入 `sudo vim /etc/rc.local`

将需要开机启动的命令写入该文件，建议在命令后方加入 `&` 以避免阻断开机。

随后给该文件加上运行权限 `sudo chmod +x /etc/rc.local`
