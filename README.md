# calendar.js简介

calendar.js是一款前端日历插件，使用原生JS开发，不依赖任何第三方库，配置简单，还可以在日历上显示价格，适用于旅游、酒店等需要开始时间和结束时间的场景。

### 在线demo
- [https://zhaoyiming0803.github.io/calendar/](https://zhaoyiming0803.github.io/calendar/)
- 以上demo请在手机端或者PC浏览器的手机模式下浏览

### 说明 
- 如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^
- 或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

### 使用方法

参考 /test/index.html

### 配置
``` javascript
var calendar = new Calendar({
	step: step, // 最多显示从本月开始的step个月
	leastDays: leastdays, // 最少选择天数
	callback: fn, // 回调函数，默认有两个数组参数，第一个是所选开始时间和结束时间，第二个是开始时间和结束时间对应的element索引
	priceData: priceData // 价格数据数组集合，如果没有，则为null
}).init();
```

### html

``` html
<link rel="stylesheet" type="text/css" href="../src/css/calendar.css" />
<script type="text/javascript" src="../src/js/calendar.js"></script>
```

### （1）使用script 标签引入:

``` javascript
<script type="text/javascript" src="../src/js/calendar.js"></script>
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
import Calendar from '../src/js/calendar.js';
var calendar = new Calendar({
	step: step,
	leastDays: leastdays,
	callback: fn,
	priceData: priceData
}).init();
```
### 基于 MIT license 开源
- QQ&微信：1047832475
