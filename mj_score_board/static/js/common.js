(function($) {
    var mj_js;

    mj_js = {
        ajax : function(arg) {
          var opt = $.extend({}, $.ajaxSettings, arg);

          opt.success = (function(func) {
            return function(data, statusText, jqXHR) {
              console.log(data);
              if (data["status"] === 500) {
                mj_js.mj_modal_show({
                  "title": "ERROR",
                  "body": data["data"]["message"],
                })
              }
              if (func) {
                  func(data, statusText, jqXHR);
              }
            };
          })(opt.success);

          opt.error = (function(func) {
            return function(jqXHR, statusText, errorThrown) {
              mj_js.mj_modal_show({
                title: "ERROR",
                body: "エラーが発生しました。時間を置いてから実行してください",
              });
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
