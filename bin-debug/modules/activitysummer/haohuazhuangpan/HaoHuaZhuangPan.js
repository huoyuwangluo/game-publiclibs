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
        var HaoHuaZhuangPan = (function (_super) {
            __extends(HaoHuaZhuangPan, _super);
            function HaoHuaZhuangPan() {
                var _this = _super.call(this) || this;
                _this.POOL_40_POS = 16;
                _this.POOL_20_POS = 12;
                _this.POOL_10_POS = 8;
                _this.POOL_5_POS = 4;
                _this.CHOUJIANG_TYPE_1 = 1;
                _this.CHOUJIANG_TYPE_2 = 2;
                _this.CHOUJIANG_TYPE_3 = 3;
                return _this;
            }
            HaoHuaZhuangPan.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._iconArray = [];
                this._yanhuaEffArr = [];
                for (var i = 0; i < 16; i++) {
                    this._iconArray.push(this["icon" + i]);
                }
            };
            HaoHuaZhuangPan.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this.addFunEff();
                this._isBigRecord = false;
                this.imgTeXiao10.visible = false;
                this.imgTeXiao50.visible = false;
                this.btnRecode1.currentState = "down";
                this.btnRecode1.touchEnabled = false;
                this.btnRecode2.currentState = "up";
                this.btnRecode2.touchEnabled = true;
                this.imgSelecd.visible = false;
                this.imgZhiZhen.rotation = 0;
                this.labDiamond.text = "" + GameModels.user.player.diamonds;
                this._id = 0;
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.HHZP);
                if (temp) {
                    this._id = temp.id;
                    this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.btnJIfen.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_JFDH);
                this.btnJIfen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.btnTeXiao10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                this.btnTeXiao50.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                this.btnRecode1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangRecordClick, this);
                this.btnRecode2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangRecordClick, this);
                this.btnChouJiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
                GameModels.user.player.onPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_HAOHUAZUANGPAN_POOL, this.changeJiangChi, this);
                // var numArr: Array<number> = GameModels.activitySummer.summerHaoHuaAround;
                this._rewadTmps = [];
                if (temp) {
                    var rewad = Templates.getTemplatesByProperty(templates.Map.HAOHUAZHUANPAN, "type", temp.id);
                    for (var i = 0; i < rewad.length; i++) {
                        if (rewad[i].rewardType == 1 || rewad[i].rewardType == 2) {
                            this._rewadTmps.push(rewad[i]);
                        }
                    }
                    this._rewadTmps.sort(function (a, b) {
                        return a.pos - b.pos;
                    });
                    for (var i = 0; i < 16; i++) {
                        if (!this._rewadTmps[i]) {
                            continue;
                        }
                        if (this._rewadTmps[i].isLight) {
                            var img = new eui.Image();
                            img.source = this.imgTeShu.source;
                            img.x = this.imgTeShu.x;
                            img.y = this.imgTeShu.y;
                            img.anchorOffsetX = this.imgTeShu.anchorOffsetX;
                            img.anchorOffsetY = this.imgTeShu.anchorOffsetY;
                            img.rotation = (i + 1) * 360 / 16;
                            this.addChildAt(img, this.getChildIndex(this.imgTeShu));
                        }
                        if (!this._rewadTmps[i].itemId) {
                            continue;
                        }
                        var item = Templates.getTemplateById(templates.Map.ITEM, this._rewadTmps[i].itemId);
                        if (item) {
                            this._iconArray[i].source = item.icon;
                            this._iconArray[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                        }
                    }
                }
                GameModels.activitySummer.requestHaoHuaChougJiangRecord(utils.Handler.create(this, function () {
                    _this.labJiangzhi.text = "" + GameModels.activitySummer.moneyValuePool;
                    _this._oldJiangchi = parseInt(_this.labJiangzhi.text);
                    _this.chougJiangRecord();
                }));
                this.upDataJifen();
                this.showCaiLiao();
            };
            HaoHuaZhuangPan.prototype.exit = function () {
                egret.Tween.removeTweens(this);
                utils.timer.clearAll(this);
                this.btnJIfen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.btnTeXiao10.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                this.btnTeXiao50.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                this.btnRecode1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangRecordClick, this);
                this.btnRecode2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangRecordClick, this);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
                this.btnChouJiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
                GameModels.user.player.offPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_HAOHUAZUANGPAN_POOL, this.changeJiangChi, this);
                for (var i = 0; i < 16; i++) {
                    this._iconArray[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                this.clearFunEff();
            };
            HaoHuaZhuangPan.prototype.addFunEff = function () {
                //if (!this._upperLeft) {
                this._upperLeft = utils.ObjectPool.from(s.AnimationSprite);
                this._upperLeft.visible = true;
                this._upperLeft.resId = "6345";
                this._upperLeft.x = 150;
                this._upperLeft.y = 173;
                this._upperLeft.play();
                this.addChildAt(this._upperLeft, this.getChildIndex(this.imgbg) + 1);
                //}
                //if (!this._upperRight) {
                this._upperRight = utils.ObjectPool.from(s.AnimationSprite);
                this._upperRight.visible = true;
                this._upperRight.resId = "6345";
                this._upperRight.x = 450;
                this._upperRight.y = 173;
                this._upperRight.scaleX = -1;
                this._upperRight.play();
                this.addChildAt(this._upperRight, this.getChildIndex(this.imgbg) + 1);
                //}
                //if (!this._lowerLeft) {
                this._lowerLeft = utils.ObjectPool.from(s.AnimationSprite);
                this._lowerLeft.visible = true;
                this._lowerLeft.resId = "6346";
                this._lowerLeft.x = 150;
                this._lowerLeft.y = 473;
                this._lowerLeft.play();
                this.addChildAt(this._lowerLeft, this.getChildIndex(this.imgbg) + 1);
                //}
                //if (!this._lowerRight) {
                this._lowerRight = utils.ObjectPool.from(s.AnimationSprite);
                this._lowerRight.visible = true;
                this._lowerRight.resId = "6346";
                this._lowerRight.x = 450;
                this._lowerRight.y = 473;
                this._lowerRight.scaleX = -1;
                this._lowerRight.play();
                this.addChildAt(this._lowerRight, this.getChildIndex(this.imgbg) + 1);
                //}
            };
            HaoHuaZhuangPan.prototype.clearFunEff = function () {
                if (this._upperLeft) {
                    this.removeEffectHandler(this._upperLeft);
                    this._upperLeft = null;
                }
                if (this._upperRight) {
                    this.removeEffectHandler(this._upperRight);
                    this._upperRight = null;
                }
                if (this._lowerLeft) {
                    this.removeEffectHandler(this._lowerLeft);
                    this._lowerLeft = null;
                }
                if (this._lowerRight) {
                    this.removeEffectHandler(this._lowerRight);
                    this._lowerRight = null;
                }
                this.removeYanHua();
            };
            HaoHuaZhuangPan.prototype.showCaiLiao = function () {
                var seting = GameModels.activitySummer.currHaoHuaDataSeting;
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
            HaoHuaZhuangPan.prototype.chougJiangRecord = function () {
                // if (!this._recordListData) {
                // 	if (this._isBigRecord) {
                // 		this._recordListData = new eui.ArrayCollection(GameModels.activitySummer.recordHaoHuaBigList);
                // 	}
                // 	else {
                // 		this._recordListData = new eui.ArrayCollection(GameModels.activitySummer.recordHaoHuaAllList);
                // 	}
                // } else {
                // 	if (this._isBigRecord) {
                // 		this._recordListData.source = GameModels.activitySummer.recordHaoHuaBigList;
                // 	}
                // 	else {
                // 		this._recordListData.source = GameModels.activitySummer.recordHaoHuaAllList;
                // 	}
                // }
                if (!this._recordListData) {
                    this._recordListData = new eui.ArrayCollection(GameModels.activitySummer.recordHaoHuaAllList);
                }
                else {
                    this._recordListData.source = GameModels.activitySummer.recordHaoHuaAllList;
                }
                this.list.dataProvider = this._recordListData;
                var dataArr = GameModels.activitySummer.recordHaoHuaBigList;
                if (dataArr && dataArr[0]) {
                    if (dataArr[0]) {
                        var data = dataArr[0];
                        var str = "<font color=" + 0xD6CAB7 + ">" + Language.J_RLQZWH + "</font><font color=" + 0Xd1a765 + ">" + data.PlayerName + "</font><font color=" + 0xD6CAB7 + ">" + Language.C_CZ3 + "</font><font color=" + 0x34E22C + ">" + (data.Item.Param / 100 + "%" + Language.C_JZ2) + "</font><font color=" + 0xD6CAB7 + ">" + Language.C_FL1 + "</font>";
                        this.labBig.textFlow = (new egret.HtmlTextParser).parser(str);
                        //this.labBig.textFlow = (new egret.HtmlTextParser).parser(`<font color=${0xFFBC5D}>${Language.J_RLQZWH + data.PlayerName + Language.C_CZ3}</font><font color=${0x6AE1F7}>${data.Item.Param / 100 + "%" + Language.C_MS}</font><font color=${0xFFBC5D}>${Language.C_FL1}</font>`);
                    }
                    else {
                        this.labBig.text = "";
                    }
                }
                else {
                    this.labBig.text = "";
                }
            };
            HaoHuaZhuangPan.prototype.onGoldChange = function () {
                this.labDiamond.text = "" + GameModels.user.player.diamonds;
            };
            HaoHuaZhuangPan.prototype.upDataJifen = function () {
                this.labJiFen.text = "" + GameModels.activitySummer.myJifen;
            };
            HaoHuaZhuangPan.prototype.onIconClick = function (e) {
                // var numArr: Array<number> = GameModels.activitySummer.summerHaoHuaAround;
                for (var i = 0; i < 16; i++) {
                    if (e.currentTarget == this._iconArray[i]) {
                        var item = Templates.getTemplateById(templates.Map.ITEM, this._rewadTmps[i].itemId);
                        if (item) {
                            mg.TipManager.instance.showTip(tips.PropTip, item);
                        }
                        break;
                    }
                }
            };
            HaoHuaZhuangPan.prototype.onJifenClick = function (e) {
                GameModels.activitySummer.dispatchEventWith(mo.ModelSgActivitySummer.ACTIVITY_JIFENDUIHUAN_LINK);
            };
            HaoHuaZhuangPan.prototype.onChouJiangClick = function (e) {
                //1为连抽 2为10连抽 3为50连抽
                var type = 0;
                if (this.imgTeXiao10.visible == true && this.imgTeXiao50.visible == false) {
                    type = this.CHOUJIANG_TYPE_2;
                }
                if (this.imgTeXiao10.visible == false && this.imgTeXiao50.visible == true) {
                    type = this.CHOUJIANG_TYPE_3;
                }
                if (this.imgTeXiao10.visible == false && this.imgTeXiao50.visible == false) {
                    type = this.CHOUJIANG_TYPE_1;
                }
                if (type == 0) {
                    logger.log("抽奖类型出错", type);
                    return;
                }
                this.checkTwoShowTip(type);
            };
            HaoHuaZhuangPan.prototype.checkTwoShowTip = function (type) {
                var _this = this;
                var zhaohuanCount = 0;
                var seting = GameModels.activitySummer.currHaoHuaDataSeting;
                if (!seting)
                    return;
                var str = seting.value.split(";");
                var needCount = parseInt(str[1].split("_")[1]);
                var price = parseInt(str[0].split("_")[1]);
                var item = Templates.getTemplateById(templates.Map.ITEM, str[1].split("_")[0]);
                if (type == 1) {
                    zhaohuanCount = 1;
                }
                else if (type == 2) {
                    zhaohuanCount = 10;
                }
                else {
                    zhaohuanCount = 50;
                }
                var bagCount = GameModels.bag.getItemCountById(item.id);
                var xiaoHaoCount = zhaohuanCount * needCount;
                if (bagCount >= xiaoHaoCount) {
                    this.requestChouJiang(type);
                }
                else {
                    var num = xiaoHaoCount - bagCount;
                    mg.alertManager.showCheckAlert(Language.getExpression(Language.E_SFEWXH1MS2B3JXCJ4C, price * num, num, item.name, zhaohuanCount), TypeBtnLabel.OK, TypeCheck.HAOHUA_ZHUANGPAN, null, utils.Handler.create(this, function () {
                        _this.requestChouJiang(type);
                    }));
                }
            };
            HaoHuaZhuangPan.prototype.requestChouJiang = function (type) {
                var _this = this;
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                GameModels.activitySummer.requestHaoHuaChougJiang(type, utils.Handler.create(this, function () {
                    // logger.log("抽奖类型为.......", type);
                    _this.hideAndShow(false);
                    _this._currPos = 0;
                    if (GameModels.activitySummer.getHaoHuaBigPos(16)) {
                        _this._currPos = _this.POOL_40_POS;
                    }
                    else if (GameModels.activitySummer.getHaoHuaBigPos(12)) {
                        _this._currPos = _this.POOL_20_POS;
                    }
                    else if (GameModels.activitySummer.getHaoHuaBigPos(8)) {
                        _this._currPos = _this.POOL_10_POS;
                    }
                    else if (GameModels.activitySummer.getHaoHuaBigPos(4)) {
                        _this._currPos = _this.POOL_5_POS;
                    }
                    else {
                        _this._currPos = GameModels.activitySummer.HaoHuaLastPos;
                    }
                    _this.showCaiLiao();
                    _this.inTween(_this._currPos);
                }));
            };
            HaoHuaZhuangPan.prototype.inTween = function (pos) {
                egret.Tween.get(this.imgZhiZhen).to({ rotation: 720 }, 2000, utils.Ease.quartIn).call(function (index) {
                    this.outTween(index);
                }, this, [pos]);
            };
            HaoHuaZhuangPan.prototype.outTween = function (pos) {
                egret.Tween.get(this.imgZhiZhen).to({ rotation: 700 + ((pos + 1) * 360 / 16) }, 3000, utils.Ease.quartOut).call(function (index) {
                    this.imgSelecd.rotation = (index * 360 / 16);
                    this.hideAndShow(true);
                    this.flayIconOnCangKu();
                    this.starBoFangYanHua();
                    this.upDataJifen();
                }, this, [pos]);
            };
            HaoHuaZhuangPan.prototype.starBoFangYanHua = function () {
                mg.alertManager.showAlert(HaoHuaZhuangPanGetAlert, true, true, GameModels.activitySummer.haoHuaItemList);
                if (this._currPos == this.POOL_40_POS || this._currPos == this.POOL_20_POS || this._currPos == this.POOL_10_POS || this._currPos == this.POOL_5_POS) {
                    var resIdArr = ["6347", "6348", "6349", "6350", "6351", "6352"];
                    var posArr = [new egret.Point(170, 200), new egret.Point(320, 310), new egret.Point(420, 230), new egret.Point(150, 370), new egret.Point(400, 160), new egret.Point(480, 430)];
                    for (var i = 0; i < resIdArr.length; i++) {
                        var eff = utils.ObjectPool.from(s.AnimationSprite);
                        this._yanhuaEffArr.push(eff);
                        utils.timer.once(i * 300, this, this.playYanHuaEff, false, resIdArr[i], posArr[i], eff, i == resIdArr.length - 1);
                    }
                }
            };
            HaoHuaZhuangPan.prototype.playYanHuaEff = function (resId, pos, eff, islast) {
                eff.x = pos.x;
                eff.y = pos.y;
                eff.resId = resId;
                eff.frameRate = 12;
                eff.play();
                this.addChild(eff);
                if (islast) {
                    utils.timer.once(300, this, this.removeYanHua);
                }
            };
            HaoHuaZhuangPan.prototype.removeYanHua = function () {
                for (var i = 0; i < this._yanhuaEffArr.length; i++) {
                    if (this._yanhuaEffArr[i]) {
                        this.removeEffectHandler(this._yanhuaEffArr[i]);
                        this._yanhuaEffArr[i] = null;
                    }
                }
                this._yanhuaEffArr.length = 0;
            };
            HaoHuaZhuangPan.prototype.flayIconOnCangKu = function () {
                var _this = this;
                GameModels.activitySummer.requestHaoHuaChougJiangRecord(utils.Handler.create(this, function () {
                    _this.chougJiangRecord();
                }));
            };
            HaoHuaZhuangPan.prototype.onChouJiangRecordClick = function (e) {
                if (e.currentTarget == this.btnRecode1) {
                    this.btnRecode1.currentState = "down";
                    this.btnRecode1.touchEnabled = false;
                    this.btnRecode2.currentState = "up";
                    this.btnRecode2.touchEnabled = true;
                    this._isBigRecord = false;
                }
                else {
                    this.btnRecode1.currentState = "up";
                    this.btnRecode1.touchEnabled = true;
                    this.btnRecode2.currentState = "down";
                    this.btnRecode2.touchEnabled = false;
                    this._isBigRecord = true;
                }
                this.chougJiangRecord();
            };
            HaoHuaZhuangPan.prototype.onTeXiaoClick = function (e) {
                if (e.currentTarget == this.btnTeXiao10) {
                    this.imgTeXiao10.visible = !this.imgTeXiao10.visible;
                    this.imgTeXiao50.visible = false;
                }
                else {
                    this.imgTeXiao50.visible = !this.imgTeXiao50.visible;
                    this.imgTeXiao10.visible = false;
                }
            };
            HaoHuaZhuangPan.prototype.changeJiangChi = function () {
                this.updateJiangChi(GameModels.activitySummer.moneyValuePool);
            };
            Object.defineProperty(HaoHuaZhuangPan.prototype, "jiangchi", {
                get: function () {
                    return parseInt(this.labJiangzhi.text);
                },
                set: function (value) {
                    if (value != this.jiangchi) {
                        this.labJiangzhi.text = "" + (value >> 0);
                    }
                },
                enumerable: true,
                configurable: true
            });
            HaoHuaZhuangPan.prototype.updateJiangChi = function (value) {
                if (this._oldJiangchi > 0) {
                    if (value != this._oldJiangchi) {
                        utils.timer.once(200, this, this.playChange, true, value);
                    }
                }
                else {
                    this._oldJiangchi = value;
                    this.jiangchi = value;
                }
            };
            HaoHuaZhuangPan.prototype.playChange = function (value) {
                this.jiangchi = this._oldJiangchi;
                egret.Tween.get(this).to({ jiangchi: value }, 500, utils.Ease.quartInOut).call(function () {
                }, this);
                this._oldJiangchi = value;
            };
            HaoHuaZhuangPan.prototype.hideAndShow = function (v) {
                this.btnChouJiang.touchEnabled = v;
                this.imgSelecd.visible = v;
            };
            HaoHuaZhuangPan.prototype.helpClick = function () {
                if (this._id == 90301 || this._id == 90305) {
                    mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 1601).des);
                }
                else if (this._id == 90302 || this._id == 90306) {
                    mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 1602).des);
                }
                else if (this._id == 90303 || this._id == 90307) {
                    mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 1603).des);
                }
                else if (this._id == 90304 || this._id == 90308) {
                    mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 1604).des);
                }
            };
            return HaoHuaZhuangPan;
        }(ui.HaoHuaZhuangPanSkin));
        activity.HaoHuaZhuangPan = HaoHuaZhuangPan;
        __reflect(HaoHuaZhuangPan.prototype, "view.activity.HaoHuaZhuangPan", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
