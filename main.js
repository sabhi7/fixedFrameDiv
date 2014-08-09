(function(){
	var iparent,iframes;
	addEvent('DOMContentLoaded',document,function(){
		iparent=document.getElementsByClassName('vtc-bills');
		iwrapper=document.getElementsByClassName('vtc-iwrapper');

		for(var i=0;i<iparent.length;i++){
			addEvent(['click', 'mouseover'],iparent[i],display);
		}

		addEvent('click',document,hideFrames);

	});

	

	function display(){
		var target=document.getElementById(this.getAttribute('data-vtctarget'));
		removeClass(target,'vtc-iwrapperH');
		target.style.bottom=0+"px";
		target.style.left=120+"px";
	}

	/*** Helper functions****/
	function addEvent(events, el, fn) {
	  if (!(events instanceof Array)) events = [events];
	  for (var i=0; i<events.length; i++) {
      var event = events[i];
      if (el.addEventListener) {
        el.addEventListener(event, fn, false);
      } else if (el.attachEvent) {
        el.attachEvent('on' + event, fn);
      } else {
        el[event] = fn;
      }
	  }
		}

 function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }

  function addClass(ele, cls) {
    if (!hasClass(ele, cls)) ele.className += " " + cls;
  }

  function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)', 'g');
      ele.className = ele.className.replace(reg, ' ');
    }
  }
  function resetFrame(iframe){
    iframe.style.top = '';
    iframe.style.bottom = '';
    iframe.style.left = '';
    iframe.style.right = '';
  }

  function hideFrames() {
    for(var i=0; i<iwrapper.length; i++) {
      addClass(iwrapper[i], 'vtc-iwrapperH');
    }
  }

})();