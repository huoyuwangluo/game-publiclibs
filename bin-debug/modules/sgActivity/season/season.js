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
var view;
(function (view) {
    var activity;
    (function (activity) {
        /**game.sgActivityType.everyDayTask */
        var season = (function (_super) {
            __extends(season, _super);
            function season() {
                return _super.call(this) || this;
            }
            season.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            season.prototype.enter = function (data) {
                this._seasonType = GameModels.serverTime.getSeason();
                this.imgBg.source = "img_seasonBg_" + this._seasonType + "_jpg";
            };
            season.prototype.exit = function () {
            };
            return season;
        }(ui.seasonSkin));
        activity.season = season;
        __reflect(season.prototype, "view.activity.season", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
