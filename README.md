# 基于ICU实现的Nodejs拼音转换模块

现有的拼音转换模块字典不全，且不识别语义，
造成多音字转换不准确的问题，此模块借助ICU强大的
国际化功能，采用node addon调用icu dll
（当前采用版本：icu4c-57_1-Win64-msvc10.zip）实现
拼音转换。

本想采集ffi直接调用dll，奈何icu此版本导出的是C++接口，故直接采用node-gyp方案。

bin目录是node所在目录，通过binding.gyp中配置如下代码将编译的目标文件拷贝至bin目录。
```
    {
      "target_name": "copy_binary",
      "type": "none",
      "dependencies": ["pinyin"],
      "copies":
      [
        {
          'destination': '<(module_root_dir)/bin',
          'files': ['<(module_root_dir)/build/Release/pinyin.node']
        }
      ]
    }
```

## 使用

* 安装依赖

```
npm install
```

* 编译

```
node-gyp configure

node-gyp build
```

* Test

```
npm run test
```

* 可视化效果（地址：http://127.0.0.1:8080）

```
npm run dev
```

## Code Example

```
var addon = require('../bin/pinyin');

console.log(addon.transliterate('中国'));
```

## Tips

* 若本地编译环境为Windows且msvc版本为vs2015，需要在运行node-gyp configure后手动
修改工程属性的平台工具集为“Visual Studio 2015 - Windows XP (v140_xp)”
，因为我们用的icu版本为icu4c-57_1-Win64-msvc10.zip，即vs2010编译的版本。
* 此模块目前只在Windows下测试通过，其他平台下应用请下载对应的ICU动态库（下载地址：http://site.icu-project.org/download/57#TOC-ICU4C-Download）
放置于bin目录下；因还未完成跨平台，此模块暂未上传npm。

## 参考
ICU
> http://site.icu-project.org/download/57#TOC-ICU4C-Download

node-gyp
> http://www.tuicool.com/articles/bAzMju

ant-design
> https://github.com/ant-design/ant-design

webpack
>https://github.com/webpack/webpack
>https://github.com/webpack/webpack-dev-server

javascript & es6
> https://github.com/airbnb/javascript
> http://es6.ruanyifeng.com/