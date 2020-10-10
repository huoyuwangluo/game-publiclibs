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
var copy;
(function (copy) {
    var GameMaterialUI = (function (_super) {
        __extends(GameMaterialUI, _super);
        function GameMaterialUI() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GameMaterialUI, "instance", {
            get: function () {
                if (!GameMaterialUI._instance) {
                    GameMaterialUI._instance = new GameMaterialUI();
                }
                return GameMaterialUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        GameMaterialUI.prototype.setMaterialShow = function (boo) {
            // if(boo){
            // 	this.ui.materialInfo.visible = true;
            // 	this.ui.materialMaiguInfo.visible = false;
            // }else{
            // 	this.ui.materialInfo.visible = false;
            // 	this.ui.materialMaiguInfo.visible = true;
            // }
        };
        return GameMaterialUI;
    }(copy.GameUIBase));
    copy.GameMaterialUI = GameMaterialUI;
    __reflect(GameMaterialUI.prototype, "copy.GameMaterialUI");
})(copy || (copy = {}));
