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
    var BingFaListRenderer = (function (_super) {
        __extends(BingFaListRenderer, _super);
        function BingFaListRenderer() {
            return _super.call(this) || this;
        }
        BingFaListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var item = this.data;
                this.imgQuila.source = ResPath.getQuality(item.quality);
                this.imgIcon.source = item.icon;
                this.labName.text = item.name;
                this.labName.textColor = TypeQuality.getQualityColor(item.quality);
                this.labAtts1.text = item.baseBingFaProp[0] ? TypeProperty.getChineseByPropertyValue(item.baseBingFaProp[0].strText) : "";
                this.labAtts2.text = item.specialBingFaProp[0] ? TypeProperty.getChineseByPropertyValue(item.specialBingFaProp[0].strText) : "";
                this.labAtts3.text = item.specialBingFaProp[1] ? TypeProperty.getChineseByPropertyValue(item.specialBingFaProp[1].strText) : "";
                this.labDes3.visible = item.bingFaSkillList[0] ? true : false;
                this.labDes4.visible = item.bingFaSkillList[1] ? true : false;
                this.labDes1.textFlow = item.bingFaSkillList[0] ? utils.htmlUtil.getUnderlineFormat("[" + item.bingFaSkillList[0].name + "]") : [];
                this.labDes2.textFlow = item.bingFaSkillList[1] ? utils.htmlUtil.getUnderlineFormat("[" + item.bingFaSkillList[1].name + "]") : [];
                this.labDes1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabClick, this);
                this.labDes2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabClick, this);
            }
        };
        BingFaListRenderer.prototype.onLabClick = function (e) {
            if (e.currentTarget == this.labDes1) {
                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this.data.bingFaSkillList[0]);
            }
            else {
                mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this.data.bingFaSkillList[1]);
            }
        };
        return BingFaListRenderer;
    }(ui.BingFaListRendererSkin));
    renderer.BingFaListRenderer = BingFaListRenderer;
    __reflect(BingFaListRenderer.prototype, "renderer.BingFaListRenderer");
})(renderer || (renderer = {}));
