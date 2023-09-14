---
title: "软件入门准备"
description: ""
lead: ""
date: 2023-08-15T15:18:56Z
lastmod: 2023-08-15T15:18:56Z
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 120
toc: true
---

## 嵌入式开发中的流行语言

编程语言是嵌入式软件开发的基础，它是用来编写程序指令的一种人类可读的语言。不同的编程语言有不同的特点和适用范围，但是对于嵌入式软件开发来说，C语言是最常用和最重要的一种。   

C语言是一种高级语言，它具有简洁、灵活、高效、跨平台等优点，可以直接操作硬件寄存器和内存，也可以调用汇编语言来实现更底层的控制。C语言是嵌入式软件开发的通用语言，几乎所有的嵌入式系统都支持C语言编程。

> 后续教程中将假定你已经了解了 C 语言的基本语法，如果你还完全不了解 C 语言，可以参考 [C 语言教程](https://www.runoob.com/cprogramming/c-tutorial.html) 来学习。


## CodeBlocks 工具

在实际的工程里，我们并不会用 CodeBlocks 来编写代码，而是使用 Keil 或者 Vscode 等工具。但是 CodeBlocks 作为一个轻量级的工具，可以帮助我们快速的测试一些代码片段，因此推荐你安装一个，当然你也可以使用一些在线的 C 语言编译器，例如 [在线 C 语言编译器](https://c.runoob.com/compile/11/)。
  

要使用codeblocks，我们需要先下载并安装它。我们可以从官网或者其他可靠的网站下载codeblocks安装包，根据自己的操作系统选择合适的版本。安装时，我们需要注意选择包含编译器的安装包，例如codeblocks-20.03mingw-setup.exe（Windows版），这样就不用另外安装编译器了。安装过程很简单，只需按照提示一路下一步即可。

> CodeBlocks 官网：[https://www.codeblocks.org/](https://www.codeblocks.org/)


## 嵌入式开发工具 Keil

前文提到 CodeBlocks 只是一个用来测试代码片段的工具，并不适合开发复杂的嵌入式软件项目。对于嵌入式软件开发来说，我们还需要一些专业的开发工具，例如keil mdk、vscode等。这些工具可以提供更多的功能和支持，例如项目管理、代码提示、代码格式化、代码调试、硬件仿真、目标板下载等。下面我们就来介绍一下这些工具，并引导你完成对它们的安装和配置。

keil mdk是一款专业的嵌入式软件开发工具集，它由keil公司开发，后被arm公司收购。keil mdk主要针对基于arm架构的嵌入式系统进行开发，支持多种arm芯片和开发板，例如stm32、lpc、nrf等。keil mdk包含了多个组件，例如keil uvision ide、arm c/c++ compiler、arm assembler、arm linker、arm debugger等。   

不过，keil mdk是一个商业软件，需要购买许可证才能使用。由于其价格较高，我们通常使用破解版的keil mdk。我们可以从网上寻找“keil mdk 注册机”，找到一些可用的破解工具。我们可以按照破解工具的说明，来完成keil mdk的安装和破解。(群里会提供这类不易寻找的资源)


**关于 Keil 的使用，我们将在后续的章节中讲解**

## Vscode 介绍与安装

Vscode 是一款免费、开源、跨平台的代码编辑器，它由微软公司开发，支持多种编程语言，例如C、C++、Python、Java等。Vscode具有简洁、友好、易用的用户界面，可以方便地创建、管理和运行项目，也可以自定义各种设置和插件。Vscode内置了多种编译器，例如GCC、MinGW等，可以在不同的平台上生成可执行文件。    

在上文中我们已经安装了 Keil，但是 Keil 的功能并不完善，我们还需要一个更加强大的工具来辅助我们进行开发。Vscode 就是这样一个工具，它拥有更好的的代码编写体验，例如美观的高亮、智能的提示、强大的搜索等。Vscode 还可以通过插件来扩展功能，使得体验进一步升级。

Vscode 的安装非常简单，请在搜素引擎中搜索 Vscode，进入下载并安装它。


## Vscode 插件安装与配置

### C/C++ 插件

我们的主要开发工作是嵌入式 C 开发，因此我们需要安装一些 C 相关的插件。我们可以在 Vscode 的插件商店中搜索 C/C++，找到 C/C++ 插件并安装它。安装完成后，我们的 VScode 就具备了 C 开发的能力。

### Keil Assistant

Keil Assistant 提供了在 Vscode 中管理 keil 项目的能力，我们可以在 Vscode 的插件商店中搜索 Keil Assistant，找到 Keil Assistant 并安装它。

至此，我们已经完成了 Vscode 的安装和配置，可以开始我们的嵌入式 C 开发了。