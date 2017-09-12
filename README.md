# calendar.js简介

calendar.js是一款前端日历插件，使用原生JS开发，不依赖任何第三方库，配置简单，还可以在日历上显示价格，适用于旅游、酒店等需要开始时间和结束时间的场景。

![image](https://github.com/zymseo/calendar/blob/master/calendar.png?raw=true)

### 在线demo
- [http://www.zymseo.com/demo/calendar](http://www.zymseo.com/demo/calendar)
- 以上demo请在手机端或者PC浏览器的手机模式下浏览

### 说明 
- 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^
- 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

### 使用方法

### 配置
``` javascript
var calendar = new Calendar({
	step: step, // 最多显示从本月开始的step个月
	leastDays: leastdays, // 最少选择天数
	callback: fn, // 回调函数
	priceData: priceData // 价格数据数组集合，如果没有，则为null
}).init();
```

### html

``` html
<link rel="stylesheet" type="text/css" href="./calendar.css" />
<script type="text/javascript" src="./calendar.js"></script>
```

### （1）使用script 标签引入:

``` javascript
<script type="text/javascript" src="./calendar.js"></script>
<script type="text/javascript">
	var calendar = new Calendar({
		step: step,
		leastDays: leastdays,
		callback: fn,
		priceData: priceData
	}).init();
</script>
```
### （2）使用requireJs异步引入:
``` javascript
require(['Calendar'], function (Calendar) {
	var calendar = new Calendar({
		step: step,
		leastDays: leastdays,
		callback: fn,
		priceData: priceData
	}).init();
});
```
### （3）使用ES6方式导入：
``` javascript
import Calendar from './calendar.js';
var calendar = new Calendar({
	step: step,
	leastDays: leastdays,
	callback: fn,
	priceData: priceData
}).init();
```
### 基于 MIT license 开源
- 博客：[@赵一鸣](http://www.zymseo.com)
- QQ：1047832475