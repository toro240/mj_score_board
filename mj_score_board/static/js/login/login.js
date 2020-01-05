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

  function isCorrectPassword(password) {
    if (password.match(/\d/) !== null && password.match(/[a-z]/) !== null && password.match(/[A-Z]/) && password.length >= 8) {
      return true;
    }

    return false;
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
    var token = $('input[name="csrfmiddlewaretoken"]').val() + '';
    mj_js.ajax({
      url: 'auth',
      type: 'POST',
      dataType: 'json',
      data: {
        csrfmiddlewaretoken: token,
        user_name: user_name,
        password: password,
      },
      success: function(json, statusText, jqXHR) {
          if (json["status"] === 401) {
            loginAlertShow([json["data"]["message"]]);
          } else {
            location.href = '/'
          }
      },
      error: function(jqXHR, statusText, errorThrown) {
      },
      complete: function(jqXHR, statusText) {
        $("#loginButton").prop("disabled", false);
      }
    });
  })

  $("#newUser").click(function() {
    $(this).prop("disabled", true);
    location.href = 'new';
  })


  $("#createButton").click(function() {
    $(this).prop("disabled", true);
    var user_name = $('#loginName').val() + '';
    var mail_address = $('#loginMail').val() + '';
    var password = $('#loginPassword').val() + '';
    var comfirm_password = $('#loginConfirmPassword').val() + '';

    var errorTextList = [];
    loginAlertHide();
    if (user_name === '') {
      errorTextList.push("ユーザー名が入力されていません。")
    }
    if (mail_address === '') {
      errorTextList.push("メールアドレスが入力されていません。")
    }
    var regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
    if (!regexp.test(mail_address)) {
      errorTextList.push("メールアドレスの形式が正しくありません。")
    }
    if (password === '') {
      errorTextList.push("パスワードが入力されていません。")
    }
    if (comfirm_password === '') {
      errorTextList.push("パスワード確認用が入力されていません。")
    }
    if (!isCorrectPassword(password)) {
      errorTextList.push("パスワードの形式が正しくありません。")
    }
    if (password !== comfirm_password) {
      errorTextList.push("パスワードが一致していません。")
    }

    if (errorTextList.length > 0) {
      loginAlertShow(errorTextList);
      $(this).prop("disabled", false);
      return false
    }

    $(this).prop("disabled", false);
  })

});
