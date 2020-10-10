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
    var kingwar;
    (function (kingwar) {
        /**国战地图上的城 */
        var kingWarMapItem = (function (_super) {
            __extends(kingWarMapItem, _super);
            function kingWarMapItem() {
                return _super.call(this) || this;
            }
            kingWarMapItem.prototype.dataChange = function () {
                _super.prototype.dataChange.call(this);
                this.imgRedPoint.visible = false;
                this.imgJt.visible = false;
                this.imgTarget.visible = false;
                if (this.dataSource) {
                    if (this._effect) {
                        if (this._effect.parent) {
                            this._effect.parent.removeChild(this._effect);
                        }
                        this._effect.stop();
                        utils.ObjectPool.to(this._effect, true);
                        this._effect = null;
                    }
                    var vo = this.dataSource;
                    if (vo.cityTemp.type != 1 && vo.seizeRewardState != 0) {
                        this.imgRedPoint.visible = true;
                    }
                    var hashTarget = GameModels.kingwar.getCityHashTargetByID(vo.cityId);
                    if (hashTarget) {
                        this.imgJt.visible = true;
                        this.imgTarget.visible = true;
                        this.imgTarget.source = hashTarget == 1 ? "kingwar_json.img_att" : "kingwar_json.img_def";
                    }
                    this.imgName.source = "kingwarName_json.img_kingwar_name_" + vo.cityId;
                    this.imgCity.source = this.getCitySource(vo);
                    this.imgNameBg.source = "kingwar_json.img_kingwar_namebg_" + vo.country;
                    if (GameModels.kingwar.getCityIsCanAtt(vo.cityId)) {
                        this._effect = this.fromEffect("30001");
                        this._effect.y = 6;
                        this._effect.x = 80;
                        this._effect.frameRate = 6;
                        this._effect.play();
                        this.addChild(this._effect);
                    }
                }
                else {
                    this.imgName.source = null;
                    this.imgCity.source = null;
                    this.imgNameBg.source = null;
                    if (this._effect) {
                        if (this._effect.parent) {
                            this._effect.parent.removeChild(this._effect);
                        }
                        this._effect.stop();
                        utils.ObjectPool.to(this._effect, true);
                        this._effect = null;
                    }
                }
            };
            kingWarMapItem.prototype.getCitySource = function (vo) {
                this.imgName.x = 85 - 20;
                this.imgNameBg.x = 81 - 20;
                if (vo.cityTemp.pos == 0) {
                    this.imgName.x = 85;
                    this.imgNameBg.x = 81;
                    return "kingwar_json.img_kingwar_maincity_" + vo.country;
                }
                else if (vo.cityTemp.pos == 1 || vo.cityTemp.pos == 2) {
                    return "kingwar_json.img_kingwar_city_l_" + vo.country;
                }
                else if (vo.cityTemp.pos == 3 || vo.cityTemp.pos == 3) {
                    return "kingwar_json.img_kingwar_city_c_" + vo.country;
                }
                else {
                    return "kingwar_json.img_kingwar_city_h_" + vo.country;
                }
            };
            return kingWarMapItem;
        }(ui.kingWarMapItemSkin));
        kingwar.kingWarMapItem = kingWarMapItem;
        __reflect(kingWarMapItem.prototype, "dialog.kingwar.kingWarMapItem");
    })(kingwar = dialog.kingwar || (dialog.kingwar = {}));
})(dialog || (dialog = {}));
