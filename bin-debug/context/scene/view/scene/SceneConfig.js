var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var SceneConfig = (function () {
        function SceneConfig() {
        }
        /**是否显示战斗飘字 */
        SceneConfig.BATTLE_TEXT_SHOW = true;
        /**是否显示战斗特效 */
        SceneConfig.BATTLE_EFFECT_SHOW = true;
        return SceneConfig;
    }());
    s.SceneConfig = SceneConfig;
    __reflect(SceneConfig.prototype, "s.SceneConfig");
})(s || (s = {}));
