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
        var TaskCollectView = (function (_super) {
            __extends(TaskCollectView, _super);
            function TaskCollectView() {
                return _super.call(this) || this;
            }
            TaskCollectView.prototype.showView = function (call, handler, data) {
                if (call === void 0) { call = null; }
                if (handler === void 0) { handler = null; }
                if (data === void 0) { data = null; }
                this._call = call;
                this._handler = handler;
                this._effect = this.fromEffect("202004");
                this._effect.x = this.width / 2;
                this._effect.y = this.height / 2 - 30;
                this._effect.play();
                this.addChild(this._effect);
                egret.Tween.removeTweens(this.prorgessBar);
                this.prorgessBar.maximum = 100;
                this.prorgessBar.minimum = 0;
                this.prorgessBar.value = 0;
                egret.Tween.get(this.prorgessBar).to({ value: 100 }, 2000, utils.Ease.linearNone).call(function () {
                    if (this._call && this._handler)
                        this._handler.call(this._call, data);
                }, this);
            };
            TaskCollectView.prototype.removeThis = function () {
                if (this.parent) {
                    egret.Tween.removeTweens(this.prorgessBar);
                    if (this._effect) {
                        if (this._effect.parent) {
                            this._effect.parent.removeChild(this._effect);
                        }
                        this._effect.stop();
                        utils.ObjectPool.to(this._effect, true);
                        this._effect = null;
                    }
                    this.parent.removeChild(this);
                }
            };
            return TaskCollectView;
        }(ui.TaskCollectSkin));
        task.TaskCollectView = TaskCollectView;
        __reflect(TaskCollectView.prototype, "dialog.task.TaskCollectView");
    })(task = dialog.task || (dialog.task = {}));
})(dialog || (dialog = {}));
