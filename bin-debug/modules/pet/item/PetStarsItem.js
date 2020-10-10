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
    var PetStarsItem = (function (_super) {
        __extends(PetStarsItem, _super);
        function PetStarsItem() {
            return _super.call(this) || this;
        }
        PetStarsItem.prototype.updataStar = function (pos, star) {
            this._starS = [this.star_0, this.star_1, this.star_2, this.star_3, this.star_4];
            if (star == 11) {
                this.star_0.source = "tujian_json.img_tujianStars2";
                this.star_1.source = "tujian_json.img_tujianStars1";
                this.star_2.source = "tujian_json.img_tujianStars1";
                this.star_3.source = "tujian_json.img_tujianStars1";
                this.star_4.source = "tujian_json.img_tujianStars1";
                return;
            }
            if (star == 12) {
                this.star_0.source = "tujian_json.img_tujianStars2";
                this.star_1.source = "tujian_json.img_tujianStars2";
                this.star_2.source = "tujian_json.img_tujianStars1";
                this.star_3.source = "tujian_json.img_tujianStars1";
                this.star_4.source = "tujian_json.img_tujianStars1";
                return;
            }
            if (star == 13) {
                this.star_0.source = "tujian_json.img_tujianStars2";
                this.star_1.source = "tujian_json.img_tujianStars2";
                this.star_2.source = "tujian_json.img_tujianStars2";
                this.star_3.source = "tujian_json.img_tujianStars1";
                this.star_4.source = "tujian_json.img_tujianStars1";
                return;
            }
            if (pos == 1)
                this._starS = [this.star_4, this.star_3, this.star_2, this.star_1, this.star_0];
            if (star == 0) {
                this.star_0.visible = this.star_1.visible = this.star_2.visible = this.star_3.visible = this.star_4.visible = false;
                pos == 1 ? this.star_4.visible = true : this.star_0.visible = true;
                pos == 1 ? this.star_4.filters = utils.filterUtil.grayFilters : this.star_0.filters = utils.filterUtil.grayFilters;
                return;
            }
            this.star_0.filters = null;
            this.star_4.filters = null;
            if (star <= 5) {
                for (var i = 0; i < this._starS.length; i++) {
                    this._starS[i].source = "tujian_json.img_tujianStars";
                    this._starS[i].visible = star > i;
                }
            }
            else {
                this._starS = [this.star_0, this.star_1, this.star_2, this.star_3, this.star_4];
                for (var i = 0; i < this._starS.length; i++) {
                    this._starS[i].visible = true;
                    if (star - 5 > i) {
                        this._starS[i].source = "tujian_json.img_tujianStars1";
                    }
                    else {
                        this._starS[i].source = "tujian_json.img_tujianStars";
                    }
                }
            }
        };
        return PetStarsItem;
    }(ui.PetStarsItemSkin));
    item.PetStarsItem = PetStarsItem;
    __reflect(PetStarsItem.prototype, "item.PetStarsItem");
})(item || (item = {}));
