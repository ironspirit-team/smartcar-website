---
title: "硬件推荐方案"
description: ""
lead: ""
date: ###### Mon Sep 9 22:17:26 CST 2024
lastmod: ###### Mon Sep 9 22:17:22 CST 2024
draft: false
images: []
menu:
  docs:
    parent: "24_assess_hardware"
weight: 320
toc: true
---

今年考核难度较大，在此给出硬件推荐方案，以便初学者更快上手

## 降压电源

小车常用12V航模锂电池作为电源，实验室有部分电池可使用，追求性能的队伍可自行购买合适的电池。

降压电源芯片有dcdc和ldo两类，其中dcdc芯片通常用于压降较大的场景，ldo芯片用于压降较小的场景，智能车比赛通常使用dcdc将电源电压降至5-6V,后级使用ldo将电源电压降至3.3V给单片机及其他传感器供电

dcdc芯片推荐使用[TPS5430](https://www.ti.com.cn/product/cn/TPS5430/part-details/TPS5430DDA),ldo芯片推荐使用[AMS1117](https://item.szlcsc.com/323882.html)

## 电机驱动

电机驱动分为有刷电机驱动和无刷电机驱动，鉴于无刷驱动的设计难度，同时考虑功率要求，推荐使用[HIP4082](https://item.szlcsc.com/51132.html),也可选择[DRV8701](https://www.ti.com.cn/product/cn/DRV8701),缺点是焊接难度较大。

## 无线模块

推荐使用NRF24L01模块，也可购买该型号芯片自行设计无线模块
