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
        var ShengZhiTask = (function (_super) {
            __extends(ShengZhiTask, _super);
            function ShengZhiTask() {
                return _super.call(this) || this;
            }
            ShengZhiTask.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
            };
            ShengZhiTask.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.sgActivitysummerType.szkh);
                if (temp) {
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
            };
            ShengZhiTask.prototype.exit = function () {
            };
            return ShengZhiTask;
        }(ui.ShengZhiTaskSkin));
        activity.ShengZhiTask = ShengZhiTask;
        __reflect(ShengZhiTask.prototype, "view.activity.ShengZhiTask", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
