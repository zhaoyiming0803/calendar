/**
 * Description: 日历控件
 * User: zhaoyiming
 * Date: 2017/9/5
 * License: MIT, https://github.com/zymseo/calendar
 */

;(function (global, oDoc, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' 
		? module.exports = factory(oDoc) 
		: typeof define === 'function' && define.amd 
			? define([], function () {return factory(oDoc);}) 
			: (global.Calendar = factory(oDoc));
})(this, document, function (oDoc) {
	'use strict';

	function strToDom (str) {
		var oDiv = oDoc.createElement('div');
		oDiv.innerHTML = str;
		return oDiv.childNodes[0];
	}

	function getDays (curYeay, curMonth) {
		var day = new Date(curYeay, curMonth, 0);
		return day.getDate();
	};

	function getWeek (year, month){
		var date = new Date();
		date.setYear(year);
		date.setMonth(month-1);
		date.setDate(1);
		return date.getDay();
	}

	function Calendar (opt) {
		// 当前年、月、日作为基数
		var date = new Date();
		this.currentYear = parseInt(date.getFullYear(), 10);
		this.currentMonth = parseInt(date.getMonth(), 10);
		this.currentDate = parseInt(date.getDate(), 10);
		
		// 配置项
		this.step = opt.step ? Math.abs(opt.step) : 5; // 最多显示从本月开始的step个月
		this.leastDays = opt.leastDays ? Math.abs(opt.leastDays) : 0; // 最少选择天数
		this.callback = opt.callback; // 回调函数
		this.priceData = opt.priceData; // 价格数据集合
		
		// 存储用户最终选择的开始时间和结束时间
		this.timeArry = ['', ''];
		
		// 存储用户最终选择的开始时间和结束时间对应的element索引值
		this.indexArry = [0, 0];
	}

	// 显示价格
	Calendar.prototype.renderPriceElement = function (currentYear, currentMonth, currentDate, monthCount, monthDays, startMonth, priceIndex) {
		var _this = this,
			str = '',
			startDay = 0;

		for (var i = 0; i < monthCount; i += 1) {

			(startMonth > 12) && (startMonth = 1) && (currentYear += 1);
			monthDays = getDays(currentYear, startMonth);

			str += '<div class="month-panel">' +
						'<div class="month-bar">'+ currentYear + '年' + startMonth +'月</div>' +
						'<div class="month-list">' +
							'<ul class="clearfix">';

			startDay = getWeek(currentYear, startMonth);

			for (var j = 0; j < startDay; j += 1) {
				str +=			'<li><span></span><span></span></li>';
			}

			for (var k = 1; k <= monthDays;) {
				if (currentDate === k && (currentMonth + 1) === startMonth && currentYear === _this.currentYear) {
					str +=		'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ k +'" class="active-date"><span>今天</span><span class="red">￥'+ _this.priceData[priceIndex] +'</span></li>' +
								'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ (k+1) +'" class="active-date"><span>明天</span><span class="red">￥'+ _this.priceData[priceIndex+1] +'</span></li>';
					k += 2;
					priceIndex += 2;
					continue;
				}

				if (currentDate > k && (currentMonth + 1) === startMonth && currentYear === _this.currentYear) {
					str +=		'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ k +'" class="disabled"><span>'+ k +'</span><span class="red"></span></li>';
				} else {
					if (_this.priceData[priceIndex]) {
						str +=	'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ k +'" class="active-date"><span>'+ k +'</span><span class="red">￥'+ _this.priceData[priceIndex] +'</span></li>';
					} else {
						str +=	'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ k +'" class="disabled"><span>'+ k +'</span><span class="red"></span></li>';
					}
					priceIndex += 1;
				}
				
				k += 1;
			}

			str +=			'</ul>' +
						'</div>' +
					'</div>';

			startMonth += 1;
		}

		return str;
	}

	// 不显示价格
	Calendar.prototype.renderNoPriceElement = function (currentYear, currentMonth, currentDate, monthCount, monthDays, startMonth, priceIndex) {
		var _this = this,
			str = '',
			startDay = 0;

		for (var i = 0; i < monthCount; i += 1) {

			(startMonth > 12) && (startMonth = 1) && (currentYear += 1);
			monthDays = getDays(currentYear, startMonth);

			str += '<div class="month-panel">' +
						'<div class="month-bar">'+ currentYear + '年' + startMonth +'月</div>' +
						'<div class="month-list">' +
							'<ul class="clearfix">';

			startDay = getWeek(currentYear, startMonth);

			for (var j = 0; j < startDay; j += 1) {
				str +=			'<li><span></span><span></span></li>';
			}

			for (var k = 1; k <= monthDays;) {
				if (currentDate === k && (currentMonth + 1) === startMonth && currentYear === _this.currentYear) {
					str +=		'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ k +'" class="active-date"><span>今天</span></li>' +
								'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ (k+1) +'" class="active-date"><span>明天</span></li>';
					k += 2;
					priceIndex += 2;
					continue;
				}

				if (currentDate > k && (currentMonth + 1) === startMonth && currentYear === _this.currentYear) {
					str +=		'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ k +'" class="disabled"><span>'+ k +'</span></li>';
				} else {
					str +=		'<li date-formate="'+ currentYear +'/'+ startMonth +'/'+ k +'" class="active-date"><span>'+ k +'</span></li>';
					priceIndex += 1;
				}
				
				k += 1;
			}

			str +=			'</ul>' +
						'</div>' +
					'</div>';

			startMonth += 1;
		}

		return str;
	}

	// 创建日历
	Calendar.prototype.createElement = function () {
		var _this = this,
			currentYear = _this.currentYear,
			currentMonth = _this.currentMonth,
			currentDate = _this.currentDate,
			monthCount = _this.step ? _this.step : (12 - currentMonth),
			monthDays = 0,
			startMonth = _this.currentMonth + 1,
			priceIndex = 0;

		var str = 
				'<div class="calendar-wraper" id="calendar-wraper">' +
					'<div class="calendar-top-wraper">' +
						'<div class="calendar-top-title-wraper clearfix">' +
							'<div class="text">请选择取还机时间</div>' +
							'<div class="calendar-complete-button" id="calendar-complete-button">'+
								'<a href="javascript:;">完成</a>' +
							'</div>' +
						'</div>' +
						'<div class="week-bar">' +
							'<ul><li class="weekend">日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li class="weekend">六</li></ul>' +
						'</div>' +
						'<div class="current-month-bar" id="current-month-bar">'+ currentYear +'年'+(currentMonth+1)+'月</div>' +
					'</div>' +
					'<div class="calendar-bottom-wraper" id="calendar-bottom-wraper">';

		str += _this.priceData ? _this.renderPriceElement(currentYear, currentMonth, currentDate, monthCount, monthDays, startMonth, priceIndex)
							   : _this.renderNoPriceElement(currentYear, currentMonth, currentDate, monthCount, monthDays, startMonth, priceIndex);

		str += '</div></div>';

		return str;
	};

	// 移除所有已选中日期的相关class
	Calendar.prototype.removeClass = function (activeDate) {
		var _this = this,
			indexArry = _this.indexArry,
			i = indexArry[0],
			len = indexArry[1];

		for (; i <= len; i += 1) {
			activeDate[i].classList.remove('choose-date', 'checked-status');
		}
		
		activeDate = null;
	};

	// 开始时间<=>结束时间 开始索引<=>结束索引
	Calendar.prototype.reverseDate = function (activeDate) {
		var _this = this,
			startTime = _this.timeArry[0],
			endTime = _this.timeArry[1],
			diffVal = new Date(startTime).getTime() > new Date(endTime).getTime();

		if (endTime !== '' && startTime !=='' && diffVal) {
			_this.timeArry[1] = _this.timeArry.splice(0, 1, _this.timeArry[1])[0];
			_this.indexArry[1] = _this.indexArry.splice(0, 1, _this.indexArry[1])[0];
			_this.timeArry[1] = '';
			_this.removeClass(activeDate);
		}
	};

	// 添加或移除开始时间和结束时间之间的时间状态
	Calendar.prototype.changeStatus = function (activeDate, status) {
		var _this = this,
			indexArry = _this.indexArry,
			i = (indexArry[0] + 1),
			len = indexArry[1];
		
		if (status === 'checked') {
			for (i; i < len; i += 1) {
				activeDate[i].classList.add('checked-status');
			}
		} else if (status === 'cancel') {
			for (i; i < len; i += 1) {
				activeDate[i].classList.remove('checked-status');
			}
		}
		
		activeDate = null;
	};

	// 选择开始/结束时间
	Calendar.prototype.chooseDate = function () {
		var	_this = this,
			activeDate = oDoc.querySelectorAll('.active-date'),
			activeDateLen = activeDate.length,
			currentActiveDate = null;

		for (var i = 0; i < activeDateLen; i += 1) {
			currentActiveDate = activeDate[i];
			currentActiveDate.index = i;
			currentActiveDate.onclick = function () {
				if (_this.timeArry[0] === '') {
					_this.timeArry[0] = this.getAttribute('date-formate');
					_this.indexArry[0] = this.index;
				} else if (_this.timeArry[1] === '') {
					_this.timeArry[1] = this.getAttribute('date-formate');
					_this.indexArry[1] = this.index;
					_this.changeStatus(activeDate, 'checked');
				} else {
					_this.removeClass(activeDate);
					_this.timeArry[0] = this.getAttribute('date-formate');
					_this.timeArry[1] = '';
					_this.indexArry[0] = this.index;
				};

				_this.reverseDate(activeDate);

				if (_this.leastDays && _this.timeArry[0] && _this.timeArry[1] && parseInt(_this.indexArry[1], 10) - parseInt(_this.indexArry[0], 10) < _this.leastDays - 1) {
					_this.timeArry[1] = '';
					_this.changeStatus(activeDate, 'cancel');
					alert('最少选择' + _this.leastDays + '天！');
					return;
				}

				this.classList.add('choose-date');
			};

			currentActiveDate = null;
		}
	};

	// 点击确定
	Calendar.prototype.confirmDate = function () {
		var _this = this,
			completeBtn = oDoc.querySelector('#calendar-complete-button');

		completeBtn.onclick = function () {
			(_this.timeArry[0] !=='' && _this.timeArry[1] !== '') && _this.callback(_this.timeArry, _this.indexArry);
		};

		completeBtn = null;
	};

	// 日历滚动过程中显示当月
	Calendar.prototype.calendarScroll = function (calendarWraper) {
		var timer = null,
			currentMonthBar = oDoc.querySelector('#current-month-bar'),
			monthBar = oDoc.querySelectorAll('.month-bar');
		
		function getCurrentMonth () {
			timer && clearTimeout(timer);
			timer = setTimeout(function(){
				var calendarWraperScrollTop = this.scrollTop,
					mark = Math.floor(calendarWraperScrollTop / 260);
				monthBar[mark] && (currentMonthBar.innerText = monthBar[mark].innerText);
				timer = null;
			}.bind(this), 100);
		}

		calendarWraper.onscroll = getCurrentMonth;

		calendarWraper = null;
	};

	Calendar.prototype.init = function () {
		oDoc.body.appendChild(strToDom(this.createElement()));

		var calendarBottomWraper = oDoc.querySelector('#calendar-bottom-wraper'),
			calendarWraper = oDoc.querySelector('#calendar-wraper');

		calendarBottomWraper.style.height = calendarWraper.offsetHeight - 80 + 'px';

		this.chooseDate();
		this.confirmDate();
		this.calendarScroll(calendarWraper);

		calendarBottomWraper = null;
	};

	return Calendar;
});
