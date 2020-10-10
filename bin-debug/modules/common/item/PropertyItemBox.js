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
    var PropertyItemBox = (function (_super) {
        __extends(PropertyItemBox, _super);
        function PropertyItemBox() {
            return _super.call(this) || this;
        }
        PropertyItemBox.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.items = [];
            this.items.push(this.item0);
            this._rowCount = 1;
        };
        Object.defineProperty(PropertyItemBox.prototype, "rowCount", {
            set: function (value) {
                this._rowCount = value;
                this._rowCount == 2 ? this.items[0].width = 227 : this.items[0].width = 341;
                this._rowCount == 2 ? this.items[0].currentState = "state2" : this.items[0].currentState = "state1";
            },
            enumerable: true,
            configurable: true
        });
        //iszhanqi：是否战骑界面来的，要走有临时的计算属性。_addx:箭头和下一阶的位置往后移的位置距离
        PropertyItemBox.prototype.updateTemplate = function (tmp, nextTmp, addition, fixed, value, iszhanqi, _addx, isJinJIe) {
            if (addition === void 0) { addition = 0; }
            if (fixed === void 0) { fixed = []; }
            if (value === void 0) { value = 0; }
            if (iszhanqi === void 0) { iszhanqi = false; }
            if (_addx === void 0) { _addx = 0; }
            if (isJinJIe === void 0) { isJinJIe = false; }
            var c = utils.htmlUtil.getTemplateToAtts(tmp);
            var n = null;
            var len = c.length;
            if (nextTmp) {
                n = utils.htmlUtil.getTemplateToAtts(nextTmp);
                len = n.length;
            }
            else {
                n = c;
            }
            var i = 0;
            //设置第一排的位置信息。
            this.item0.imgArrow.x = 245;
            this.item0.imgArrow.x = this.item0.imgArrow.x + _addx;
            this.item0.labAdd.x = this.item0.imgArrow.x + 20;
            for (i; i < len; i++) {
                var item1 = this.items[i];
                if (!item1) {
                    item1 = new item.PropertyChangeItem();
                    item1.imgArrow.x = this.item0.imgArrow.x;
                    item1.labAdd.x = this.item0.labAdd.x;
                    this.items[i] = item1;
                    this.addChild(item1);
                }
                var row = (i) / this._rowCount >> 0;
                var ci = i % this._rowCount;
                var fixedAdd = fixed[i] ? fixed[i] : 0;
                item1.y = row * 30;
                item1.x = 0;
                var posx = ci * this.item0.width;
                item1.x = (i % 2 == 0 && this._rowCount == 2) ? posx - 30 : posx + 30;
                if (iszhanqi) {
                    //value是相关系数，如果要走临时属性的走这里
                    item1.updateData3(c[i], n[i], addition, fixedAdd, value);
                }
                else {
                    if (isJinJIe) {
                        item1.updateData4(c[i], n[i], addition, fixedAdd);
                    }
                    else {
                        item1.updateData2(c[i], n[i], addition, fixedAdd);
                    }
                }
            }
            for (var j = this.items.length; j > i; --j) {
                this.removeChild(this.items.pop());
            }
        };
        PropertyItemBox.prototype.updateAtts = function (current, next, height, isShow) {
            if (height === void 0) { height = 30; }
            if (isShow === void 0) { isShow = true; }
            if (current == null) {
                while (this.items.length) {
                    this.removeChild(this.items.pop());
                }
                return;
            }
            var c = current.split(";");
            var n = null;
            var len = c.length;
            if (next) {
                n = next.split(";");
                len = n.length;
            }
            else {
                n = c;
            }
            var i = 0;
            for (i; i < len; i++) {
                var item1 = this.items[i];
                if (!item1) {
                    item1 = new item.PropertyChangeItem();
                    this._rowCount == 2 ? item1.currentState = "state2" : item1.currentState = "state1";
                    item1.imgArrow.x = this.item0.imgArrow.x;
                    this.items[i] = item1;
                    this.addChild(item1);
                }
                var row = (i) / this._rowCount >> 0;
                var ci = i % this._rowCount;
                item1.y = row * height;
                var posx = ci * this.item0.width;
                item1.x = 0;
                item1.x = (i % 2 == 0 && this._rowCount == 2) ? posx - 10 : posx + 10;
                item1.updateData(c[i], n[i], isShow);
            }
            for (var j = this.items.length; j > i; --j) {
                this.removeChild(this.items.pop());
            }
            this.invalidateProperties();
        };
        PropertyItemBox.prototype.updateAttsByLv = function (current, next, lv, system) {
            if (lv === void 0) { lv = 0; }
            if (system === void 0) { system = ""; }
            if (current == null) {
                while (this.items.length) {
                    this.removeChild(this.items.pop());
                }
                return;
            }
            var cText = "";
            var NText = "";
            var cArr = current.split(";");
            for (var j = 0; j < cArr.length; j++) {
                var cArr1 = cArr[j].split("_");
                if (cText != "") {
                    cText = cText + ";" + cArr1[0] + "_" + (parseInt(cArr1[1]) * lv);
                    NText = NText + ";" + cArr1[0] + "_" + (parseInt(cArr1[1]) * (lv + 1));
                }
                else {
                    cText = cArr1[0] + "_" + (parseInt(cArr1[1]) * lv);
                    NText = cArr1[0] + "_" + (parseInt(cArr1[1]) * (lv + 1));
                }
            }
            current = cText;
            next = NText;
            var c = current.split(";");
            var n = null;
            var len = c.length;
            if (next) {
                n = next.split(";");
                len = n.length;
            }
            else {
                n = c;
            }
            var i = 0;
            for (i; i < len; i++) {
                var item1 = this.items[i];
                if (!item1) {
                    item1 = new item.PropertyChangeItem();
                    this._rowCount == 2 ? item1.currentState = "state2" : item1.currentState = "state1";
                    item1.imgArrow.x = this.item0.imgArrow.x;
                    this.items[i] = item1;
                    this.addChild(item1);
                }
                var row = (i) / this._rowCount >> 0;
                var ci = i % this._rowCount;
                item1.y = row * 30;
                var posx = ci * this.item0.width;
                item1.x = 0;
                item1.x = (i % 2 == 0 && this._rowCount == 2) ? posx - 30 : posx + 30;
                item1.updateData(c[i], n[i]);
            }
            for (var j_1 = this.items.length; j_1 > i; --j_1) {
                this.removeChild(this.items.pop());
            }
            this.invalidateProperties();
        };
        PropertyItemBox.prototype.propertyUpEffectPlay = function (offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 160; }
            if (offsetY === void 0) { offsetY = 3; }
            if (this.items && this.items.length > 0) {
                for (var i = 0; i < this.items.length; i++) {
                    mg.remindUpManager.show(this.items[i], "6311", false, true, offsetX, offsetY);
                }
            }
        };
        PropertyItemBox.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
        };
        return PropertyItemBox;
    }(ui.PropertyItemBoxSkin));
    item.PropertyItemBox = PropertyItemBox;
    __reflect(PropertyItemBox.prototype, "item.PropertyItemBox");
})(item || (item = {}));
