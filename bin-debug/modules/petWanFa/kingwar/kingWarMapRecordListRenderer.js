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
var renderer;
(function (renderer) {
    var kingWarMapRecordListRenderer = (function (_super) {
        __extends(kingWarMapRecordListRenderer, _super);
        function kingWarMapRecordListRenderer() {
            return _super.call(this) || this;
        }
        kingWarMapRecordListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var record = this.data;
                var temp = Templates.getTemplateByProperty(templates.Map.KINGWARRECORD, "type", record.Type);
                var e = temp.des;
                this.labTime.text = utils.DateUtil.formatDateFromSeconds(record.Time);
                var parmsArr = record.Params.split(";");
                // for (var i = 0; i < parmsArr.length; i++) {
                // 	var str: string = Language.getExpression(temp.des, parmsArr[i]);
                // }
                for (var i = 0; i < parmsArr.length; i++) {
                    var arg = parmsArr[i];
                    e = e.replace("{" + (i + 1) + "}", arg);
                }
                this.labContent.textFlow = utils.TextFlowMaker.generateTextFlow(e);
            }
        };
        return kingWarMapRecordListRenderer;
    }(ui.kingWarMapRecordListRendererSkin));
    renderer.kingWarMapRecordListRenderer = kingWarMapRecordListRenderer;
    __reflect(kingWarMapRecordListRenderer.prototype, "renderer.kingWarMapRecordListRenderer");
})(renderer || (renderer = {}));
