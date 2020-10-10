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
var achievement;
(function (achievement) {
    var AchievementTuJianGroupRenderer = (function (_super) {
        __extends(AchievementTuJianGroupRenderer, _super);
        function AchievementTuJianGroupRenderer() {
            var _this = _super.call(this) || this;
            _this.groupList.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onListClick, _this);
            return _this;
        }
        AchievementTuJianGroupRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this._handBookData = this.data;
            this.groupList.dataProvider = this._groupListCollection = new eui.ArrayCollection([]);
            if (this._handBookData) {
                this._groupListCollection.source = this._handBookData;
            }
        };
        AchievementTuJianGroupRenderer.prototype.onListClick = function (e) {
            this._targetItem = e.itemRenderer;
            var handbookData = this._targetItem.getdata();
            mg.uiManager.show(AchievementTuJianUp, handbookData);
        };
        return AchievementTuJianGroupRenderer;
    }(ui.AchievementTuJianGroupRendererSkin));
    achievement.AchievementTuJianGroupRenderer = AchievementTuJianGroupRenderer;
    __reflect(AchievementTuJianGroupRenderer.prototype, "achievement.AchievementTuJianGroupRenderer");
})(achievement || (achievement = {}));
