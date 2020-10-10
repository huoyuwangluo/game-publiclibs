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
    var kingWarSamllMap = (function (_super) {
        __extends(kingWarSamllMap, _super);
        function kingWarSamllMap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        kingWarSamllMap.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this._imgArr = [];
        };
        kingWarSamllMap.prototype.updataView = function () {
            var kingWarCityVo = GameModels.kingwar.kingWarCityVOArr;
            for (var i = 0; i < kingWarCityVo.length; i++) {
                var img = new eui.Image();
                img.x = parseInt(kingWarCityVo[i].cityTemp.cityPos.split(";")[0]) * 0.15;
                img.y = parseInt(kingWarCityVo[i].cityTemp.cityPos.split(";")[1]) * 0.15;
                img.validateNow();
                img.anchorOffsetX = img.anchorOffsetY = 10;
                if (kingWarCityVo[i].cityTemp.type == 1) {
                    img.source = "kingwar_json.img_kingwar_maincity_samll_" + kingWarCityVo[i].country;
                }
                else {
                    img.source = "kingwar_json.img_kingwar_city_samll_" + kingWarCityVo[i].country;
                }
                this.addChild(img);
                this._imgArr.push(img);
            }
        };
        kingWarSamllMap.prototype.cleanView = function () {
            for (var i = 0; i < this._imgArr.length; i++) {
                if (this._imgArr[i]) {
                    this.removeChild(this._imgArr[i]);
                    this._imgArr[i] = null;
                }
            }
            this._imgArr = [];
        };
        return kingWarSamllMap;
    }(ui.kingWarSamllMapSkin));
    item.kingWarSamllMap = kingWarSamllMap;
    __reflect(kingWarSamllMap.prototype, "item.kingWarSamllMap");
})(item || (item = {}));
