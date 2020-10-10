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
var dialog;
(function (dialog) {
    var explore;
    (function (explore) {
        var TypeGrade = (function () {
            function TypeGrade() {
            }
            TypeGrade.getGradeImage = function (type) {
                var typeName;
                switch (type) {
                    case TypeGrade.COPPER:
                        typeName = "bronze";
                        break;
                    case TypeGrade.SILVER:
                        typeName = "silver";
                        break;
                    case TypeGrade.GOLD:
                        typeName = "gold";
                        break;
                    case TypeGrade.PLAT:
                        typeName = "bGold";
                        break;
                    case TypeGrade.DIAMONDS:
                        typeName = "dia";
                        break;
                    case TypeGrade.MASTER:
                        typeName = "master";
                        break;
                    case TypeGrade.EXTREME:
                        typeName = "god";
                        break;
                }
                return "ladder_json.img_dan_" + typeName;
            };
            TypeGrade.getLvImge = function (type, lv) {
                return "gradeArt_json." + (type - 1) + "" + lv;
            };
            TypeGrade.COPPER = 1;
            TypeGrade.SILVER = 2;
            TypeGrade.GOLD = 3;
            TypeGrade.PLAT = 4;
            TypeGrade.DIAMONDS = 5;
            TypeGrade.MASTER = 6;
            TypeGrade.EXTREME = 7;
            return TypeGrade;
        }());
        explore.TypeGrade = TypeGrade;
        __reflect(TypeGrade.prototype, "dialog.explore.TypeGrade");
        var LadderReward = (function (_super) {
            __extends(LadderReward, _super);
            function LadderReward() {
                return _super.call(this) || this;
            }
            LadderReward.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            LadderReward.prototype.enter = function (data) {
                this.btnClose.once(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
                this.btnBack.once(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
                this.initData();
            };
            LadderReward.prototype.exit = function () {
                this.reset();
            };
            LadderReward.prototype.initData = function () {
                var _this = this;
                GameModels.ladder.requestDuanWeiRewardInfo(utils.Handler.create(this, function (data) {
                    _this._templates = GameModels.ladder.ladders;
                    _this.updateRoleView();
                    _this.list.dataProvider = GameModels.ladder.listData;
                }));
            };
            LadderReward.prototype.updateRoleView = function () {
                var roleData = GameModels.ladder.roleData;
                this.labJifen.text = roleData.myOrAddScore.toString();
                this.labRanking.text = roleData.ladderRanking.toString();
                this.imgGrade.source = dialog.explore.TypeGrade.getGradeImage(roleData.step);
                if (roleData.step != dialog.explore.TypeGrade.EXTREME) {
                    this.imgLv.visible = true;
                    this.imgLv.source = dialog.explore.TypeGrade.getLvImge(roleData.step, roleData.lv);
                }
                else {
                    this.imgLv.visible = false;
                }
            };
            LadderReward.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.scroller.verticalScrollBar) {
                    this.scroller.verticalScrollBar.autoVisibility = false;
                    this.scroller.verticalScrollBar.visible = false;
                }
            };
            LadderReward.prototype.closeHandler = function () {
                mg.uiManager.remove(this);
            };
            LadderReward.prototype.reset = function () {
                this.clearList(this.list);
            };
            return LadderReward;
        }(ui.LadderRewardSkin));
        explore.LadderReward = LadderReward;
        __reflect(LadderReward.prototype, "dialog.explore.LadderReward");
    })(explore = dialog.explore || (dialog.explore = {}));
})(dialog || (dialog = {}));
