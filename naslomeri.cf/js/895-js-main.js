$(function () {
  // timer
  class Timer {
    constructor(el, time) {
      this.el = el;
      this.time = time;
      this.interval;
      this.start();
      this.render();
    }
    start() {
      this.interval = setInterval(() => this.tick(), 1000);
      let data = localStorage.getItem("timerData");
      let timerData = JSON.parse(data);
      if (timerData && timerData.time > 0) {
        this.time = timerData.time;
      } else {
        this.time = this.time;
      }
    }
    stop() {
      localStorage.removeItem("timerData");
      clearInterval(this.interval);
    }
    tick() {
      this.time--;
      this.render();
      let data = localStorage.getItem("timerData");
      let timerData = JSON.parse(data);
      if (timerData && timerData.time > 0) {
        saveToTheLocalStorage(this.time, true);
      } else {
        saveToTheLocalStorage(this.time, false);
      }
      if (this.time <= 0) {
        this.stop();
      }
    }
    render() {
      let h =
        parseInt(this.time / 3600) < 10
          ? "0" + parseInt(this.time / 3600)
          : parseInt(this.time / 3600);
      let hs = this.time % 3600;
      let m =
        parseInt(hs / 60) < 10 ? "0" + parseInt(hs / 60) : parseInt(hs / 60);
      let s = hs % 60 < 10 ? "0" + (hs % 60) : hs % 60;
      this.el.innerHTML = `${h} : ${m} : ${s}`;
    }
  }

  let timerItem = document.querySelector("#timespan");
  let timerInit = new Timer(timerItem, 2870);

  function saveToTheLocalStorage(time, state) {
    localStorage.setItem(
      "timerData",
      JSON.stringify({
        time: time,
      })
    );
  }

  // form validation
  let formDirty = false;

  $("#phone").inputmask({ mask: "+7 (999) 999-99-99" });

  // email
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  $('input[name="email"]').on("input", function () {
    if (formDirty) {
      if (!validateEmail($('input[name="email"]').val())) {
        $('input[name="email"]').addClass("error");
      } else {
        $('input[name="email"]').removeClass("error");
      }
    }
  });

  // name
  $('input[name="name"]').on("input", function () {
    if (formDirty) {
      if (!$('input[name="name"]').val()) {
        $('input[name="name"]').addClass("error");
      } else {
        $('input[name="name"]').removeClass("error");
      }
    }
  });

  // phone
  $("#phone").on("input", function () {
    if (formDirty) {
      if (!$("#phone").inputmask("isComplete")) {
        $("#phone").addClass("error");
      } else {
        $("#phone").removeClass("error");
      }
    }
  });

  // name
  $('input[name="name"]').on("input", function () {
    if (formDirty) {
      if (!$('input[name="name"]').val()) {
        $('input[name="name"]').addClass("error");
      } else {
        $('input[name="name"]').removeClass("error");
      }
    }
  });

  $(".quiz__submit").on("click", function () {
    formDirty = true;

    if (!$('input[name="name"]').val()) {
      $('input[name="name"]').addClass("error");
    } else {
      $('input[name="name"]').removeClass("error");
    }

    if (!$("#phone").inputmask("isComplete")) {
      $("#phone").addClass("error");
    } else {
      $("#phone").removeClass("error");
    }

    if (!validateEmail($('input[name="email"]').val())) {
      $('input[name="email"]').addClass("error");
    } else {
      $('input[name="email"]').removeClass("error");
    }

    // submit
    if (
      $('input[name="name"]').val() &&
      $("#phone").inputmask("isComplete") &&
      validateEmail($('input[name="email"]').val())
    ) {
      window.location.href = "/thanks.html";
    }
  });

  // form steps functions
  $(".next")
    .not(".quiz__submit")
    .on("click", function (e) {
      e.preventDefault();
      $(this)
        .parents(".quiz-form__step")
        .next()
        .addClass("quiz-form__step_active");
      $(this).parents(".quiz-form__step").removeClass("quiz-form__step_active");
    });

  $(".prev")
    .not(".prev_close")
    .on("click", function (e) {
      e.preventDefault();
      $(this)
        .parents(".quiz-form__step")
        .prev()
        .addClass("quiz-form__step_active");
      $(this).parents(".quiz-form__step").removeClass("quiz-form__step_active");
    });
});
