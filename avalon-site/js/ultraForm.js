$(document).ready(function () {
  for (var i=0; i<forms.length;i++){
      var checkBox='';
      if (forms[i].checkbox===true){
          checkBox='<div class="form-group form-check commonInputDiv"><input type="checkbox" class="form-check-input" id="agreeCheck" checked><label class="form-check-label" for="agreeCheck">' + forms[0].checkBoxContent +'</label></div>';
      }
      var formHtml = ' <form action="" class="form-group">\n' +
          '        <h2 class="formHeader"></h2>\n' +
          '        <div class="commonInputDiv">\n' +
          '            <input type="text" class="form-control common name" id="formName" placeholder="Имя и фамилия">\n' +
          '        </div>\n' +
          '        <div class="commonInputDiv">\n' +
          '            <input type="email" class="form-control common email" id="email" placeholder="Email">\n' +
          '        </div>\n' +
          '        <div class="commonInputDiv">\n' +
          '            <input type="password" class="form-control common email" id="password" placeholder="Введите пароль">\n' +
          '        </div>\n' +
          '        <div class="commonInputDiv">\n' +
          '            <div class="input-group mb-3">\n' +
          '                <div class="input-group-prepend ">\n' +
          '                    <button class="btn btn-outline-secondary dropdown-toggle countryFlag " type="button" data-toggle="dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n' +
          '                        <span class="countryPhoneCodeSpan"></span>\n' +
          '                    </button>\n' +
          '                    <div class="dropdown-menu countrieslist"></div>\n' +
          '                </div>\n' +
          '                <input type="text" class="form-control localPhone" aria-label="Text input with dropdown button" placeholder="телефон">\n' +
          '            </div>\n' +
          '\n' +
          '        </div>\n' +
          checkBox+
          '        <div class="error"></div>'+
          '        <div class="commonInputDiv btnSubmitDiv ">\n' +
          '            <button type="button" class="btn leadSubmit" id="' + forms[i].unique_id_submit + '" onclick="()=>{new crmTracker(\'track\', \'Lead\')}">\n' +
          '                <span class="leadSubmitSpan"></span>\n' +
          '            </button>\n' +
          '        </div>\n' +
          '    </form>';

      // $('.leadFormContainer2').addClass(forms[i].cssAdditionalClass);
      $('.leadFormContainer2.'+forms[i].cssAdditionalClass).html(formHtml);
      $('.leadFormContainer2.' +forms[i].cssAdditionalClass +' .leadSubmitSpan').text(forms[i].submitText);
      $('.leadFormContainer2.' +forms[i].cssAdditionalClass+' .formHeader').text(forms[i].headerText);
  }

  detectCountry();
  getAllCountries();
  $('.leadFormContainer2 .leadSubmit').click(registrate);

});

function detectCountry() {
  window.jQuery.ajax({
      url: 'https://qqqq.uno/Form770capital/backendApi/ipAddr.php',
      success: function (userip) {
          var a = 5;
          window.jQuery.ajax({
              url: 'https://api.maxicapital.group/dictionary/countryiso?ip=' + userip,
              success: function (iso) {
                  if (iso) {
                      setLocalPhoneInfo(iso);
                      return iso;
                  }
              }
          });
      }
  });


}

function setLocalPhoneInfo(iso) {
  window.jQuery.ajax({
      url: 'https://qqqq.uno/Form770capital/backendApi/countryInfo.php?param_iso=' + iso,
      success: function (data) {
          var countryData = JSON.parse(data);
          setUpCountryInfo(countryData);
      },
      error: function () {
          var countryData = JSON.parse('{"CountryIso":"RU","CountryNameRu":"\u0420\u043e\u0441\u0441\u0438\u044F","CountryNameEn":"Russian Federation","PhoneCode":"7","MinNumbersOfDigits":"10","MaxNumbersOfDigits":"10"}');
          setUpCountryInfo(countryData);
      }
  });
};

function setUpCountryInfo(countryData) {
  $('.leadFormContainer2 .countryFlag').css("background-image", 'url("https://qqqq.uno/flags/flags-iso/flat/24/' + countryData.CountryIso + '.png")');
  $('.leadFormContainer2 .countryPhoneCodeSpan').text('+' + countryData.PhoneCode);

  window.jQuery('.leadFormContainer2 .localPhone').attr({
      "data-countryName": countryData.CountryNameRu,
      "data-countryCode": countryData.CountryIso,
      "data-countryPhoneCode": countryData.PhoneCode
  });
  window.jQuery('.leadFormContainer2 .localPhone').attr({
      "data-minNumbers": countryData.MinNumbersOfDigits,
      "data-maxNumbers": countryData.MaxNumbersOfDigits
  });
}

function getAllCountries() {
  window.jQuery.ajax({
      type: "GET",
      url: 'https://qqqq.uno/Form770capital/backendApi/countrySearch.php',
      data: {lang: 'ru'},
      success: function (countries) {
          var countriesArr = JSON.parse(countries);
          for (var i = 0; i < countriesArr.length; i++) {
              $('.leadFormContainer2 .countrieslist').append('<div class="dropdown-item country_item" data-country_name="' + countriesArr[i][1] + '" data-iso="' + countriesArr[i][0] + '"' +
                  'data-country_code="' + countriesArr[i][3] + '" data-min_numbers="' + countriesArr[i][4] + '"' +
                  'data-max_numbers="' + countriesArr[i][5] + '"' +
                  ' style="background-image: url(https://qqqq.uno/flags/flags-iso/flat/24/' + countriesArr[i][0] + '.png)">' + countriesArr[i][1] + '</div>');
          }
          $('.leadFormContainer2 .country_item').click(setUpCountryWhenChoosing);
      }

  });
}

