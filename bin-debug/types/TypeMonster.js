var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeMonster = (function () {
    function TypeMonster() {
    }
    /*怪物*/
    TypeMonster.MONSTER = 1;
    /*BOSS*/
    TypeMonster.BOSS = 9;
    return TypeMonster;
}());
__reflect(TypeMonster.prototype, "TypeMonster");
