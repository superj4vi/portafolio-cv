"use strict";
!(function (e) {
  var t = e.querySelector(".contact__form"),
    n = e.querySelector(".contact__form--loader"),
    i = e.querySelector(".contact__form--response");
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
          i.querySelector("h3").innerHTML = "Error "
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
  })(document),
  new WOW().init(),
  (function (e, t) {
    if ("function" == typeof define && define.amd)
      define(["module", "exports"], t);
    else if ("undefined" != typeof exports) t(module, exports);
    else {
      var n = { exports: {} };
      t(n, n.exports), ((void 0).WOW = n.exports);
    }
  })(0, function (e, t) {
    function n(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function i(e, t) {
      return t.indexOf(e) >= 0;
    }
    function o(e, t) {
      for (var n in t)
        if (null == e[n]) {
          var i = t[n];
          e[n] = i;
        }
      return e;
    }
    function s(e) {
      var t =
          !(arguments.length <= 1 || void 0 === arguments[1]) && arguments[1],
        n = !(arguments.length <= 2 || void 0 === arguments[2]) && arguments[2],
        i =
          arguments.length <= 3 || void 0 === arguments[3]
            ? null
            : arguments[3],
        o = void 0;
      return (
        null != document.createEvent
          ? (o = document.createEvent("CustomEvent")).initCustomEvent(
              e,
              t,
              n,
              i
            )
          : null != document.createEventObject
          ? ((o = document.createEventObject()).eventType = e)
          : (o.eventName = e),
        o
      );
    }
    function a(e, t, n) {
      null != e.addEventListener
        ? e.addEventListener(t, n, !1)
        : null != e.attachEvent
        ? e.attachEvent("on" + t, n)
        : (e[t] = n);
    }
    function r(e, t, n) {
      null != e.removeEventListener
        ? e.removeEventListener(t, n, !1)
        : null != e.detachEvent
        ? e.detachEvent("on" + t, n)
        : delete e[t];
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var l,
      c,
      u = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
              (i.configurable = !0),
              "value" in i && (i.writable = !0),
              Object.defineProperty(e, i.key, i);
          }
        }
        return function (t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t;
        };
      })(),
      h =
        window.WeakMap ||
        window.MozWeakMap ||
        (function () {
          function e() {
            n(this, e), (this.keys = []), (this.values = []);
          }
          return (
            u(e, [
              {
                key: "get",
                value: function (e) {
                  for (var t = 0; t < this.keys.length; t++) {
                    if (this.keys[t] === e) return this.values[t];
                  }
                },
              },
              {
                key: "set",
                value: function (e, t) {
                  for (var n = 0; n < this.keys.length; n++) {
                    if (this.keys[n] === e) return (this.values[n] = t), this;
                  }
                  return this.keys.push(e), this.values.push(t), this;
                },
              },
            ]),
            e
          );
        })(),
      d =
        window.MutationObserver ||
        window.WebkitMutationObserver ||
        window.MozMutationObserver ||
        ((c = l = (function () {
          function e() {
            n(this, e),
              "undefined" != typeof console &&
                null !== console &&
                (console.warn(
                  "MutationObserver is not supported by your browser."
                ),
                console.warn(
                  "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                ));
          }
          return u(e, [{ key: "observe", value: function () {} }]), e;
        })()),
        (l.notSupported = !0),
        c),
      f =
        window.getComputedStyle ||
        function (e) {
          var t = /(\-([a-z]){1})/g;
          return {
            getPropertyValue: function (n) {
              "float" === n && (n = "styleFloat"),
                t.test(n) &&
                  n.replace(t, function (e, t) {
                    return t.toUpperCase();
                  });
              var i = e.currentStyle;
              return (null != i ? i[n] : void 0) || null;
            },
          };
        },
      v = (function () {
        function e() {
          var t =
            arguments.length <= 0 || void 0 === arguments[0]
              ? {}
              : arguments[0];
          n(this, e),
            (this.defaults = {
              boxClass: "wow",
              animateClass: "animated",
              offset: 0,
              mobile: !0,
              live: !0,
              callback: null,
              scrollContainer: null,
            }),
            (this.animate =
              "requestAnimationFrame" in window
                ? function (e) {
                    return window.requestAnimationFrame(e);
                  }
                : function (e) {
                    return e();
                  }),
            (this.vendors = ["moz", "webkit"]),
            (this.start = this.start.bind(this)),
            (this.resetAnimation = this.resetAnimation.bind(this)),
            (this.scrollHandler = this.scrollHandler.bind(this)),
            (this.scrollCallback = this.scrollCallback.bind(this)),
            (this.scrolled = !0),
            (this.config = o(t, this.defaults)),
            null != t.scrollContainer &&
              (this.config.scrollContainer = document.querySelector(
                t.scrollContainer
              )),
            (this.animationNameCache = new h()),
            (this.wowEvent = s(this.config.boxClass));
        }
        return (
          u(e, [
            {
              key: "init",
              value: function () {
                (this.element = window.document.documentElement),
                  i(document.readyState, ["interactive", "complete"])
                    ? this.start()
                    : a(document, "DOMContentLoaded", this.start),
                  (this.finished = []);
              },
            },
            {
              key: "start",
              value: function () {
                var e = this;
                if (
                  ((this.stopped = !1),
                  (this.boxes = [].slice.call(
                    this.element.querySelectorAll("." + this.config.boxClass)
                  )),
                  (this.all = this.boxes.slice(0)),
                  this.boxes.length)
                )
                  if (this.disabled()) this.resetStyle();
                  else
                    for (var t = 0; t < this.boxes.length; t++) {
                      var n = this.boxes[t];
                      this.applyStyle(n, !0);
                    }
                (this.disabled() ||
                  (a(
                    this.config.scrollContainer || window,
                    "scroll",
                    this.scrollHandler
                  ),
                  a(window, "resize", this.scrollHandler),
                  (this.interval = setInterval(this.scrollCallback, 50))),
                this.config.live) &&
                  new d(function (t) {
                    for (var n = 0; n < t.length; n++)
                      for (var i = t[n], o = 0; o < i.addedNodes.length; o++) {
                        var s = i.addedNodes[o];
                        e.doSync(s);
                      }
                  }).observe(document.body, { childList: !0, subtree: !0 });
              },
            },
            {
              key: "stop",
              value: function () {
                (this.stopped = !0),
                  r(
                    this.config.scrollContainer || window,
                    "scroll",
                    this.scrollHandler
                  ),
                  r(window, "resize", this.scrollHandler),
                  null != this.interval && clearInterval(this.interval);
              },
            },
            {
              key: "sync",
              value: function () {
                d.notSupported && this.doSync(this.element);
              },
            },
            {
              key: "doSync",
              value: function (e) {
                if ((null != e || (e = this.element), 1 === e.nodeType))
                  for (
                    var t = (e = e.parentNode || e).querySelectorAll(
                        "." + this.config.boxClass
                      ),
                      n = 0;
                    n < t.length;
                    n++
                  ) {
                    var o = t[n];
                    i(o, this.all) ||
                      (this.boxes.push(o),
                      this.all.push(o),
                      this.stopped || this.disabled()
                        ? this.resetStyle()
                        : this.applyStyle(o, !0),
                      (this.scrolled = !0));
                  }
              },
            },
            {
              key: "show",
              value: function (e) {
                return (
                  this.applyStyle(e),
                  (e.className = e.className + " " + this.config.animateClass),
                  null != this.config.callback && this.config.callback(e),
                  (function (e, t) {
                    null != e.dispatchEvent
                      ? e.dispatchEvent(t)
                      : t in (null != e)
                      ? e[t]()
                      : "on" + t in (null != e) && e["on" + t]();
                  })(e, this.wowEvent),
                  a(e, "animationend", this.resetAnimation),
                  a(e, "oanimationend", this.resetAnimation),
                  a(e, "webkitAnimationEnd", this.resetAnimation),
                  a(e, "MSAnimationEnd", this.resetAnimation),
                  e
                );
              },
            },
            {
              key: "applyStyle",
              value: function (e, t) {
                var n = this,
                  i = e.getAttribute("data-wow-duration"),
                  o = e.getAttribute("data-wow-delay"),
                  s = e.getAttribute("data-wow-iteration");
                return this.animate(function () {
                  return n.customStyle(e, t, i, o, s);
                });
              },
            },
            {
              key: "resetStyle",
              value: function () {
                for (var e = 0; e < this.boxes.length; e++) {
                  this.boxes[e].style.visibility = "visible";
                }
              },
            },
            {
              key: "resetAnimation",
              value: function (e) {
                if (e.type.toLowerCase().indexOf("animationend") >= 0) {
                  var t = e.target || e.srcElement;
                  t.className = t.className
                    .replace(this.config.animateClass, "")
                    .trim();
                }
              },
            },
            {
              key: "customStyle",
              value: function (e, t, n, i, o) {
                return (
                  t && this.cacheAnimationName(e),
                  (e.style.visibility = t ? "hidden" : "visible"),
                  n && this.vendorSet(e.style, { animationDuration: n }),
                  i && this.vendorSet(e.style, { animationDelay: i }),
                  o && this.vendorSet(e.style, { animationIterationCount: o }),
                  this.vendorSet(e.style, {
                    animationName: t ? "none" : this.cachedAnimationName(e),
                  }),
                  e
                );
              },
            },
            {
              key: "vendorSet",
              value: function (e, t) {
                for (var n in t)
                  if (t.hasOwnProperty(n)) {
                    var i = t[n];
                    e["" + n] = i;
                    for (var o = 0; o < this.vendors.length; o++) {
                      e[
                        "" +
                          this.vendors[o] +
                          n.charAt(0).toUpperCase() +
                          n.substr(1)
                      ] = i;
                    }
                  }
              },
            },
            {
              key: "vendorCSS",
              value: function (e, t) {
                for (
                  var n = f(e), i = n.getPropertyCSSValue(t), o = 0;
                  o < this.vendors.length;
                  o++
                ) {
                  var s = this.vendors[o];
                  i = i || n.getPropertyCSSValue("-" + s + "-" + t);
                }
                return i;
              },
            },
            {
              key: "animationName",
              value: function (e) {
                var t = void 0;
                try {
                  t = this.vendorCSS(e, "animation-name").cssText;
                } catch (n) {
                  t = f(e).getPropertyValue("animation-name");
                }
                return "none" === t ? "" : t;
              },
            },
            {
              key: "cacheAnimationName",
              value: function (e) {
                return this.animationNameCache.set(e, this.animationName(e));
              },
            },
            {
              key: "cachedAnimationName",
              value: function (e) {
                return this.animationNameCache.get(e);
              },
            },
            {
              key: "scrollHandler",
              value: function () {
                this.scrolled = !0;
              },
            },
            {
              key: "scrollCallback",
              value: function () {
                if (this.scrolled) {
                  this.scrolled = !1;
                  for (var e = [], t = 0; t < this.boxes.length; t++) {
                    var n = this.boxes[t];
                    if (n) {
                      if (this.isVisible(n)) {
                        this.show(n);
                        continue;
                      }
                      e.push(n);
                    }
                  }
                  (this.boxes = e),
                    this.boxes.length || this.config.live || this.stop();
                }
              },
            },
            {
              key: "offsetTop",
              value: function (e) {
                for (; void 0 === e.offsetTop; ) e = e.parentNode;
                for (var t = e.offsetTop; e.offsetParent; )
                  t += (e = e.offsetParent).offsetTop;
                return t;
              },
            },
            {
              key: "isVisible",
              value: function (e) {
                var t = e.getAttribute("data-wow-offset") || this.config.offset,
                  n =
                    (this.config.scrollContainer &&
                      this.config.scrollContainer.scrollTop) ||
                    window.pageYOffset,
                  i =
                    n +
                    Math.min(
                      this.element.clientHeight,
                      "innerHeight" in window
                        ? window.innerHeight
                        : document.documentElement.clientHeight
                    ) -
                    t,
                  o = this.offsetTop(e),
                  s = o + e.clientHeight;
                return i >= o && s >= n;
              },
            },
            {
              key: "disabled",
              value: function () {
                return (
                  !this.config.mobile &&
                  (function (e) {
                    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                      e
                    );
                  })(navigator.userAgent)
                );
              },
            },
          ]),
          e
        );
      })();
    (t.default = v), (e.exports = t.default);
  });
