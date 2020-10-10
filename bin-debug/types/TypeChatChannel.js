var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeChatChannel = (function () {
    function TypeChatChannel() {
    }
    /**世界 */
    TypeChatChannel.WORLD = 1;
    /**阵营 */
    TypeChatChannel.LEGION = 2;
    /**系统 */
    TypeChatChannel.SYS = 3;
    /**综合 */
    TypeChatChannel.COLLIGATE = 4;
    /**跨服 */
    TypeChatChannel.CROSSREALM = 5;
    return TypeChatChannel;
}());
__reflect(TypeChatChannel.prototype, "TypeChatChannel");
