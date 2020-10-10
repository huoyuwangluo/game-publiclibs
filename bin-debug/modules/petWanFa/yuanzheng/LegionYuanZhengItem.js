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
    var LegionYuanZhengItem = (function (_super) {
        __extends(LegionYuanZhengItem, _super);
        function LegionYuanZhengItem() {
            return _super.call(this) || this;
        }
        LegionYuanZhengItem.prototype.initView = function (index) {
            this.labChapter.text = index + "";
        };
        LegionYuanZhengItem.prototype.updataData = function () {
            this.imgSelecd.visible = false;
            this.imgLock.visible = false;
            this.imgBox.visible = false;
            if (this._dataSource) {
                var data = this._dataSource;
                if (data.type == 81 || data.type == 82 || data.type == 83) {
                    if (data.type == 81) {
                        this.imgBg.source = "yuanzheng_json.img_yuanzheng_dizuo1_1";
                        this.imgSelecd.source = "yuanzheng_json.img_yuanzheng_dizuo_1";
                    }
                    else if (data.type == 82) {
                        this.imgBg.source = "yuanzheng_json.img_yuanzheng_dizuo2_1";
                        this.imgSelecd.source = "yuanzheng_json.img_yuanzheng_dizuo_2";
                    }
                    else {
                        this.imgBg.source = "yuanzheng_json.img_yuanzheng_dizuo3_1";
                        this.imgSelecd.source = "yuanzheng_json.img_yuanzheng_dizuo_3";
                    }
                    var currStep = GameModels.shilita.currStep[GameModels.shilita.currIndex - 1] + 1;
                    this.labChapter.text = data.template.step + "";
                    if (data.template.step > currStep) {
                        this.imgLock.visible = true;
                        if (data.template.step % 5 == 0) {
                            this.imgLock.visible = false;
                            this.imgBox.visible = true;
                            this.imgBox.source = "exploreBox_json.img_wood_box_close";
                        }
                        this.filters = utils.filterUtil.grayFilters;
                    }
                    else if (data.template.step < currStep) {
                        if (data.template.step % 5 == 0) {
                            this.imgBox.visible = true;
                            this.imgBox.source = "exploreBox_json.img_wood_box_open";
                        }
                        this.filters = null;
                    }
                    else {
                        this.imgSelecd.visible = true;
                        this.filters = null;
                    }
                }
                else {
                    this.imgBg.source = "yuanzheng_json.img_yuanzheng_dizuo1";
                    this.imgSelecd.source = "yuanzheng_json.img_yuanzheng_dizuo";
                    if (data.template.step > GameModels.legion.currStep) {
                        this.imgLock.visible = true;
                        if (data.template.step % 5 == 0) {
                            this.imgLock.visible = false;
                            this.imgBox.visible = true;
                            this.imgBox.source = "exploreBox_json.img_wood_box_close";
                        }
                        if (data.template.step == GameModels.legion.startStep + 19) {
                            this.imgBox.source = "exploreBox_json.img_gold_box_close";
                        }
                        this.filters = utils.filterUtil.grayFilters;
                    }
                    else if (data.template.step < GameModels.legion.currStep) {
                        if (data.template.step % 5 == 0) {
                            this.imgBox.visible = true;
                            this.imgBox.source = "exploreBox_json.img_wood_box_open";
                        }
                        if (data.template.step == GameModels.legion.startStep + 19) {
                            this.imgBox.source = "exploreBox_json.img_gold_box_open";
                        }
                        this.filters = null;
                    }
                    else {
                        this.imgSelecd.visible = true;
                        this.filters = null;
                    }
                }
            }
        };
        LegionYuanZhengItem.prototype.dataChange = function () {
            _super.prototype.dataChange.call(this);
            this.updataData();
        };
        return LegionYuanZhengItem;
    }(ui.LegionYuanZhengItemSkin));
    item.LegionYuanZhengItem = LegionYuanZhengItem;
    __reflect(LegionYuanZhengItem.prototype, "item.LegionYuanZhengItem");
})(item || (item = {}));
