"use strict";

/* Notify v0.2.0 */

var Notify = function Notify(selector, options) {
  var _this = this;
  if (options === undefined) options = {};
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
      _this.close("#" + e.target.parentNode.id);
    }
  }, false);

  this.el.addEventListener("mouseover", function (e) {
    Object.keys(_this.notifyList).forEach(function (e) {
      clearTimeout(_this.notifyList[e].timeout);
    });
  }, true);

  this.el.addEventListener("mouseout", function (e) {
    Object.keys(_this.notifyList).forEach(function (item) {
      _this.notifyList[item].timeout = _this.setClosingDelay(item);
    });
  }, true);
};

Notify.prototype.getEl = function (arg) {
  if (typeof arg == "string") {
    return document.querySelector(arg);
  } else {
    return arg;
  }
};

Notify.prototype.setClosingDelay = function (item, closingDelay) {
  var _this2 = this;
  if (closingDelay === undefined) closingDelay = this.closingDelay;
  if (this.closingDelay) {
    var timeout = setTimeout(function () {
      _this2.close(item);
    }, this.closingDelay);

    return timeout;
  }
};

Notify.prototype.add = function (text, options) {
  if (options === undefined) options = {};
  var that = this;
  var timeout;
  var i = ++this.itemsCounter;
  var link = this.el.querySelector("#notify_" + i);
  var itemClasses = "notify__item";

  if (options.type) {
    itemClasses += " " + this.notifyTypes[options.type];
  } else {
    itemClasses += " " + this.notifyTypes["default"];
  }

  this.el.insertAdjacentHTML(this.orderConfig[this.order], "<div class=\"" + itemClasses + "\" id=\"notify_" + i + "\">\n          <div class=\"notify__close\">×</div>\n          <div class=\"notify__content\">" + text + "</div>\n      </div>");
  timeout = this.setClosingDelay("#notify_" + i, options.closingDelay || this.closingDelay);
  that.notifyList["#notify_" + i] = { timeout: timeout, link: link };

  return this;
};

