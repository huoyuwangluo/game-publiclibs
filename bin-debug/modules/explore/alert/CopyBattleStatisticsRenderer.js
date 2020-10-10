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
    var CopyBattleStatisticsRenderer = (function (_super) {
        __extends(CopyBattleStatisticsRenderer, _super);
        function CopyBattleStatisticsRenderer() {
            return _super.call(this) || this;
        }
        CopyBattleStatisticsRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var selfData = this.data.selfData;
                var otherData = this.data.otherData;
                this.head1.expProgress.visible = false;
                this.head2.expProgress.visible = false;
                this.head1.imgDeal.visible = false;
                this.head2.imgDeal.visible = false;
                this.head1.labLv.text = "";
                this.head2.labLv.text = "";
                this.head1.labName.text = "";
                this.head2.labName.text = "";
                this.head1.imgStar.visible = false;
                this.head2.imgStar.visible = false;
                this.head1.imgWarn.visible = false;
                this.head2.imgWarn.visible = false;
                this.head1.imgQuality.visible = false;
                this.head1.imgHead.visible = false;
                this.head2.imgQuality.visible = false;
                this.head2.imgHead.visible = false;
                this.labCount1.text = "";
                this.labCount2.text = "";
                this.imgMax1.visible = false;
                this.imgMax2.visible = false;
                this.expProgress1.noTweenValue = 0;
                this.expProgress2.noTweenValue = 0;
                if (selfData) {
                    if (this.data.index == 0)
                        this.imgMax1.visible = true;
                    if (this.data.type == 0) {
                        this.labCount1.text = "" + selfData.dmg;
                        if (this.data.max) {
                            this.expProgress1.noTweenValue = selfData.dmg / this.data.max;
                        }
                    }
                    else if (this.data.type == 1) {
                        this.labCount1.text = "" + selfData.hurt;
                        if (this.data.max) {
                            this.expProgress1.noTweenValue = selfData.hurt / this.data.max;
                        }
                    }
                    else {
                        this.labCount1.text = "" + selfData.heal;
                        if (this.data.max) {
                            this.expProgress1.noTweenValue = selfData.heal / this.data.max;
                        }
                    }
                    this.head1.imgQuality.visible = true;
                    this.head1.imgHead.visible = true;
                    this.head1.imgQuality.source = ResPath.getPetQualityByStar(selfData.petStar, GameModels.pet.isHashFourSkill(selfData.petId));
                    this.head1.imgHead.source = ResPath.getItemIconKey(selfData.petId.toString());
                }
                if (otherData) {
                    if (this.data.index == 0)
                        this.imgMax2.visible = true;
                    if (this.data.type == 0) {
                        this.labCount2.text = "" + otherData.dmg;
                        if (this.data.max) {
                            this.expProgress2.noTweenValue = otherData.dmg / this.data.max;
                        }
                    }
                    else if (this.data.type == 1) {
                        this.labCount2.text = "" + otherData.hurt;
                        if (this.data.max) {
                            this.expProgress2.noTweenValue = otherData.hurt / this.data.max;
                        }
                    }
                    else {
                        this.labCount2.text = "" + otherData.heal;
                        if (this.data.max) {
                            this.expProgress2.noTweenValue = otherData.heal / this.data.max;
                        }
                    }
                    this.head2.imgQuality.visible = true;
                    this.head2.imgHead.visible = true;
                    this.head2.imgQuality.source = ResPath.getPetQualityByStar(otherData.petStar, GameModels.pet.isHashFourSkill(otherData.petId));
                    this.head2.imgHead.source = ResPath.getItemIconKey(otherData.petId.toString());
                }
            }
        };
        return CopyBattleStatisticsRenderer;
    }(ui.CopyBattleStatisticsRendererSkin));
    renderer.CopyBattleStatisticsRenderer = CopyBattleStatisticsRenderer;
    __reflect(CopyBattleStatisticsRenderer.prototype, "renderer.CopyBattleStatisticsRenderer");
})(renderer || (renderer = {}));
