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
        var KuaFuXiaoFeiPaiHang = (function (_super) {
            __extends(KuaFuXiaoFeiPaiHang, _super);
            function KuaFuXiaoFeiPaiHang() {
                return _super.call(this) || this;
            }
            KuaFuXiaoFeiPaiHang.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.touchEnabled = false;
            };
            KuaFuXiaoFeiPaiHang.prototype.enter = function (data) {
                if (data === void 0) { data = null; }
                this.imgfinsh.visible = false;
                this.img5s.visible = false;
                var temp = GameModels.activitySummer.getActivitySummerListTemplates(game.TypeSummerActivity.KFXHPH);
                if (temp) {
                    this.labDesc.text = temp.des;
                    if (GameModels.activitySummer.getSummerActivityListTiem(temp.id) <= 0) {
                        this.imgfinsh.visible = true;
                        this.labDate.text = Language.C_YJS;
                    }
                    else {
                        this.labDate.text = utils.DateUtil.formatDateInChinese(new Date(GameModels.activitySummer.getSummerActivityListTiem(temp.id) * 1000), false);
                    }
                    if (temp.typeTable == 30301) {
                        this.img5s.visible = true;
                    }
                    if (GameModels.activitySummer.summerActivityOneResourceType > 0) {
                        this.imgTitle.source = "img_summer_kf_xiaofeipaihang" + GameModels.activitySummer.summerActivityOneResourceType + "_" + temp.typeTable + "_jpg";
                    }
                    if (temp.effect) {
                        this.addEff(temp.effect);
                    }
                    else {
                        if (this._efct) {
                            this.removeEffectHandler(this._efct);
                            this._efct = null;
                        }
                    }
                }
                GameModels.activitySummer.requestTotalCostInfo(this, this.updateDisplay);
                this.btnHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
                this.btnSeek.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSeekClick, this);
            };
            KuaFuXiaoFeiPaiHang.prototype.exit = function () {
                if (this._efct) {
                    this.removeEffectHandler(this._efct);
                    this._efct = null;
                }
                this.clearList(this.list);
                this.btnHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.helpClick, this);
                this.btnSeek.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnSeekClick, this);
            };
            KuaFuXiaoFeiPaiHang.prototype.btnSeekClick = function () {
                mg.alertManager.showAlert(view.activity.XingYingDuoBaoTips, true, true, false);
            };
            KuaFuXiaoFeiPaiHang.prototype.helpClick = function () {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 3101).des);
            };
            KuaFuXiaoFeiPaiHang.prototype.addEff = function (resid) {
                this._efct = utils.ObjectPool.from(s.AnimationSprite, true);
                this._efct.x = 170;
                this._efct.y = 250;
                this._efct.frameRate = 6;
                this._efct.scale(0.6);
                // this._efct.skewY = 180;
                this.addChild(this._efct);
                this._efct.touchEnabled = false;
                this._efct.touchChildren = false;
                this._efct.resId = resid;
                this._efct.play();
                this.addChildAt(this.img5s, this.getChildIndex(this._efct) + 1);
                this.addChildAt(this.btnSeek, this.getChildIndex(this._efct) + 1);
            };
            KuaFuXiaoFeiPaiHang.prototype.updateDisplay = function () {
                var totalCostInfos = GameModels.activitySummer.totalCostInfos();
                var data = [];
                for (var i = 0; i < GameModels.activitySummer.maxRankCount; i++) {
                    if (totalCostInfos.list[i]) {
                        data[i] = { rank: totalCostInfos.list[i].rank, role: totalCostInfos.list[i] };
                    }
                    else {
                        data[i] = { rank: (i + 1), role: null };
                    }
                }
                this.list.dataProvider = new eui.ArrayCollection(data);
                var myRank = 0;
                var totalCost = 0;
                for (var i = 0; i < totalCostInfos.list.length; i++) {
                    if (totalCostInfos.list[i].sid == GameModels.login.serverList.selected.sid && totalCostInfos.list[i].roleName == GameModels.user.player.name) {
                        myRank = totalCostInfos.list[i].rank;
                        totalCost = totalCostInfos.list[i].totalCost;
                        break;
                    }
                }
                if (myRank > 0) {
                    this.labMyRank.text = "" + myRank;
                    this.labMyMoShi.text = "" + totalCost;
                }
                else {
                    var cmd = n.MessagePool.from(n.C2G_HolidayKuaFuConsumeRank_GetInfo);
                    n.net.request(n.MessageMap.C2G_HOLIDAYKUAFUCONSUMERANK_GETINFO, cmd, utils.Handler.create(this, this.myMoshiCount));
                }
            };
            KuaFuXiaoFeiPaiHang.prototype.myMoshiCount = function (data) {
                this.labMyRank.text = "" + Language.C_WSB;
                this.labMyMoShi.text = "" + data.ConsumeTotal;
            };
            return KuaFuXiaoFeiPaiHang;
        }(ui.KuaFuXiaoFeiPaiHangSkin));
        activity.KuaFuXiaoFeiPaiHang = KuaFuXiaoFeiPaiHang;
        __reflect(KuaFuXiaoFeiPaiHang.prototype, "view.activity.KuaFuXiaoFeiPaiHang", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
