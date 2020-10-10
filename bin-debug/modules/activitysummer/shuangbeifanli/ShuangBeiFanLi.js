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
        var ShuangBeiFanLi = (function (_super) {
            __extends(ShuangBeiFanLi, _super);
            function ShuangBeiFanLi() {
                return _super.call(this) || this;
            }
            ShuangBeiFanLi.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._btnChongZhiArr = [this.btnChongzhi0, this.btnChongzhi1, this.btnChongzhi2, this.btnChongzhi3];
                if (platform.sdk && platform.sdk.type == platform.XL) {
                    for (var i = 0; i < this._btnChongZhiArr.length; i++) {
                        this._btnChongZhiArr[i].source = "firstrecharge_json.btn_danbei";
                    }
                    this.groupXianLai.visible = true;
                }
                else {
                    this.groupXianLai.visible = false;
                }
            };
            ShuangBeiFanLi.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                if (platform.sdk && platform.sdk.type == platform.XL) {
                    this.groupXianLai.visible = true;
                    this.updateXianlaiDisplay();
                    platform.sdk.addEventListener('paySuccess', this.updateXianlaiDisplay, this);
                }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.SPFL);
                if (temp) {
                    this.labDesc.text = temp.des;
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                for (var i = 0; i < this._btnChongZhiArr.length; i++) {
                    this._btnChongZhiArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChongZhiClick, this);
                }
                this.onLevelChange();
                GameModels.user.player.onPropertyChange(TypeProperty.VIP_LEVEL, this, this.onLevelChange);
                GameModels.user.player.onPropertyChange(TypeProperty.VIP_EXP, this, this.onLevelChange);
            };
            ShuangBeiFanLi.prototype.exit = function () {
                for (var i = 0; i < this._btnChongZhiArr.length; i++) {
                    this._btnChongZhiArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChongZhiClick, this);
                }
                GameModels.user.player.offPropertyChange(TypeProperty.VIP_LEVEL, this, this.onLevelChange);
                GameModels.user.player.offPropertyChange(TypeProperty.VIP_EXP, this, this.onLevelChange);
            };
            ShuangBeiFanLi.prototype.onLevelChange = function () {
                // GameModels.activitySummer.requestActivityRechargeData(utils.Handler.create(this, this.updataView));
                this.updataView();
            };
            ShuangBeiFanLi.prototype.updataView = function () {
                var data = GameModels.activitySummer.rechargeVO;
                for (var i = 0; i < this._btnChongZhiArr.length; i++) {
                    if (data[i]) {
                        if (data[i].buyState == true) {
                            this._btnChongZhiArr[i].filters = utils.filterUtil.grayFilters;
                            this._btnChongZhiArr[i].touchEnabled = false;
                        }
                        else {
                            this._btnChongZhiArr[i].filters = null;
                            this._btnChongZhiArr[i].touchEnabled = true;
                        }
                    }
                }
            };
            ShuangBeiFanLi.prototype.onChongZhiClick = function (e) {
                var data = GameModels.activitySummer.rechargeVO;
                for (var i = 0; i < this._btnChongZhiArr.length; i++) {
                    if (e.currentTarget == this._btnChongZhiArr[i]) {
                        if (data[i]) {
                            //logger.log("调用充值", data[i].template.id, data[i].buyState);
                            GameModels.platform.buy(data[i].template.RMB, 1, "" + data[i].template.id, data[i].template.name, data[i].template.des);
                        }
                        break;
                    }
                }
            };
            ShuangBeiFanLi.prototype.updateXianlaiDisplay = function () {
                var _this = this;
                platform.sdk.getStoreDiamonds(this, function (total) {
                    var result = total.toString();
                    if (total >= 10000) {
                        if (total % 10000 == 0) {
                            result = ((total / 10000) >> 0) + Language.Z_WAN;
                        }
                        else {
                            result = (((total / 100) >> 0) / 100).toFixed(2) + Language.Z_WAN;
                        }
                    }
                    _this.labXianLaiDiamonds.text = result;
                });
            };
            return ShuangBeiFanLi;
        }(ui.ShuangBeiFanLiSkin));
        activity.ShuangBeiFanLi = ShuangBeiFanLi;
        __reflect(ShuangBeiFanLi.prototype, "view.activity.ShuangBeiFanLi", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
