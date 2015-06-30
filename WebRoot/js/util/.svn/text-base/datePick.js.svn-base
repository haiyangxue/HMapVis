var a;
(function() {
	var datePicker = a = function(t, l, inputFrameId) {
		var bodyWidth = document.body.offsetWidth;
		if (bodyWidth - l < 346) {
			l = bodyWidth - 346;
		}

		this.targetFrameId = inputFrameId;
		this.year = 0;
		this.isLeap = 0;// 0 not leap year while 1 is leap year
		this.month = 0;
		this.day = 0;
		this.hour = 0;
		this.min = 0;

		this.dayP = {};
		this.monthP = {};
		this.hourP = {};
		this.minP = {};

		this.backCover = document.createElement("div");
		this.backCover.className = "bgDiv";
		this.backCover.id = "backcover";
		document.body.appendChild(this.backCover);

		this.wrapper = document.createElement("span");
		this.wrapper.className = "dateWrap";
		this.wrapper.style.position = "absolute";
		this.wrapper.style.top = t + "px";
		this.wrapper.style.left = l + "px";

		// the year picker which is a input frame in which user can enter the
		// year.
		this.yp = document.createElement("input");
		this.yp.className = "yearPicker";
		this.yp.id = "yp";
		this.yp.setAttribute("value", "2000");
		this.wrapper.appendChild(this.yp);
		this.wrapper.innerHTML += "<span> 年 </span>";

		// the month picker which user can select a month
		this.mp = document.createElement("input");
		this.mp.type = "text";
		this.mp.className = "monthPicker";
		this.mp.id = "mp";
		this.mp.setAttribute("value", "1");
		this.mp.readonly = "readonly";
		this.wrapper.appendChild(this.mp);
		this.wrapper.innerHTML += "<span> 月 </span>";

		// the day picker which user can select a single day
		this.dp = document.createElement("input");
		this.dp.type = "text";
		this.dp.className = "dayPicker";
		this.dp.id = "dp";
		this.dp.setAttribute("value", "1");
		this.wrapper.appendChild(this.dp);
		this.wrapper.innerHTML += "<span> 日 </span>&nbsp&nbsp";

		// the time picker to choose hour and minute
		this.thp = document.createElement("input");
		this.thp.type = "text";
		this.thp.className = "hourPicker";
		this.thp.id = "thp";
		this.thp.setAttribute("value", "0");
		this.wrapper.appendChild(this.thp);
		this.wrapper.innerHTML += "<span> : </span>";

		this.tmp = document.createElement("input");
		this.tmp.type = "type";
		this.tmp.className = "minPicker";
		this.tmp.id = "tmp";
		this.tmp.setAttribute("value", "0");
		this.wrapper.appendChild(this.tmp);
		this.wrapper.innerHTML += "&nbsp&nbsp";

		// ok button
		this.ok = document.createElement("input");
		this.ok.type = "button";
		this.ok.value = "确定";
		this.ok.id = "ok";
		this.ok.className = "confirm";
		this.wrapper.appendChild(this.ok);

		document.body.appendChild(this.wrapper);

		this.init();
	};

	datePicker.prototype.init = function() {
		var that = this;

		document.getElementById("backcover").onclick = function() {
			document.body.removeChild(that.backCover);
			document.body.removeChild(that.wrapper);
		}

		document.getElementById("yp").onfocus = function() {
			if (that.monthP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.monthP);
			} else if (that.dayP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.dayP);
			} else if (that.hourP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.hourP);
			} else if (that.minP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.minP);
			}
		}
		document.getElementById("mp").onfocus = function() {
			if (that.dayP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.dayP);
			} else if (that.hourP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.hourP);
			} else if (that.minP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.minP);
			}

			that.monthP = document.createElement("div");
			that.monthP.className = "monthPanel";

			for (i = 1; i < 13; i++) {
				var d = document.createElement("div");
				d.innerHTML = i;
				d.className = "smallBlock";
				d.onclick = (function(i) {
					return function() {
						chooseMonth(i);
					};
				})(i);
				that.monthP.appendChild(d);
			}

			that.wrapper.appendChild(that.monthP);
		}

		document.getElementById("dp").onfocus = function() {
			if (that.monthP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.monthP);
			} else if (that.hourP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.hourP);
			} else if (that.minP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.minP);
			}

			that.dayP = document.createElement("div");
			that.dayP.className = "dayPanel";

			var inputY = document.getElementById("yp").value;
			if (isNaN(inputY)) {
				that.isLeap = 0;
			} else {
				that.year = inputY;
				if (inputY % 4 == 0) {
					that.isLeap = 1;
				} else {
					that.isLeap = 0;
				}
			}
			var monthNum = document.getElementById("mp").value;
			if (monthNum == 4 || monthNum == 6 || monthNum == 9
					|| monthNum == 11) {
				that.dayP.style.height = "160px";
				for (i = 1; i < 31; i++) {
					var d = document.createElement("div");
					d.innerHTML = i;
					d.className = "smallBlock";
					d.onclick = (function(i) {
						return function() {
							chooseDay(i);
						};
					})(i);
					that.dayP.appendChild(d);
				}
			} else if (monthNum == 2) {
				that.dayP.style.height = "160px";
				if (that.isLeap == 0) {
					for (i = 1; i < 29; i++) {
						var d = document.createElement("div");
						d.innerHTML = i;
						d.className = "smallBlock";
						d.onclick = (function(i) {
							return function() {
								chooseDay(i);
							};
						})(i);
						that.dayP.appendChild(d);
					}
				} else if (that.isLeap == 1) {
					for (i = 1; i < 30; i++) {
						var d = document.createElement("div");
						d.innerHTML = i;
						d.className = "smallBlock";
						d.onclick = (function(i) {
							return function() {
								chooseDay(i);
							};
						})(i);
						that.dayP.appendChild(d);
					}
				}
			} else {
				that.dayP.style.height = "185px";
				for (i = 1; i < 32; i++) {
					var d = document.createElement("div");
					d.innerHTML = i;
					d.className = "smallBlock";
					d.onclick = (function(i) {
						return function() {
							chooseDay(i);
						};
					})(i);
					that.dayP.appendChild(d);
				}
			}

			that.wrapper.appendChild(that.dayP);
		}

		document.getElementById("thp").onfocus = function() {
			if (that.monthP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.monthP);
			} else if (that.dayP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.dayP);
			} else if (that.minP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.minP);
			}

			that.hourP = document.createElement("div");
			that.hourP.className = "hourPanel";

			for (i = 0; i < 24; i++) {
				var d = document.createElement("div");
				d.innerHTML = i;
				d.className = "smallBlock";
				d.onclick = (function(i) {
					return function() {
						chooseHour(i);
					};
				})(i);
				that.hourP.appendChild(d);
			}

			that.wrapper.appendChild(that.hourP);
		}

		document.getElementById("tmp").onfocus = function() {
			if (that.monthP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.monthP);
			} else if (that.dayP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.dayP);
			} else if (that.hourP.parentNode == that.wrapper) {
				that.wrapper.removeChild(that.hourP);
			}

			that.minP = document.createElement("div");
			that.minP.className = "minPanel";
			that.minP.id = "minP";

			for (i = 0; i < 6; i++) {
				var d = document.createElement("div");
				d.innerHTML = i + "0";
				d.className = "smallBlock";
				d.onclick = (function(i) {
					return function() {
						chooseMinTen(i);
					};
				})(i);
				that.minP.appendChild(d);
			}

			that.wrapper.appendChild(that.minP);
		}
		/*
		 * document.getElementById("dp").onblur = function(){
		 * that.wrapper.removeChild(that.dayP); }
		 */
		document.getElementById("ok").onclick = function() {
			that.checkInput();
		}

		function chooseMonth(monthNum) {
			document.getElementById("mp").value = monthNum;
			that.wrapper.removeChild(that.monthP);
		}
		function chooseDay(dayNum) {
			document.getElementById("dp").value = dayNum;
			that.wrapper.removeChild(that.dayP);
		}
		function chooseHour(hourNum) {
			document.getElementById("thp").value = hourNum;
			that.wrapper.removeChild(that.hourP);
		}
		function chooseMinTen(minTen) {
			while (that.minP.hasChildNodes()) {
				that.minP.removeChild(that.minP.firstChild);
			}
			for (i = 0; i < 10; i++) {
				var d = document.createElement("div");
				d.innerHTML = "" + minTen + i;
				d.className = "smallBlock";
				d.onclick = (function(i) {
					return function() {
						chooseMin(minTen, i);
					};
				})(i);
				that.minP.appendChild(d);
			}
		}
		function chooseMin(minTen, minNum) {
			document.getElementById("tmp").value = minTen + "" + minNum;
			that.wrapper.removeChild(that.minP);
		}

	};

	datePicker.prototype.checkInput = function() {
		if (this.monthP.parentNode == this.wrapper) {
			this.wrapper.removeChild(this.monthP);
		} else if (this.dayP.parentNode == this.wrapper) {
			this.wrapper.removeChild(this.dayP);
		} else if (this.hourP.parentNode == this.wrapper) {
			this.wrapper.removeChild(this.hourP);
		} else if (this.minP.parentNode == this.wrapper) {
			this.wrapper.removeChild(this.minP);
		}

		var inputY = document.getElementById("yp").value;
		var inputM = document.getElementById("mp").value;
		var inputD = document.getElementById("dp").value;
		var inputH = document.getElementById("thp").value;
		var inputMin = document.getElementById("tmp").value;
		// alert(inputY+" "+inputM+" "+inputD+" "+inputH+" "+inputMin);
		if (isNaN(inputY)) {
			alert("请输入正确年份");
		} else {
			this.year = inputY;
			if (inputY % 4 == 0) {
				this.isLeap = 1;
			} else {
				this.isLeap = 0;
			}
		}

		this.month = inputM;

		if (inputM == 4 || inputM == 6 || inputM == 9 || inputM == 11) {
			if (inputD == 31) {
				alert("请输入正确日期");
			} else {
				this.day = inputD;
			}
		} else if (inputM == 2) {
			if (this.isLeap == 0) {
				if (inputD > 28) {
					alert("请输入正确日期");
				} else {
					this.day = inputD;
				}
			} else {
				if (inputD > 29) {
					alert("请输入正确日期");
				} else {
					this.day = inputD;
				}
			}
		} else {
			this.day = inputD;
		}

		this.hour = inputH;
		this.min = inputMin;
		var timeStr = "" + this.year + "-";
		if (this.month > 9) {
			timeStr += this.month + "-";
		} else {
			timeStr += "0" + this.month + "-";
		}
		if (this.day > 9) {
			timeStr += this.day + " ";
		} else {
			timeStr += "0" + this.day + " ";
		}
		if (this.hour > 9) {
			timeStr += this.hour + ":";
		} else {
			timeStr += "0" + this.hour + ":";
		}
		if (this.min > 9) {
			timeStr += this.min;
		} else {
			timeStr += "0" + this.min;
		}
		document.getElementById(this.targetFrameId).value = timeStr;
		/*
		 * if(this.month > 9 && this.day > 9 && this.hour > 9 && this.min > 9){
		 * document.getElementById(this.targetFrameId).value = this.year + "-" +
		 * this.month + "-" + this.day + " " + this.hour + ":" + this.min; }else
		 * if()
		 */
		document.body.removeChild(this.wrapper);
		document.body.removeChild(this.backCover);
	};
})();