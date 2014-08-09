window.onload=init;
function init(){
	var ele=document.getElementsByTagName('a');
	for(var i=0;i<ele.length;i++){
		if(ele[i].getAttribute('data-toggle')=='collapse'){
			ele[i].onclick=toggleMe;
		}
	}
}
function toggleMe(){
	var t=this.getAttribute('data-target');
	var ele=document.getElementById(t);
	if(ele.className.match(/hide/)){
		ele.className=ele.className.replace('hide','show');
	}
	else{
		ele.className=ele.className.replace('show','hide');
	}
}