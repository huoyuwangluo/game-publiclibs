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
    var vip;
    (function (vip) {
        /**game.sgActivityType.viplb */
        var vipGiftView = (function (_super) {
            __extends(vipGiftView, _super);
            function vipGiftView() {
                return _super.call(this) || this;
            }
            vipGiftView.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._vipRwards = [this.reward0, this.reward1, this.reward2];
                this._labArr = [Language.J_VIP0, Language.J_VIP1, Language.J_VIP2, Language.J_VIP3, Language.J_VIP4,
                    Language.J_VIP5, Language.J_VIP6, Language.J_VIP7, Language.J_VIP8, Language.J_VIP9, Language.J_VIP10];
            };
            vipGiftView.prototype.enter = function (pos) {
                var _this = this;
                if (pos === void 0) { pos = 0; }
                GameModels.oneCountRedPoint.isOpenVipBuyView = true;
                var data1 = [];
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.viplb);
                for (var i = 0; i < vo.actRewardListVO.length; i++) {
                    var rewardVo = vo.actRewardListVO[i];
                    if (vo.myValue != 0) {
                        if (vo.myValue >= rewardVo.templateNeedVip && vo.myValue < 10) {
                            if (rewardVo.getTimes <= 0) {
                                pos = i;
                                break;
                            }
                        }
                        else {
                            pos = vo.myValue;
                            break;
                        }
                    }
                }
                for (var i = 0; i < vo.actRewardListVO.length; i++) {
                    if (i == pos) {
                        data1.push({ selected: true, index: i, title: this._labArr[i] });
                    }
                    else {
                        data1.push({ selected: false, index: i, title: this._labArr[i] });
                    }
                }
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(data1);
                }
                else {
                    this._listData.source = data1;
                }
                this._pos = pos;
                this.listVip0.dataProvider = this._listData;
                this.listVip0.selectedIndex = this._pos;
                this._currData = this.listVip0.selectedItem;
                this.updateScrollH(this.listVip0.selectedIndex * 120);
                GameModels.sgActivity.requestSGRunningActivitys(utils.Handler.create(this, function () {
                    _this.updateInfo();
                    _this.updataDayInfo();
                }));
                this.listVip0.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onVipClick, this);
                this.btnRecharge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRecharge, this);
                this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveClick, this);
                this.btnReceiveDay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHelpClick, this);
            };
            vipGiftView.prototype.exit = function () {
                this.clearList(this.listVip0);
                for (var i = 0; i < this._vipRwards.length; i++) {
                    this.reward.dataSource = null;
                }
                this.listVip0.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onVipClick, this);
                this.btnRecharge.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRecharge, this);
                this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveClick, this);
                this.btnReceiveDay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceiveClick, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHelpClick, this);
            };
            vipGiftView.prototype.btnHelpClick = function (e) {
                mg.alertManager.showAlert(PromptAlert, true, true, Language.J_ZSDYBBJRED, TypeBtnLabel.OK_SIGIN, null, null);
            };
            vipGiftView.prototype.updateScrollH = function (maxLength) {
                this.listVip0.validateNow();
                var pos = maxLength - 300 + 46;
                var maxScrollH = this.listVip0.contentWidth - 600;
                if (pos <= 0)
                    pos = 0;
                else if (pos >= maxScrollH)
                    pos = maxScrollH;
                this.rollScroller(pos);
            };
            /**滚动条滚动到指定位置 */
            vipGiftView.prototype.rollScroller = function (pos, duration) {
                if (duration === void 0) { duration = 200; }
                egret.Tween.get(this.scrollerVip.viewport).to({ scrollH: pos }, duration);
            };
            vipGiftView.prototype.onVipClick = function (e) {
                if (e.item.selected == true)
                    return;
                this._currData.selected = false;
                this._listData.itemUpdated(this._currData);
                e.item.selected = !e.item.selected;
                this._listData.itemUpdated(e.item);
                this.listVip0.selectedIndex = e.itemIndex;
                this._pos = e.itemIndex;
                this._currData = this.listVip0.selectedItem;
                this.updateScrollH(this.listVip0.selectedIndex * 120);
                this.updateInfo();
                this.updataDayInfo();
            };
            vipGiftView.prototype.onRecharge = function (e) {
                GameModels.recharge.openRechargeDialog();
            };
            vipGiftView.prototype.onReceiveClick = function (e) {
                var _this = this;
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                if (e.currentTarget == this.btnReceiveDay) {
                    var hash = game.state.getItem(GameModels.user.player.uid, TypeSetting.VIP_FULI);
                    if (hash) {
                        this.getReward();
                    }
                    else {
                        mg.alertManager.showAlert(PromptAlert, false, true, Language.J_VIPFL, TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                            game.state.setItem(GameModels.user.player.uid, TypeSetting.VIP_FULI, 1);
                            this.getReward();
                        }));
                    }
                }
                else {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.viplb);
                    if (vo && vo.actRewardListVO && vo.actRewardListVO[this.listVip0.selectedIndex]) {
                        var rewardVo = vo.actRewardListVO[this.listVip0.selectedIndex];
                        var currIndex = this.listVip0.selectedIndex > 10 ? 10 : this.listVip0.selectedIndex;
                        if (vo.myValue < rewardVo.templateNeedVip) {
                            mg.alertManager.tip(Language.getExpression(Language.E_XYVIP1, currIndex));
                            return;
                        }
                        GameModels.sgActivity.requestSGGetActivityReward(vo.actCfgId, rewardVo.rewardCfgId, 0, utils.Handler.create(this, function () {
                            // this.reward.playFlyItem();
                            var rewards = [_this.reward.dataSource];
                            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                            _this._currData.selected = false;
                            _this._listData.itemUpdated(_this._currData);
                            _this.listVip0.selectedIndex = _this._pos + 1 > vo.actRewardListVO.length - 1 ? vo.actRewardListVO.length - 1 : _this._pos + 1;
                            _this._pos = _this.listVip0.selectedIndex;
                            _this._currData = _this.listVip0.selectedItem;
                            _this._currData.selected = !_this._currData.selected;
                            _this._listData.itemUpdated(_this._currData);
                            _this.updateScrollH(_this.listVip0.selectedIndex * 120);
                            _this.updateInfo();
                        }));
                    }
                }
            };
            vipGiftView.prototype.getReward = function () {
                var _this = this;
                GameModels.vip.requestVIPDailyReward(utils.Handler.create(this, function () {
                    var rewards = [];
                    for (var i = 0; i < _this._vipRwards.length; i++) {
                        // this._vipRwards[i].playFlyItem();
                        rewards.push(_this._vipRwards[i].dataSource);
                    }
                    mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
                    _this.updataDayInfo();
                }));
            };
            vipGiftView.prototype.updataDayInfo = function () {
                var _this = this;
                this.notAttainDay.visible = false;
                this.getVipBoxDay.visible = false;
                this.btnReceiveDay.visible = false;
                GameModels.vip.requestVIPRewardInfo((utils.Handler.create(this, function (data) {
                    _this._level = GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL) || 0;
                    _this.vipLevel.source = "newVip_json.vip_" + _this._level;
                    var next = GameModels.vip.getNextVipTemplate(_this._level);
                    var needExp = next.vipExp / 10;
                    var nowVip = data.VipExp > 2000000 ? 2000000 : data.VipExp;
                    _this.labPro.text = (nowVip / 10) >= needExp ? needExp + "/" + needExp : (nowVip / 10) + "/" + needExp;
                    _this.expProgress.noTweenValue = (nowVip / 10) / needExp;
                    if (!GameModels.vip.checkMaxVip(_this._level)) {
                        _this.labUpgradeNeed.text = Language.getExpression(Language.E_ZCZ1MSCW2, (needExp - (nowVip / 10)), next.id);
                    }
                    else {
                        _this.labUpgradeNeed.text = Language.J_GXNVIPYDDDJ;
                    }
                    var currIndex = _this.listVip0.selectedIndex > 10 ? 10 : _this.listVip0.selectedIndex;
                    var temp = Templates.getTemplateByProperty(templates.Map.VIPREWARD, "vip", currIndex);
                    _this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(temp.des);
                    _this.imgVip.source = "sgActivity_json.img_vip_v" + currIndex;
                    if (currIndex <= _this._level) {
                        var temp1 = Templates.getTemplateByProperty(templates.Map.VIPREWARD, "vip", _this._level);
                        var strArr1 = temp1.dailyRewards.split(";");
                        for (var i = 0; i < _this._vipRwards.length; i++) {
                            _this._vipRwards[i].dataSource = strArr1[i];
                        }
                        _this.imgVip1.source = "sgActivity_json.img_vip_v" + _this._level;
                    }
                    else {
                        var strArr2 = temp.dailyRewards.split(";");
                        for (var i = 0; i < _this._vipRwards.length; i++) {
                            _this._vipRwards[i].dataSource = strArr2[i];
                        }
                        _this.imgVip1.source = "sgActivity_json.img_vip_v" + currIndex;
                    }
                    var elements1 = [];
                    if (GameModels.vip.vipDailyRewardStatus) {
                        elements1.push({ text: Language.J_JRLQCS + ":", style: { textColor: 0xB79F6D } });
                        elements1.push({ text: "0/1", style: { textColor: TypeColor.RED1 } });
                        _this.labDes.textFlow = elements1;
                    }
                    else {
                        elements1.push({ text: Language.J_JRLQCS + ":", style: { textColor: 0xB79F6D } });
                        elements1.push({ text: "1/1", style: { textColor: TypeColor.GREEN1 } });
                        _this.labDes.textFlow = elements1;
                    }
                    if (_this._level < currIndex) {
                        _this.notAttainDay.visible = true;
                        _this.labDes.visible = false;
                    }
                    else {
                        _this.labDes.visible = true;
                        if (GameModels.vip.vipDailyRewardStatus) {
                            _this.getVipBoxDay.visible = true;
                        }
                        else {
                            _this.btnReceiveDay.visible = true;
                        }
                    }
                })));
            };
            vipGiftView.prototype.updateInfo = function () {
                this.notAttain.visible = false;
                this.getVipBox.visible = false;
                this.btnReceive.visible = true;
                this.MoneyGroup.visible = true;
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.viplb);
                if (vo && vo.actRewardListVO && vo.actRewardListVO[this.listVip0.selectedIndex]) {
                    var rewardVo = vo.actRewardListVO[this.listVip0.selectedIndex];
                    var sParams = rewardVo.templateFunctionParams.split(";");
                    var strArr = rewardVo.templateRewards.split(";");
                    this.reward.dataSource = strArr[0];
                    this.reward.labName.text = "";
                    this.labMoney.text = rewardVo.templateConsume.split("_")[1];
                    if (vo.myValue >= rewardVo.templateNeedVip) {
                        if (rewardVo.getTimes > 0) {
                            this.getVipBox.visible = true;
                            this.btnReceive.visible = false;
                            this.MoneyGroup.visible = false;
                        }
                    }
                }
            };
            return vipGiftView;
        }(ui.vipGiftViewSkin));
        vip.vipGiftView = vipGiftView;
        __reflect(vipGiftView.prototype, "view.vip.vipGiftView", ["IModuleView", "egret.DisplayObject"]);
    })(vip = view.vip || (view.vip = {}));
})(view || (view = {}));
