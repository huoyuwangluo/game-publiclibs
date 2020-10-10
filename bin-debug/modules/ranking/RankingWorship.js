var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var dialog;
(function (dialog) {
    var ranking;
    (function (ranking) {
        var RankingWorship = (function () {
            function RankingWorship(view) {
                this._view = view;
                this.initBtnEvent();
            }
            RankingWorship.prototype.initBtnEvent = function () {
                this._view.btnWorship.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnWorshipClick, this);
            };
            Object.defineProperty(RankingWorship.prototype, "rankData", {
                get: function () {
                    return this._rankData;
                },
                enumerable: true,
                configurable: true
            });
            RankingWorship.prototype.btnWorshipClick = function (e) {
                GameModels.ranking.requestWorshipExecute(GameModels.ranking.type, utils.Handler.create(this, this.complete));
            };
            RankingWorship.prototype.gpForeachFly = function (gp, id) {
                this.playFlyAni(gp.localToGlobal(-80), id);
            };
            RankingWorship.prototype.update = function (value, data) {
                this._view.btnWorship.isWarn = true;
                this._oneData = value;
                GameModels.ranking.type = data.SortboardType;
                this._view.todayNum.text = data.WorshipCount + "";
                GameModels.user.player.zhuanShenLevel;
                this._view.goldNum.visible = true;
                // this._view.expNum.visible = true;
                this._view.btnWorship.visible = true;
                this._view.getImg.visible = false;
                this._view.goldNum.text = 100000 + "";
                // this._view.expNum.text = (GameModels.user.player.zhuanShenLevel * 20000) + 10000 + ""
                //是否膜拜
                if (data.DoneWorship == 0) {
                    this._view.btnWorship.visible = true;
                    this._view.getImg.visible = false;
                }
                else {
                    this._view.btnWorship.visible = false;
                    this._view.getImg.visible = true;
                }
            };
            RankingWorship.prototype.complete = function () {
                this.gpForeachFly(this._view.goldNum, "101");
                // this.gpForeachFly(this._view.expNum, "301");
                this._view.btnWorship.visible = false;
                this._view.getImg.visible = true;
                this._view.todayNum.text = Number(this._view.todayNum.text) + 1 + "";
            };
            RankingWorship.prototype.playFlyAni = function (startPosition, id) {
                if (id == "101") {
                    var moneyPoint = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
                    mg.effectManager.flyEffects("6160", 10, startPosition, moneyPoint, mg.layerManager.top);
                }
                else if (id == "301") {
                    var targetPos = mg.uiManager.getView(main.MainUIView).getRolePostion(true);
                    mg.effectManager.flyEffects("6161", 1, startPosition, targetPos, mg.layerManager.top);
                }
            };
            RankingWorship.prototype.clear = function () {
                this._view.btnWorship.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnWorshipClick, this);
            };
            return RankingWorship;
        }());
        ranking.RankingWorship = RankingWorship;
        __reflect(RankingWorship.prototype, "dialog.ranking.RankingWorship");
    })(ranking = dialog.ranking || (dialog.ranking = {}));
})(dialog || (dialog = {}));
