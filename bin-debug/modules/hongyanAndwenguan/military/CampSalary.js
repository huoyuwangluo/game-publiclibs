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
    var WenGuan;
    (function (WenGuan) {
        var CampSalary = (function (_super) {
            __extends(CampSalary, _super);
            function CampSalary() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.colorarry = [0xfbdfa1, 0xbe39f6, 0x51b3fe];
                return _this;
            }
            CampSalary.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.Salarylist.itemRenderer = renderer.CampSalaryRenderer;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            CampSalary.prototype.destory = function () {
                _super.prototype.destory.call(this);
            };
            CampSalary.prototype.enter = function (data) {
                this.onReceive();
                this.showview();
            };
            CampSalary.prototype.exit = function () {
                // this.btn_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
            };
            CampSalary.prototype.onReceive = function () {
                if (GameModels.legion.LastStep > 0) {
                    GameModels.legion.getReword(utils.Handler.create(this, function () {
                    }));
                }
            };
            CampSalary.prototype.showview = function () {
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(Templates.getList(templates.Map.CAMPWU));
                }
                else {
                    this._listData.source = Templates.getList(templates.Map.CAMPWU);
                }
                this.Salarylist.dataProvider = this._listData;
                var data = GameModels.legion.SelfInfo;
                this.img_office.source = "military_json.office_" + data.Step;
                this.labFight.text = data.FightPower + "";
                this.imgHead.source = ResPath.getPlayerIconSmall(data.HeadIcon);
                var wuguandata = Templates.getTemplateByProperty(templates.Map.CAMPWU, "step", data.Step);
                this.lable_position.text = wuguandata.name;
                this.lable_position.textColor = data.Step > 3 ? 0xd3d3d3 : this.colorarry[data.Step - 1];
                var reword = wuguandata.rewards.split(";")[0];
                var item = Templates.getTemplateById(templates.Map.ITEM, parseInt(reword.split("_")[0]));
                this.icon.source = item.icon;
                this.labSalarynum.text = reword.split("_")[1] + Language.C_MS;
            };
            CampSalary.prototype.commitProperties = function () {
                _super.prototype.commitProperties.call(this);
                if (this.scroSalary.verticalScrollBar) {
                    this.scroSalary.verticalScrollBar.autoVisibility = false;
                    this.scroSalary.verticalScrollBar.visible = false;
                }
                if (this.scroSalary.verticalScrollBar) {
                    this.scroSalary.verticalScrollBar.autoVisibility = false;
                    this.scroSalary.verticalScrollBar.visible = false;
                }
            };
            return CampSalary;
        }(ui.CampSalarySkin));
        WenGuan.CampSalary = CampSalary;
        __reflect(CampSalary.prototype, "dialog.WenGuan.CampSalary");
    })(WenGuan = dialog.WenGuan || (dialog.WenGuan = {}));
})(dialog || (dialog = {}));
