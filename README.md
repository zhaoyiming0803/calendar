# calendar.js简介

calendar.js是一款前端日历插件，使用原生JS开发，不依赖任何第三方库，配置简单，还可以在日历上显示价格，适用于旅游、酒店等需要开始时间和结束时间的场景。

### 在线demo
- [http://www.zymseo.com/demo/calendar](http://www.zymseo.com/demo/calendar)

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