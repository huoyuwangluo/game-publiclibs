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
        var XingYingDuoBao = (function (_super) {
            __extends(XingYingDuoBao, _super);
            function XingYingDuoBao() {
                var _this = _super.call(this) || this;
                _this.MAX_POS = 14;
                return _this;
            }
            XingYingDuoBao.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._itemArr = [this.item0, this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7, this.item8, this.item9,
                    this.item10, this.item11, this.item12, this.item13];
                this.imgJindu.mask = this.imgMask;
                this.btnJIfen.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_JFDH);
                this.btnGiftSeek.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_JLYL);
            };
            XingYingDuoBao.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this.btnSeek.visible = false;
                this.imgSelecd.visible = true;
                this.imgTeXiao.visible = true;
                this._isOpenTeXiao = true;
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.XYDB);
                if (temp) {
                    this._templatesId = temp.id;
                    this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.listBox.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
                this.btnSeek.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSeekClick, this);
                this.btnJIfen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenAndHelpClick, this);
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenAndHelpClick, this);
                this.btnGiftSeek.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenAndHelpClick, this);
                this.btnZhuNeng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_MY_JIFEN_CHANGE, this.showBasicsInfo, this);
                GameModels.user.player.onPropertyChange(TypeProperty.UnbindedGold, this, this.showBasicsInfo);
                this.btnTeXiao50.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                this.btnTeXiao10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                this.btnTeXiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_XINGYUNDUOHAO_CHANGE_POOL, this.upDataPool, this);
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_SUMMER_LUNPAN_ANGIN, this.lunpanAngin, this);
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].effectHide();
                    this._itemArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                GameModels.activitySummer.requestHolidayXYDBGetInfo(utils.Handler.create(this, function () {
                    _this._oldPool = GameModels.activitySummer.poolId;
                    _this.showLuackInfo();
                    _this.showItemInfo();
                    // this.btnSeek.visible = (this._oldPool==1);
                }));
                this.initValue();
                this.showTeXiaoState(1);
                this.showChouJiangRecord();
                this.showBoxInfo();
                this.showBasicsInfo();
                this.initBaoJiAndLianJi();
                this.showCaiLiao();
            };
            XingYingDuoBao.prototype.exit = function () {
                this.listBox.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
                this.btnSeek.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSeekClick, this);
                this.btnJIfen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenAndHelpClick, this);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenAndHelpClick, this);
                this.btnGiftSeek.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenAndHelpClick, this);
                this.btnZhuNeng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_MY_JIFEN_CHANGE, this.showBasicsInfo, this);
                GameModels.user.player.offPropertyChange(TypeProperty.UnbindedGold, this, this.showBasicsInfo);
                this.btnTeXiao50.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                this.btnTeXiao10.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                this.btnTeXiao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_SUMMER_LUNPAN_ANGIN, this.lunpanAngin, this);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_XINGYUNDUOHAO_CHANGE_POOL, this.upDataPool, this);
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].effectHide();
                    this._itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                this.clearList(this.listBox);
                this.clearList(this.listRecord);
                egret.Tween.removeTweens(this.imgSelecd);
                utils.timer.clearAll(this);
            };
            XingYingDuoBao.prototype.initBaoJiAndLianJi = function () {
                this.imgBaoJi.visible = false;
                this.imgLianJi.visible = false;
                egret.Tween.removeTweens(this.imgBaoJi);
                egret.Tween.removeTweens(this.imgLianJi);
            };
            XingYingDuoBao.prototype.initValue = function () {
                this._currPos = 0;
                this._tatolPos = 0;
                this._endPos = 0;
                this.imgSelecd.x = this.item0.x;
                this.imgSelecd.y = this.item0.y;
                this.btnZhuNeng.touchEnabled = true;
                egret.Tween.removeTweens(this.imgSelecd);
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].effectHide();
                }
            };
            XingYingDuoBao.prototype.lunpanAngin = function (e) {
                var _this = this;
                var count = e.data;
                this._chouJiangCount = count;
                if (count == 1) {
                    this.imgTeXiao10.visible = false;
                    this.imgTeXiao50.visible = false;
                }
                else if (count == 10) {
                    this.imgTeXiao10.visible = true;
                    this.imgTeXiao50.visible = false;
                }
                else {
                    this.imgTeXiao10.visible = false;
                    this.imgTeXiao50.visible = true;
                }
                if (count) {
                    if (utils.CheckUtil.checkBagSmelting())
                        return;
                    logger.log("幸运夺宝" + this._chouJiangCount + "连抽");
                    logger.log("幸运夺宝是否开启特效" + this._isOpenTeXiao + "抽奖");
                    GameModels.activitySummer.requestHolidayXYDBChouJiang(this._chouJiangCount, utils.Handler.create(this, function () {
                        _this.btnZhuNeng.touchEnabled = false;
                        _this.imgSelecd.visible = true;
                        if (!_this._isOpenTeXiao) {
                            _this.imgSelecd.visible = false;
                            _this.showChouJiangResult();
                        }
                        else {
                            _this.showChouJiangResultInOpenTeXiao();
                        }
                    }));
                }
            };
            XingYingDuoBao.prototype.onChouJiangClick = function (e) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                this.checkTwoShowTip();
            };
            XingYingDuoBao.prototype.checkTwoShowTip = function () {
                var _this = this;
                var seting = GameModels.dataSet.getDataSettingById(325001);
                if (!seting)
                    return;
                var str = seting.value.split(";");
                var needCount = parseInt(str[1].split("_")[1]);
                var price = parseInt(str[0].split("_")[1]);
                var item = Templates.getTemplateById(templates.Map.ITEM, str[1].split("_")[0]);
                var bagCount = GameModels.bag.getItemCountById(item.id);
                var xiaoHaoCount = this._chouJiangCount * needCount;
                if (bagCount >= xiaoHaoCount) {
                    this.requestChouJiang();
                }
                else {
                    var num = xiaoHaoCount - bagCount;
                    mg.alertManager.showCheckAlert(Language.getExpression(Language.E_SFEWXH1MS2B3JXCJ4C, price * num, num, item.name, this._chouJiangCount), TypeBtnLabel.OK, TypeCheck.HAOHUA_ZHUANGPAN, null, utils.Handler.create(this, function () {
                        _this.requestChouJiang();
                    }));
                }
            };
            XingYingDuoBao.prototype.requestChouJiang = function () {
                var _this = this;
                logger.log("幸运夺宝" + this._chouJiangCount + "连抽");
                logger.log("幸运夺宝是否开启特效" + this._isOpenTeXiao + "抽奖");
                GameModels.activitySummer.requestHolidayXYDBChouJiang(this._chouJiangCount, utils.Handler.create(this, function () {
                    _this.btnZhuNeng.touchEnabled = false;
                    _this.imgSelecd.visible = true;
                    _this.showCaiLiao();
                    if (!_this._isOpenTeXiao) {
                        _this.imgSelecd.visible = false;
                        _this.showChouJiangResult();
                    }
                    else {
                        _this.showChouJiangResultInOpenTeXiao();
                    }
                }));
            };
            XingYingDuoBao.prototype.showCaiLiao = function () {
                var seting = GameModels.dataSet.getDataSettingById(325001);
                if (!seting)
                    return;
                var str = seting.value.split(";");
                var item = Templates.getTemplateById(templates.Map.ITEM, str[1].split("_")[0]);
                this.imgItem.source = item.icon;
                this.labDiamonds.text = str[0].split("_")[1];
                var count = GameModels.bag.getItemCountById(str[1].split("_")[0]);
                this.labItemCount.text = count + "/" + str[1].split("_")[1];
                if (count >= parseInt(str[1].split("_")[1])) {
                    this.labItemCount.textColor = 0x34E22C;
                }
                else {
                    this.labItemCount.textColor = 0xFF0000;
                }
            };
            XingYingDuoBao.prototype.showChouJiangResult = function () {
                this.initValue();
                for (var i = 0; i < this._itemArr.length; i++) {
                    var data = this._itemArr[i].dataSource;
                    if (data && GameModels.activitySummer.isXYDBHashPos(data.pos)) {
                        this._itemArr[i].effectShow();
                    }
                }
                var reward = this.rewardInfo;
                if (reward.length > 0)
                    mg.alertManager.showAlert(XingYingDuoBaoGetAlert, true, true, reward);
                this.showChouJiangRecord();
                this.showLuackInfo();
                this.showBoxInfo();
            };
            XingYingDuoBao.prototype.showChouJiangResultInOpenTeXiao = function () {
                this._stopPos = GameModels.activitySummer.xydbChouJingResult[0].pos;
                this._index = 0;
                if (this._chouJiangCount == 1) {
                    this.playEffectOneTimes();
                }
                else {
                    this.playEffectManyTimes();
                }
            };
            XingYingDuoBao.prototype.playEffectOneTimes = function () {
                var _this = this;
                utils.timer.clearAll(this);
                this.imgSelecd.visible = true;
                if (this._itemArr[this._stopPos - 1])
                    this._itemArr[this._stopPos - 1].effectHide();
                if (!GameModels.activitySummer.xydbChouJingResult[this._index])
                    return;
                this._stopPos = GameModels.activitySummer.xydbChouJingResult[this._index].pos;
                if (this._currPos >= this.MAX_POS) {
                    this._currPos = 0;
                }
                if (this._tatolPos >= this.MAX_POS * 2 + (this._stopPos - this._endPos)) {
                    if (GameModels.activitySummer.isBigReward) {
                        this.showBigRewardEff();
                        return;
                    }
                    egret.Tween.removeTweens(this.imgSelecd);
                    this._endPos = this._currPos;
                    this._tatolPos = 0;
                    if (GameModels.activitySummer.xydbChouJingResult[this._index].state != 2) {
                        if (GameModels.activitySummer.xydbChouJingResult[this._index].state == 1) {
                            //说明是暴击
                            this.imgSelecd.visible = false;
                            this._itemArr[this._stopPos - 1].effectFlash(true);
                            utils.timer.countdown(1, this, null, function () {
                                _this.closeBaoJiEff();
                                _this.imgBaoJi.visible = true;
                                _this.imgBaoJi.scaleX = _this.imgBaoJi.scaleY = 5;
                                egret.Tween.get(_this.imgBaoJi).to({ scaleX: 1, scaleY: 1 }, 500, utils.Ease.backOut).wait(300).call(_this.playEffectOneTimesCall, _this);
                            });
                        }
                        else {
                            //说明没有暴击也没有连击
                            this.playEffectOneTimesCall();
                        }
                        return;
                    }
                    //说明是连击
                    this.imgSelecd.visible = false;
                    this._index++;
                    utils.timer.countdown(1, this, null, function () {
                        _this.playEffectOneTimes();
                        _this.imgLianJi.visible = true;
                        _this.imgLianJi.scaleX = _this.imgLianJi.scaleY = 5;
                        egret.Tween.get(_this.imgLianJi).to({ scaleX: 1, scaleY: 1 }, 500, utils.Ease.backOut).wait(300).call(_this.initBaoJiAndLianJi, _this);
                    });
                    this._itemArr[this._stopPos - 1].effectFlash(true);
                    return;
                }
                var item;
                if (this._tatolPos > this.MAX_POS) {
                    item = this._itemArr[this._currPos];
                    item.effectBirghtOnce();
                    item.playSound();
                    egret.Tween.get(this.imgSelecd).to({ x: item.x, y: item.y }, 40, utils.Ease.quartInOut).call(this.playEffectOneTimes, this, [this._currPos++, this._tatolPos++]);
                    return;
                }
                item = this._itemArr[this._currPos];
                item.effectBirghtOnce();
                item.playSound();
                egret.Tween.get(this.imgSelecd).to({ x: item.x, y: item.y }, 40, utils.Ease.quartIn).call(this.playEffectOneTimes, this, [this._currPos++, this._tatolPos++]);
            };
            XingYingDuoBao.prototype.closeBaoJiEff = function () {
                utils.timer.clearAll(this);
                this.imgSelecd.visible = true;
                this._itemArr[this._stopPos - 1].effectHide();
            };
            XingYingDuoBao.prototype.playEffectOneTimesCall = function () {
                this.initBaoJiAndLianJi();
                var reward = this.rewardInfo;
                if (reward.length > 0)
                    mg.alertManager.showAlert(XingYingDuoBaoGetAlert, true, true, reward);
                this.imgSelecd.visible = true;
                this.showChouJiangRecord();
                this.showLuackInfo();
                this.showBoxInfo();
            };
            XingYingDuoBao.prototype.playEffectManyTimes = function () {
                if (this._currPos >= this.MAX_POS) {
                    this._currPos = 0;
                }
                if (this._tatolPos >= this.MAX_POS * 2 + (this._stopPos - this._endPos)) {
                    if (GameModels.activitySummer.isBigReward) {
                        this.showBigRewardEff();
                    }
                    else {
                        this.imgSelecd.visible = false;
                        this.showChouJiangResult();
                    }
                    return;
                }
                var item;
                if (this._tatolPos > this.MAX_POS) {
                    item = this._itemArr[this._currPos];
                    item.effectBirghtOnce();
                    item.playSound();
                    egret.Tween.get(this.imgSelecd).to({ x: item.x, y: item.y }, 40, utils.Ease.quartInOut).call(this.playEffectManyTimes, this, [this._currPos++, this._tatolPos++]);
                    return;
                }
                item = this._itemArr[this._currPos];
                item.effectBirghtOnce();
                item.playSound();
                egret.Tween.get(this.imgSelecd).to({ x: this._itemArr[this._currPos].x, y: this._itemArr[this._currPos].y }, 40, utils.Ease.quartIn).call(this.playEffectManyTimes, this, [this._currPos++, this._tatolPos++]);
            };
            XingYingDuoBao.prototype.showBigRewardEff = function () {
                utils.timer.countdown(2, this, null, this.hideEffTwinkleMany);
                this.imgSelecd.visible = false;
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].effectFlash();
                }
            };
            XingYingDuoBao.prototype.hideEffTwinkleMany = function () {
                utils.timer.clearAll(this);
                this.showChouJiangResult();
            };
            Object.defineProperty(XingYingDuoBao.prototype, "rewardInfo", {
                get: function () {
                    var rewadTmps = Templates.getTemplatesByPoolAndType(templates.Map.HOLIDAYTREASURE, "poolId", this._oldPool, "type", this._templatesId);
                    var str = [];
                    for (var i = 0; i < rewadTmps.length; i++) {
                        for (var j = 0; j < GameModels.activitySummer.xydbChouJingResult.length; j++) {
                            if (GameModels.activitySummer.xydbChouJingResult[j].pos == rewadTmps[i].pos) {
                                str.push(GameModels.activitySummer.xydbChouJingResult[j].state + "&" + rewadTmps[i].reward);
                            }
                        }
                    }
                    return str;
                },
                enumerable: true,
                configurable: true
            });
            XingYingDuoBao.prototype.upDataPool = function () {
                this.btnZhuNeng.touchEnabled = true;
                this.initBaoJiAndLianJi();
                for (var i = 0; i < this._itemArr.length; i++) {
                    this._itemArr[i].effectHide();
                }
                if (this._oldPool != GameModels.activitySummer.poolId) {
                    this._oldPool = GameModels.activitySummer.poolId;
                    this.showItemInfo();
                    // this.btnSeek.visible = (this._oldPool==1);
                }
            };
            XingYingDuoBao.prototype.showItemInfo = function () {
                var rewadTmps = Templates.getTemplatesByPoolAndType(templates.Map.HOLIDAYTREASURE, "poolId", this._oldPool, "type", this._templatesId);
                for (var i = 0; i < this._itemArr.length; i++) {
                    var temp = rewadTmps[i];
                    if (!temp)
                        continue;
                    this._itemArr[i].dataSource = null;
                    this._itemArr[i].dataSource = temp;
                }
            };
            XingYingDuoBao.prototype.showTeXiaoState = function (chouCount) {
                if (chouCount == 1) {
                    this.imgTeXiao10.visible = false;
                    this.imgTeXiao50.visible = false;
                }
                if (chouCount == 10) {
                    this.imgTeXiao10.visible = !this.imgTeXiao10.visible;
                    this.imgTeXiao50.visible = false;
                }
                if (chouCount == 50) {
                    this.imgTeXiao50.visible = !this.imgTeXiao50.visible;
                    this.imgTeXiao10.visible = false;
                }
                if (!this.imgTeXiao10.visible && !this.imgTeXiao50.visible) {
                    this._chouJiangCount = 1;
                }
                if (this.imgTeXiao10.visible) {
                    this._chouJiangCount = 10;
                }
                if (this.imgTeXiao50.visible) {
                    this._chouJiangCount = 50;
                }
                this.imgGroup50.visible = GameModels.user.player.vip >= 9;
            };
            XingYingDuoBao.prototype.showChouJiangRecord = function () {
                var _this = this;
                GameModels.activitySummer.requestHolidayXYDBGetRecord(utils.Handler.create(this, function () {
                    if (!_this._listRecordData) {
                        _this._listRecordData = new eui.ArrayCollection(GameModels.activitySummer.xydbRecord);
                    }
                    else {
                        _this._listRecordData.source = GameModels.activitySummer.xydbRecord;
                    }
                    _this.listRecord.dataProvider = _this._listRecordData;
                }));
            };
            XingYingDuoBao.prototype.showBoxInfo = function () {
                var _this = this;
                GameModels.activitySummer.requestRewardInfosData(game.TypeSummerActivity.XYDB, utils.Handler.create(this, function () {
                    if (!_this._listBoxData) {
                        _this._listBoxData = new eui.ArrayCollection(GameModels.activitySummer.xingYingGuoBaoBoxData);
                    }
                    else {
                        _this._listBoxData.source = GameModels.activitySummer.xingYingGuoBaoBoxData;
                    }
                    _this.listBox.dataProvider = _this._listBoxData;
                    _this.listBox.selectedIndex = 0;
                    _this.labCount0.text = Language.C_YCCS + GameModels.activitySummer.tatolValue;
                }));
            };
            XingYingDuoBao.prototype.showBasicsInfo = function () {
                this.labDiamond.text = "" + GameModels.user.player.diamonds;
                this.labJiFen.text = "" + GameModels.activitySummer.myJifen;
            };
            XingYingDuoBao.prototype.showLuackInfo = function () {
                this.labLuack.text = Language.C_XYZ1 + GameModels.activitySummer.luckValue;
                var data = GameModels.dataSet.getDataSettingById(325001 + GameModels.activitySummer.poolId);
                var max = parseInt(data.value.split("_")[0]);
                if (GameModels.activitySummer.luckValue == 0) {
                    this.imgMask.y = 320;
                    return;
                }
                if (GameModels.activitySummer.luckValue <= 20) {
                    this.imgMask.y = 320 - GameModels.activitySummer.luckValue * 0.5;
                    logger.log("	this.imgMask.y	this.imgMask.y111111===", this.imgMask.y);
                }
                else {
                    // this.imgMask.y = 310 - (GameModels.activitySummer.luckValue / max) * 90;
                    this.imgMask.y = 310 - (GameModels.activitySummer.luckValue / max) * 80;
                    logger.log("	this.imgMask.y	this.imgMask.y2222222===", this.imgMask.y);
                }
                if (this.imgMask.y < 220)
                    this.imgMask.y = 220;
            };
            XingYingDuoBao.prototype.onIconClick = function (e) {
                for (var i = 0; i < this._itemArr.length; i++) {
                    if (e.currentTarget == this._itemArr[i]) {
                        var data = this._itemArr[i].dataSource;
                        if (data) {
                            var item = Templates.getTemplateById(templates.Map.ITEM, data.reward.split("_")[0]);
                            mg.TipManager.instance.showTip(tips.PropTip, { count: data.reward.split("_")[1], templateProp: item });
                            break;
                        }
                    }
                }
            };
            XingYingDuoBao.prototype.onTeXiaoClick = function (e) {
                if (e.currentTarget == this.btnTeXiao10) {
                    this.showTeXiaoState(10);
                }
                else if (e.currentTarget == this.btnTeXiao50) {
                    this.showTeXiaoState(50);
                }
                else {
                    this.imgTeXiao.visible = !this.imgTeXiao.visible;
                    this._isOpenTeXiao = this.imgTeXiao.visible;
                }
            };
            XingYingDuoBao.prototype.btnBoxClick = function (e) {
                this.listBox.selectedIndex = e.itemIndex;
                var item = this.listBox.selectedItem;
                if (item) {
                    if (item.holidayRewardState == 1) {
                        mg.alertManager.showAlert(DaoJuBoxPreview, true, true, item.template.rewards, utils.Handler.create(this, function () {
                            GameModels.activitySummer.requestGetRewardInfos(item.holidayRewardId, game.TypeSummerActivity.XYDB, utils.Handler.create(this, this.getRewardCallback, [this.localToGlobal(20, 650)]));
                        }));
                    }
                    else {
                        var str = item.template.rewards.split("_");
                        if (str && str[0]) {
                            mg.TipManager.instance.showTip(tips.PropTip, { count: str[1], templateProp: Templates.getTemplateById(templates.Map.ITEM, str[0]) });
                        }
                    }
                }
            };
            XingYingDuoBao.prototype.getRewardCallback = function (fromPoint) {
                this.listBox.dataProvider.replaceAll(GameModels.activitySummer.xingYingGuoBaoBoxData);
                var flyItem = new s.FlyIconsEffect();
                var item = this.listBox.selectedItem;
                var diamondPoint = mg.uiManager.getView(main.MainUIView).getDiamondPostion(true);
                mg.effectManager.flyEffects("6199", 10, fromPoint, diamondPoint, mg.layerManager.top);
            };
            XingYingDuoBao.prototype.onJifenAndHelpClick = function (e) {
                if (e.currentTarget == this.btnJIfen) {
                    GameModels.activitySummer.dispatchEventWith(mo.ModelSgActivitySummer.ACTIVITY_JIFENDUIHUAN_LINK);
                }
                else if (e.currentTarget == this.btnHelp) {
                    mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 3301).des);
                }
                else {
                    mg.uiManager.show(activity.XingYingDuoBaoPreview, this._templatesId);
                }
            };
            XingYingDuoBao.prototype.btnSeekClick = function () {
                mg.alertManager.showAlert(view.activity.XingYingDuoBaoTips, true, true, false);
            };
            return XingYingDuoBao;
        }(ui.XingYingDuoBaoSkin));
        activity.XingYingDuoBao = XingYingDuoBao;
        __reflect(XingYingDuoBao.prototype, "view.activity.XingYingDuoBao", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