Notify.prototype.close = function (sel) {
  var _this3 = this;
  var el = this.getEl(sel);

  el.classList.add("notify--closing");

  setTimeout(function () {
    _this3.el.removeChild(el);

    if (_this3.notifyList[sel].timeout) {
      clearTimeout(_this3.notifyList[sel].timeout);
    }

    delete _this3.notifyList[sel];

    if (Object.keys(_this3.notifyList).length == 0) {
      _this3.itemsCounter = 0;
    }
  }, this.removingDelay);

  return this;
};
//# sourceMappingURL=data:application/json;base64,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QUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUV6QixJQUFFLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUVwQyxZQUFVLENBQUMsWUFBTTtBQUNmOztBQUVBLFFBQUk7QUFDRixrQkFBWSxDQUFDO0tBQ2Q7O0FBRUQsV0FBTzs7QUFFUCxRQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDZDtLQUNEO0dBQ0YsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7O0FBRXZCLFNBQU8sSUFBSSxDQUFDO0NBQ2IiLCJmaWxlIjoibm90aWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogTm90aWZ5IHYwLjIuMCAqL1xyXG5cclxuY2xhc3MgTm90aWZ5IHtcclxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvciwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICB0aGlzLmVsID0gdGhpcy5nZXRFbChzZWxlY3Rvcik7XHJcbiAgICB0aGlzLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCAnZGVmYXVsdCc7XHJcbiAgICB0aGlzLmNsb3NpbmdEZWxheSA9IHBhcnNlSW50KG9wdGlvbnMuY2xvc2luZ0RlbGF5KSB8fCAwO1xyXG4gICAgdGhpcy5yZW1vdmluZ0RlbGF5ID0gcGFyc2VJbnQob3B0aW9ucy5yZW1vdmluZ0RlbGF5KSB8fCAzMDAwO1xyXG5cclxuICAgIHRoaXMuaXRlbXNDb3VudGVyID0gMDtcclxuICAgIHRoaXMubm90aWZ5TGlzdCA9IHt9O1xyXG5cclxuICAgIHRoaXMub3JkZXJDb25maWcgPSB7XHJcbiAgICAgIGRlZmF1bHQ6ICdiZWZvcmVFbmQnLFxyXG4gICAgICByZXZlcnNlOiAnYWZ0ZXJCZWdpbidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5ub3RpZnlUeXBlcyA9IHtcclxuICAgICAgZXJyb3I6ICdub3RpZnlfX2Vycm9yJyxcclxuICAgICAgd2FybmluZzogJ25vdGlmeV9fd2FybmluZycsXHJcbiAgICAgIHN1Y2Nlc3M6ICdub3RpZnlfX3N1Y2Nlc3MnLFxyXG4gICAgICBkZWZhdWx0OiAnbm90aWZ5X19kZWZhdWx0J1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgdmFyIGNsYXNzZXMgPSBlLnRhcmdldC5jbGFzc0xpc3Q7XHJcbiAgICAgIGlmIChjbGFzc2VzLmNvbnRhaW5zKCdub3RpZnlfX2Nsb3NlJykpIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCcjJyArIGUudGFyZ2V0LnBhcmVudE5vZGUuaWQpO1xyXG4gICAgICB9XHJcbiAgICB9LCBmYWxzZSk7XHJcblxyXG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoZSkgPT4ge1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmZvckVhY2goKGUpID0+IHtcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ub3RpZnlMaXN0W2VdLnRpbWVvdXQpO1xyXG4gICAgICB9KTtcclxuICAgIH0sIHRydWUpO1xyXG5cclxuICAgIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCAoZSkgPT4ge1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICB0aGlzLm5vdGlmeUxpc3RbaXRlbV0udGltZW91dCA9IHRoaXMuc2V0Q2xvc2luZ0RlbGF5KGl0ZW0pO1xyXG4gICAgICB9KTtcclxuICAgIH0sIHRydWUpO1xyXG4gIH1cclxuXHJcblxyXG4gIGdldEVsKGFyZykge1xyXG4gICAgaWYgKHR5cGVvZiBhcmcgPT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYXJnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBhcmc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRDbG9zaW5nRGVsYXkoaXRlbSwgY2xvc2luZ0RlbGF5ID0gdGhpcy5jbG9zaW5nRGVsYXkpIHtcclxuICAgIGlmICh0aGlzLmNsb3NpbmdEZWxheSkge1xyXG4gICAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoaXRlbSk7XHJcbiAgICAgIH0sIHRoaXMuY2xvc2luZ0RlbGF5KTtcclxuXHJcbiAgICAgIHJldHVybiB0aW1lb3V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZCh0ZXh0LCBvcHRpb25zID0ge30pIHtcclxuICAgIHZhciB0aGF0ID0gdGhpcztcclxuICAgIHZhciB0aW1lb3V0O1xyXG4gICAgdmFyIGkgPSArK3RoaXMuaXRlbXNDb3VudGVyO1xyXG4gICAgdmFyIGxpbmsgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3IoYCNub3RpZnlfJHtpfWApO1xyXG4gICAgdmFyIGl0ZW1DbGFzc2VzID0gJ25vdGlmeV9faXRlbSc7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMudHlwZSkge1xyXG4gICAgICBpdGVtQ2xhc3NlcyArPSBcIiBcIiArIHRoaXMubm90aWZ5VHlwZXNbb3B0aW9ucy50eXBlXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGl0ZW1DbGFzc2VzICs9IFwiIFwiICsgdGhpcy5ub3RpZnlUeXBlc1snZGVmYXVsdCddO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKHRoaXMub3JkZXJDb25maWdbdGhpcy5vcmRlcl0sXHJcbiAgICAgIGA8ZGl2IGNsYXNzPVwiJHtpdGVtQ2xhc3Nlc31cIiBpZD1cIm5vdGlmeV8ke2l9XCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZ5X19jbG9zZVwiPsOXPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwibm90aWZ5X19jb250ZW50XCI+JHt0ZXh0fTwvZGl2PlxyXG4gICAgICA8L2Rpdj5gKTtcclxuICAgIHRpbWVvdXQgPSB0aGlzLnNldENsb3NpbmdEZWxheShgI25vdGlmeV8ke2l9YCwgb3B0aW9ucy5jbG9zaW5nRGVsYXkgfHwgdGhpcy5jbG9zaW5nRGVsYXkpO1xyXG4gICAgdGhhdC5ub3RpZnlMaXN0W2Ajbm90aWZ5XyR7aX1gXSA9IHt0aW1lb3V0LCBsaW5rfTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG5cclxuICBjbG9zZShzZWwpIHtcclxuICAgIHZhciBlbCA9IHRoaXMuZ2V0RWwoc2VsKTtcclxuXHJcbiAgICBlbC5jbGFzc0xpc3QuYWRkKCdub3RpZnktLWNsb3NpbmcnKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5lbC5yZW1vdmVDaGlsZChlbCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5ub3RpZnlMaXN0W3NlbF0udGltZW91dCkgeyBcclxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5ub3RpZnlMaXN0W3NlbF0udGltZW91dCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRlbGV0ZSB0aGlzLm5vdGlmeUxpc3Rbc2VsXTtcclxuXHJcbiAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLm5vdGlmeUxpc3QpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtc0NvdW50ZXIgPSAwO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzLnJlbW92aW5nRGVsYXkpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=