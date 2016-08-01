var nodeList = [];
function actButtons() {
	var controlDiv = document.getElementById('control');
	var buttons = controlDiv.getElementsByTagName('button');
	var root1 = document.getElementById('root1');
	console.log(root1.childElementCount);

	var len = buttons.length;
	for(var i = 0; i <len; i++) {
		buttons[i].onclick = function() {
			if(this.id === 'preOrder') {
				reSet();
				preOrder(root1);
				changeColor(null);
			} 
			if(this.id === 'postOrder') {
				reSet();
				postOrder(root1);
				changeColor(null);
			}
			if(this.id === 'search') {
				var search = document.getElementById("searchContent");
				var searchContent = search.value;
				console.log(searchContent);
				preOrder(root1);
				changeColor(searchContent);

			}
		}
	}
}
function reSet() {
	nodeList = [];

}
function preOrder(node) {
	if(node !== null) {
		nodeList.push(node);
		var len = node.childElementCount;
		if(node.hasChildNodes()) {
			for(var i = 0; i < len; i++) {
				preOrder(node.children[i]);//将子节点每次存入到一个数组内;
			}
		}
	}
}
function postOrder(node) {
	if(node !== null) {
		var len = node.childElementCount;
		if(node.hasChildNodes()) {
			for(var i = 0; i < len; i++) {
				postOrder(node.children[i]);
				nodeList.push(node.children[i]);
			}
		}

	}
}
var i = 0;
function changeColor(searchContent) {
	var len = nodeList.length;
	console.log(searchContent);
	var value = nodeList[i].firstChild.nodeValue.trim();
	if(value === searchContent) {
		nodeList[i].style.border = "2px solid blue";
	}
	console.log(value);
	nodeList[i].style.backgroundColor = "red";
	var timer = setInterval(function() {
		i++;
		if(i < len) {
			nodeList[i - 1].style.backgroundColor = 'white';
			nodeList[i].style.backgroundColor = 'red';
			if(nodeList[i].firstChild.nodeValue.trim()  === searchContent) {
				nodeList[i].style.border = "2px solid blue";
				console.log('1');
			}
		} else {
			clearInterval(timer);
			nodeList[len - 1].style.backgroundColor = "white";
		}
	},2000);
}
function init() {
	actButtons();
}
init();