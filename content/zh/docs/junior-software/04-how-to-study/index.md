---
title: "学习方法与建议"
description: ""
lead: ""
date: 2023-09-22T12:50:49Z
lastmod: 2023-09-22T12:50:49Z
draft: false
images: []
menu:
  docs:
    parent: "junior-software"
    identifier: "04-how-to-study-579527cf3c1d2cac466134daa1379a89"
weight: 340
toc: true
---

考虑到大家的时间比较有限，短时间内学习大量知识本身就是一件非常困难的事情。因此，我们在这里给大家一些建议，希望能够帮助大家更好的学习。

## C 语言能力检测

C 语言一定要会用，当然，我们不要求大家精通 C 语言，但是至少要能够看懂 C 语言的代码，也就是认识基本的语法。    

如果不知道目前 C 语言的水平如何，可以先尝试阅读一些简单的 C 语言代码，例如下面的代码，如果能够看懂(主要是语法)，那么就可以直接开始学习单片机了。

```c
/**
* @file main.c
*/
#include <stdio.h>

#define MAX_ITEM 10

#define MAX(a, b) ((a) > (b) ? (a) : (b))

#define IS_EVEN(n) ((n) % 2 == 0)

#define M_PI 3.1415926535

static struct vector2d {
    int x;
    int y;
};

typedef struct vector2d *vector2d_t;

void vector2d_print(struct vector2d *v);
void vector2d_add(struct vector2d *v1, struct vector2d * v2);
void vertor2d_mul(struct vector2d *v, int n);
void vertor2d_create(struct vector2d *v, int x, int y);

int main(void)
{
    struct vector2d v1, v2;

    vertor2d_create(&v1, 1, 2);
    vertor2d_create(&v2, 3, 4);

    vector2d_add(&v1, &v2);
    vector2d_print(&v1);
    vector2d_print(&v2);
    vertor2d_mul(&v1, 2);
    vector2d_print(&v1);

    if (v1.x > v2.x) {
        printf("v1.x > v2.x v1.x = %d v2.x = %d\n",v1.x, v2.x);
    } else {
        printf("v1.x <= v2.x\n");
    }

    while(1) {}

    // never reach here
    return 0;
}

void vector2d_print(struct vector2d *v)
{
    printf("(%d, %d)\n", v->x, v->y);
}

void vector2d_add(struct vector2d *v1, struct vector2d * v2)
{
    v1->x += v2->x;
    v1->y += v2->y;
}

void vertor2d_mul(struct vector2d *v, int n)
{
    v->x *= n;
    v->y *= n;
}

void vertor2d_create(struct vector2d *v, int x, int y)
{
    v->x = x;
    v->y = y;
}


```

如果你看不懂上面的代码，那么你需要先学习 C 语言的基本语法，例如变量，函数，结构体等。我们推荐的学习资料如下：

[C 语言菜鸟教程](https://www.runoob.com/cprogramming/c-tutorial.html)

## 渐进式学习

上一篇文章中，我们列出了大量的学习资料，其中不乏数十小时的整套教程。如果完全按照教程一点点去学，恐怕只能等到下一年的招新了。因此，我们推荐大家采用渐进式学习的方式，即先学习最基础的内容(比如安装Keil,会下载程序点灯)，然后根据自己的需求，来选择学习更多的内容。

下面我们通过一个比较真实的例子来体验一下渐进式学习的方式。

### 背景

- 初学 STM32，对单片机的使用不熟悉
- 需要使用光电管循迹模块，但你从来没有接触过光电管


### 步骤

1. 首先，我们要了解何为光电管，以及光电管的工作原理。这一步可以通过搜索引擎来完成，例如搜索“光电管循迹模块原理”。

> 提示: 在单一搜索引擎无法找到答案的情况下，可以尝试使用其他的搜索引擎，例如百度，必应，谷歌等。另外可以试试万能的淘宝。
> 如果搜索到的文章存在大量不懂的名词时，可能是缺少前置知识(数电，模电等)可以补全前置知识后再进行了解。

2. 了解了光电管的工作原理后，我们需要了解如何使用光电管。这一步可以通过搜索引擎来完成，例如搜索“光电管循迹模块使用”。

3. 到这一步后，我们应该基本了解了如何使用了，如果还是不了解，可以试试搜索“STM32 使用光电管循迹模块"，热门的模块会有一些案例参考。
4. 学会模仿案例。这一步是最重要的一步，在模仿的过程中，才能慢慢理解一些代码的含义。比如为什么开RCC时钟，为什么要配置GPIO，为什么要复用引脚等。

## 建立"指向知识"

很多时候我们难以接受太多的知识量，但是我们可以一些”指向知识“，即知道这个知识点是什么，有什么用，以及在什么情况下使用。这样，当我们需要用到这个知识点的时候，我们可以快速的找到这个知识点，然后再去学习。

比如说，用 STM32 驱动电机，我们可以先简单知道有 PWM 这种东西，它可以用来控制电机的转速，当我们真正需要用到的时候，我们再去学习如何使用 PWM。

## 一些建议

- 不要一次性学习太多的知识，否则容易忘记
- 不要一直看教程，要多动手
- 尽量使用 Google 搜索，百度搜索的结果目前来看质量不高
- 如果中文搜索不到答案，可以尝试使用英文搜索
- 遇到问题先自己尝试解决，如果实在解决不了，再去问学长学姐。习惯于自己解决问题，这是一个非常重要的能力。


## 知识抽象

在学习的过程中，我们会遇到大量的知识点，如果能够将这些知识点进行抽象，那么可以大大的减少我们的学习量。

比如说，我们学习了 STM32 的 GPIO，我们可以将 GPIO 抽象为一个黑盒，它有一些输入，有一些输出，我们可以先不去关心它的内部结构，而是先去了解它的能实现的功能。当我们需要使用 GPIO 的时候，我们再去了解它的内部结构。

又或者，中断系统，这个特性在大部分单片机中都存在，我们可以先了解中断的公共特性，知道他是什么，有什么用，然后再去了解不同单片机平台具体的实现。

通过这种方式，我们可以大大的减少学习量，因为我们不需要每次都去了解一个新的知识点，而是可以直接使用已经学过的知识点。
