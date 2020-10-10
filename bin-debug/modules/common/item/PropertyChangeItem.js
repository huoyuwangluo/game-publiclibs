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
    var PropertyChangeItem = (function (_super) {
        __extends(PropertyChangeItem, _super);
        function PropertyChangeItem() {
            return _super.call(this) || this;
        }
        PropertyChangeItem.prototype.updateData = function (currentStr, nextStr, isShow) {
            if (isShow === void 0) { isShow = true; }
            var c = currentStr.split("_");
            var v = parseInt(c[1]);
            var str = c[1];
            if (utils.htmlUtil.fixKey.indexOf(c[0]) == -1) {
                str = (v * .01).toFixed(2) + "%";
            }
            var currStr = utils.htmlUtil.getAttributeName(c[0]) + " : " + str;
            this.labProperty.text = currStr;
            var v1 = parseInt(nextStr.split("_")[1]);
            var str1 = nextStr.split("_")[1];
            if (utils.htmlUtil.fixKey.indexOf(nextStr.split("_")[0]) == -1) {
                str1 = (v1 * .01).toFixed(2) + "%";
            }
            this.imgArrow.visible = isShow;
            this.labAdd.visible = isShow;
            if (v1 == v) {
                this.labAdd.textColor = this.labProperty.textColor;
            }
            else {
                this.labAdd.textColor = TypeColor.GREEN;
            }
            this.labAdd.text = str1;
        };
        PropertyChangeItem.prototype.updateData2 = function (currentStr, nextStr, addition, fixed) {
            if (addition === void 0) { addition = 0; }
            if (fixed === void 0) { fixed = 0; }
            this.imgArrow.visible = true;
            this.labAdd.visible = true;
            if (currentStr) {
                var c = currentStr.split("_");
                this.labProperty.text = c[0] + " : " + c[1];
                this.labAdd.text = nextStr.split("_")[1];
                if (addition == -1) {
                    this.labAdd.text = nextStr.split("_")[1] + "(+" + Math.floor(fixed) + ")";
                    this.labProperty.text = c[0] + " : " + c[1] + "(+" + Math.floor(fixed) + ")";
                    return;
                }
                if (addition > 0) {
                    this.labAdd.text = nextStr.split("_")[1] + "(+" + Math.floor(addition * Number(nextStr.split("_")[1]) + fixed) + ")";
                    this.labProperty.text = c[0] + " : " + c[1] + "(+" + Math.floor(addition * Number(c[1]) + fixed) + ")";
                }
            }
            else {
                var c = nextStr.split("_");
                this.labProperty.text = c[0] + " : 0";
                this.labAdd.text = c[1];
            }
        };
        //走临时属性
        PropertyChangeItem.prototype.updateData3 = function (currentStr, nextStr, addition, fixed, wishvaule) {
            if (addition === void 0) { addition = 0; }
            if (fixed === void 0) { fixed = 0; }
            if (wishvaule === void 0) { wishvaule = 0; }
            this.imgArrow.visible = true;
            this.labAdd.visible = true;
            if (currentStr) {
                var c = currentStr.split("_");
                var str = "<font color='#34e22c'>" + "+" + Math.floor((Number(nextStr.split("_")[1]) - Number(c[1])) * 0.5 * wishvaule) + Language.C_LS + "</font>";
                this.labProperty.textFlow = utils.TextFlowMaker.htmlParser(c[0] + " : " + c[1] + (wishvaule != 0 ? str : ""));
                this.labAdd.text = nextStr.split("_")[1];
                if (addition == -1) {
                    this.labAdd.text = Math.floor(fixed) + Number(nextStr.split("_")[1]) + "";
                    this.labProperty.textFlow = utils.TextFlowMaker.htmlParser(c[0] + " : " + (Math.floor(fixed) + Number(c[1])) + (wishvaule != 0 ? str : ""));
                    return;
                }
                if (addition > 0) {
                    this.labAdd.text = Math.floor(Number(nextStr.split("_")[1]) + addition * Number(nextStr.split("_")[1]) + fixed).toString();
                    this.labProperty.textFlow = utils.TextFlowMaker.htmlParser(c[0] + " : " + Math.floor(Number(c[1]) + addition * Number(c[1]) + fixed) + (wishvaule != 0 ? str : ""));
                }
            }
            else {
                var c = nextStr.split("_");
                var str = "<font color='#34e22c'>" + "+" + Math.floor(Number(c[1]) * 0.5 * wishvaule) + Language.C_LS + "</font>";
                this.labProperty.textFlow = utils.TextFlowMaker.htmlParser(c[0] + " : 0" + (wishvaule != 0 ? str : ""));
                this.labAdd.text = c[1];
            }
        };
        PropertyChangeItem.prototype.updateData4 = function (currentStr, nextStr, addition, fixed) {
            if (addition === void 0) { addition = 0; }
            if (fixed === void 0) { fixed = 0; }
            this.imgArrow.visible = true;
            this.labAdd.visible = true;
            if (currentStr) {
                var c = currentStr.split("_");
                this.labProperty.text = c[0] + " : " + c[1];
                this.labAdd.text = nextStr.split("_")[1];
                if (addition > 0) {
                    this.labAdd.text = nextStr.split("_")[1] + "(+" + Math.floor(Number(nextStr.split("_")[1]) * fixed) + ")";
                    this.labProperty.text = c[0] + " : " + c[1] + "(+" + Math.floor(addition * Number(c[1])) + ")";
                }
                else {
                    this.labAdd.text = nextStr.split("_")[1] + "(+" + Math.floor(Number(nextStr.split("_")[1]) * fixed) + ")";
                    this.labProperty.text = c[0] + " : " + c[1];
                }
            }
            else {
                var c = nextStr.split("_");
                this.labProperty.text = c[0] + " : 0";
                if (addition > 0) {
                    this.labAdd.text = nextStr.split("_")[1] + "(+" + Math.floor(Number(nextStr.split("_")[1]) * fixed) + ")";
                }
                else {
                    this.labAdd.text = nextStr.split("_")[1] + "(+" + Math.floor(Number(nextStr.split("_")[1]) * fixed) + ")";
                }
            }
        };
        return PropertyChangeItem;
    }(ui.PropertyChangeItemSkin));
    item.PropertyChangeItem = PropertyChangeItem;
    __reflect(PropertyChangeItem.prototype, "item.PropertyChangeItem");
})(item || (item = {}));
