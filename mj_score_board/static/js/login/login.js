$(function(){
  function loginAlertShow (errorTextList) {
    $.each(errorTextList, function(key, errorText) {
      $("#loginAlert").append(errorText + "<br>");
    });
    $("#loginAlert").show();
  }

  function loginAlertHide () {
    $("#loginAlert").text("");
    $("#loginAlert").hide();
  }

  $("#loginButton").click(function() {
    $(this).prop("disabled", true);
    var user_name = $('#loginName').val() + '';
    var password = $('#loginPassword').val() + '';

    var errorTextList = [];
    loginAlertHide();
    if (user_name === '') {
      errorTextList.push("ユーザー名が入力されていません。")
    }
    if (password === '') {
      errorTextList.push("パスワードが入力されていません。")
    }

    if (errorTextList.length > 0) {
      loginAlertShow(errorTextList);
      $(this).prop("disabled", false);
      return false
    }

    mj_js.api_ajax({
      url: 'login/auth',
      crossDomain: true,
      type: 'POST',
      dataType: 'json',
      data: {
        user_name: user_name,
        password: password,
      },
      success: function(json, statusText, jqXHR) {
          if (json["status"] === 401) {
            loginAlertShow([json["data"]["message"]]);
          } else {

          }
      },
      error: function(jqXHR, statusText, errorThrown) {
      },
      complete: function(jqXHR, statusText) {
        $("#loginButton").prop("disabled", false);
      }
    });
  })
});
