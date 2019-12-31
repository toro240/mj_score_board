$(function(){
  $("#loginButton").click(function() {
    $(this).prop("disabled", true);
    var email = $('#loginEmail').val() + '';
    var password = $('#loginPassword').val() + '';

    var errorTextList = [];
    $("#loginAlert").text("");
    if (email === '') {
      errorTextList.push("メールアドレスが入力されていません。")
    }
    if (password === '') {
      errorTextList.push("パスワードが入力されていません。")
    }

    if (errorTextList.length > 0) {
      $.each(errorTextList, function(key, errorText) {
        $("#loginAlert").append(errorText + "<br>");
      });
      $("#loginAlert").show();
      $(this).prop("disabled", false);
      return false
    }
    $("#loginAlert").hide();

    mj_js.api_ajax({
      url: 'login/auth',
      crossDomain: true,
      type: 'POST',
      dataType: 'json',
      data: {
        email: email,
        password: password,
      },
      success: function(json, statusText, jqXHR) {
          console.log(json);
      },
      error: function(jqXHR, statusText, errorThrown) {
          mj_js.mj_modal_show({
            title: "ERROR",
            body: "エラーが発生しました。時間を置いてから実行してください",
          });
      },
      complete: function(jqXHR, statusText) {
        $("#loginButton").prop("disabled", false);
      }
    });
  })
});
