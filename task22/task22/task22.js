function actButtons() {
	var buttons = document.getElementsByTagName('button');
	var root1 = document.getElementById('rootOne');
	var len = buttons.length;
	for(var i =0;i < len; i++) {
		var button = buttons[i];
		var buttonId = buttons[i].id;
		console.log('1');
		if(buttonId === 'preorder') {
			button.onclick = function() {
				reset();
				preOrder(root1);
				changeBorder();
			}
		} else if(buttonId === 'inorder') {
			button.onclick = function() {
				reset();
				inOrder(root1);
				changeBorder();
			}
			
		} else {
			button.onclick = function() {
				reset();
				postOrder(root1);
				changeBorder();
			}
		}

	}
}
var divList = [];
var timeber = null;
function preOrder(node) {
	if(node !== null) {
		divList.push(node);
		preOrder(node.firstElementChild);
		preOrder(node.lastElementChild);
	} 
}
function inOrder(node) {
	if(node !== null) {
		inOrder(node.firstElementChild);
		divList.push(node);
		inOrder(node.lastElementChild);
	}
}
function postOrder(node) {
	if(node !== null) {
		postOrder(node.firstElementChild);
		divList.push(node);
		postOrder(node.lastElementChild);
	}
}
/*
function changeBorder(node) {
	var i = 0, len = divList.length;
	divList[i].style.border = "2px solid red";
	timeber = setInterval(function() {//把setInterval赋值给另外一个变量的时候，就创建了一个闭包。
		i++;
		if(i < len) {
			divList[i-1].style.border = '1px solid black';
			divList[i].style.border = '2px solid red';
		} else {
			clearInterval(timeber);
			divList[len - 1].style.border = '1px solid black';
		}
	},1000);
}
*/
function changeBorder(node) {
	var i = 0; len = divList.length;
	divList[i].style.backgroundColor = "red";
	setInterval(function() {
		i++;
		if(i < len) {
			divList[i-1].style.backgroundColor = '#fff';
			divList[i].style.backgroundColor = 'red';
		} else {
			clearInterval();
			divList[len-1].style.backgroundColor = '#fff';
		}
	},5000);
}
function reset() {
	var roots = document.getElementsByTagName('root');
	var len = roots.length;
	clearInterval();
	for(var i = 0;i < len; i++) {
		roots[i].style.backgroundColor = "#fff";
	}
}
function init() {
	actButtons();
	
}
init();






/*
function preOrder(node,oldNode) {
	var previousRoot,nextNode;
	if(oldNode) {
		oldNode.style.border = "1px solid black";
	}
	node.style.border = '2px solid red';
	if(node.childElementCount !== 0) {
		setTimeout(function () {
			
			preOrder(nextNode, previousRoot);
		}, 2000);
		if(node === node.parentNode.firstElementChild) {
			nextNode = node.firstElementChild;
			previousRoot = node;
			setTimeout(function () {
				preOrder(nextNode,previousRoot)
			}, 2000);
		} 
	} else {
		previousRoot = node;
		nextNode = node.parentNode.lastElementChild;
		setTimeout(function () {
				preOrder(nextNode,previousRoot)
			}, 2000);
	}
}
*/