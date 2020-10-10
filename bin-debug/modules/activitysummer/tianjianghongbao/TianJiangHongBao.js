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
        var TianJiangHongBao = (function (_super) {
            __extends(TianJiangHongBao, _super);
            function TianJiangHongBao() {
                return _super.call(this) || this;
            }
            TianJiangHongBao.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._strArr = [];
                var dataSet = GameModels.dataSet.getDataSettingById(326011);
                this._strArr = dataSet.value.split(";");
            };
            TianJiangHongBao.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this._currIndex = 0;
                this.showText();
                this.showView();
                this.btnMoBai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoPaiClick, this);
            };
            TianJiangHongBao.prototype.exit = function () {
                this.clearList(this.list);
                utils.timer.clearAll(this);
                egret.Tween.removeTweens(this.labDes);
                this.labDes.scaleX = this.labDes.scaleY = 1;
                this.btnMoBai.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoPaiClick, this);
            };
            TianJiangHongBao.prototype.showView = function () {
                var _this = this;
                utils.timer.clearAll(this);
                this._time = 0;
                GameModels.activitySummer.requestHolidayHongBao(utils.Handler.create(this, function () {
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(GameModels.activitySummer.hongbaoRecord);
                    }
                    else {
                        _this._listData.source = GameModels.activitySummer.hongbaoRecord;
                    }
                    _this.list.dataProvider = _this._listData;
                    _this.updataTime();
                }));
            };
            TianJiangHongBao.prototype.onMoPaiClick = function () {
                this.showText();
            };
            TianJiangHongBao.prototype.showText = function () {
                egret.Tween.removeTweens(this.labDes);
                this.labDes.scaleX = this.labDes.scaleY = 1;
                if (this._currIndex >= 20) {
                    this.labDes.text = this._strArr[this._strArr.length - 1];
                    return;
                }
                if (this._currIndex <= this._strArr.length - 2) {
                    this.labDes.text = this._strArr[this._currIndex];
                    this._currIndex = this._currIndex + 1;
                    this.labDes.scaleX = this.labDes.scaleY = 2;
                    egret.Tween.get(this.labDes).to({ scaleX: 1, scaleY: 1 }, 500, utils.Ease.backOut);
                    return;
                }
                var num = Math.floor(Math.random() * (this._strArr.length - 1));
                this.labDes.text = this._strArr[num];
                this._currIndex = this._currIndex + 1;
                this.labDes.scaleX = this.labDes.scaleY = 2;
                egret.Tween.get(this.labDes).to({ scaleX: 1, scaleY: 1 }, 500, utils.Ease.backOut);
            };
            TianJiangHongBao.prototype.updataTime = function () {
                if (GameModels.activitySummer.hongbagState == 0) {
                    this._time = GameModels.activitySummer.hongbagEndTime;
                    this.labDate.text = utils.DateUtil.formatTimeLeft(this._time);
                    this.imgBg.source = "img_countDown2_png";
                    if (this._time > 0) {
                        utils.timer.countdown(this._time, this, this.updateLableTime, this.finshTime);
                    }
                }
                else if (GameModels.activitySummer.hongbagState == 1) {
                    this._time = GameModels.activitySummer.hongbagEndTime;
                    this.labDate.text = utils.DateUtil.formatTimeLeft(this._time);
                    this.imgBg.source = "img_countDown1_png";
                    if (this._time > 0) {
                        utils.timer.countdown(this._time, this, this.updateLableTime, this.finshTime);
                    }
                }
                else {
                    this.labDate.text = Language.C_YJS;
                    this.imgBg.source = "img_countDown1_png";
                }
            };
            TianJiangHongBao.prototype.updateLableTime = function () {
                this._time--;
                this.labDate.text = utils.DateUtil.formatTimeLeft(this._time);
            };
            TianJiangHongBao.prototype.finshTime = function () {
                utils.timer.clearAll(this);
                this._time = 0;
                this.showView();
            };
            return TianJiangHongBao;
        }(ui.TianJiangHongBaoSkin));
        activity.TianJiangHongBao = TianJiangHongBao;
        __reflect(TianJiangHongBao.prototype, "view.activity.TianJiangHongBao", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
