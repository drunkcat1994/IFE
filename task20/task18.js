//初始化队列，创建数字模块
var nowData = {
	direction:"right",
	action:"input",
	times:0
}
var textData = new Array;
//渲染队列
//创建box，并判断时左进还是右进
function insertBox(num) {
	var board = document.getElementById("show-board");
	var box = document.createElement("div");
	box.innerHTML = num;
	//box.id = "box" + num;
	box.addEventListener("click",function(event) {
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
	
}
//给每个按钮绑定相应的事件
function buttonReact() {
	var buttons = document.getElementsByTagName("button");
	var len = buttons.length;
	for(var i = 0;i < len-1;i++) {
			buttons[i].addEventListener("click",function(event) {
			nowData.times++;
			var textInput1 = document.getElementById("input1").value;//怎样获得textarea的内容？
			console.log(textInput1);
			cutString(textInput1);
			var len2 = textData.length;

			var goal = event.target.id;
			nowData.direction = goal.slice(0,4);
			nowData.action = goal.slice(-5);
			if(nowData.action === "input") {
				for(var j = 0; j < len2; j++) {
					var num = textData[j];
					insertBox(num);//注意此时num并不只是数字，还可能是文字段
				}	
			} else {
				deleteBox();
			}
		});
		
	}
	
}
//截取字符串
function cutString(str) {
	var len = str.length;
	var preData = "",j = 0;
	for(var i = 0; i < len; i++) {
		if(str[i] !== ' ' && str[i] !=='\n' && str[i] !== '、' && str[i] !== '，' && str[i] !== ',' ) {
			preData += str[i];
		} else {
	
			textData[j] = preData;
			preData = "";
			j++;
		}

	}
	if(i === len) {
		textData[j] = preData;
		console.log(textData[j]);
	}
}
//给查询按钮绑定事件
function actSearchButton() {
	var input2 = document.getElementById("input2");
	var buttonSearch = document.getElementById("searchButton");
	var board = document.getElementById("show-board");
	buttonSearch.addEventListener("click",function() {//前面的代码有给每个遍历到的button添加事件，所以这里可能会导致重复
		var searchValue = input2.value;
		var boxs = board.getElementsByTagName("div");
		var len = boxs.length;

		for(var i = 0; i < len; i++) {
			var samValue = boxs[i].textContent;
			if(searchValue === samValue) {
				boxs[i].style.backgroundColor = "red";//在js中使用html的style属性，需要驼峰式。
			} else {
				boxs[i].style.backgroundColor = "green";
			}

		}
	});
}
function init() {
	buttonReact();
	actSearchButton();
}
init();

/*
1、对textarea的内容的判断，
2、用回车，逗号（全角半角均可），顿号，空格（全角半角、Tab等均可）作为空格
3、查询：点击查询按钮的时候获取要查询的值，遍历所有box的值，将相同的box的颜色改变。
问题：
1、不能正确的读取换行符、textarea内文本结尾的那个字符无法读取到。
2、查询按钮在每次点击时，需将所有box的背景色初始化为同样的颜色。
知识点：
textarea换行是\n 换行符
value 和 nodeValue
*/