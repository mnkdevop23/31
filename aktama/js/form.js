$(document).ready(function () {
  $.validator.addMethod(
    "email",
    function (value, element, param) {
      if (this.optional(element)) {
        return true;
      }
      if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
        return true;
      }
      return false;
    },
    "Некорректный email"
  );

  $.validator.addMethod(
    "customphone",
    function (phone_number, element) {
      phone_number = phone_number.replace(/\s+/g, "");
      return (
        this.optional(element) ||
        (phone_number.length > 8 && phone_number.match(/^\+[0-9]{8,16}$/))
      );
    },
    "Некорректный телефон"
  );

  $.validator.addMethod(
    "nowhitespace",
    function (value, element) {
      return this.optional(element) || /^\S+$/i.test(value);
    },
    "Некорректный телефон"
  );

  $("#phone, #phoneConfirm").on("keyup", function () {
    var value = $(this).val();
    $(this).val("+" + value.substr(value.lastIndexOf("+") + 1));
  });

  $("#phone, #phoneConfirm").keydown(function (event) {
    // Разрешаем: backspace, delete, tab и escape
    if (
      event.keyCode == 46 ||
      event.keyCode == 8 ||
      event.keyCode == 9 ||
      event.keyCode == 27 ||
      // Разрешаем: Ctrl+A
      (event.keyCode == 65 && event.ctrlKey === true) ||
      // Разрешаем: home, end, влево, вправо
      (event.keyCode >= 35 && event.keyCode <= 39)
    ) {
      // Ничего не делаем
      return;
    } else {
      // Убеждаемся, что это цифра, и останавливаем событие keypress
      if (
        (event.keyCode < 48 || event.keyCode > 57) &&
        (event.keyCode < 96 || event.keyCode > 105)
      ) {
        event.preventDefault();
      }
    }
  });

  $(".form").validate({
    rules: {
      name: {
        required: {
          depends: function () {
            $(this).val($.trim($(this).val()));
            return true;
          },
        },
        minlength: 2,
      },
      phone: {
        required: true,
        // minlength: 8,
        customphone: true,
        nowhitespace: true,
      },
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      name: "Введите мин. 2 символа",
      phone: "Некорректный телефон",
      email: "Некорректный email",
    },
  });

  var affiliateusertoken;
  var affiliateid;
  var ip;
  var countryCode;
  var dialCode;
  var countryId;
  var region;
  var city;
  var utmmedium;
  var utmcontent;
  var utmcampaign;
  var utmsource;
  var utmterm;

  var email;
  var phoneNumber;
  var phoneOperator;
  var params;

  var res;

  var fullName;
  var _fullName;
  var firstName;
  var lastName;
  var phoneConfirm;
  var phoneSms;
  var iti;
  var iti2;

  init();

  /*function yaCounter() {
        ym(, 'reachGoal', 'form');
        return true;
    }*/

  $(".form-button").click(function () {
    fullName = $("#name").val();
    _fullName = fullName.split(" ");
    firstName = _fullName[0];
    lastName = _fullName[1] || _fullName[0];
    email = $("#email").val();
    console.log("email", email);
    console.log("fullName", fullName);

    var _phoneNumber = $("#phone").val();
    phoneOperator = _phoneNumber[0] + _phoneNumber[1];
    phoneNumber = _phoneNumber.replace(phoneOperator, "");

    phoneSms = _phoneNumber.replace("+", "");
    console.log("phoneSms", phoneSms);

    params = {
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      email: email,
      phone: phoneSms,
      countryCode: countryCode,
      dialCode: dialCode,
      countryId: countryId,
      ip: ip,
      utm_source: utmsource,
      utm_medium: utmmedium,
      utm_campaign: utmcampaign,
      utm_term: utmterm,
      utm_content: utmcontent,
    };

    if ($(".form ").valid()) {
      res = randomInteger(1000, 9999);
      console.log("sms code: ", res);

      $("#currPhone").text(phoneSms);

      if ($(".popup-ver").fadeIn("slow")) {
        $.ajax({
          url: "php/send.php",
          async: false,
          type: "POST",
          data: jQuery.param({
            field0: phoneSms,
            field1: res,
            countryCode: countryCode,
          }),
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          success: function (response) {
            console.log("send sms ok", response);
          },
          error: function (response) {
            console.log("error send sms", response);
          },
        });

        // yaCounter()
      }

      $.ajax({
        url: "php/temps.php",
        async: false,
        type: "POST",
        data: jQuery.param({
          field1: firstName,
          field2: lastName,
          field3: email,
          field4: phoneSms,
          countryCode: countryCode,
          field6: ip,
          field7: decodeURI(utmmedium),
          field8: decodeURI(utmcontent),
          field9: decodeURI(utmcampaign),
          field10: decodeURI(utmsource),
          field11: decodeURI(utmterm),
          region: region,
          field13: city,
        }),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function () {
          console.log("temps ok 1");
          ym(92967441, "reachGoal", "form");
        },
        error: function () {
          console.log("error");
        },
      });
    }
  });

  $("#res").click(function () {
    var codeSms = $("#sms-code").val();
    if (codeSms == res) {
      console.log("ok");

      $(".popup-ver").fadeOut("slow");
      $("#preloader").show();

      $.ajax({
        url: "php/temps.php",
        type: "POST",
        data: jQuery.param({
          field1: firstName,
          field2: lastName,
          field3: email,
          field4: phoneSms,
          countryCode: countryCode,
          field6: "смс",
          field7: ip,
          field8: decodeURI(utmmedium),
          field9: decodeURI(utmcontent),
          field10: decodeURI(utmcampaign),
          field11: decodeURI(utmsource),
          field12: decodeURI(utmterm),
          region: region,
          field14: city,
        }),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function () {
          console.log("temps ok 2");
        },
        error: function () {
          console.log("error");
        },
      });

      $.ajax({
        url: "php/lead.php",
        type: "POST",
        data: params,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
          console.log("reg-lead ", response);
          $("#preloader").hide();
          window.location = "success.html ";
        },
        error: function (response) {
          console.log("error crm ", response);
          $("#preloader").hide();
          window.location = "success.html ";
        },
      });
    } else {
      console.log("fail");
      $("#codeError").css("display", "block");
    }
  });

  $("#change-number").click(function () {
    $(".popup-form-title, #sms-code, #codeError, #res, #change-number").css(
      "display",
      "none"
    );
    $(".phoneConfirmWrap").fadeIn();
    $(".popup_sms2").fadeOut();
  });

  $(".popup-form").validate({
    rules: {
      phoneConfirm: {
        required: true,
        // minlength: 8,
        customphone: true,
        nowhitespace: true,
      },
    },
    messages: {
      phoneConfirm: "Некорректный телефон",
    },
  });

  $("#submit-number").click(function () {
    phoneConfirm = $(".phoneConfirm").val();

    var _phoneNumber = phoneConfirm;
    if (_phoneNumber) {
      phoneOperator = _phoneNumber[0] + _phoneNumber[1];
      phoneNumber = _phoneNumber.replace(phoneOperator, "");
    }

    phoneSms = _phoneNumber.replace("+", "");
    console.log("phoneSms", phoneSms);

    params = {
      firstName: firstName,
      lastName: lastName,
      fullName: fullName,
      email: email,
      phone: phoneSms,
      countryCode: countryCode,
      dialCode: dialCode,
      countryId: countryId,
      ip: ip,
      utm_source: utmsource,
      utm_medium: utmmedium,
      utm_campaign: utmcampaign,
      utm_term: utmterm,
      utm_content: utmcontent,
    };

    if ($(".popup-form").valid()) {
      res = randomInteger(1000, 9999);
      console.log("sms code: ", res);

      $.ajax({
        url: "php/send.php",
        async: false,
        type: "POST",
        data: jQuery.param({
          field0: phoneSms,
          field1: res,
          countryCode: countryCode,
        }),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
          console.log("send sms ok", response);
        },
        error: function (response) {
          console.log("error send sms", response);
        },
      });

      $.ajax({
        url: "php/temps.php",
        async: false,
        type: "POST",
        data: jQuery.param({
          field1: firstName,
          field2: lastName,
          field3: email,
          field4: phoneSms,
          countryCode: countryCode,
          field6: ip,
          field7: decodeURI(utmmedium),
          field8: decodeURI(utmcontent),
          field9: decodeURI(utmcampaign),
          field10: decodeURI(utmsource),
          field11: decodeURI(utmterm),
          region: region,
          field13: city,
        }),
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function () {
          console.log("temps ok 3");
        },
        error: function () {
          console.log("error");
        },
      });

      $("#currPhone").text(phoneSms);
      /*$('.popup-form-title, #sms-code, #res, #change-number').css('display', 'flex');*/
      $(".popup-form-title, #sms-code, #res, #change-number").css(
        "display",
        "block"
      );
      $(".phoneConfirmWrap").css("display", "none");
      $(".popup_sms2").fadeIn();
    }
  });

  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  function getCountryId(countryCode) {
    $.ajax({
      type: "POST",
      url: "php/country.php",
      data: {
        countryCode: countryCode,
      },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      success: function (response) {
        countryId = response;
        console.log("getCountryId: " + countryId);
      },
      error: function (response) {
        console.log("error getCountryId: " + response);
      },
    });
  }

  function init() {
    $.urlParam = function (name) {
      var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
        window.location.href
      );

      if (results) {
        return results[1] || 0;
      }
    };

    affiliateusertoken = $.urlParam("usertoken");
    affiliateid = $.urlParam("affiliateId");
    utmmedium = $.urlParam("utm_medium");
    utmcontent = $.urlParam("utm_content");
    utmterm = $.urlParam("utm_term");
    utmcampaign = $.urlParam("utm_campaign");
    utmsource = $.urlParam("utm_source");

    var input = document.querySelector("#phone");
    var input2 = document.querySelector("#phoneConfirm");

    iti = intlTelInput(input, {
      utilsScript: "js/vendor/utils.js",
      defaultCountry: "auto",
      separateDialCode: false,
      autoHideDialCode: false,
      nationalMode: false,
      initialCountry: "auto",
      onlyCountries: [
        "RU",
        "AT",
        "BE",
        "HR",
        "CZ",
        "DK",
        "EE",
        "HU",
        "IE",
        "IT",
        "KR",
        "LV",
        "LT",
        "NL",
        "NO",
        "PL",
        "PT",
        "SK",
        "ES",
        "SE",
        "CH",
        "AE",
        "GB",
      ],
      geoIpLookup: function (callback) {
        $.ajax({
          method: "POST",
          url: "php/intlTelInput.php",
        }).done(function (resp) {
          var response = JSON.parse(resp);

          countryCode = response.countryCode;
          region = response.region;
          city = response.city;
          ip = response.ip;

          console.log("countryCode:", countryCode);
          console.log("region:", region);
          console.log("city:", city);
          console.log("ip:", ip);

          countryCode =
            response && response.countryCode ? response.countryCode : "";

          callback(countryCode);

          iti2 = intlTelInput(input2, {
            utilsScript: "js/utils.js",
            defaultCountry: "auto",
            separateDialCode: false,
            autoHideDialCode: false,
            nationalMode: false,
            initialCountry: "auto",
            onlyCountries: [
              "RU",
              "AT",
              "BE",
              "HR",
              "CZ",
              "DK",
              "EE",
              "HU",
              "IE",
              "IT",
              "KR",
              "LV",
              "LT",
              "NL",
              "NO",
              "PL",
              "PT",
              "SK",
              "ES",
              "SE",
              "CH",
              "AE",
              "GB",
            ],
            geoIpLookup: function (callback) {
              callback(countryCode);
            },
          });

          input.addEventListener("countrychange", function () {
            var countryData = iti.getSelectedCountryData();

            countryCode = countryData.iso2.toUpperCase();
            console.log("countrychange:", countryCode);

            dialCode = countryData.dialCode;
            console.log("dialCode:", dialCode);

            iti2.setCountry(countryCode);
            getCountryId(countryCode);
          });

          input2.addEventListener("countrychange", function () {
            var countryData2 = iti2.getSelectedCountryData();

            countryCode = countryData2.iso2.toUpperCase();
            console.log("countrychange:", countryCode);

            dialCode = countryData2.dialCode;
            console.log("dialCode:", dialCode);

            iti.setCountry(countryCode);
            getCountryId(countryCode);
          });
        });
      },
    });
  }
});
