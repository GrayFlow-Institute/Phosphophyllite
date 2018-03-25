# Phosphophyllite

![Build Status][1]

[1]:https://travis-ci.org/GrayFlow-Institute/Phosphophyllite.svg?branch=master "Build Status"
A sophisticated static blog system.

## 介绍

### 为什么起一个这个名字

全都是因为一部叫做「[宝石之国](https://zh.wikipedia.org/wiki/%E5%AF%B6%E7%9F%B3%E4%B9%8B%E5%9C%8B)」的动漫啦！

里面男(女?)主的名字就叫做「[磷叶石](https://zh.wikipedia.org/zh-hans/%E7%A3%B7%E5%8F%B6%E7%9F%B3) (Phosphophyllite)」，然后，查了一下，完了——彻底喜欢上了磷叶石这种石头 ~~(当然贵得买不起啊！)~~ 。所以出于对这部动漫的喜爱，我决定把这个项目的名字定为 「磷叶石 (Phosphophyllite)」。虽然，磷叶石很脆，但是可以容纳各种多样性，有更加广阔的可能性在里面，这个就是我对这个项目的定位。 ~~(一本正经地瞎解释)~~

:)

### 功能

本来只是想做一个自己的静态博客生成工具的，但是写着写着就变成了一个轻量级的数据流处理框架，可以自己编写插件然后通过依赖注入到全局环境变量，并加入整个数据流的处理之中。

同时这个项目可以说是最小可行产品，也可以说是半成品——作为一个数据流处理框架来说，已经可以投入使用，但是作为一个静态博客生成器来说，又缺少了前端的对应主题/模板的生成框架。嘛，如果有时间，会继续完成的(毕竟是儿子之一啊！ > <)

## 项目结构

```text
.
├── bin
│   └── phos            // 用来存放 js 的执行脚本
├── lib                 // 各种库(插件)的实现
│   ├── Cli             // 客户端库——为了方便测试就瞎写了一个加法模块的占位置
│   ├── CttProcessor    // 内容处理器：将 MarkDown 的内容转换成 HTML
│   ├── DocFinder       // 文档查找器：通过环境变量输入的路径，找到路径下所有的 MarkDown (其他文件也行)文件
│   ├── DocSplitter     // 文档分离器：将文档拆成头部和内容两个部分
│   ├── EnvLoader       // 环境装载器：通过配置文件配置组件、插件等
│   ├── FileExporter    // 文件输出器：将处理好的全部数据按照对应的格式输出到指定位置
│   ├── HeadProcessor   // 头部处理器：将 MarkDown 文档的头部分离出来，以 JSON 的形式输出
│   ├── Phos            // 核心部分，包括环境模块、Logger 接口、插件接口、任务接口等等
│   └── TempOrganizer   // 模板整合器：将处理好的 MarkDown 元数据和前端模板整合在一起，形成待输出的数据
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── test                // Mocha 测试路径，里面有各个模块的单元测试和一些模拟数据等等
    ├── index.js
    ├── Scripts
    ├── TestImage
    ├── test.js
    └── TestMarkDown
```

## 原理

奔着 「**前一步的输出作为下一步的输入**」 的原则，将所有任务通过插件的形式连接起来，然后再通过 Env 来提供各种参数、输入输出缓存，最后通过客户端把参数加载到 Env 中来实现动态载入插件等等功能

具体可以参考：[磷叶石架构文档](./document/document.md)，和各种 「**单元测试**」 来明白其功能。