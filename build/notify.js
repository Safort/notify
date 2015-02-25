"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

/* Notify v0.3.1 */

var Notify = (function () {

  /**
   * @constructor
   * @this {Steerer}
   * @param  {string} selector element selector
   * @param  {Object} options  options
   */

  function Notify(selector) {
    var _this = this;

    var options = arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Notify);

    this.el = this.getEl(selector);
    this.order = options.order || "default";
    this.closingDelay = parseInt(options.closingDelay) || 0;
    this.removingDelay = parseInt(options.removingDelay) || 3000;

    this.itemsCounter = 0;
    this.notifyList = {};

    this.orderConfig = {
      "default": "beforeEnd",
      reverse: "afterBegin"
    };

    this.notifyTypes = {
      error: "notify__error",
      warning: "notify__warning",
      success: "notify__success",
      "default": "notify__default"
    };

    this.el.addEventListener("click", function (e) {
      var classes = e.target.classList;

      if (classes.contains("notify__close")) {
        // console.log(e.target.parentNode.parentNode);
        _this.close("#" + e.target.parentNode.id);
      }
    }, false);

    this.el.addEventListener("mouseover", function (e) {
      Object.keys(_this.notifyList).forEach(function (e) {
        clearTimeout(_this.notifyList[e].timeout);
      });
    }, false);

    this.el.addEventListener("mouseout", function (e) {
      Object.keys(_this.notifyList).forEach(function (item) {
        _this.notifyList[item].timeout = _this.setClosingDelay(item, _this.notifyList[item].closingDelay);
      });
    }, false);
  }

  _prototypeProperties(Notify, null, {
    getEl: {

      /**
       * get element
       * @param  {string|object} arg get element selector
       * @return {object}
       */

      value: function getEl(arg) {
        if (typeof arg == "string") {
          return document.querySelector(arg);
        } else {
          return arg;
        }
      },
      writable: true,
      configurable: true
    },
    setClosingDelay: {

      /**
       * set delay for closing notification
       * @param {string} item         selector of notification
       * @param {number} closingDelay delay
       */

      value: function setClosingDelay(item) {
        var _this = this;

        var closingDelay = arguments[1] === undefined ? this.closingDelay : arguments[1];

        if (closingDelay) {
          var timeout = setTimeout(function () {
            _this.close(item);
          }, closingDelay);

          return timeout;
        }
      },
      writable: true,
      configurable: true
    },
    add: {

      /**
       * add notification
       * @param {string} text    notification text
       * @param {Object} options options
       */

      value: function add() {
        var options = arguments[0] === undefined ? {} : arguments[0];

        var timeout = undefined;
        var i = ++this.itemsCounter;
        var title = options.title;
        var content = options.content;
        var _options$closingDelay = options.closingDelay;
        var closingDelay = _options$closingDelay === undefined ? this.closingDelay : _options$closingDelay;
        var _options$type = options.type;
        var type = _options$type === undefined ? "default" : _options$type;

        title = !title ? "" : "<div class=\"notify__title\">" + title + "</div>";
        content = !content || typeof content == "object" ? "" : "<div class=\"notify__content\">" + content + "</div>";

        this.el.insertAdjacentHTML(this.orderConfig[this.order], "<div class=\"notify__item " + this.notifyTypes[type] + "\" id=\"notify_" + i + "\">\n          <div class=\"notify__close\">×</div>\n          " + title + "\n          " + content + "\n      </div>");
        timeout = this.setClosingDelay("#notify_" + i, closingDelay);
        this.notifyList["#notify_" + i] = { timeout: timeout, closingDelay: closingDelay };

        return this;
      },
      writable: true,
      configurable: true
    },
    close: {

      /**
       * close notification
       * @param {string} sel selector
       */

      value: function close(sel) {
        var _this = this;

        var el = this.getEl(sel);

        el.classList.add("notify--closing");

        setTimeout(function () {
          if (_this.notifyList[sel]) {
            _this.el.removeChild(el);

            if (_this.notifyList[sel].timeout) {
              clearTimeout(_this.notifyList[sel].timeout);
            }

            delete _this.notifyList[sel];

            if (Object.keys(_this.notifyList).length == 0) {
              _this.itemsCounter = 0;
            }
          }
        }, this.removingDelay);

        return this;
      },
      writable: true,
      configurable: true
    },
    closeAll: {

      /**
       * close all notification
       */

      value: function closeAll() {
        var self = this;
        var items = this.el.querySelectorAll(".notify__item");

        Array.from(items).forEach(function (item) {
          return self.close("#" + item.id);
        });
      },
      writable: true,
      configurable: true
    },
    closeFirst: {

      /**
       * close first notification
       */

      value: function closeFirst() {
        var item = this.el.querySelector(":first-child");

        if (item) {
          this.close("#" + item.id);
        }
      },
      writable: true,
      configurable: true
    },
    closeLast: {

      /**
       * close last notofication
       */

      value: function closeLast() {
        var item = this.el.querySelector(".notify__item:last-child");

        if (item) {
          this.close("#" + item.id);
        }
      },
      writable: true,
      configurable: true
    }
  });

  return Notify;
})();
//# sourceMappingURL=data:application/json;base64,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Y0FBYyxDQUFDLENBQUM7O0FBRWpELFlBQUksSUFBSSxFQUFFO0FBQ1IsY0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO09BQ0Y7Ozs7QUFNRCxhQUFTOzs7Ozs7YUFBQSxxQkFBRztBQUNWLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7O0FBRTdELFlBQUksSUFBSSxFQUFFO0FBQ1IsY0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO09BQ0Y7Ozs7OztTQTFLRyxNQUFNIiwiZmlsZSI6Im5vdGlmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIE5vdGlmeSB2MC4zLjEgKi9cclxuXHJcbmNsYXNzIE5vdGlmeSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEB0aGlzIHtTdGVlcmVyfVxyXG4gICAqIEBwYXJhbSAge3N0cmluZ30gc2VsZWN0b3IgZWxlbWVudCBzZWxlY3RvclxyXG4gICAqIEBwYXJhbSAge09iamVjdH0gb3B0aW9ucyAgb3B0aW9uc1xyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBvcHRpb25zID0ge30pIHtcclxuICAgIHRoaXMuZWwgPSB0aGlzLmdldEVsKHNlbGVjdG9yKTtcclxuICAgIHRoaXMub3JkZXIgPSBvcHRpb25zLm9yZGVyIHx8ICdkZWZhdWx0JztcclxuICAgIHRoaXMuY2xvc2luZ0RlbGF5ID0gcGFyc2VJbnQob3B0aW9ucy5jbG9zaW5nRGVsYXkpIHx8IDA7XHJcbiAgICB0aGlzLnJlbW92aW5nRGVsYXkgPSBwYXJzZUludChvcHRpb25zLnJlbW92aW5nRGVsYXkpIHx8IDMwMDA7XHJcblxyXG4gICAgdGhpcy5pdGVtc0NvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5ub3RpZnlMaXN0ID0ge307XHJcblxyXG4gICAgdGhpcy5vcmRlckNvbmZpZyA9IHtcclxuICAgICAgZGVmYXVsdDogJ2JlZm9yZUVuZCcsXHJcbiAgICAgIHJldmVyc2U6ICdhZnRlckJlZ2luJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLm5vdGlmeVR5cGVzID0ge1xyXG4gICAgICBlcnJvcjogJ25vdGlmeV9fZXJyb3InLFxyXG4gICAgICB3YXJuaW5nOiAnbm90aWZ5X193YXJuaW5nJyxcclxuICAgICAgc3VjY2VzczogJ25vdGlmeV9fc3VjY2VzcycsXHJcbiAgICAgIGRlZmF1bHQ6ICdub3RpZnlfX2RlZmF1bHQnXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICBsZXQgY2xhc3NlcyA9IGUudGFyZ2V0LmNsYXNzTGlzdDtcclxuXHJcbiAgICAgIGlmIChjbGFzc2VzLmNvbnRhaW5zKCdub3RpZnlfX2Nsb3NlJykpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhlLnRhcmdldC5wYXJlbnROb2RlLnBhcmVudE5vZGUpO1xyXG4gICAgICAgIHRoaXMuY2xvc2UoJyMnICsgZS50YXJnZXQucGFyZW50Tm9kZS5pZCk7XHJcbiAgICAgIH1cclxuICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIChlKSA9PiB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHRoaXMubm90aWZ5TGlzdCkuZm9yRWFjaCgoZSkgPT4ge1xyXG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5vdGlmeUxpc3RbZV0udGltZW91dCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSwgZmFsc2UpO1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZSkgPT4ge1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICB0aGlzLm5vdGlmeUxpc3RbaXRlbV0udGltZW91dCA9IHRoaXMuc2V0Q2xvc2luZ0RlbGF5KGl0ZW0sIHRoaXMubm90aWZ5TGlzdFtpdGVtXS5jbG9zaW5nRGVsYXkpO1xyXG4gICAgICB9KTtcclxuICAgIH0sIGZhbHNlKTtcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBnZXQgZWxlbWVudFxyXG4gICAqIEBwYXJhbSAge3N0cmluZ3xvYmplY3R9IGFyZyBnZXQgZWxlbWVudCBzZWxlY3RvclxyXG4gICAqIEByZXR1cm4ge29iamVjdH1cclxuICAgKi9cclxuICBnZXRFbChhcmcpIHtcclxuICAgIGlmICh0eXBlb2YgYXJnID09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGFyZyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXJnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIHNldCBkZWxheSBmb3IgY2xvc2luZyBub3RpZmljYXRpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAgICAgICAgIHNlbGVjdG9yIG9mIG5vdGlmaWNhdGlvblxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBjbG9zaW5nRGVsYXkgZGVsYXlcclxuICAgKi9cclxuICBzZXRDbG9zaW5nRGVsYXkoaXRlbSwgY2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zaW5nRGVsYXkpIHtcclxuICAgIGlmIChjbG9zaW5nRGVsYXkpIHtcclxuICAgICAgbGV0IHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmNsb3NlKGl0ZW0pO1xyXG4gICAgICB9LCBjbG9zaW5nRGVsYXkpO1xyXG5cclxuICAgICAgcmV0dXJuIHRpbWVvdXQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogYWRkIG5vdGlmaWNhdGlvblxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0ICAgIG5vdGlmaWNhdGlvbiB0ZXh0XHJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9uc1xyXG4gICAqL1xyXG4gIGFkZChvcHRpb25zID0ge30pIHtcclxuICAgIGxldCB0aW1lb3V0O1xyXG4gICAgbGV0IGkgPSArK3RoaXMuaXRlbXNDb3VudGVyO1xyXG4gICAgbGV0IHt0aXRsZSwgY29udGVudCwgY2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zaW5nRGVsYXksIHR5cGUgPSAnZGVmYXVsdCd9ID0gb3B0aW9ucztcclxuXHJcbiAgICB0aXRsZSA9ICF0aXRsZSA/ICcnIDogYDxkaXYgY2xhc3M9XCJub3RpZnlfX3RpdGxlXCI+JHt0aXRsZX08L2Rpdj5gO1xyXG4gICAgY29udGVudCA9ICFjb250ZW50IHx8IFxyXG4gICAgICAgICAgICAgIHR5cGVvZiBjb250ZW50ID09ICdvYmplY3QnID8gJycgOiBgPGRpdiBjbGFzcz1cIm5vdGlmeV9fY29udGVudFwiPiR7Y29udGVudH08L2Rpdj5gO1xyXG5cclxuICAgIHRoaXMuZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKHRoaXMub3JkZXJDb25maWdbdGhpcy5vcmRlcl0sXHJcbiAgICAgIGA8ZGl2IGNsYXNzPVwibm90aWZ5X19pdGVtICR7dGhpcy5ub3RpZnlUeXBlc1t0eXBlXX1cIiBpZD1cIm5vdGlmeV8ke2l9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZ5X19jbG9zZVwiPsOXPC9kaXY+XHJcbiAgICAgICAgICAke3RpdGxlfVxyXG4gICAgICAgICAgJHtjb250ZW50fVxyXG4gICAgICA8L2Rpdj5gKTtcclxuICAgIHRpbWVvdXQgPSB0aGlzLnNldENsb3NpbmdEZWxheShgI25vdGlmeV8ke2l9YCwgY2xvc2luZ0RlbGF5KTtcclxuICAgIHRoaXMubm90aWZ5TGlzdFtgI25vdGlmeV8ke2l9YF0gPSB7dGltZW91dCwgY2xvc2luZ0RlbGF5fTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG5cclxuICAvKipcclxuICAgKiBjbG9zZSBub3RpZmljYXRpb25cclxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2VsIHNlbGVjdG9yXHJcbiAgICovXHJcbiAgY2xvc2Uoc2VsKSB7XHJcbiAgICBsZXQgZWwgPSB0aGlzLmdldEVsKHNlbCk7XHJcblxyXG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnbm90aWZ5LS1jbG9zaW5nJyk7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm5vdGlmeUxpc3Rbc2VsXSkge1xyXG4gICAgICAgIHRoaXMuZWwucmVtb3ZlQ2hpbGQoZWwpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ub3RpZnlMaXN0W3NlbF0udGltZW91dCkgeyBcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5vdGlmeUxpc3Rbc2VsXS50aW1lb3V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm5vdGlmeUxpc3Rbc2VsXTtcclxuXHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMubm90aWZ5TGlzdCkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgIHRoaXMuaXRlbXNDb3VudGVyID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMucmVtb3ZpbmdEZWxheSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogY2xvc2UgYWxsIG5vdGlmaWNhdGlvblxyXG4gICAqL1xyXG4gIGNsb3NlQWxsKCkge1xyXG4gICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgbGV0IGl0ZW1zID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKCcubm90aWZ5X19pdGVtJyk7XHJcblxyXG4gICAgQXJyYXkuZnJvbShpdGVtcykuZm9yRWFjaCggaXRlbSA9PiBzZWxmLmNsb3NlKCcjJyArIGl0ZW0uaWQpICk7XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogY2xvc2UgZmlyc3Qgbm90aWZpY2F0aW9uXHJcbiAgICovXHJcbiAgY2xvc2VGaXJzdCgpIHtcclxuICAgIGxldCBpdGVtID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yKCc6Zmlyc3QtY2hpbGQnKTtcclxuXHJcbiAgICBpZiAoaXRlbSkge1xyXG4gICAgICB0aGlzLmNsb3NlKCcjJyArIGl0ZW0uaWQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIC8qKlxyXG4gICAqIGNsb3NlIGxhc3Qgbm90b2ZpY2F0aW9uXHJcbiAgICovXHJcbiAgY2xvc2VMYXN0KCkge1xyXG4gICAgbGV0IGl0ZW0gPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoJy5ub3RpZnlfX2l0ZW06bGFzdC1jaGlsZCcpO1xyXG5cclxuICAgIGlmIChpdGVtKSB7XHJcbiAgICAgIHRoaXMuY2xvc2UoJyMnICsgaXRlbS5pZCk7XHJcbiAgICB9XHJcbiAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9