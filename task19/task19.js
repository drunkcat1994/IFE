//初始化队列，创建数字模块
var nowData = {
	direction:"right",
	action:"input",
	times:0
}

//删除box
function deleteBox() {
	var board = document.getElementById("show-board");
	var boxs = board.getElementsByTagName("div");
	if(nowData.times !== 1) {
		if(nowData.direction === "left") {
			board.removeChild(board.firstChild);
		} else {
			board.removeChild(board.lastChild);
		}
	}
	var len = board.getElementsByTagName("div").length;
	return len;
}

function buttonReact() {
	var buttons = document.getElementsByTagName("button");
	var len = buttons.length;
	var sum = 0;
	for(var i = 0;i < len-1;i++) {
		buttons[i].addEventListener("click",function(event) {
			nowData.times++;
			var input1 = document.getElementById("input1");//获取输入框的值
			var num = input1.value;
			var goal = event.target.id;
			nowData.direction = goal.slice(0,4);
			nowData.action = goal.slice(-5);
			if(nowData.action === "input") {
				if(!checkValue(num)) {//怎样在js中终止函数。
					return;
				}
				if(!checkSum(sum)) {
					return;
				}
				sum = insertBox(num,sum);//每次创建完box后，返回box的总数
			} else {
				sum = deleteBox();
			}
		});
		
	}
	
}
//判断输入值是否满足在10-100的要求，不满足时警告用户
function checkValue(num) {
	if(num < 10 || num >100) {
		alert("请输入10到100之间的数");
		return false;
	}
	return true;
}
function checkSum(sum) {
	if(sum >= 60) {
		alert("超过允许添加的数量");
		return false;
	}
	return true;
}
//单独绑定sort按钮
function sortButton() {
	var sortButton = document.getElementById("sort");
	sortButton.addEventListener("click",function(){
		sort();
	});
}
//按高度排列所有box
function sort() {
	var board = document.getElementById("show-board")
	var boxs = board.getElementsByTagName("div");
	var len1 = boxs.length,hData = new Array;
	for(var i = 0; i < len1; i++) {
		hData[i] = boxs[i].style.height.slice(0,-2);
		console.log(hData[i]);
	}
	var len = hData.length,temp;
	for(var i = 0; i < len; i++) {
		for(var j = i; j < len; j++) {
			if(hData[j] > hData[i]) {
				temp = hData[i];
				hData[i] = hData[j];
				hData[j] = temp;
			}
		}
	}
	for(var i = 0;i < len1; i++) {
		boxs[i].style.height = hData[i] + "px";
	}

}
//渲染队列
//创建box，并判断时左进还是右进
function insertBox(num,sum) {
	var stopSign = checkSum(sum);//用于终止insertbox程序
	var board = document.getElementById("show-board");
	var box = document.createElement("div");
	var newNum = num*2;
	box.style = 'height:' + newNum + "px";
	box.id = "box" + num;//此处并没有规避相同输入导致id同名的问题
	box.addEventListener("click",function(event) {
		//var deleteNode = document.getElementById(event.target.id);
		board.removeChild(event.target);
	});
	if(nowData.direction === "left") {
		if(nowData.times == 1) {
			board.appendChild(box);
		} else {
			var bro = board.firstChild;
			board.insertBefore(box,bro);
		}
		
	} 
	else {
		board.appendChild(box);
	}
	var len = board.getElementsByTagName("div").length;
	return len;
}
function init() {
	buttonReact();
	sortButton();
}
init();