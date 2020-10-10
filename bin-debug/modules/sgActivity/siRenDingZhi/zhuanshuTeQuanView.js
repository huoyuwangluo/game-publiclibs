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
        /**game.sgActivityType.zstq*/
        var zhuanshuTeQuanView = (function (_super) {
            __extends(zhuanshuTeQuanView, _super);
            function zhuanshuTeQuanView() {
                return _super.call(this) || this;
            }
            zhuanshuTeQuanView.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._btnArr = [this.btn1, this.btn2, this.btn3, this.btn4, this.btn5];
                this._activityType = [game.sgActivityType.zstq1, game.sgActivityType.zstq2, game.sgActivityType.zstq3, game.sgActivityType.zstq4, game.sgActivityType.zstq5];
            };
            zhuanshuTeQuanView.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this._currSelecdIndex = 0;
                this.updata();
                this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
                this.btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                this.btn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                this.btn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                this.btn4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                this.btn5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                GameModels.sgActivity.addEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
            };
            zhuanshuTeQuanView.prototype.exit = function () {
                this.clearList(this.list);
                this.btnBuy.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.listClick, this);
                this.btn1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                this.btn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                this.btn3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                this.btn4.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                this.btn5.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTableClick, this);
                GameModels.sgActivity.removeEventListener(mo.ModelSgActivity.SG_ACTIVITY_CHANGE, this.showView, this);
            };
            zhuanshuTeQuanView.prototype.btnTableClick = function (e) {
                for (var i = 0; i < this._btnArr.length; i++) {
                    if (e.currentTarget == this._btnArr[i]) {
                        this._currSelecdIndex = i;
                        this.updata();
                        break;
                    }
                }
            };
            zhuanshuTeQuanView.prototype.listClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (e.target instanceof components.SnapButton) {
                    var item = this.list.selectedItem;
                    GameModels.sgActivity.requestSGGetActivityReward(this._currVo.actCfgId, item.rewardCfgId, 0, utils.Handler.create(this, this.getRewardCallback, [item.templateRewards]));
                }
            };
            zhuanshuTeQuanView.prototype.getRewardCallback = function (str) {
                this.showView();
                var rewards = str.split(";");
                mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
            };
            zhuanshuTeQuanView.prototype.btnClick = function (e) {
                var temRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, this._currVo.actSetTemp.params);
                if (temRecharge)
                    GameModels.platform.buy(temRecharge.RMB, 1, "" + temRecharge.id, temRecharge.name, temRecharge.des);
            };
            zhuanshuTeQuanView.prototype.updata = function () {
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].isWarn = GameModels.sgActivity.checkRedPoint(this._activityType[i]);
                    if (this._currSelecdIndex == i) {
                        this._btnArr[i].currentState = "down";
                    }
                    else {
                        this._btnArr[i].currentState = "up";
                    }
                }
                this._currVo = GameModels.sgActivity.getSgActivityListVOByType(this._activityType[this._currSelecdIndex]);
                var temRecharge = Templates.getTemplateById(templates.Map.GAMERECHARGE, this._currVo.actSetTemp.params);
                if (this._currSelecdIndex < 2) {
                }
                this.imgBg.source = "img_ZSTQ_bg" + this._currSelecdIndex + "_png";
                this.btnBuy.source = "btnMoney_json.btn_sg_chongzhi_" + temRecharge.RMB;
                if (!vo) {
                    mg.alertManager.tip(Language.C_HDYJS);
                    mg.uiManager.remove(this);
                    return;
                }
                var voList = this._currVo.actRewardListVOStorState;
                //var lastMs: number = GameModels.sgActivity.getLastDateSec(vo.actCfgId) * 0.001 >> 0;
                this.labTime.text = ""; //Language.getExpression(Language.E_1HJS, utils.DateUtil.formatTimeLeftInChinese(lastMs));
                if (voList) {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(voList);
                    }
                    else {
                        this._listData.source = voList;
                    }
                }
                else {
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection([]);
                    }
                    else {
                        this._listData.source = [];
                    }
                }
                this.list.dataProvider = this._listData;
                this.btnBuy.visible = !this._currVo.hashMyValueStr(this._currVo.actSetTemp.params);
            };
            zhuanshuTeQuanView.prototype.showView = function () {
                this.btnBuy.visible = !this._currVo.hashMyValueStr(this._currVo.actSetTemp.params);
                if (this._listData)
                    this._listData.replaceAll(this._currVo.actRewardListVOStorState);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].isWarn = GameModels.sgActivity.checkRedPoint(this._activityType[i]);
                }
            };
            return zhuanshuTeQuanView;
        }(ui.zhuanShuTeQuanSkin));
        activity.zhuanshuTeQuanView = zhuanshuTeQuanView;
        __reflect(zhuanshuTeQuanView.prototype, "view.activity.zhuanshuTeQuanView");
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
