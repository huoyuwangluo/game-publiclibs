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
        var XingYingLunPan = (function (_super) {
            __extends(XingYingLunPan, _super);
            function XingYingLunPan() {
                var _this = _super.call(this) || this;
                _this._isCloseTeXiao = false;
                _this.MAX_POS = 24;
                return _this;
            }
            XingYingLunPan.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._iconArray = [];
                this._labArray = [];
                this._teXiaoKuang = [this.imgSeleced0, this.imgSeleced1, this.imgSeleced2, this.imgSeleced3, this.imgSeleced4];
                this._rwards = [this.item0, this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7];
                for (var i = 0; i < 24; i++) {
                    this._iconArray.push(this["icon" + i]);
                    this._labArray.push(this["lab" + i]);
                }
            };
            XingYingLunPan.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this.labDiamond.text = "" + GameModels.user.player.diamonds;
                this.btnJIfen.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_JFDH);
                var template1 = GameModels.dataSet.getDataSettingById(293001);
                var template2 = GameModels.dataSet.getDataSettingById(294001);
                this._moshiOne = parseInt(template1.value.split("_")[1]);
                this._moshiFive = parseInt(template2.value.split("_")[1]);
                this.labCountOne.text = template1.value.split("_")[1];
                this.labCountFive.text = template2.value.split("_")[1];
                for (var i = 0; i < this._teXiaoKuang.length; i++) {
                    this._teXiaoKuang[i].visible = false;
                }
                this.imgTeXiao.visible = !this._isCloseTeXiao;
                this.btnOne.touchEnabled = true;
                this.btnFive.touchEnabled = true;
                this.imgSeleced.visible = true;
                this._currPos = 0;
                this._tatolPos = 0;
                this._endPos = 0;
                this.imgSeleced.x = this._iconArray[this._currPos].x;
                this.imgSeleced.y = this._iconArray[this._currPos].y;
                var summerLunPanCentra = GameModels.activitySummer.summerLunPanCentra;
                for (var i = 0; i < summerLunPanCentra.length; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    iconBox.dataSource = "" + summerLunPanCentra[i];
                }
                var summerLunPanAround = GameModels.activitySummer.summerLunPanAround;
                for (var i = 0; i < 24; i++) {
                    this._labArray[i].text = "" + summerLunPanAround[i];
                }
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.XYLP);
                if (temp) {
                    this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                }
                this.btnJIfen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOneClick, this);
                this.btnFive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFiveClick, this);
                this.btnTeXiao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                GameModels.user.player.onPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
                GameModels.activitySummer.addEventListener(mo.ModelSgActivitySummer.ACTIVITY_SUMMER_LUNPAN_ANGIN, this.lunpanAngin, this);
                GameModels.activitySummer.requestChougJiangRecord(utils.Handler.create(this, function () {
                    _this.chougJiangRecord();
                }));
                this.upDataJifen();
            };
            XingYingLunPan.prototype.exit = function () {
                if (this._countdownHandler) {
                    utils.timer.clear(this._countdownHandler);
                    this._countdownHandler = null;
                }
                egret.Tween.removeTweens(this.imgSeleced);
                for (var _i = 0, _a = this._rwards; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    reward.dataSource = null;
                }
                this.btnJIfen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onJifenClick, this);
                this.btnOne.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOneClick, this);
                this.btnFive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFiveClick, this);
                this.btnTeXiao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeXiaoClick, this);
                GameModels.user.player.offPropertyChange(TypeProperty.UnbindedGold, this, this.onGoldChange);
                GameModels.activitySummer.removeEventListener(mo.ModelSgActivitySummer.ACTIVITY_SUMMER_LUNPAN_ANGIN, this.lunpanAngin, this);
                this.clearList(this.list);
            };
            XingYingLunPan.prototype.lunpanAngin = function (e) {
                var _this = this;
                var count = e.data;
                if (count) {
                    GameModels.activitySummer.requestChougJiang(count, utils.Handler.create(this, function () {
                        //logger.log("再次连抽", GameModels.activitySummer.rewardIds);
                        //开始转
                        for (var i = 0; i < _this._teXiaoKuang.length; i++) {
                            _this._teXiaoKuang[i].visible = false;
                        }
                        _this.imgSeleced.visible = true;
                        if (count == 1) {
                            _this.oneDirect();
                        }
                        else {
                            _this.fiveDirect();
                        }
                    }));
                }
            };
            XingYingLunPan.prototype.onGoldChange = function () {
                this.labDiamond.text = "" + GameModels.user.player.diamonds;
            };
            XingYingLunPan.prototype.upDataJifen = function () {
                this.labJiFen.text = "" + GameModels.activitySummer.myJifen;
            };
            XingYingLunPan.prototype.chougJiangRecord = function () {
                if (!this._recordListData) {
                    this._recordListData = new eui.ArrayCollection(GameModels.activitySummer.chougJiangRecord);
                }
                else {
                    this._recordListData.source = GameModels.activitySummer.chougJiangRecord;
                }
                this.list.dataProvider = this._recordListData;
            };
            XingYingLunPan.prototype.onJifenClick = function (e) {
                GameModels.activitySummer.dispatchEventWith(mo.ModelSgActivitySummer.ACTIVITY_JIFENDUIHUAN_LINK);
            };
            XingYingLunPan.prototype.onOneClick = function (e) {
                var _this = this;
                if (GameModels.user.player.diamonds < this._moshiOne) {
                    mg.alertManager.tip(Language.J_MSBZ, 0xFF0000);
                    return;
                }
                this.btnOne.touchEnabled = false;
                this.btnFive.touchEnabled = false;
                GameModels.activitySummer.requestChougJiang(1, utils.Handler.create(this, function () {
                    //logger.log("1连抽", GameModels.activitySummer.rewardIds);
                    //开始转
                    for (var i = 0; i < _this._teXiaoKuang.length; i++) {
                        _this._teXiaoKuang[i].visible = false;
                    }
                    _this.imgSeleced.visible = true;
                    _this.tweenOneEffect();
                }));
            };
            XingYingLunPan.prototype.onFiveClick = function (e) {
                var _this = this;
                if (GameModels.user.player.diamonds < this._moshiFive) {
                    mg.alertManager.tip(Language.J_MSBZ, 0xFF0000);
                    return;
                }
                this.btnOne.touchEnabled = false;
                this.btnFive.touchEnabled = false;
                GameModels.activitySummer.requestChougJiang(5, utils.Handler.create(this, function () {
                    //logger.log("5连抽", GameModels.activitySummer.rewardIds);
                    //开始转
                    for (var i = 0; i < _this._teXiaoKuang.length; i++) {
                        _this._teXiaoKuang[i].visible = false;
                    }
                    _this.imgSeleced.visible = true;
                    _this.tweenFiveEffect();
                }));
            };
            XingYingLunPan.prototype.onTeXiaoClick = function (e) {
                this._isCloseTeXiao = !this._isCloseTeXiao;
                this.imgTeXiao.visible = !this._isCloseTeXiao;
            };
            XingYingLunPan.prototype.playEffect = function () {
                if (this._currPos >= this.MAX_POS) {
                    this._currPos = 0;
                }
                if (this._tatolPos >= this.MAX_POS * 2 + (this._id - this._endPos) + 1) {
                    egret.Tween.removeTweens(this.imgSeleced);
                    // logger.log("000000000000000", this._id);
                    this._tatolPos = 0;
                    if (this._isOneClick) {
                        this._endPos = this._currPos;
                        this.showGet();
                    }
                    else {
                        this._id = GameModels.activitySummer.rewardIds[1];
                        // logger.log("11111111111111111", this._id);
                        this._countdownHandler = utils.timer.once(500, this, this.tweenFiveNextEffect1, true);
                    }
                    return;
                }
                if (this._tatolPos > this.MAX_POS) {
                    egret.Tween.get(this.imgSeleced).to({ x: this._iconArray[this._currPos].x, y: this._iconArray[this._currPos].y }, 40, utils.Ease.quartInOut).call(this.playEffect, this, [this._currPos++, this._tatolPos++]);
                    return;
                }
                egret.Tween.get(this.imgSeleced).to({ x: this._iconArray[this._currPos].x, y: this._iconArray[this._currPos].y }, 40, utils.Ease.quartIn).call(this.playEffect, this, [this._currPos++, this._tatolPos++]);
            };
            /**l连抽转动轮盘 */
            XingYingLunPan.prototype.tweenOneEffect = function () {
                if (this._isCloseTeXiao) {
                    this.oneDirect();
                    return;
                }
                this._id = GameModels.activitySummer.rewardIds[0];
                this._isOneClick = true;
                this.playEffect();
            };
            XingYingLunPan.prototype.oneDirect = function () {
                this.imgSeleced.visible = false;
                var id = GameModels.activitySummer.rewardIds[0];
                this._teXiaoKuang[0].visible = true;
                this.imgSeleced0.x = this._iconArray[id].x;
                this.imgSeleced0.y = this._iconArray[id].y;
                for (var i = 1; i < this._teXiaoKuang.length; i++) {
                    this._teXiaoKuang[i].visible = false;
                }
                this._currPos = id;
                this._endPos = this._currPos;
                this.imgSeleced.x = this._iconArray[id].x;
                this.imgSeleced.y = this._iconArray[id].y;
                this.showGet();
            };
            XingYingLunPan.prototype.fiveDirect = function () {
                this.imgSeleced.visible = false;
                var id = GameModels.activitySummer.rewardIds;
                for (var i = 0; i < this._teXiaoKuang.length; i++) {
                    if (id[i] >= 0 && id[i] <= 23) {
                        this._teXiaoKuang[i].visible = true;
                        this._teXiaoKuang[i].x = this._iconArray[id[i]].x;
                        this._teXiaoKuang[i].y = this._iconArray[id[i]].y;
                    }
                }
                this._currPos = 0;
                this._endPos = this._currPos;
                this.imgSeleced.x = this._iconArray[0].x;
                this.imgSeleced.y = this._iconArray[0].y;
                this.showGet();
            };
            /**5连抽转动轮盘 */
            XingYingLunPan.prototype.tweenFiveEffect = function () {
                if (this._isCloseTeXiao) {
                    this.fiveDirect();
                    return;
                }
                this._id = GameModels.activitySummer.rewardIds[0];
                this._isOneClick = false;
                this.playEffect();
            };
            XingYingLunPan.prototype.tweenFiveNextEffect1 = function () {
                if (this._countdownHandler) {
                    utils.timer.clear(this._countdownHandler);
                    this._countdownHandler = null;
                }
                if (this._currPos >= this.MAX_POS) {
                    this._currPos = 0;
                }
                var count = this._id + 1;
                if (count == 24) {
                    count = 0;
                }
                if (this._currPos == count) {
                    egret.Tween.removeTweens(this.imgSeleced);
                    this._id = GameModels.activitySummer.rewardIds[2];
                    // logger.log("222222222222222222222", this._id);
                    this._countdownHandler = utils.timer.once(500, this, this.tweenFiveNextEffect2, true);
                    return;
                }
                egret.Tween.get(this.imgSeleced).to({ x: this._iconArray[this._currPos].x, y: this._iconArray[this._currPos].y }, 40, utils.Ease.quartInOut).call(this.tweenFiveNextEffect1, this, [this._currPos++]);
            };
            XingYingLunPan.prototype.tweenFiveNextEffect2 = function () {
                if (this._countdownHandler) {
                    utils.timer.clear(this._countdownHandler);
                    this._countdownHandler = null;
                }
                if (this._currPos >= this.MAX_POS) {
                    this._currPos = 0;
                }
                var count = this._id + 1;
                if (count == 24) {
                    count = 0;
                }
                if (this._currPos == count) {
                    egret.Tween.removeTweens(this.imgSeleced);
                    this._id = GameModels.activitySummer.rewardIds[3];
                    // logger.log("333333333333333333333", this._id);
                    this._countdownHandler = utils.timer.once(500, this, this.tweenFiveNextEffect3, true);
                    return;
                }
                egret.Tween.get(this.imgSeleced).to({ x: this._iconArray[this._currPos].x, y: this._iconArray[this._currPos].y }, 40, utils.Ease.quartInOut).call(this.tweenFiveNextEffect2, this, [this._currPos++]);
            };
            XingYingLunPan.prototype.tweenFiveNextEffect3 = function () {
                if (this._countdownHandler) {
                    utils.timer.clear(this._countdownHandler);
                    this._countdownHandler = null;
                }
                if (this._currPos >= this.MAX_POS) {
                    this._currPos = 0;
                }
                var count = this._id + 1;
                if (count == 24) {
                    count = 0;
                }
                if (this._currPos == count) {
                    egret.Tween.removeTweens(this.imgSeleced);
                    this._id = GameModels.activitySummer.rewardIds[4];
                    // logger.log("4444444444444444", this._id);
                    this._countdownHandler = utils.timer.once(500, this, this.tweenFiveNextEffect4, true);
                    return;
                }
                egret.Tween.get(this.imgSeleced).to({ x: this._iconArray[this._currPos].x, y: this._iconArray[this._currPos].y }, 40, utils.Ease.quartInOut).call(this.tweenFiveNextEffect3, this, [this._currPos++]);
            };
            XingYingLunPan.prototype.tweenFiveNextEffect4 = function () {
                if (this._countdownHandler) {
                    utils.timer.clear(this._countdownHandler);
                    this._countdownHandler = null;
                }
                if (this._currPos >= this.MAX_POS) {
                    this._currPos = 0;
                }
                var count = this._id + 1;
                if (count == 24) {
                    count = 0;
                }
                if (this._currPos == count) {
                    egret.Tween.removeTweens(this.imgSeleced);
                    this.imgSeleced.visible = false;
                    var id = GameModels.activitySummer.rewardIds;
                    for (var i = 0; i < this._teXiaoKuang.length; i++) {
                        if (id[i] >= 0 && id[i] <= 23) {
                            this._teXiaoKuang[i].visible = true;
                            this._teXiaoKuang[i].x = this._iconArray[id[i]].x;
                            this._teXiaoKuang[i].y = this._iconArray[id[i]].y;
                        }
                    }
                    this._currPos = 0;
                    this._endPos = this._currPos;
                    this.imgSeleced.x = this._iconArray[0].x;
                    this.imgSeleced.y = this._iconArray[0].y;
                    this.showGet();
                    return;
                }
                egret.Tween.get(this.imgSeleced).to({ x: this._iconArray[this._currPos].x, y: this._iconArray[this._currPos].y }, 40, utils.Ease.quartInOut).call(this.tweenFiveNextEffect4, this, [this._currPos++]);
            };
            XingYingLunPan.prototype.showGet = function () {
                var _this = this;
                this.btnOne.touchEnabled = true;
                this.btnFive.touchEnabled = true;
                var id = GameModels.activitySummer.rewardIds;
                if (id.length == 1 || id.length == 5) {
                    GameModels.activitySummer.requestChougJiangRecord(utils.Handler.create(this, function () {
                        _this.chougJiangRecord();
                    }));
                    this.upDataJifen();
                    var iconStr = [];
                    var numberStr = [];
                    for (var i = 0; i < id.length; i++) {
                        iconStr.push(this._iconArray[id[i]].source);
                        numberStr.push(this._labArray[id[i]].text);
                    }
                    if (iconStr.length == 1 || iconStr.length == 5) {
                        mg.alertManager.showAlert(XingYingLunPanGetAlert, true, true, iconStr, numberStr, GameModels.activitySummer.rewardIdScore);
                    }
                }
            };
            return XingYingLunPan;
        }(ui.XingYingLunPanSkin));
        activity.XingYingLunPan = XingYingLunPan;
        __reflect(XingYingLunPan.prototype, "view.activity.XingYingLunPan", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
