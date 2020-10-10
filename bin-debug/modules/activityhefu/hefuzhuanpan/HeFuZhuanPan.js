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
        var HeFuZhuanPan = (function (_super) {
            __extends(HeFuZhuanPan, _super);
            function HeFuZhuanPan() {
                var _this = _super.call(this) || this;
                _this.MAX_TIME = 5;
                _this.isTurntable = false;
                _this._awardPosition = 5;
                _this._Scores = 8;
                return _this;
            }
            HeFuZhuanPan.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._needRmb = [];
                var dataTmp = GameModels.dataSet.getDataSettingById(211001);
                var needArr = dataTmp.value.split(";");
                for (var _i = 0, needArr_1 = needArr; _i < needArr_1.length; _i++) {
                    var str = needArr_1[_i];
                    var num = parseInt(str.split("_")[0]);
                    this._needRmb.push(num);
                }
                this._labs = [this.lab_1, this.lab_2, this.lab_3, this.lab_4, this.lab_5, this.lab_6, this.lab_7, this.lab_8];
                this.listContent.itemRenderer = renderer.LuckyTurntableRenderer;
            };
            HeFuZhuanPan.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.isTurntable = false;
                this.imgSelect.visible = false;
                this.turntableGroup.rotation = this.imgSelect.rotation = 0; //初始化角度
                var temp = GameModels.activityHeFu.getActivityHeFuListTemplates(game.TypeHeFuActivity.HEFU_MOSHI);
                if (temp) {
                    this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activityHeFu.getHeFuActivityListTiem(temp.id) * 1000), false);
                }
                this.btnTurnAround.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTurnAroundClick, this);
                GameModels.activityHeFu.addEventListener(mo.ModelActivityHeFu.REFRESH_TURNTABLE, this.showView, this);
                GameModels.activityHeFu.net_hefuZhuanPan(utils.Handler.create(this, this.showView));
            };
            HeFuZhuanPan.prototype.exit = function () {
                egret.Tween.removeTweens(this.turntableGroup);
                this.btnTurnAround.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTurnAroundClick, this);
                GameModels.activityHeFu.removeEventListener(mo.ModelActivityHeFu.REFRESH_TURNTABLE, this.showView, this);
            };
            HeFuZhuanPan.prototype.showView = function () {
                this._time = GameModels.activityHeFu.getUsedTurnTimes() + 1;
                var xyzpTmp = Templates.getTemplateByProperty(templates.Map.MERGETURNTABLE, "time", this._time);
                if (!xyzpTmp) {
                    this._time -= 1;
                    xyzpTmp = Templates.getTemplateByProperty(templates.Map.MERGETURNTABLE, "time", this._time);
                }
                this.multipleList = xyzpTmp.multiple.split(";");
                var index = 0;
                for (var _i = 0, _a = this.multipleList; _i < _a.length; _i++) {
                    var str = _a[_i];
                    if (this._labs[index])
                        this._labs[index].text = Language.getExpression(Language.E_1B, str);
                    index++;
                }
                this.labBet.text = xyzpTmp.consume.split("_")[1];
                this.labTomrrowGold.text = "" + GameModels.activityHeFu.getTotalGetMoShi();
                this.labHaveCount.text = "" + GameModels.activityHeFu.getLeftTurnTimes();
                var tips = "";
                if (GameModels.activityHeFu.getUsedTurnTimes() < this.MAX_TIME) {
                    var needNum = this._needRmb[this._time - 1] - GameModels.activityHeFu.getTodayPayCount();
                    if (needNum > 0) {
                        tips = Language.getExpression(Language.E_ZCZ1MSKHD, needNum);
                    }
                }
                else {
                    tips = "<font color='0x34e22c' size=16>" + Language.J_JRCSYYW + "</font>";
                }
                this.labCanPay.textFlow = utils.TextFlowMaker.htmlParser(tips);
                if (!this._recordListData) {
                    this._recordListData = new eui.ArrayCollection(GameModels.activityHeFu.getRecordList());
                }
                else {
                    this._recordListData.source = GameModels.activityHeFu.getRecordList();
                }
                this.listContent.dataProvider = this._recordListData;
            };
            HeFuZhuanPan.prototype.onTurnAroundClick = function (e) {
                var needNum = this._needRmb[this._time - 1] - GameModels.activityHeFu.getTodayPayCount();
                if (needNum < 0)
                    needNum = 0;
                if (GameModels.activityHeFu.getUsedTurnTimes() < this.MAX_TIME) {
                    if (needNum > 0) {
                        mg.alertManager.tip(this.labCanPay.text);
                        return;
                    }
                }
                else {
                    mg.alertManager.tip(Language.J_JRCSYYW);
                    return;
                }
                if (utils.CheckUtil.checkDiamonds(parseInt(this.labBet.text), true)) {
                    if (this.isTurntable)
                        return;
                    //GameModels.activityHeFu.hefuZhuanPanDone(utils.Handler.create(this, this.onTurntable));
                }
            };
            // private onTurntable(data: n.ProtoLuckTurnTableRecord): void {
            // 	this.isTurntable = true;
            // 	this.imgSelect.visible = false;
            // 	var percent: number = data.Percent / 100;
            // 	for (var i: number = 0; i < this.multipleList.length; i++) {
            // 		if (this.multipleList[i] == (percent + "")) {
            // 			this._awardPosition = i + 1;
            // 		}
            // 	}
            // 	var _totalRotate = this.getRotationLong(this._Scores, 5, 8, this._awardPosition, 0.3);//获取总长度
            // 	var tween: egret.Tween = egret.Tween.get(this.turntableGroup).to({ rotation: _totalRotate }, 5000, egret.Ease.circInOut);
            // 	tween.call(this.onAwarded, this, [data.MoShi, data.MoShi * 1.5, data]);
            // }
            // private onAwarded(dayGold: number, tomrrowGold: number, data: n.ProtoLuckTurnTableRecord): void {
            // 	this.isTurntable = false;
            // 	this.imgSelect.visible = true;
            // 	this.imgSelect.rotation = (this._awardPosition) * (360 / this._Scores) + this.turntableGroup.rotation;
            // 	mg.alertManager.showAlert(LuckyTurntableAlert, false, true,dayGold, tomrrowGold);
            // 	GameModels.activityHeFu.setLeftTurnTimes();
            // 	GameModels.activityHeFu.setUsedTurnTimes();
            // 	GameModels.activityHeFu.setRecordList(data);
            // 	GameModels.activityHeFu.setTotalGetMoShi(dayGold);
            // 	// GameModels.state.updateState(GameRedState.ACTIVITY_XYZP);
            // 	this.showView();
            // }
            /**
             * 总的旋转角度
             * @param Scores 转盘拆分份数
             * @param Qmin 转过最少圈数
             * @param Qmax 转过最多圈数
             * @param awardPosition 奖品所在奖区
             * @param offset 指针所停位置离奖区边缘的比例
             * @return 总的旋转角度
             */
            HeFuZhuanPan.prototype.getRotationLong = function (Scores, Qmin, Qmax, awardPosition, offset) {
                var _quanNum = 360 * (Math.floor(Math.random() * (Qmax - Qmin)) + Qmin); //整圈长度
                var _location = (360 / Scores) * (-awardPosition); //目标奖区
                var _offset = Math.floor(Math.random() * (360 / Scores) * (1 - 2 * offset)) + (360 / Scores) * offset;
                return _quanNum + _location + _offset;
            };
            return HeFuZhuanPan;
        }(ui.HeFuZhuanPanSkin));
        activity.HeFuZhuanPan = HeFuZhuanPan;
        __reflect(HeFuZhuanPan.prototype, "view.activity.HeFuZhuanPan", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
