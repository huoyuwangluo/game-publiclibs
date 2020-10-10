var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeMineState = (function () {
    function TypeMineState() {
    }
    TypeMineState.getState = function (key) {
        var dectionary = { "0": TypeMineState.READYMINE, "1": TypeMineState.MAKINGMINE, "2": TypeMineState.ALREADYMINE };
        return dectionary[key];
    };
    //准备挖矿
    TypeMineState.READYMINE = "readyMine";
    //正在挖矿
    TypeMineState.MAKINGMINE = "makingMine";
    //完成挖矿
    TypeMineState.ALREADYMINE = "aleadyMine";
    return TypeMineState;
}());
__reflect(TypeMineState.prototype, "TypeMineState");
