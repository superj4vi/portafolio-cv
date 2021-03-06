"use strict";
!(function (e) {
  var t = e.querySelector(".contact__form"),
    n = e.querySelector(".contact__form--loader"),
    o = e.querySelector(".contact__form--response");
  t.addEventListener("submit", function (e) {
    e.preventDefault(),
      n.classList.remove("none"),
      fetch("https://formsubmit.co/ajax/aragonjavier017@gmail.com", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then(function (e) {
          return e.ok ? e.json : Promise.reject(e);
        })
        .then(function (e) {
          console.log(e), (location.hash = "#gracias"), t.reset();
        })
        .catch(function (e) {
          console.log(e);
          var t =
            e.statusText || "Ocurrio un error al envair, Intenta de nuevo";
          o.querySelector("h3").innerHTML = "Error "
            .concat(e.statusText, ": ")
            .concat(t);
        })
        .finally(function () {
          n.classList.add("none"),
            setTimeout(function () {
              location.hash = "#close";
            }, 3e3);
        });
  });
})(document),
  (function (e) {
    var t = e.querySelector(".btn__menu"),
      n = e.querySelector(".header__menu");
    t.addEventListener("click", function (e) {
      t.firstElementChild.classList.toggle("none"),
        t.lastElementChild.classList.toggle("none"),
        n.classList.toggle("is-active");
    }),
      e.addEventListener("click", function (e) {
        if (!e.target.matches(".header__menu a")) return !1;
        t.firstElementChild.classList.remove("none"),
          t.lastElementChild.classList.add("none"),
          n.classList.remove("is-active");
      });
  })(document);
