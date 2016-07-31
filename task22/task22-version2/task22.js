var nodeList = [];
function actButtons() {
	var buttons = document.getElementsByTagName('button');
	var root1 = document.getElementById('rootone');
	var len = buttons.length;
	for(var i = 0; i < len; i++) {
		buttons[i].onclick = function() {
			if(this.id === 'preOrder') {
				preOrder(root1);
				console.log(nodeList[0].id);
				changeColor();
			} else if(this.id === 'inOrder') {
				inOrder(root1);
				changeColor();
			} else {
				postOrder(root1);
				changeColor();
			}
		}
		
	}
}
function preOrder(node) {
	if(node !== null ) {
		nodeList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	}
	
}
function inOrder(node) {
	if(node !== null) {
		inOrder(node.firstElementChild);
		nodeList.push(node);
		inOrder(node.lastElementChild);
	}
}
function postOrder(node) {
	if(node !== null) {
		postOrder(node.firstElementChild);
		postOrder(node.lastElementChild);
		nodeList.push(node);
	}
}
var i = 0;
function changeColor() {
	var len = nodeList.length,timer;
	if(i < len) {
		if(i === 0) {
			nodeList[i].style.backgroundColor = 'red';
			timer = setTimeout(function() {
				changeColor();
			},1000);

		} else{
			nodeList[i-1].style.backgroundColor = 'white';
			nodeList[i].style.backgroundColor = 'red';
			timber = setTimeout(function() {
				changeColor();
			},1000);
		}
		i++;
	} else {
		nodeList[i-1].style.backgroundColor = 'white';
		clearTimeout(timber);
	}
}
function init() {
	actButtons();
}
init();