---
title: 使用 systemd + pyenv + screen 实现 Ubuntu 无桌面服务器脚本开机启动
date: 2025-06-18
tags:
  - Ubuntu
  - systemd
  - screen
  - pyenv
  - 自动启动
---

## 🧭 背景

在一台无图形界面的 Ubuntu 22.04 服务器上，我们需要实现以下功能：

- 开机自动运行一个 Python 脚本 `gui.py`
- 脚本位于 `/home/kawakaze/AzurLaneAutoScript/`
- Python 环境通过 `pyenv` 管理，使用虚拟环境 `alas_env`（基于 3.7.6）
- 希望运行在一个名为 `alas` 的 `screen` 会话中，方便随时 `screen -r alas` 查看状态

---

## 🧱 系统环境说明

- Ubuntu 22.04
- 用户名：`kawakaze`
- Python 环境：`pyenv` + `virtualenv`
- 无图形界面，无 `DISPLAY` 环境
- 系统具有 `systemd`

---

## ⚙️ 步骤一：创建启动脚本

```bash
sudo vim /usr/local/bin/alas-start.sh
```

内容如下：

```bash
#!/bin/bash
su - kawakaze -c '/usr/bin/screen -dmS alas bash -c "cd /home/kawakaze/AzurLaneAutoScript && /home/kawakaze/.pyenv/versions/alas_env/bin/python gui.py >> gui.log 2>&1"'
```

赋予执行权限：

```bash
sudo chmod +x /usr/local/bin/alas-start.sh
```

---

## 📝 步骤二：创建 systemd 服务文件

```bash
sudo vim /etc/systemd/system/alas-screen.service
```

内容如下：

```ini
[Unit]
Description=Start AzurLaneAutoScript in screen with pyenv alas_env
After=network.target

[Service]
Type=oneshot
User=kawakaze
WorkingDirectory=/home/kawakaze/AzurLaneAutoScript
ExecStart=/usr/bin/screen -dmS alas bash -c "/home/kawakaze/.pyenv/versions/alas_env/bin/python gui.py >> gui.log 2>&1"
RemainAfterExit=true

[Install]
WantedBy=multi-user.target
```

---

## 🚀 步骤三：启用并启动服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable alas-screen.service
sudo systemctl start alas-screen.service
```

---

## ✅ 验证服务运行情况

```bash
screen -ls                   # 检查 alas 会话是否存在
screen -r alas               # 进入会话查看运行状态
cat ~/AzurLaneAutoScript/gui.log  # 查看脚本输出日志
```

---

## 🧩 注意事项与建议

- 如果虚拟环境缺少依赖，如 `ModuleNotFoundError: No module named 'rich'`，请执行：

```bash
pyenv activate alas_env
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
```

- 若网络错误（如代理），请检查并 unset 代理环境变量：

```bash
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY
```

- 可以将 `Type=oneshot` 改为 `simple` 并加上 `Restart=on-failure` 以支持自动重启

---

## 📌 总结

你现在拥有一个：

- 随系统启动自动运行的 Python 项目
- 使用 pyenv 管理的隔离环境
- 可通过 screen 随时 attach 的后台服务

---

如需将其容器化、守护进程管理或加 watchdog 机制，可再拓展。

