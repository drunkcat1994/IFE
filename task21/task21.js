//遇到分隔号就添加tag
var  tagsData = new Array;
var dataNow = new Array;
//取得当前的数据
function getDatanow() {
	var tagsboard1 = document.getElementById("tagsboard1");
	var tags = tagsboard1.getElementsByTagName("span");
	var len = tags.length;
	for(var i = 0; i < len; i++) {
		dataNow[i] = tags[i].nodeValue;
	}
}
function getHabitsnow() {
	var tagsBoard = document.getElementById("tagsboard2");
	var tags = tagsBoard.getElementsByTagName("span");
	var len = tags.length;
	for(var i = 0; i < len ; i++) {
		habitsNow[i] = tags[i].nodeValue;//nodevalue和value到底是什么区别？
	}
}
function addTags() {
	var tagsInput = document.getElementById("tagsInput");
	tagsInput.addEventListener("change",function(event) {
		var tagsValue = event.target.value;
		cutString(tagsValue);
	});
}
function cutString(text) {
	var len1 = text.length;
	var preData = "", j = 0;
	for( var i = 0; i < len1; i++) {
		if( text[i] !== " " && text[i] !== "," && text[i] !== "\r" && text[i] !== "，") {
			preData += text[i];
		} else {
			getDatanow();
			if(tagsData.indexOf(preData) === -1 && dataNow.indexOf(preData) === -1) {//第一次显然不用这个判断
				tagsData[j] = preData;
				createTags(preData);
				preData = "";
				j++;
			} else {
				preData = "";
			}
		}
	}
	if( i === len1 ) {
		if(tagsData.indexOf(preData) === -1 && dataNow.indexOf(preData) === -1) {//第一次显然不用这个判断
			tagsData[j] = preData;
			createTags(preData);
		}
	}
}
//判断显示到页面中的tag的数量，超过十个的时候对其进行处理
function controlTags() {
	var tagsboard1 = document.getElementById("tagsboard1");
	var tags = tagsboard1.getElementsByTagName("span");
	var len = tags.length;
	if(len > 10) {
		var deleteNum = len - 10;
		for(var i = 0; i < deleteNum; i++) {
			tagsboard1.removeChild(tags[i]);
		}
	}
}
function createTags(tag) {
	var tagsBoard = document.getElementById("tagsboard1");
	var newTag = document.createElement("span");
	newTag.innerHTML = tag;
	newTag.addEventListener("mouseover",function(event) {
		var target = event.target;
		target.style.backgroundColor = "red";
		target.innerHTML = "点击删除" + tag;
		target.onclick = function() {
			tagsBoard.removeChild(this);
		}
		/*
		target.addEventListener("click",function(event) {
			var target = event.target;
			tagsBoard.removeChild(target);
		});
		*/
	});
	newTag.addEventListener("mouseout",function(event) {
		var target = event.target;
		target.style.backgroundColor = "blue";
		target.innerHTML = tag;
	})
	tagsBoard.appendChild(newTag);
	controlTags();
}
//使input一聚焦就选中所有文本
function autoFocus() {
	var tagsInput = document.getElementById("tagsInput");
	var habitsInput = document.getElementById("habits");
	tagsInput.addEventListener("focus",function(event) {
		event.target.select();
	});
	habitsInput.addEventListener("focus",function(event) {
		event.target.select();
	});
}
//绑定提交兴趣按钮
var habitsData = new Array;
var habitsNow = new Array;
function addHabits() {
	var button = document.getElementById("button1");
	button.addEventListener("click",function(event) {
		var habits = document.getElementById("habits");
		var habitsText = habits.value;
		//拆分获得的habits字符串
		cutHabits(habitsText);
		createHabits(habitsData);
		controlHabits();
	});
}
function controlHabits() {
	var tagsBoard = document.getElementById("tagsboard2");
	var tags = tagsBoard.getElementsByTagName("span");
	var len = tags.length;
	if(len > 10) {
		var deleteNum = len - 10;
		for(var i = 0; i < deleteNum;i++) {
			tagsBoard.removeChild(tags[i]);
		}
	}
}
function cutHabits(str) {
	var len = str.length;
	var preData = "",j = 0;
	for(var i = 0; i < len; i++) {
		if(str[i] !== '\r' && str[i] !== ',' && str[i] !== '，' && str[i] !== '、' && str[i] !== '\n') {
			preData += str[i];
		} else {
			if( habitsData.indexOf(preData) === -1 && habitsNow.indexOf(preData)) {
				habitsData[j] = preData;
				preData = "";
				j++;
			} else {
				preData = "";
			}
		}
	}
	if(i = len -1) {
		if( habitsData.indexOf(preData) === -1 && habitsNow.indexOf(preData)) {
				habitsData[j] = preData;
				preData = "";
				j++;
			} else {
				preData = "";
			}
	}
}
function createHabits(arr) {
	var tagsBoard = document.getElementById("tagsboard2");
	var len = arr.length;
	for(var i = 0; i < len; i++) {
		var newHabit = document.createElement("span");
		newHabit.innerHTML = arr[i];
		tagsBoard.appendChild(newHabit);
	}
}

function init() {
	addTags();
	autoFocus();
	addHabits();
}
init();
