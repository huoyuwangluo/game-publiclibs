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
var dialog;
(function (dialog) {
    var task;
    (function (task) {
        var TaskFirstRecharge = (function (_super) {
            __extends(TaskFirstRecharge, _super);
            function TaskFirstRecharge() {
                return _super.call(this) || this;
            }
            TaskFirstRecharge.prototype.show = function () {
                this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this._totalTime = 3;
                utils.timer.loop(1000, this, this.timeHandler);
                this.timeHandler();
            };
            TaskFirstRecharge.prototype.timeHandler = function () {
                if (this._totalTime <= 0) {
                    utils.timer.clear(this, this.timeHandler);
                    this.dispatchEventWith(egret.Event.CLOSE);
                    return;
                }
                this.labTime.textFlow = utils.TextFlowMaker.generateTextFlow(Language.getExpression(Language.E_1MHZDGB, this._totalTime));
                this._totalTime--;
            };
            TaskFirstRecharge.prototype.hide = function () {
                utils.timer.clear(this, this.timeHandler);
                this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                if (this.parent) {
                    this.parent.removeChild(this);
                }
            };
            TaskFirstRecharge.prototype.onClose = function (e) {
                this.dispatchEventWith(egret.Event.CLOSE);
            };
            return TaskFirstRecharge;
        }(ui.TaskFirstRechargeSkin));
        task.TaskFirstRecharge = TaskFirstRecharge;
        __reflect(TaskFirstRecharge.prototype, "dialog.task.TaskFirstRecharge", ["IAlert", "egret.DisplayObject"]);
    })(task = dialog.task || (dialog.task = {}));
})(dialog || (dialog = {}));
