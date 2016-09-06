
var xhr = new XMLHttpRequest();

xhr.open('GET', 'example.php');

xhr.send();

xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		alert( xhr.responseText );
	} else {
		alert( xhr.statusText );
	}
}


var xhr = new XMLHttpRequest();

xhr.timeout = 3000;

xhr.ontimeout = function(event) {
	alert('请求超时！')
}