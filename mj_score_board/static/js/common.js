(function($) {
    var mj_js;

    mj_js = {
        api_ajax : function(arg) {
          var domain = "http://127.0.0.1:8001/";
          arg["url"] = domain + arg["url"];
          var opt = $.extend({}, $.ajaxSettings, arg);

          opt.success = (function(func) {
              return function(data, statusText, jqXHR) {
                  if (func) {
                      func(data, statusText, jqXHR);
                  }
              };
          })(opt.success);

          opt.error = (function(func) {
              return function(jqXHR, statusText, errorThrown) {
                  if (func) {
                      func(jqXHR, statusText, errorThrown);
                  }
              };
          })(opt.error);

          opt.complete = (function(func) {
              return function(jqXHR, statusText) {
                  if (func) {
                      func(jqXHR, statusText);
                  }
              };
          })(opt.complete);

          return $.ajax(opt);
        },

        mj_modal_show : function(arg) {
          $("#mjModalLabel").html(arg["title"]);
          $("#mjModalBody").html(arg["body"]);
          $("#mjModal").modal('show');
        },
    };

    window.mj_js = mj_js;

})(jQuery);
