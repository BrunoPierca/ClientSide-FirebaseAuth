new WOW().init();

(function ($) {
  "use strict";

  /*
   * ----------------------------------------------------------------------------------------
   *  SMOTH SCROOL JS
   * ----------------------------------------------------------------------------------------
   */

  $("a.smoth-scroll").on("click", function (e) {
    var anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $(anchor.attr("href")).offset().top - 50,
        },
        1000
      );
    e.preventDefault();
  });

  /* ==========================================================================
      COUNTER UP 
 ========================================================================== */

  $(".counter").counterUp({
    delay: 10,
    time: 1000,
  });

  $(".carousel").carousel({
    interval: 8000,
  });

  /* Closes the Responsive Menu on Menu Item Click*/
  $(".navbar-collapse .navbar-nav a").on("click", function () {
    $(".navbar-toggler:visible").click();
  });
  /*END MENU JS*/

  /* ----------------------------------------------------------- */
  /*  Fixed header
    /* ----------------------------------------------------------- */

  const banner = document.getElementById("bannerTop");
  const logoBlack = document.getElementById("logoBlack");
  const logoWhite = document.getElementById("logoWhite");

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 70) {
      $(".site-navigation,.trans-navigation").addClass("header-white");
      logoBlack.style.display = "none";
      logoWhite.style.setProperty("display", "block", "important");
    } else {
      $(".site-navigation,.trans-navigation").removeClass("header-white");
      logoBlack.style.setProperty("display", "block", "important");
      logoWhite.style.display = "none";
    }
  });

  /* ==========================================================================
      SCROLL SPY
 ========================================================================== */

  $("body").scrollspy({
    target: ".navbar-collapse",
    offset: 195,
  });
})(window.jQuery);
