// Event Listeners, kickoff app
var logged_in="logged_in";
addEvent('DOMContentLoaded', document, function() {
    var ele = document.getElementsByTagName('a');

    for(var i=0; i<ele.length; i++) {
        if (ele[i].getAttribute('data-toggle') == 'collapse') {
            addEvent('click', ele[i], toggleMe);
        }
    }

    // Broadcast logged in state to iframe(s)
  //window.top.postMessage({type:'logged_in_state', logged_in:logged_in}, '*');
});

addEvent('message', window, function(event) {
    var ie=event.data.split(':')[0];
    var id=event.data.split(':')[1];
    var container = document.getElementsByClassName('container')[0];
    if(ie=="true"){
      var width=getOffsetWidth(container);
      var height=getOffsetHeight(container);
    }else{
      var width = container.offsetWidth;
      var height =container.offsetHeight;
    }
    window.top.postMessage({type:'resize', width:width, height:height, iframeWrapper_id:id}, '*');
});

// Functions
function addEvent(event, el, fn) {
    if (el.addEventListener) {
        el.addEventListener(event, fn, false);
    } else if (el.attachEvent) {
        el.attachEvent('on' + event, fn);
    } else {
        el[event] = fn;
    }
}

function toggleMe() {
	var t = this.getAttribute('data-target');
	var ele = document.getElementById(t);

    if (ele.className.match(/hide/)) {
		ele.className = ele.className.replace('hide','show');
	} else {
		ele.className = ele.className.replace('show','hide');
	}
}
/*functions calculating the actual height */
function getOffsetWidth(elm) {
    return _getOffset(elm);
}

function getOffsetHeight(elm) {
    return _getOffset(elm, true);
}

function _getOffset(elm, height) {
    var cStyle = elm.ownerDocument && elm.ownerDocument.defaultView && elm.ownerDocument.defaultView.getComputedStyle
      && elm.ownerDocument.defaultView.getComputedStyle(elm, null),
      ret = cStyle && cStyle.getPropertyValue(height ? 'height' : 'width') || '';
    if (ret && ret.indexOf('.') > -1) {
      ret = parseFloat(ret)
        + parseInt(cStyle.getPropertyValue(height ? 'padding-top' : 'padding-left'))
        + parseInt(cStyle.getPropertyValue(height ? 'padding-bottom' : 'padding-right'))
        + parseInt(cStyle.getPropertyValue(height ? 'border-top-width' : 'border-left-width'))
        + parseInt(cStyle.getPropertyValue(height ? 'border-bottom-width' : 'border-right-width'));
    } else {
      ret = height ? elm.offsetHeight : elm.offsetWidth;
    }
    return ret;
}

