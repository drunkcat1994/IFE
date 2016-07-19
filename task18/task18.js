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
	
}
//给每个按钮绑定相应的事件
function buttonReact() {
	var buttons = document.getElementsByTagName("button");
	var len = buttons.length;
	for(var i = 0;i < len;i++) {
		buttons[i].addEventListener("click",function(event) {
			nowData.times++;
			var input1 = document.getElementById("input1");
			var num = input1.value;
			var goal = event.target.id;
			nowData.direction = goal.slice(0,4);
			nowData.action = goal.slice(-5);
			if(nowData.action === "input") {
				insertBox(num);
			} else {
				deleteBox();
			}
		});
		
	}
	
}

//渲染队列
//创建box，并判断时左进还是右进
function insertBox(num) {
	var board = document.getElementById("show-board");
	var box = document.createElement("div");
	box.innerHTML = num;
	box.id = "box" + num;
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
}



//当button被点击时，获取id,并储存在当前页面数据里
//function getButtonId(event) {
	

//}
//给每个盒子再绑定点击即删除事件
/*function clickToDelete() {
	var board = document.getElementById("show-board");
	var boxs = board.getElementsByTagName("div");
	var len = boxs.length;
	for(var i = 0;i < len; i++) {
		var board = document.getElementById("show-board");
		boxs[i].addEventListener("click",function(event) {
			var deleteNode = document.getElementById(event.target.id);
			console.log(deleteNode);
			board.removeChild(deleteNode);
			//event.target.style= "display:none";//注意与opacity:0 二者的区别。
		});
	}
}
*/
function init() {
	buttonReact();
}
init();