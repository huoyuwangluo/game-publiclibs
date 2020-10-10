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
var item;
(function (item) {
    var LegionThreeKingdomsItem = (function (_super) {
        __extends(LegionThreeKingdomsItem, _super);
        function LegionThreeKingdomsItem() {
            var _this = _super.call(this) || this;
            _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3];
            _this._wuGuanTitleArr = [_this.imgtitle2, _this.imgtitle1, _this.imgtitle0];
            _this._wuGuanNameArr = [_this.labName2, _this.labName1, _this.labName0];
            return _this;
        }
        LegionThreeKingdomsItem.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        LegionThreeKingdomsItem.prototype.show = function (legion) {
            if (!legion)
                return;
            this.imgType.source = "img_smokePet_fag" + legion.legionId + "_png";
            this.labLv.text = "LV." + legion.legionLv.toString();
            this.labCount.text = legion.legionCount.toString();
            var unionFlag = Templates.getTemplateByProperty(templates.Map.CAMPFLAG, "lv", (legion.legionLv - 1));
            if (unionFlag) {
                var str = unionFlag.properties;
                str = utils.htmlUtil.computeAttribute(str);
                var strArr = str ? str.split(";") : [];
                for (var i = 0; i < this._labArr.length; i++) {
                    if (strArr[i]) {
                        this._labArr[i].textFlow = utils.htmlUtil.showProperty(strArr[i], 2);
                    }
                    else {
                        this._labArr[i].text = "";
                    }
                }
            }
            for (var i = 0; i < this._wuGuanTitleArr.length; i++) {
                if (legion.legionData.TopThreeList[i]) {
                    this._wuGuanTitleArr[i].source = "military_json.military_title_" + legion.legionData.TopThreeList[i].Step;
                    if (legion.legionData.TopThreeList[i].PlayerName) {
                        this._wuGuanNameArr[i].text = legion.legionData.TopThreeList[i].PlayerName;
                    }
                    else {
                        this._wuGuanNameArr[i].text = Language.C_XWYD;
                    }
                }
            }
        };
        LegionThreeKingdomsItem.prototype.hide = function () {
        };
        return LegionThreeKingdomsItem;
    }(ui.LegionThreeKingdomsItemSkin));
    item.LegionThreeKingdomsItem = LegionThreeKingdomsItem;
    __reflect(LegionThreeKingdomsItem.prototype, "item.LegionThreeKingdomsItem");
})(item || (item = {}));
