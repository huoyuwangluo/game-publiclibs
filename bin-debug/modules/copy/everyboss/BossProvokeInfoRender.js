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
var renderer;
(function (renderer) {
    var BossProvokeInfoRender = (function (_super) {
        __extends(BossProvokeInfoRender, _super);
        function BossProvokeInfoRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._duration = 7000;
            return _this;
        }
        BossProvokeInfoRender.prototype.initialize = function () {
            this.gpProvoke.scaleX = this.gpProvoke.scaleY = 0;
        };
        BossProvokeInfoRender.prototype.show = function (data, resId) {
            if (data === void 0) { data = null; }
            if (resId === void 0) { resId = 0; }
            this.gpProvoke.visible = true;
            this.resetImgTween();
            egret.Tween.removeTweens(this.gpProvoke);
            if (data) {
                this.tweenAnimtion(data.ShowId);
                mg.soundManager.playSoundStopLast("PVPtalk_" + (data.ShowId + 1), 1, true);
            }
            else {
                if (resId > 0) {
                    this.tweenAnimtion(resId);
                }
                else {
                    utils.timer.clear(this, this.loopTiem);
                    utils.timer.once(2000, this, this.loopTiem);
                }
            }
        };
        BossProvokeInfoRender.prototype.loopTiem = function () {
            var _this = this;
            var time = this.gpProvoke.scaleX * 200;
            egret.Tween.get(this.gpProvoke).to({ scaleX: 0, scaleY: 0 }, time).call(function () {
                _this.imgProvoke.source = "img_provoke_0_png";
                egret.Tween.get(_this.gpProvoke).to({ scaleX: 1, scaleY: 1 }, 300).call(_this.imgTween, _this);
            }, this);
            utils.timer.clear(this, this.hide);
            utils.timer.once(this._duration, this, this.hide);
        };
        BossProvokeInfoRender.prototype.tweenAnimtion = function (showId) {
            var _this = this;
            var time = this.gpProvoke.scaleX * 200;
            egret.Tween.get(this.gpProvoke).to({ scaleX: 0, scaleY: 0 }, time).call(function () {
                _this.imgProvoke.source = "img_provoke_" + showId + "_png";
                egret.Tween.get(_this.gpProvoke).to({ scaleX: 1, scaleY: 1 }, 300).call(_this.imgTween, _this);
            }, this);
            // if(data.ShowType){
            utils.timer.clear(this, this.hide);
            utils.timer.once(this._duration, this, this.hide);
            // }
        };
        BossProvokeInfoRender.prototype.hide = function () {
            var _this = this;
            this.resetImgTween();
            this.gpProvoke.visible = false;
            utils.timer.clearAll(this);
            egret.Tween.removeTweens(this.gpProvoke);
            var time = this.gpProvoke.scaleX * 200;
            egret.Tween.get(this.gpProvoke).to({ scaleX: 0, scaleY: 0 }, time).call(function () {
                _this.gpProvoke.visible = false;
            }, this);
        };
        BossProvokeInfoRender.prototype.reset = function () {
            this.resetImgTween();
            utils.timer.clearAll(this);
            egret.Tween.removeTweens(this.gpProvoke);
            this.gpProvoke.visible = false;
            this.gpProvoke.scaleX = this.gpProvoke.scaleY = 0;
        };
        BossProvokeInfoRender.prototype.imgTween = function () {
            this.resetImgTween();
            this.showImgTween(3);
        };
        BossProvokeInfoRender.prototype.showImgTween = function (tweenTime) {
            var _this = this;
            if (tweenTime <= 0) {
                egret.Tween.get(this.imgProvoke).wait(1500).call(this.showImgTween, this, [3]);
                return;
            }
            egret.Tween.get(this.imgProvoke).to({ scaleX: 0.9, scaleY: 0.9 }, 50).call(function () {
                egret.Tween.get(_this.imgProvoke).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                    egret.Tween.get(_this.imgProvoke).to({ scaleX: 1.1, scaleY: 1.1 }, 50).call(function () {
                        egret.Tween.get(_this.imgProvoke).to({ scaleX: 1, scaleY: 1 }, 50).call(function () {
                            tweenTime--;
                            _this.showImgTween(tweenTime);
                        });
                    });
                });
            });
        };
        BossProvokeInfoRender.prototype.resetImgTween = function () {
            this.imgProvoke.scaleX = 1;
            this.imgProvoke.scaleY = 1;
            egret.Tween.removeTweens(this.imgProvoke);
        };
        return BossProvokeInfoRender;
    }(ui.BossProvokeInfoRenderSkin));
    renderer.BossProvokeInfoRender = BossProvokeInfoRender;
    __reflect(BossProvokeInfoRender.prototype, "renderer.BossProvokeInfoRender");
})(renderer || (renderer = {}));
