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
var main;
(function (main) {
    var ChapterBossMainMap = (function (_super) {
        __extends(ChapterBossMainMap, _super);
        function ChapterBossMainMap() {
            return _super.call(this) || this;
        }
        ChapterBossMainMap.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._maxLen = 0;
            this._cityIcon = [this.item1, this.item2, this.item3, this.item4, this.item5, this.item6, this.item7,
                this.item8, this.item9, this.item10];
        };
        ChapterBossMainMap.prototype.enter = function () {
            this.exit();
            var posY = 0;
            var currMainMap = GameModels.chapter.mainMapTemplate;
            var currMainCityT = GameModels.chapter.mainCityTemplate;
            this.imgBg.source = "img_mianMap_" + currMainMap.id + "_jpg";
            var strRes = currMainCityT.resource.split(";");
            var strCharpter = currMainCityT.chapter.split(";");
            this._maxLen = strRes.length > 10 ? 10 : strRes.length;
            for (var i = 0; i < this._maxLen; i++) {
                //var city: templates.mainCity = Templates.getTemplateById(templates.Map.MAINCITY, i);
                //var item: mainMap.ChapterBossMainMapItem = new mainMap.ChapterBossMainMapItem();
                // item.anchorOffsetX = 87.5;
                // item.anchorOffsetY = 200;
                // item.x = parseInt(city.cityPos.split("_")[0]);
                // item.y = parseInt(city.cityPos.split("_")[1]);
                //this.addChild(item);
                this._cityIcon[i].dataSource = { id: strCharpter[i], resource: strRes[i] };
                this._cityIcon[i].visible = true;
            }
        };
        ChapterBossMainMap.prototype.exit = function () {
            this._maxLen = 0;
            for (var i = 0; i < this._cityIcon.length; i++) {
                this._cityIcon[i].dataSource = null;
                this._cityIcon[i].visible = false;
            }
        };
        Object.defineProperty(ChapterBossMainMap.prototype, "randomBuyAllCity", {
            // public showUpOrDownMap(mapTemp: templates.mainMap): void {
            //     for (var item of this._cityIcon) {
            //         if (item) {
            //             item.dataSource = null;
            //             this.removeChild(item);
            //         }
            //     }
            //     this._cityIcon = [];
            //     var currMainMap: templates.mainMap = GameModels.chapter.mainMapTemplate;
            //     this.imgBg.source = "img_mianMap_" + mapTemp.map + "_jpg"
            //     this.height = mapTemp.mapHight;
            //     for (var i = mapTemp.cityStart; i <= mapTemp.cityEnd; i++) {
            //         var city: templates.mainCity = Templates.getTemplateById(templates.Map.MAINCITY, i);
            //         var item: mainMap.ChapterBossMainMapItem = new mainMap.ChapterBossMainMapItem();
            //         item.anchorOffsetX = 87.5;
            //         item.anchorOffsetY = 200;
            //         item.x = parseInt(city.cityPos.split("_")[0]);
            //         item.y = parseInt(city.cityPos.split("_")[1]);
            //         this.addChild(item);
            //         item.dataSource = city;
            //         this._cityIcon.push(item);
            //     }
            // }
            // public get oneCity(): mainMap.ChapterBossMainMapItem {
            //     return this._cityIcon[0];
            // }
            get: function () {
                if (this._maxLen <= 0)
                    return null;
                var num = Math.floor(Math.random() * (this._maxLen - 1));
                return this._cityIcon[num];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChapterBossMainMap.prototype, "randomBuyPassCity", {
            get: function () {
                if (this._maxLen <= 0)
                    return null;
                var view = [];
                for (var i = 0; i < this._maxLen; i++) {
                    if (this._cityIcon[i] && this._cityIcon[i].dataSource && this._cityIcon[i].dataSource.id <= GameModels.chapter.totalChapter) {
                        view.push(this._cityIcon[i]);
                    }
                }
                if (view.length <= 0)
                    return null;
                var num = Math.floor(Math.random() * (view.length - 1));
                return view[num];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ChapterBossMainMap.prototype, "currCity", {
            get: function () {
                if (this._maxLen <= 0)
                    return null;
                for (var i = 0; i < this._maxLen; i++) {
                    if (this._cityIcon[i] && this._cityIcon[i].dataSource && this._cityIcon[i].dataSource.id == GameModels.chapter.totalChapter) {
                        return this._cityIcon[i];
                    }
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return ChapterBossMainMap;
    }(ui.ChapterBossMainMapSkin));
    main.ChapterBossMainMap = ChapterBossMainMap;
    __reflect(ChapterBossMainMap.prototype, "main.ChapterBossMainMap");
})(main || (main = {}));
