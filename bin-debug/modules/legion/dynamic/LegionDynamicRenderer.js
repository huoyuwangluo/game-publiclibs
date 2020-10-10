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
var LegionDynamicRenderer = (function (_super) {
    __extends(LegionDynamicRenderer, _super);
    function LegionDynamicRenderer() {
        return _super.call(this) || this;
    }
    LegionDynamicRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var data = this.data;
        this.labText.textFlow = utils.TextFlowMaker.generateTextFlow(this.timetrans(data.Time) + "," + data.LogContent);
    };
    LegionDynamicRenderer.prototype.timetrans = function (date) {
        if (date.toString().length != 13) {
            date = date * 1000;
        }
        var time = new Date(date); //如果date为13位不需要乘1000
        var Y = time.getFullYear() + Language.Z_N;
        var M = (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + Language.Z_Y;
        var D = (time.getDate() < 10 ? '0' + (time.getDate()) : time.getDate()) + Language.Z_R;
        var h = (time.getHours() < 10 ? '0' + time.getHours() : time.getHours()) + Language.Z_S;
        var m = (time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()) + Language.Z_F;
        var s = (time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()) + Language.Z_M;
        return Y + M + D + h + m + s;
    };
    return LegionDynamicRenderer;
}(ui.LegionDynamicRendererSkin));
__reflect(LegionDynamicRenderer.prototype, "LegionDynamicRenderer");
