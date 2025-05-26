---
title: Pyenv的简单部署和实现
description: 仅供参考
date: 2025-05-27
tags:
  - Note
categories:
  - 笔记
next: false
prev: false
---
# Pyenv的下载和安装

1.安装依赖

```shell
sudo apt update sudo apt install -y build-essential curl git libssl-dev libbz2-dev libreadline-dev libsqlite3-dev wget llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev liblzma-dev
```

2.克隆仓库

```shell
 git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

3.配置环境变量

```shell
# 添加环境变量
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init --path)"\nfi' >> ~/.bashrc

```

# 重新加载配置

```shell
source ~/.bashrc
```

4.测试安装版本

```shell
pyenv install 3.11.5    # 举例安装 Python 3.11.5 
pyenv install 2.7.18    # 也可以安装老版本
```


5.查看安装版本

```shell
pyenv versions
```

# 用法

1.全局|当前shell|当前目录 切换

`pyenv global|shell|local 3.11.5`

## 额外工具：pyenv-virtualenv

```shell
git clone https://github.com/pyenv/pyenv-virtualenv.git ~/.pyenv/plugins/pyenv-virtualenv
echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bashrc
source ~/.bashrc
# 创建虚拟环境
pyenv virtualenv 3.11.5 myenv311
# 激活虚拟环境
pyenv activate myenv311
# 退出虚拟环境
pyenv deactivate
```
