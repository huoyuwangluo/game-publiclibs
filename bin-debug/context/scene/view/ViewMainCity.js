var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var s;
(function (s) {
    var ViewMainCity = (function (_super) {
        __extends(ViewMainCity, _super);
        function ViewMainCity() {
            var _this = _super.call(this) || this;
            _this.skinName = "MainCityMapSkin";
            return _this;
        }
        ViewMainCity.prototype.initialize = function () {
            this._map = new main.MainCityUI();
            this._black = new eui.Image();
            this._black.source = 'main_pop_backBg_jpg';
            this._black.scale9Grid = new egret.Rectangle(12, 3, 12, 20);
        };
        Object.defineProperty(ViewMainCity.prototype, "camera", {
            get: function () { return null; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ViewMainCity.prototype, "scene", {
            get: function () { return null; },
            enumerable: true,
            configurable: true
        });
        ;
        ViewMainCity.prototype.reset = function () { };
        ViewMainCity.prototype.start = function () {
            mg.stageManager.onResize(this, this.resize, true);
        };
        ViewMainCity.prototype.stop = function () {
            this.removeCityViewFormScene();
            mg.stageManager.offResize(this, this.resize);
        };
        ViewMainCity.prototype.resize = function (w, h) {
            this.width = w;
            this.height = h;
            this._black.width = w;
            this._black.height = h;
        };
        ViewMainCity.prototype.addCityViewToScene = function () {
            this.addChild(this._black);
            this.addChild(this.scroller);
            if (GameModels.user.player.level >= 80) {
                this.scroller.scrollPolicyH = "on";
            }
            else {
                this.scroller.scrollPolicyH = "off";
            }
            if (this._map) {
                this.mapGroup.addChild(this._map);
                this._map.enter();
                this.scroller.bounces = false;
                this.mapGroup.validateNow();
                this.scroller.validateNow();
                this.scroller.viewport.scrollH = 200;
            }
        };
        ViewMainCity.prototype.removeCityViewFormScene = function () {
            if (this._black.parent)
                this._black.parent.removeChild(this._black);
            if (this.scroller.parent)
                this.scroller.parent.removeChild(this.scroller);
            if (this._map) {
                this._map.exit();
            }
        };
        ViewMainCity.prototype.getCityImg = function (index) {
            if (index == 1) {
                return this._map ? this._map.imgIcon1 : null;
            }
            else if (index == 2) {
                return this._map ? this._map.imgIcon2 : null;
            }
            else if (index == 3) {
                return this._map ? this._map.imgIcon3 : null;
            }
            else if (index == 6) {
                return this._map ? this._map.imgIcon6 : null;
            }
            else if (index == 7) {
                return this._map ? this._map.imgIcon7 : null;
            }
            else if (index == 8) {
                return this._map ? this._map.imgIcon8 : null;
            }
            else if (index == 9) {
                return this._map ? this._map.imgIcon9 : null;
            }
            else if (index == 10) {
                return this._map ? this._map.imgIcon10 : null;
            }
            else if (index == 11) {
                return this._map ? this._map.imgIcon11 : null;
            }
        };
        return ViewMainCity;
    }(eui.Component));
    s.ViewMainCity = ViewMainCity;
    __reflect(ViewMainCity.prototype, "s.ViewMainCity", ["s.IView", "egret.DisplayObject"]);
})(s || (s = {}));
