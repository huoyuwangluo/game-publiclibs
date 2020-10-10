var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeActor = (function () {
    function TypeActor() {
    }
    TypeActor.isSkillTarget = function (type) {
        if (type == TypeActor.PLAYER || type == TypeActor.PET || type == TypeActor.MONSTER || type == TypeActor.MONSTERELITE || type == TypeActor.BOSS || type == TypeActor.ROBOT) {
            return true;
        }
        return false;
    };
    TypeActor.isPlayerOrPet = function (type) {
        return (type == TypeActor.PLAYER || type == TypeActor.PET || type == TypeActor.ROBOT);
    };
    TypeActor.isMonster = function (type) {
        return (type == TypeActor.MONSTER || type == TypeActor.BOSS);
    };
    TypeActor.MONSTER = 1;
    TypeActor.MONSTERELITE = 2;
    TypeActor.BOSS = 3;
    TypeActor.NPC = 11;
    TypeActor.NPCSUPPORT = 12;
    TypeActor.PLAYER = 21;
    TypeActor.PET = 22;
    TypeActor.ROBOT = 23;
    TypeActor.DROP = 31;
    TypeActor.BOX = 32;
    return TypeActor;
}());
__reflect(TypeActor.prototype, "TypeActor");
