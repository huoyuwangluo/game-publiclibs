var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypePop = (function () {
    function TypePop() {
    }
    /**顶层界面*/
    //public static TOP: number = 4;
    TypePop.isPopOrFloat = function (type) {
        return type == TypePop.POP || type == TypePop.FLOAT;
    };
    TypePop.isPop = function (type) {
        return type == TypePop.POP;
    };
    TypePop.getLayer = function (type) {
        switch (type) {
            case TypePop.FIX: return mg.layerManager.mainUI;
        }
        return mg.layerManager.dialog;
    };
    ////////////mainUi////////////
    /**固定UI*/
    TypePop.FIX = 1;
    ////////////dialog//////////
    /**弹出界面*/
    TypePop.POP = 2;
    /**浮动界面*/
    TypePop.FLOAT = 3;
    return TypePop;
}());
__reflect(TypePop.prototype, "TypePop");
