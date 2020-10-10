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
    var LadderRoleInfoCell1 = (function (_super) {
        __extends(LadderRoleInfoCell1, _super);
        function LadderRoleInfoCell1() {
            var _this = _super.call(this) || this;
            _this._headArr = [_this.head0, _this.head1, _this.head2, _this.head3, _this.head4];
            _this._imgArr = [_this.img0, _this.img1, _this.img2, _this.img3, _this.img4];
            return _this;
        }
        LadderRoleInfoCell1.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnDebrs.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopImmediatePropagation();
                this.parent.dispatchEventWith("ENTER", false, this.data);
            }, this);
        };
        LadderRoleInfoCell1.prototype.updateRoleData = function (data) {
            this._playerData = data;
            var monsterListDate = this._playerData.monsterDate;
            this.labName.text = data.name;
            if (this._playerData.totalScore <= 100) {
                this.labTatolJiFen.text = this._playerData.totalScore + "";
            }
            else {
                var elements = [];
                elements.push({ text: "100", style: { size: 18 } });
                elements.push({ text: "+", style: { size: 16 } });
                this.labTatolJiFen.textFlow = elements;
            }
            // this.labXunZhang.text = data.myOrAddMedal.toString();
            for (var i = 0; i < 5; i++) {
                if (monsterListDate.List[i] && monsterListDate.List[i].PetId) {
                    var vo = monsterListDate.List[i];
                    this._headArr[i].visible = true;
                    this._imgArr[i].visible = false;
                    this._headArr[i].data = vo;
                }
                else {
                    this._headArr[i].visible = false;
                    this._imgArr[i].visible = true;
                    this._headArr[i].data = null;
                }
            }
        };
        Object.defineProperty(LadderRoleInfoCell1.prototype, "data", {
            get: function () {
                return this._playerData;
            },
            enumerable: true,
            configurable: true
        });
        return LadderRoleInfoCell1;
    }(ui.LadderRoleInfoCell1Skin));
    renderer.LadderRoleInfoCell1 = LadderRoleInfoCell1;
    __reflect(LadderRoleInfoCell1.prototype, "renderer.LadderRoleInfoCell1");
})(renderer || (renderer = {}));
