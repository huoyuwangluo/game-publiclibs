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
var treasure;
(function (treasure) {
    var JiangXingMainDialog = (function (_super) {
        __extends(JiangXingMainDialog, _super);
        function JiangXingMainDialog() {
            var _this = _super.call(this) || this;
            _this._effArr = [];
            return _this;
        }
        JiangXingMainDialog.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._effArr = [];
            this._imgIcon = [this.img_icon1, this.img_icon2, this.img_icon3, this.img_icon4, this.img_icon5,
                this.img_icon6, this.img_icon7, this.img_icon8, this.img_icon9, this.img_icon10];
            this._labCount = [this.labCount1, this.labCount2, this.labCount3, this.labCount4, this.labCount5,
                this.labCount6, this.labCount7, this.labCount8, this.labCount9, this.labCount10];
        };
        JiangXingMainDialog.prototype.initView = function () {
            var _this = this;
            this.imgAddItem.visible = GameModels.platform.isPay;
            this._effArr = [];
            this.btnRecord.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_DJJL);
            this.group10.visible = true;
            this.imgTeXiao10.visible = false;
            this.btnChouJiang.touchEnabled = true;
            GameModels.jiangxing.requestTavernInfo(utils.Handler.create(this, function () {
                _this._rewadTmps = GameModels.jiangxing.tavernTemplates;
                for (var i = 0; i < 10; i++) {
                    if (_this._rewadTmps[i]) {
                        var strItem = _this._rewadTmps[i].itemId.split("_");
                        var item = Templates.getTemplateById(templates.Map.ITEM, strItem[0]);
                        if (_this._rewadTmps[i].isShow && item) {
                            var animation = _this.fromEffect("");
                            animation.scale(0.8);
                            var quality = item.quality;
                            if (TypeItem.checkIsPetTypeOrPetSuiTyp(item.type)) {
                                var tem = Templates.getTemplateById(templates.Map.GENERAL, item.type == TypeItem.PET_SUI ? item.nextId : item.id);
                                quality = TypeQuality.getQualityByStar(tem.star);
                            }
                            animation.resId = TypeEffectId.getEffIdByQuality(quality);
                            animation.touchEnabled = false;
                            animation.x = _this._imgIcon[i].x + 30;
                            animation.y = _this._imgIcon[i].y + 30;
                            animation.play();
                            _this.addChildAt(animation, _this.getChildIndex(_this._imgIcon[i]) + 1);
                            _this._effArr.push(animation);
                        }
                        if (item) {
                            _this._imgIcon[i].source = item.icon;
                            _this._labCount[i].text = strItem[1];
                            _this._imgIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onIconClick, _this);
                        }
                    }
                }
                _this.showView();
                _this.showBoxView();
                _this.labTime.text = "";
                //utils.timer.clear(this);
                //this._time = GameModels.jiangxing.leftTime;
                //this.updateLableTime();
                //utils.timer.countdown(this._time, this, this.updateLableTime, this.finshTime);
            }));
            this.btnTeXiao10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
            this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRecordClick, this);
            this.btnChouJiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.listBox.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
            this.imgAddItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddItemClick, this);
        };
        JiangXingMainDialog.prototype.reset = function () {
            //utils.timer.clear(this);
            for (var i = 0; i < this._effArr.length; i++) {
                if (this._effArr[i]) {
                    this._effArr[i].touchEnabled = true;
                    this._effArr[i].scale(1);
                    if (this._effArr[i].parent) {
                        this._effArr[i].parent.removeChild(this._effArr[i]);
                    }
                    this._effArr[i].stop();
                    utils.ObjectPool.to(this._effArr[i], true);
                    this._effArr[i] = null;
                }
            }
            this._effArr.length = 0;
            egret.Tween.removeTweens(this);
            this.btnTeXiao10.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
            this.btnChouJiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.listBox.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
            this.btnRecord.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRecordClick, this);
            this.imgAddItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddItemClick, this);
        };
        // private updateLableTime(): void {
        // 	if (this._time <= 0) {
        // 		this.labTime.text = Language.C_KYSX;
        // 		return;
        // 	}
        // 	this.labTime.text = Language.C_SYMFSXSJ + ":" + utils.DateUtil.formatTimeLeft(this._time);
        // 	this._time--;
        // }
        // private finshTime(): void {
        // 	this.labTime.text = Language.C_KYSX;
        // }
        JiangXingMainDialog.prototype.showBoxView = function () {
            if (!this._listBoxData) {
                this._listBoxData = new eui.ArrayCollection(GameModels.jiangxing.tavernRawardTemplates);
            }
            else {
                this._listBoxData.source = GameModels.jiangxing.tavernRawardTemplates;
            }
            this.listBox.dataProvider = this._listBoxData;
            this.listBox.selectedIndex = 0;
            this._vo = this.listBox.selectedItem;
        };
        JiangXingMainDialog.prototype.btnRecordClick = function () {
            if (GameModels.jiangxing.tavernRecordListVO.length <= 0) {
                mg.alertManager.tip(Language.J_MYRHJL);
                return;
            }
            mg.alertManager.showAlert(TaverneRecordList, true, true);
        };
        JiangXingMainDialog.prototype.btnBoxClick = function (e) {
            this.listBox.selectedIndex = e.itemIndex;
            var item = this.listBox.selectedItem;
            this._vo = item;
            if (this._vo) {
                if (GameModels.jiangxing.getRawardInfo.indexOf(this._vo.id) != -1) {
                    var str = this._vo.rewards.split("_");
                    if (str && str[0]) {
                        mg.TipManager.instance.showTip(tips.PropTip, { count: str[1], templateProp: Templates.getTemplateById(templates.Map.ITEM, str[0]) });
                    }
                }
                else {
                    if (GameModels.jiangxing.totalCount >= this._vo.value) {
                        GameModels.jiangxing.requestTavernGetRaward(this._vo.id, utils.Handler.create(this, this.getRewardCallback, [item.rewards]));
                    }
                    else {
                        var str = this._vo.rewards.split("_");
                        if (str && str[0]) {
                            mg.TipManager.instance.showTip(tips.PropTip, { count: str[1], templateProp: Templates.getTemplateById(templates.Map.ITEM, str[0]) });
                        }
                    }
                }
            }
        };
        JiangXingMainDialog.prototype.getRewardCallback = function (str) {
            this.labTotalCount.text = GameModels.jiangxing.totalCount + "/" + 200;
            this.listBox.dataProvider.replaceAll(GameModels.jiangxing.tavernRawardTemplates);
            var rewards = str.split(";");
            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
        };
        JiangXingMainDialog.prototype.onChouJiangClick = function () {
            this._type = 1;
            if (this.imgTeXiao10.visible == true) {
                this._type = 2;
            }
            else {
                this._type = 1;
            }
            this.requestChouJiang(this._type);
        };
        JiangXingMainDialog.prototype.requestChouJiang = function (type) {
            var _this = this;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            GameModels.jiangxing.requestTavernDoChouJiang(type, utils.Handler.create(this, function () {
                _this.btnChouJiang.touchEnabled = false;
                var view = mg.uiManager.getView(treasure.TreasureMain);
                if (view)
                    view.updataChange();
                var data = GameModels.jiangxing.daojuItemList;
                _this.showView();
                _this.showBoxView();
                if (data && data.length > 0) {
                    _this.playZhuanPanRotation(data[0].Pos);
                }
            }));
        };
        JiangXingMainDialog.prototype.playZhuanPanRotation = function (pos) {
            logger.log("转盘停下来的位置", pos);
            egret.Tween.get(this.imgSelecd).to({ rotation: 720 + ((pos - 1) * 360 / 10) }, 3000, utils.Ease.quartOut).call(function (index) {
                this.imgSelecd.rotation = ((pos - 1) * 360 / 10);
                this.btnChouJiang.touchEnabled = true;
                var view = mg.uiManager.getView(treasure.TreasureMain);
                if (view)
                    view.updataChange();
                mg.alertManager.showAlert(TavernGetAlert, true, true, GameModels.jiangxing.daojuItemList, this._type, ConfigData.JINGXINGQIYUAN, this, this.onChouJiangClick);
            }, this, [pos]);
        };
        JiangXingMainDialog.prototype.onIconClick = function (e) {
            for (var i = 0; i < 10; i++) {
                if (e.currentTarget == this._imgIcon[i]) {
                    if (this._rewadTmps[i]) {
                        var strItem = this._rewadTmps[i].itemId.split("_");
                        var item = Templates.getTemplateById(templates.Map.ITEM, strItem[0]);
                        if (item) {
                            mg.TipManager.instance.showTip(tips.PropTip, item);
                        }
                    }
                    break;
                }
            }
        };
        JiangXingMainDialog.prototype.onTeXiaoClick = function (e) {
            this.imgTeXiao10.visible = !this.imgTeXiao10.visible;
            this.showView();
        };
        JiangXingMainDialog.prototype.onAddItemClick = function (e) {
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.JINGXINGQIYUAN);
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, item.id); //激活道具获得途径
        };
        JiangXingMainDialog.prototype.showView = function () {
            this.labTotalCount.text = GameModels.jiangxing.totalCount + "/" + 200;
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.JINGXINGQIYUAN);
            this.imgDaoJu.source = item.icon;
            var count = GameModels.bag.getItemCountById(ConfigData.JINGXINGQIYUAN);
            if (this.imgTeXiao10.visible == true) {
                this.labDaoJu.text = count + "/" + 10;
                this.labDaoJu.textColor = count >= 10 ? 0x00ff00 : 0xff0000;
            }
            else {
                this.labDaoJu.text = count + "/" + 1;
                this.labDaoJu.textColor = count >= 1 ? 0x00ff00 : 0xff0000;
            }
        };
        return JiangXingMainDialog;
    }(ui.JiangXingMainDialogSkin));
    treasure.JiangXingMainDialog = JiangXingMainDialog;
    __reflect(JiangXingMainDialog.prototype, "treasure.JiangXingMainDialog");
})(treasure || (treasure = {}));
