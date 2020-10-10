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
    var TitleRenderer = (function (_super) {
        __extends(TitleRenderer, _super);
        function TitleRenderer() {
            return _super.call(this) || this;
        }
        TitleRenderer.prototype.initialize = function () {
            this.boxChecked.touchEnabled = false;
        };
        TitleRenderer.prototype.reset = function () {
            // if(this._effect){
            // 	this._effect.stop();
            // 	if(this._effect.parent){
            // 		this._effect.parent.removeChild(this._effect);
            // 	}
            // 	utils.ObjectPool.to(this._effect,true);
            // 	this._effect=null;
            // }
            this.removeQuanEffect();
        };
        TitleRenderer.prototype.dataChanged = function () {
            //super.dataChanged();
            if (this.data instanceof vo.FashionVO) {
                this.update();
            }
        };
        TitleRenderer.prototype.update = function () {
            var vo = this.data;
            // if(!this._effect){
            // 	this._effect = utils.ObjectPool.from(s.AnimationSprite) as s.AnimationSprite;
            // 	this._effect.x = 140;
            // 	this._effect.y = 80;
            // }
            // this.addChild(this._effect);
            // this._effect.resId = vo.template.modelId;
            // this._effect.play();
            this.imgTitle.source = ResPath.getShowTitlePath(vo.template.modelId);
            this.boxChecked.selected = vo.isDressed;
            if (GameModels.fashion.isGuide && vo.template.modelId == GameModels.fashion.guideId)
                this.addQuanEffect();
            else
                this.removeQuanEffect();
            this.labTime.text = vo.template.duration == -1 ? Language.C_YJ : Language.C_XS + utils.DateUtil.formatTimeLeftInChinese(vo.template.duration);
            var atts = vo.template.properties.split(";");
            for (var i = 0; i < atts.length; i++) {
                var lab = this["labProperty" + i];
                var vls = atts[i].split("_");
                lab.textFlow = new egret.HtmlTextParser().parser(utils.htmlUtil.getAttributeName(vls[0]) + ':<font color="' + TypeColor.GREEN + '">' + vls[1] + '</font>');
            }
            this.labLastTime.text = "";
            this.labFight.text = vo.template.score + "";
            this.labDesc.textFlow = utils.TextFlowMaker.generateTextFlow(vo.template.des);
            if (vo.isActived) {
                this.imgDisabled.visible = false;
                if (vo.template.duration != -1) {
                    this.labLastTime.text = Language.C_SYSJ + " : " + utils.DateUtil.formatTimeLeftInChinese(vo.limitSeconds, true, true, true, false, false);
                }
            }
            else {
                this.imgDisabled.visible = true;
            }
        };
        TitleRenderer.prototype.removeQuanEffect = function () {
            if (this._effectQuan) {
                this._effectQuan.stop();
                if (this._effectQuan.parent) {
                    this._effectQuan.parent.removeChild(this._effectQuan);
                }
                utils.ObjectPool.to(this._effectQuan, true);
                this._effectQuan = null;
            }
        };
        TitleRenderer.prototype.addQuanEffect = function () {
            if (!this._effectQuan) {
                this._effectQuan = utils.ObjectPool.from(s.AnimationSprite);
                this._effectQuan.x = this.boxChecked.x + 15;
                this._effectQuan.y = this.boxChecked.y + 15;
                this._effectQuan.resId = '6149';
                this.addChild(this._effectQuan);
                this._effectQuan.play();
            }
        };
        return TitleRenderer;
    }(ui.TitleRendererSkin));
    renderer.TitleRenderer = TitleRenderer;
    __reflect(TitleRenderer.prototype, "renderer.TitleRenderer");
})(renderer || (renderer = {}));
