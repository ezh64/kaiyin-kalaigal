try { 
	  _weq['webengage.enableCallbacks'] = true;
  _weq['webengage.notification.onOpen'] = function () {
    var guidedTourBtns = document.getElementsByClassName("guidedTourBottom") || document.getElementsByClassName("instruction_wrap_front");
    if (guidedTourBtns.length > 0) {
          var notContFrm = document.getElementById("webklipper-publisher-widget-container-notification-frame");
          if (notContFrm) {
            notContFrm.style['z-index'] = 7500;
          }
    }
  };
  _weq['webengage.survey.onOpen'] = function () {
    var guidedTourBtns = document.getElementsByClassName("guidedTourBottom") || document.getElementsByClassName("instruction_wrap_front");
    if (guidedTourBtns.length > 0) {
          var surContDiv = document.getElementById("webklipper-publisher-widget-container-survey-content");
          if (surContDiv) {
            surContDiv.style['z-index'] = 7500;
          }
    }
  };

 } catch(e) { 
 	if (e instanceof Error) { 
		var data = e.stack || e.description;
		data = (data.length > 900 ? data.substring(0, 900) : data);
	 	webengage.eLog(null, 'error', data, 'cwc-error','cwc', 'd8h614f');
	 }
 }
