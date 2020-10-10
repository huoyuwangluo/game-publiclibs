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
    var kingWarMapArmyInfoRenderer = (function (_super) {
        __extends(kingWarMapArmyInfoRenderer, _super);
        function kingWarMapArmyInfoRenderer() {
            var _this = _super.call(this) || this;
            _this._petArr = [_this.head1, _this.head2, _this.head3, _this.head4, _this.head5];
            _this._imgArr = [_this.img0, _this.img1, _this.img2, _this.img3, _this.img4];
            return _this;
        }
        kingWarMapArmyInfoRenderer.prototype.clickHandler = function (e) {
            var vo = this.data;
            if (!vo)
                return;
            switch (e.currentTarget) {
                case this.btnBuzhen:
                    if (vo.isFight) {
                        mg.alertManager.tip(Language.J_DWZZDZ);
                        return;
                    }
                    mg.alertManager.showAlert(kingWarMapBuZhen, true, true, this.itemIndex + 11);
                    break;
                case this.btnHBubing:
                    if (vo.isFight) {
                        mg.alertManager.tip(Language.J_DWZZDZ);
                        return;
                    }
                    if (vo.tameBingLi >= 100) {
                        mg.alertManager.tip(Language.J_BLYMWXBB);
                        return;
                    }
                    mg.TipUpManager.instance.showTip(dialog.kingwar.kingWarMapArmyBuBing, { data: vo, index: this.itemIndex + 1 });
                    break;
            }
        };
        kingWarMapArmyInfoRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            for (var i = 0; i < this._petArr.length; i++) {
                this._petArr[i].data = null;
                this._petArr[i].visible = false;
                this._imgArr[i].visible = false;
            }
            this.imgBuDui.source = "kingwar_json.img_budui" + (this.itemIndex + 1);
            this.labState.text = "";
            this.btnBuzhen.visible = false;
            this.btnHBubing.visible = false;
            this.imgLock.visible = false;
            this.labLock.visible = false;
            this.group.visible = false;
            if (this.data) {
                var vo = this.data;
                this.group.visible = true;
                this.labBingLi.text = vo.tameBingLi + "";
                this.btnBuzhen.visible = true;
                this.btnHBubing.visible = true;
                this.btnBuzhen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnHBubing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                if (vo.isFight) {
                    this.labState.text = Language.J_ZZZ;
                }
                else {
                    if (vo.defendCityId) {
                        var cityMap = Templates.getTemplateById(templates.Map.KINGWARCITY, vo.defendCityId);
                        if (cityMap) {
                            this.labState.text = Language.getExpression(Language.E_ZSZ, cityMap.cityName);
                        }
                    }
                    else {
                        this.labState.text = Language.J_KXZ;
                    }
                }
                var isHashPet = false;
                for (var i = 0; i < vo.kingWarPetVOArr.length; i++) {
                    if (vo.kingWarPetVOArr[i].petId) {
                        this._petArr[i].visible = true;
                        this._imgArr[i].visible = false;
                        this._petArr[i].data = vo.kingWarPetVOArr[i];
                        isHashPet = true;
                    }
                    else {
                        this._petArr[i].visible = false;
                        this._imgArr[i].visible = true;
                    }
                }
                if (!isHashPet)
                    this.btnHBubing.visible = false;
            }
            else {
                this.labLock.visible = true;
                if (this.itemIndex == 1) {
                    this.labLock.text = Language.J_200JVIP2JS;
                }
                else {
                    this.labLock.text = Language.J_300JVIP3JS;
                }
                this.imgLock.visible = true;
                this.btnBuzhen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnHBubing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            }
        };
        return kingWarMapArmyInfoRenderer;
    }(ui.kingWarMapArmyInfoRendererSkin));
    renderer.kingWarMapArmyInfoRenderer = kingWarMapArmyInfoRenderer;
    __reflect(kingWarMapArmyInfoRenderer.prototype, "renderer.kingWarMapArmyInfoRenderer");
})(renderer || (renderer = {}));
