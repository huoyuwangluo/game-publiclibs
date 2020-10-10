var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var TypeGrid = (function () {
        function TypeGrid() {
        }
        TypeGrid.NONE = 0;
        TypeGrid.TILE = 1;
        TypeGrid.MASK = 2;
        TypeGrid.MONSTER = 3;
        TypeGrid.NPC = 4;
        TypeGrid.ROBOT = 5;
        TypeGrid.BORN = 6;
        return TypeGrid;
    }());
    s.TypeGrid = TypeGrid;
    __reflect(TypeGrid.prototype, "s.TypeGrid");
})(s || (s = {}));
