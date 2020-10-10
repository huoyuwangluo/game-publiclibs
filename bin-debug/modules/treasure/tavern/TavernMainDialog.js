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
    var TavernMainDialog = (function (_super) {
        __extends(TavernMainDialog, _super);
        function TavernMainDialog() {
            var _this = _super.call(this) || this;
            _this._effArr = [];
            return _this;
        }
        TavernMainDialog.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._effArr = [];
            this._imgIcon = [this.img_icon1, this.img_icon2, this.img_icon3, this.img_icon4, this.img_icon5,
                this.img_icon6, this.img_icon7, this.img_icon8, this.img_icon9, this.img_icon10];
            this._labCount = [this.labCount1, this.labCount2, this.labCount3, this.labCount4, this.labCount5,
                this.labCount6, this.labCount7, this.labCount8, this.labCount9, this.labCount10];
            this._petIdArr = ["13058", "13048", "13032", "13071", "13067", "13068", "13069", "13070"];
        };
        TavernMainDialog.prototype.initView = function () {
            var _this = this;
            this.imgAddItem.visible = GameModels.platform.isPay;
            this._effArr = [];
            this.btnRecord.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_DJJL);
            this.group10.visible = true;
            this.imgTeXiao10.visible = false;
            this.btnChouJiang.touchEnabled = true;
            GameModels.tavern.requestTavernInfo(utils.Handler.create(this, function () {
                _this._rewadTmps = GameModels.tavern.tavernTemplates;
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
                utils.timer.clear(_this);
                _this._time = GameModels.tavern.leftTime;
                _this.updateLableTime();
                utils.timer.countdown(_this._time, _this, _this.updateLableTime, _this.finshTime);
            }));
            this.btnTeXiao10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
            this.btnRecord.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRecordClick, this);
            this.btnChouJiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChouJiangClick, this);
            this.listBox.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
            this.btnUpDate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpDateClick, this);
            this.btnDuiHuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuiHuanClick, this);
            this.imgAddItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddItemClick, this);
            this.imgPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            GameModels.user.player.onPropertyChange(TypeProperty.GUANXING_JIFEN, this, this.showView);
        };
        TavernMainDialog.prototype.reset = function () {
            utils.timer.clear(this);
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
            this.btnUpDate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpDateClick, this);
            this.listBox.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.btnBoxClick, this);
            this.btnRecord.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnRecordClick, this);
            this.btnDuiHuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDuiHuanClick, this);
            this.imgAddItem.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddItemClick, this);
            this.imgPreview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPreviewClick, this);
            GameModels.user.player.offPropertyChange(TypeProperty.GUANXING_JIFEN, this, this.showView);
        };
        TavernMainDialog.prototype.onDuiHuanClick = function () {
            mg.uiManager.show(MallScene, { tabIndex: 3 }, true);
        };
        TavernMainDialog.prototype.onPreviewClick = function (e) {
            mg.alertManager.showAlert(treasure.TreasureAllPrize, true, true, "730005");
        };
        TavernMainDialog.prototype.updateLableTime = function () {
            if (this._time <= 0) {
                this.btnUpDate.label = Language.C_MFSX;
                this.labTime.text = Language.C_KYSX;
                this.MoneyGroup.visible = false;
                return;
            }
            this.btnUpDate.label = Language.C_YBSX;
            //this.MoneyGroup.visible = true;
            this.labTime.text = Language.C_SYMFSXSJ + ":" + utils.DateUtil.formatTimeLeft(this._time);
            this._time--;
        };
        TavernMainDialog.prototype.finshTime = function () {
            this.labTime.text = Language.C_KYSX;
            this.btnUpDate.label = Language.C_MFSX;
        };
        TavernMainDialog.prototype.onUpDateClick = function () {
            var _this = this;
            GameModels.tavern.requestTavernRefresh(utils.Handler.create(this, function () {
                _this.reset();
                _this.initView();
            }));
        };
        TavernMainDialog.prototype.showBoxView = function () {
            var petTmpArr = [];
            for (var _i = 0, _a = this._petIdArr; _i < _a.length; _i++) {
                var id = _a[_i];
                var tmp = Templates.getTemplateById(templates.Map.GENERAL, id);
                if (tmp)
                    petTmpArr.push(tmp);
            }
            if (!this._listBoxData) {
                this._listBoxData = new eui.ArrayCollection(petTmpArr);
            }
            else {
                this._listBoxData.source = petTmpArr;
            }
            this.listBox.dataProvider = this._listBoxData;
        };
        TavernMainDialog.prototype.btnRecordClick = function () {
            if (GameModels.tavern.tavernRecordListVO.length <= 0) {
                mg.alertManager.tip(Language.J_MYRHJL);
                return;
            }
            mg.alertManager.showAlert(TaverneRecordList, true, true);
        };
        TavernMainDialog.prototype.btnBoxClick = function (e) {
            this.listBox.selectedIndex = e.itemIndex;
            var item = this.listBox.selectedItem;
            if (item)
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, item);
        };
        TavernMainDialog.prototype.getRewardCallback = function (str) {
            this.labTotalCount.text = "" + GameModels.user.player.getProperty(TypeProperty.GUANXING_JIFEN);
            this.listBox.dataProvider.replaceAll(GameModels.tavern.tavernRawardTemplates);
            var rewards = str.split(";");
            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
        };
        TavernMainDialog.prototype.onChouJiangClick = function () {
            this._type = 1;
            if (this.imgTeXiao10.visible == true) {
                this._type = 2;
            }
            else {
                this._type = 1;
            }
            var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.act3);
            if (vo.actCfgId == 80501) {
                mg.TipManager.instance.showCheckAlert(Language.J_TIPS4, TypeBtnLabel.OK, TypeCheck.INDEX_1, null, utils.Handler.create(this, function () {
                    this.requestChouJiang(this._type);
                }));
                return;
            }
            this.requestChouJiang(this._type);
        };
        TavernMainDialog.prototype.requestChouJiang = function (type) {
            var _this = this;
            if (utils.CheckUtil.checkBagSmelting())
                return;
            GameModels.tavern.requestTavernDoChouJiang(type, utils.Handler.create(this, function () {
                _this.btnChouJiang.touchEnabled = false;
                var view = mg.uiManager.getView(treasure.TreasureMain);
                if (view)
                    view.updataChange();
                var data = GameModels.tavern.daojuItemList;
                _this.showView();
                _this.showBoxView();
                if (data && data.length > 0) {
                    _this.playZhuanPanRotation(data[0].Pos);
                }
            }));
        };
        TavernMainDialog.prototype.playZhuanPanRotation = function (pos) {
            logger.log("转盘停下来的位置", pos);
            egret.Tween.get(this.imgSelecd).to({ rotation: 720 + ((pos - 1) * 360 / 10) }, 3000, utils.Ease.quartOut).call(function (index) {
                this.imgSelecd.rotation = ((pos - 1) * 360 / 10);
                this.btnChouJiang.touchEnabled = true;
                var view = mg.uiManager.getView(treasure.TreasureMain);
                if (view)
                    view.updataChange();
                mg.alertManager.showAlert(TavernGetAlert, true, true, GameModels.tavern.daojuItemList, this._type, ConfigData.GUANXINGKA, this, this.onChouJiangClick);
            }, this, [pos]);
        };
        TavernMainDialog.prototype.onIconClick = function (e) {
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
        TavernMainDialog.prototype.onTeXiaoClick = function (e) {
            this.imgTeXiao10.visible = !this.imgTeXiao10.visible;
            this.showView();
        };
        TavernMainDialog.prototype.onAddItemClick = function (e) {
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.GUANXINGKA);
            mg.alertManager.showAlert(PropOfSourceAlert, true, true, item.id); //激活道具获得途径
        };
        TavernMainDialog.prototype.showView = function () {
            this.labTotalCount.text = "" + GameModels.user.player.getProperty(TypeProperty.GUANXING_JIFEN);
            var item = Templates.getTemplateById(templates.Map.ITEM, ConfigData.GUANXINGKA);
            this.imgDaoJu.source = item.icon;
            var count = GameModels.bag.getItemCountById(ConfigData.GUANXINGKA);
            if (this.imgTeXiao10.visible == true) {
                this.labDaoJu.text = count + "/" + 10;
                this.labDaoJu.textColor = count >= 10 ? 0x00ff00 : 0xff0000;
            }
            else {
                this.labDaoJu.text = count + "/" + 1;
                this.labDaoJu.textColor = count >= 1 ? 0x00ff00 : 0xff0000;
            }
        };
        return TavernMainDialog;
    }(ui.TavernMainDialogSkin));
    treasure.TavernMainDialog = TavernMainDialog;
    __reflect(TavernMainDialog.prototype, "treasure.TavernMainDialog");
})(treasure || (treasure = {}));