function setUpCountryWhenChoosing(event) {
  var target = event.target.dataset;
  var countryData = new Object();
  countryData.PhoneCode = target.country_code;
  countryData.CountryNameRu = target.country_name;
  countryData.CountryIso = target.iso;
  countryData.MinNumbersOfDigits = target.min_numbers;
  countryData.MaxNumbersOfDigits = target.max_numbers;
  setLocalPhoneInfo(target.iso);
  setUpCountryInfo(countryData);
}

function registrate(event) {

  var parentClasses= $(event.target).closest('.leadFormContainer2').attr("class").split(/\s+/);
  var preparedParentClasses='';
  for (var i=0; i<parentClasses.length;i++){
      preparedParentClasses+='.'+parentClasses[i];
  }

  var name = $(preparedParentClasses+ ' .name').val().trim();
  var email = $(preparedParentClasses+' .email').val().trim();
  var phone = $(preparedParentClasses+' .localPhone').val().trim();
  var agree = true;
  if (forms[0].checkbox){
      agree=$(preparedParentClasses+' #agreeCheck').is(':checked');
  }
  var minNumbersOfDigits = $('.localPhone')[0].dataset.minnumbers;
  var maxNumbersOfDigits = $('.localPhone')[0].dataset.maxnumbers;

  if (!name) {
      showError(preparedParentClasses,'Поле Имя и фамилия обязательное!');
      return;
  }
  if (!checkForFNameLName(name)) {
      showError(preparedParentClasses,'Необходимо ввести имя и фамилию');
      return;
  }
  else if (!email) {
      showError(preparedParentClasses,'Поле email обязательное!');
      return;
  }
  else if (!phone) {
      showError(preparedParentClasses,'Поле телефон обязательное!');
      return;
  }
  else if (!agree) {
      showError(preparedParentClasses,'Необходимо согласиться с политикой конфиденциальности');
      return;
  }
  else if (!checkEmailFormat(email)) {
      showError(preparedParentClasses , 'Неправильный формат email');
      return;
  }
  else if (!checkPhoneFormat(phone, minNumbersOfDigits, maxNumbersOfDigits,preparedParentClasses)) {
      //в функции выводиться сообщение
      return;
  }
  else {
      hideErrorMessage();
      var iso = $('.localPhone')[0].dataset.countrycode;
      var countryCode = $('.localPhone')[0].dataset.countryphonecode;
      var phoneOperator = phone.substr(0, 2);
      var phoneNumber = phone.substr(2);
      var spaceIndex = name.indexOf(' ');
      var fname = name.substr(0, spaceIndex);
      var lname = name.substr(spaceIndex);
      var refferer = location.protocol + '//' + location.host + location.pathname + location.search;
      var sendDataUrl="770invest.org";
      if (forms[0].site==="maxicapital.pro" || forms[0].site==="maxicapital.group" || forms[0].site==="770invest.org" || forms[0].site==="glfin.info" || forms[0].site==="glfin.group"){
          sendDataUrl="https://api." + forms[0].site + "/Registration/Lead";
      }
      else if (forms[0].site==='file'){
          sendDataUrl="https://qqqq.uno/FormGlfin/sendTofile.php"
      }
      else {
          sendDataUrl="https://qqqq.uno/FormGlfin/sendToCrm.php"
      }
      $.ajax({
          url: 'https://ulltracrm.live/api/',
          method: 'POST',
          data: {
              method: 'integrate',
              token: 'D6BA4265-175A-A186-DD0C-C0729F20FD37', /// artem
              brand_uuid: '5b8dc18dedc1ac1194f7898deb2dfb05', // бренд
              email: email,
              password: 'ruGaz0169',
              full_phone: countryCode+phoneOperator+phoneNumber,
              firstname: fname,
              lastname: lname,
              referrer: 'https://avalon-site.tech/',
              country: iso,
              affiliateurl: (window.location.href.replaceAll('?', '[search]')).replaceAll('&','[and]'),
              terms: 'true'
          },
          success: function (leadInfo){
              // sessionStorage.setItem('name', fname);
              // document.location.href = forms[0].thank_you_page+'?name='+fname;
              document.location.href = forms[0].thank_you_page;
          },

      });
  }
}

function showError(parentClasses,message) {
  var errorDiv = $(parentClasses+' .error');
  $(errorDiv).removeClass('d-none');
  $(errorDiv).text('');
  $(errorDiv).text(message);
}

function hideErrorMessage() {
  var errorDiv = $('.leadFormContainer2 .error');
  $(errorDiv).addClass('d-none');
  $(errorDiv).text('');
}

function checkEmailFormat(email) {
  if (!/.+@.+\..+/i.test(email)) {
      return false;
  }
  return true;
}

function checkPhoneFormat(phone, minNumbersOfDigits, maxNumbersOfDigits,parentClasses) {
  if (!/^\d+$/.test(phone)) {
      showError(parentClasses,'телефон должен содержать только цифры');
      return false;
  }
  else if (phone.length < minNumbersOfDigits) {
      showError(parentClasses,'Слишком короткий номер');
      return false;
  }
  else if (phone.length > maxNumbersOfDigits) {
      showError(parentClasses,'Слишком длинный номер');
      return false;
  }
  return true;
}

function checkForFNameLName(name) {
  var spaceIndex = name.indexOf(' ');
  if (spaceIndex !== -1) {
      return true;
  }
  return false;
}
