(function(){
	var iparent,iwrapper,iframes,iactive,base_url;
  var ie = (window.navigator.userAgent.indexOf('MSIE ') > -1) || (window.navigator.userAgent.indexOf('Trident/') > -1);
  var base_url="*";
  var scrollTimer = -1;

	addEvent('DOMContentLoaded',document,function(){

      // Save handle to our wrappers and iframes
		iparent=document.getElementsByClassName('vtc-bills');
		iwrapper=document.getElementsByClassName('vtc-iwrapper');
    iframes=document.getElementsByClassName('vtc-iframe');
      
      // Handle mouse events 
		for(var i=0;i<iparent.length;i++){
			addEvent(['click', 'mouseover','touchstart'],iparent[i],display);
		}

      // Handle iframe sizing
    for(var i=0; i<iframes.length; i++) {
      addEvent('load', iframes[i], function() {
        this.contentWindow.postMessage(ie+":"+ this.getAttribute('data-vtcparent'), base_url);
      });
    }

	});

  addEvent('resize', window, function() {
    if (typeof iactive !== 'undefined') display.apply(iactive);
  });

  addEvent(['click', 'touchstart'], document, function(event) {
    hideFrames();
    setActive(undefined);
  });

  addEvent(['scroll', 'mousewheel', 'DOMMouseScroll'], window, function() {
    if (typeof(iactive) !== 'undefined') {
      if (scrollTimer != -1) clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(reposition, 250);
      reposition();
    }
  });

	addEvent('message', window, function(event) {
    var id = event.data.iframeWrapper_id;
    var iframeWrapper = document.getElementById(id);
    iframeWrapper.style.height = (event.data.height +4 ) + 'px';
    iframeWrapper.style.width = (event.data.width +4) + 'px';
    /*if (event.origin === base_url) {
      switch (event.data.type) {
        case 'resize':
          var id = event.data.iframe_id;
          var iframe = document.getElementById(id);
          iframe.style.height = (event.data.height + 4) + 'px';
          iframe.style.width = (event.data.width + 4) + 'px';
          console.log("width is="+iframe.style.width);
          break;
        case 'logged_in_state':
          if (typeof(logged_in_state) !== 'undefined' && logged_in_state !== event.data.logged_in) {
            var active_id = (typeof(iactive) !== 'undefined' ? iactive.getAttribute('data-vtctarget') : '');

            for(var i=0; i<iframes.length; i++) {
              var iframe = iframes[i];
              var iframe_id = iframe.getAttribute('id');
              if (active_id !== iframe_id) iframe.contentWindow.location.reload();
            }
          }
          logged_in_state = event.data.logged_in;
          break;
      }
    }*/
  });

	function display(event){
    if (typeof event !== 'undefined') event.stopPropagation();
    hideFrames();
    removeClass(this, 'vtc\\-i\\-.*');
		var target=document.getElementById(this.getAttribute('data-vtctarget'));
    addClass(this, myposition(this,target));
		removeClass(target,'vtc-iwrapperH');
    setActive(this);
	}

  function myposition(ele,iframeWrapper){
    var viewWidth=document.documentElement.clientWidth;
    var viewHeight=document.documentElement.clientHeight;
    var bill=ele.getBoundingClientRect();
    var towardsTop= (function(){ return ((viewHeight - bill.bottom) < 400 && bill.top > 400); })();
    resetFrame(iframeWrapper);

      /* displayed on right side*/
    if(viewWidth-bill.right>510){
      iframeWrapper.style.left = bill.right + 20 + "px";
      if(towardsTop) iframeWrapper.style.bottom = viewHeight - bill.bottom - 70 + "px";
      else  iframeWrapper.style.top=bill.top - 50 + "px";
      return ("vtc-i-right");
    } 
      /*display on left*/
    if (bill.left > 510) {
        iframeWrapper.style.right = viewWidth - bill.left + 20 + "px";
        if(towardsTop) iframeWrapper.style.bottom = viewHeight - bill.bottom - 70 + "px";
        else iframeWrapper.style.top = bill.top - 50 + "px";
        return("vtc-i-left");
    }  
      /* displayed on left side */
    if (bill.left < (viewWidth/2)) {
      iframeWrapper.style.top = bill.bottom + 23 + "px";
      if (bill.left < (viewWidth/4))  iframeWrapper.style.left = bill.left - 30 + "px";
      else  iframeWrapper.style.left = bill.left - 150 + "px";
      return "vtc-i-bottom";
    }
     /*default  displayed on bottom*/ 
    iframeWrapper.style.top = bill.bottom + 23 + "px";
    if ((viewWidth-bill.right) < (viewWidth/4)) iframeWrapper.style.right =viewWidth - bill.right-30 + "px";
    else iframeWrapper.style.right = bill.left - 150 + "px";
    return "vtc-i-bottom"; 
  }

  function reposition() {
    var target = document.getElementById(iactive.getAttribute('data-vtctarget'));
    myposition(iactive, target);
  }

  function setActive(ele) {
    if (typeof iactive !== 'undefined') removeClass(iactive, 'vtc-active');
    if (typeof ele !== 'undefined') addClass(ele, 'vtc-active');
    iactive = ele;
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
