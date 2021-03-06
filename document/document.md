# 磷叶石架构

基于数据流的体系结构

## 处理流程

**前一步的输出作为下一步的输入**，组件作为插件的容器，所有的组件由插件的形式实现，所有插件都是**处理输出**，所有的流程的输出都要保存到临时数据库

1. 开始
    - 输入：MD 文件目录，配置文件
    - 输出：MD 文件目录，配置文件
1. 环境装载器
    - 职责：通过配置文件配置组件、插件
    - 输出：如是生成 Blog 则是输出 {'out':[MD 文件目录]}
1. 文档查找器
    - 输出：{'out':[MD 文件绝对路径]}
1. 文档分离器
    - 输出：{'out':[MD 文档信息 json,MD 文档内容,文件绝对路径]}
1. 头部处理器
    - 职责：将 MD 文档信息头部解析组合成头部元对象
    - 输出：{'out'：[头部元对象,MD 文档内容,文件绝对路径]}
1. 内容处理器
    - 职责：根据 MD 文档内容，提取其中的外部图像资源，并用 hash:二进制 保存到临时数据库，并将内容拆分成 [内容，hash] 数组，作为内容元数据
    - 输出：{'out':[头部元对象,内容元对象,文件绝对路径]}
1. 模板整合器
    - 职责：组合 HTML 模板，并生成 元文件数据(路径,文件数据)
    - 输出：[元文件数据]
1. 文件输出器
    - 职责：根据元文件数据、配置信息输出所有文件，并将数据信息缓存到本地数据库，节省下次构建时间
    - 输出：[文件]
1. 结束