var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeState = (function () {
    function TypeState() {
    }
    TypeState.ATTACK = "attack";
    TypeState.MOVE_TILE = "move_tile";
    TypeState.MOVE_DIRECT = "move_direct";
    TypeState.MOVE_PATH = "move_path";
    TypeState.MOVE_FOLLOW = "move_fllow";
    TypeState.MOVE_DODGE = "move_dodge";
    TypeState.MOVE_FLASH = "move_flash";
    TypeState.MOVE_WANDER = "move_wander";
    TypeState.PICK = "pick";
    TypeState.IDEL = "idel";
    TypeState.DEAD = "dead";
    TypeState.BACK = "back";
    return TypeState;
}());
__reflect(TypeState.prototype, "TypeState");
