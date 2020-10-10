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
var dialog;
(function (dialog) {
    var smithy;
    (function (smithy) {
        var SmithyTalentDialog = (function (_super) {
            __extends(SmithyTalentDialog, _super);
            function SmithyTalentDialog() {
                return _super.call(this) || this;
            }
            SmithyTalentDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._imgIcon = [];
                this._smithyTalentArr = [];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this._lineCentre = Templates.getTemplatesByProperty(templates.Map.SMITHYTALENT, "pos", 2);
                this._lineLeft = Templates.getTemplatesByProperty(templates.Map.SMITHYTALENT, "pos", 1);
                this._lineRight = Templates.getTemplatesByProperty(templates.Map.SMITHYTALENT, "pos", 3);
            };
            SmithyTalentDialog.prototype.enter = function (data) {
                this.showView();
                GameModels.smithy.addEventListener(mo.ModelSmithy.UPDATA_SMITHY_INFO, this.showView, this);
            };
            SmithyTalentDialog.prototype.exit = function () {
                for (var i = 0; i < this._imgIcon.length; i++) {
                    if (this._imgIcon[i])
                        this._imgIcon[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                this._imgIcon = [];
                this._smithyTalentArr = [];
                this.group.removeChildren();
                GameModels.smithy.removeEventListener(mo.ModelSmithy.UPDATA_SMITHY_INFO, this.showView, this);
            };
            SmithyTalentDialog.prototype.showView = function () {
                this._imgIcon = [];
                this._smithyTalentArr = [];
                this.group.removeChildren();
                this.labCount.text = "" + GameModels.smithy.talentPoint;
                var imgLeft = new eui.Image("exploreShenBing_json.img_exploreShenBingLine2");
                if (GameModels.smithy.hashTalentById(this._lineCentre[0].id) && GameModels.smithy.hashTalentById(this._lineLeft[0].id)) {
                    imgLeft.source = "exploreShenBing_json.img_exploreShenBingLine1";
                }
                imgLeft.width = 20;
                imgLeft.height = 130;
                imgLeft.anchorOffsetX = imgLeft.width / 2;
                imgLeft.anchorOffsetY = imgLeft.height / 2;
                imgLeft.rotation = 65;
                imgLeft.x = 200;
                imgLeft.y = 110;
                this.group.addChild(imgLeft);
                var imgRight = new eui.Image("exploreShenBing_json.img_exploreShenBingLine2");
                if (GameModels.smithy.hashTalentById(this._lineCentre[0].id) && GameModels.smithy.hashTalentById(this._lineRight[0].id)) {
                    imgRight.source = "exploreShenBing_json.img_exploreShenBingLine1";
                }
                imgRight.width = 20;
                imgRight.height = 130;
                imgRight.anchorOffsetX = imgRight.width / 2;
                imgRight.anchorOffsetY = imgRight.height / 2;
                imgRight.rotation = 115;
                imgRight.x = 380;
                imgRight.y = 110;
                this.group.addChild(imgRight);
                for (var i = 0; i < this._lineCentre.length; i++) {
                    var imgTalentIcon = new eui.Image("exploreShenBing_json.img_exploreShenBingTalent2");
                    imgTalentIcon.width = 120;
                    imgTalentIcon.height = 116;
                    imgTalentIcon.x = this.scroller.width / 2 - imgTalentIcon.width / 2;
                    imgTalentIcon.y = i * 200;
                    imgTalentIcon.filters = GameModels.smithy.hashTalentById(this._lineCentre[i].id) ? null : utils.filterUtil.grayFilters;
                    if (i != 0) {
                        var imgTalentLine = new eui.Image("exploreShenBing_json.img_exploreShenBingLine2");
                        if (GameModels.smithy.hashTalentById(this._lineCentre[i].id) && GameModels.smithy.hashTalentById(this._lineCentre[i].prevId)) {
                            imgTalentLine.source = "exploreShenBing_json.img_exploreShenBingLine1";
                        }
                        imgTalentLine.width = 20;
                        imgTalentLine.height = 105;
                        imgTalentLine.x = this.scroller.width / 2 - imgTalentLine.width / 2;
                        imgTalentLine.y = imgTalentIcon.y - 90;
                        this.group.addChild(imgTalentLine);
                    }
                    this._imgIcon.push(imgTalentIcon);
                    this._smithyTalentArr.push(this._lineCentre[i]);
                    this.group.addChild(imgTalentIcon);
                    if (GameModels.smithy.hashTalentById(this._lineCentre[i].prevId)) {
                        var point = new eui.Image("exploreShenBing_json.img_exploreShenBingGreeBg");
                        point.x = this.scroller.width / 2 - imgTalentIcon.width / 2 + 70;
                        point.y = 20 + i * 200;
                        var lab = new eui.Label();
                        lab.size = 20;
                        lab.text = "" + this._lineCentre[i].needNum;
                        lab.x = this.scroller.width / 2 - imgTalentIcon.width / 2 + 88;
                        lab.y = 30 + i * 200;
                        point.touchEnabled = false;
                        lab.touchEnabled = false;
                        this.group.addChild(point);
                        this.group.addChild(lab);
                    }
                }
                for (var i = 0; i < this._lineLeft.length; i++) {
                    var imgTalentIcon = new eui.Image("exploreShenBing_json.img_exploreShenBingTalent1");
                    imgTalentIcon.width = 120;
                    imgTalentIcon.height = 116;
                    imgTalentIcon.x = (this.scroller.width / 2 - 200) - imgTalentIcon.width / 2;
                    imgTalentIcon.y = 80 + i * 200;
                    imgTalentIcon.filters = GameModels.smithy.hashTalentById(this._lineLeft[i].id) ? null : utils.filterUtil.grayFilters;
                    if (i != 0) {
                        var imgTalentLine = new eui.Image("exploreShenBing_json.img_exploreShenBingLine2");
                        if (GameModels.smithy.hashTalentById(this._lineLeft[i].id) && GameModels.smithy.hashTalentById(this._lineLeft[i].prevId)) {
                            imgTalentLine.source = "exploreShenBing_json.img_exploreShenBingLine1";
                        }
                        imgTalentLine.width = 20;
                        imgTalentLine.height = 105;
                        imgTalentLine.x = (this.scroller.width / 2 - 200) - imgTalentLine.width / 2;
                        imgTalentLine.y = imgTalentIcon.y - 90;
                        this.group.addChild(imgTalentLine);
                    }
                    this._imgIcon.push(imgTalentIcon);
                    this._smithyTalentArr.push(this._lineLeft[i]);
                    this.group.addChild(imgTalentIcon);
                    if (GameModels.smithy.hashTalentById(this._lineLeft[i].prevId)) {
                        var point = new eui.Image("exploreShenBing_json.img_exploreShenBingGreeBg");
                        point.x = (this.scroller.width / 2 - 200) - imgTalentIcon.width / 2 + 70;
                        point.y = 100 + i * 200;
                        var lab = new eui.Label();
                        lab.size = 20;
                        lab.text = "" + this._lineLeft[i].needNum;
                        lab.x = (this.scroller.width / 2 - 200) - imgTalentIcon.width / 2 + 88;
                        lab.y = 110 + i * 200;
                        point.touchEnabled = false;
                        lab.touchEnabled = false;
                        this.group.addChild(point);
                        this.group.addChild(lab);
                    }
                }
                for (var i = 0; i < this._lineRight.length; i++) {
                    var imgTalentIcon = new eui.Image("exploreShenBing_json.img_exploreShenBingTalent3");
                    imgTalentIcon.width = 120;
                    imgTalentIcon.height = 116;
                    imgTalentIcon.x = (this.scroller.width / 2 + 200) - imgTalentIcon.width / 2;
                    imgTalentIcon.y = 80 + i * 200;
                    imgTalentIcon.filters = GameModels.smithy.hashTalentById(this._lineRight[i].id) ? null : utils.filterUtil.grayFilters;
                    if (i != 0) {
                        var imgTalentLine = new eui.Image("exploreShenBing_json.img_exploreShenBingLine2");
                        if (GameModels.smithy.hashTalentById(this._lineRight[i].id) && GameModels.smithy.hashTalentById(this._lineRight[i].prevId)) {
                            imgTalentLine.source = "exploreShenBing_json.img_exploreShenBingLine1";
                        }
                        imgTalentLine.width = 20;
                        imgTalentLine.height = 105;
                        imgTalentLine.x = (this.scroller.width / 2 + 200) - imgTalentLine.width / 2;
                        imgTalentLine.y = imgTalentIcon.y - 90;
                        this.group.addChild(imgTalentLine);
                    }
                    this._imgIcon.push(imgTalentIcon);
                    this._smithyTalentArr.push(this._lineRight[i]);
                    this.group.addChild(imgTalentIcon);
                    if (GameModels.smithy.hashTalentById(this._lineRight[i].prevId)) {
                        var point = new eui.Image("exploreShenBing_json.img_exploreShenBingGreeBg");
                        point.x = (this.scroller.width / 2 + 200) - imgTalentIcon.width / 2 + 70;
                        point.y = 100 + i * 200;
                        var lab = new eui.Label();
                        lab.size = 20;
                        lab.text = "" + this._lineRight[i].needNum;
                        lab.x = (this.scroller.width / 2 + 200) - imgTalentIcon.width / 2 + 88;
                        lab.y = 110 + i * 200;
                        point.touchEnabled = false;
                        lab.touchEnabled = false;
                        this.group.addChild(point);
                        this.group.addChild(lab);
                    }
                }
                for (var i = 0; i < this._imgIcon.length; i++) {
                    this._imgIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
            };
            SmithyTalentDialog.prototype.onIconClick = function (e) {
                for (var i = 0; i < this._imgIcon.length; i++) {
                    if (e.currentTarget == this._imgIcon[i]) {
                        mg.alertManager.showAlert(SmithyTalentAlert, true, true, this._smithyTalentArr[i]);
                        break;
                    }
                }
            };
            return SmithyTalentDialog;
        }(ui.SmithyTalentDialogSkin));
        smithy.SmithyTalentDialog = SmithyTalentDialog;
        __reflect(SmithyTalentDialog.prototype, "dialog.smithy.SmithyTalentDialog");
    })(smithy = dialog.smithy || (dialog.smithy = {}));
})(dialog || (dialog = {}));
