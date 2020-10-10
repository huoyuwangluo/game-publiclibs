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
var mo;
(function (mo) {
    var ModelFashion = (function (_super) {
        __extends(ModelFashion, _super);
        function ModelFashion() {
            return _super.call(this) || this;
        }
        ModelFashion.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._dataList = {};
            this._dataDict = {};
            this._dataList[TypeFashion.CLOTHES] = [];
            this._dataList[TypeFashion.WEAPON] = [];
            // this._dataList[TypeFashion.WING] = [];
            this._dataList[TypeFashion.MOUNTS] = [];
            this._dataList[TypeFashion.HALO] = [];
            this._dataList[TypeFashion.TITLE_FOREVER] = [];
            this._dataList[TypeFashion.TITLE_LIMIT] = [];
            this.initTemplates();
            this.onRoute(n.MessageMap.G2C_TITLE_NOTIFYACTIVEREFID, utils.Handler.create(this, this.net_getTitle, null, false));
            this.onRoute(n.MessageMap.G2C_FASHION_DISAPPEAR, utils.Handler.create(this, this.net_fashionDisappear, null, false)); //这条协议后端没有推送
            this.onRoute(n.MessageMap.G2C_TITLE_DISAPPEAR, utils.Handler.create(this, this.net_titleDisappear, null, false));
            this.net_requestFashionInfo();
        };
        ModelFashion.prototype.initTemplates = function () {
            var items = Templates.getList(templates.Map.GAMEFASHION);
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (item.type == 23 || item.type == 24)
                    continue;
                var data = vo.fromPool(vo.FashionVO, item);
                this._dataList[item.type].push(data);
                this._dataDict[item.id] = data;
            }
        };
        ModelFashion.prototype.net_requestFashionInfo = function (handler) {
            var _this = this;
            if (handler === void 0) { handler = null; }
            this.request(n.MessageMap.C2G_FASHION_INFOS, n.MessagePool.from(n.C2G_Fashion_Infos), utils.Handler.create(this, function (data) {
                _this.updateFashionInfo(data);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_CLOTH);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_WEAPON);
                GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_HALO);
                GameModels.state.updateState(GameRedState.BAOWU_ZUOQI);
                if (handler)
                    handler.runWith(data);
            }));
        };
        ModelFashion.prototype.net_getTitle = function (data) {
            mg.uiManager.show(GetTitle, data.RefId);
        };
        ModelFashion.prototype.net_fashionDisappear = function (data) {
            var item = this._dataDict[data.RefId];
            if (item) {
                item.isActived = item.isDressed = false;
                item.limitSeconds = 0;
                item.updateFashionEndTime(item.limitSeconds);
            }
            this.dispatchEventWith(ModelFashion.FASHION_ITEM_CHANGE, false, item);
        };
        ModelFashion.prototype.net_requestFashionActive = function (id, caller) {
            var _this = this;
            var cmd = n.MessagePool.from(n.C2G_Fashion_Active);
            cmd.RefId = id;
            this.request(n.MessageMap.C2G_FASHION_ACTIVE, cmd, utils.Handler.create(this, function (data) {
                _this.net_fashionActiveCallback(data);
                if (caller) {
                    caller.run();
                }
            }));
        };
        ModelFashion.prototype.net_requestFashionBuy = function (id, caller) {
            var cmd = n.MessagePool.from(n.C2G_Fashion_Buy);
            cmd.RefId = id;
            this.request(n.MessageMap.C2G_FASHION_BUY, cmd, utils.Handler.create(this, function (data) {
                if (data.Result == 1) {
                    if (caller) {
                        caller.run();
                    }
                }
            }));
        };
        ModelFashion.prototype.net_fashionActiveCallback = function (data) {
            var item = this._dataDict[data.RefId];
            if (item) {
                item.isActived = true;
                if (item.template.duration != -1) {
                    item.limitSeconds = item.template.duration;
                    item.updateFashionEndTime(item.limitSeconds);
                }
            }
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_CLOTH);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_WEAPON);
            GameModels.state.updateState(GameRedState.ROLE_EQIUP_FASHION_HALO);
            GameModels.state.updateState(GameRedState.BAOWU_ZUOQI);
            this.dispatchEventWith(ModelFashion.FASHION_ITEM_CHANGE, false, item);
        };
        ModelFashion.prototype.net_requestFashionDress = function (id) {
            var cmd = n.MessagePool.from(n.C2G_Fashion_Dress);
            cmd.RefId = id;
            this.request(n.MessageMap.C2G_FASHION_DRESS, cmd, utils.Handler.create(this, this.net_fashionDressCallback));
        };
        ModelFashion.prototype.net_fashionDressCallback = function (data) {
            var item = this._dataDict[data.OldRefId];
            if (item) {
                item.isDressed = false;
            }
            item = this._dataDict[data.NewRefId];
            if (item) {
                item.isDressed = true;
            }
            this.dispatchEventWith(ModelFashion.FASHION_ITEM_CHANGE, false, item);
        };
        ModelFashion.prototype.net_requestFashionUnDress = function (id) {
            var cmd = n.MessagePool.from(n.C2G_Fashion_Undress);
            cmd.RefId = id;
            this.request(n.MessageMap.C2G_FASHION_UNDRESS, cmd, utils.Handler.create(this, this.net_fashionUnDressCallback));
        };
        ModelFashion.prototype.net_fashionUnDressCallback = function (data) {
            var item = this._dataDict[data.RefId];
            if (item) {
                item.isDressed = false;
            }
            this.dispatchEventWith(ModelFashion.FASHION_ITEM_CHANGE, false, item);
        };
        ModelFashion.prototype.updateFashionInfo = function (data) {
            var items = data.Infos;
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var item_1 = items_2[_i];
                var vo_1 = this._dataDict[item_1.RefId];
                if (vo_1)
                    vo_1.updateFashion(item_1);
            }
        };
        Object.defineProperty(ModelFashion.prototype, "title", {
            ///////////////////////Title
            get: function () {
                return this._title;
            },
            set: function (data) {
                this._title = data;
                // dispatchEventWith titlechange
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFashion.prototype, "isGuide", {
            get: function () {
                return this._isGuide;
            },
            set: function (guide) {
                this._isGuide = guide;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelFashion.prototype, "guideId", {
            get: function () {
                return this._guideId;
            },
            set: function (data) {
                this._guideId = data;
            },
            enumerable: true,
            configurable: true
        });
        ModelFashion.prototype.net_titleDisappear = function (data) {
            var item = this._dataDict[data.RefId];
            if (item) {
                item.isActived = item.isDressed = false;
                item.limitSeconds = 0;
                if (this._title == item) {
                    this.title = null;
                }
            }
            this.dispatchEventWith(ModelFashion.FASHION_ITEM_CHANGE, false, item);
        };
        ModelFashion.prototype.net_requestTitleDress = function (id) {
            var cmd = n.MessagePool.from(n.C2G_Title_Dress);
            cmd.RefId = id;
            this.request(n.MessageMap.C2G_TITLE_DRESS, cmd, utils.Handler.create(this, this.net_titleDressCallback));
        };
        ModelFashion.prototype.net_titleDressCallback = function (data) {
            var item = this._dataDict[data.OldRefId];
            if (item) {
                item.isDressed = false;
            }
            item = this._dataDict[data.NewRefId];
            if (item) {
                item.isDressed = true;
                this.title = item;
            }
            this.dispatchEventWith(ModelFashion.TITLE_ITEM_CHANGE, false, item);
        };
        ModelFashion.prototype.net_requestTitleUndress = function (id) {
            var cmd = n.MessagePool.from(n.C2G_Title_Undress);
            cmd.RefId = id;
            this.request(n.MessageMap.C2G_TITLE_UNDRESS, cmd, utils.Handler.create(this, this.net_titleUndressCallback));
        };
        ModelFashion.prototype.net_titleUndressCallback = function (data) {
            var item = this._dataDict[data.RefId];
            if (item) {
                item.isDressed = false;
                this.title = null;
            }
            this.dispatchEventWith(ModelFashion.TITLE_ITEM_CHANGE, false, item);
        };
        ModelFashion.prototype.updateTitleInfo = function (data) {
            var items = data.Infos;
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var item_2 = items_3[_i];
                var vo_2 = this._dataDict[item_2.TitleId];
                if (vo_2) {
                    vo_2.updateTitle(item_2);
                    if (vo_2.isDressed)
                        this.title = vo_2;
                }
            }
        };
        ModelFashion.prototype.getFashionData = function (type) {
            if (this._dataList[type]) {
                this._dataList[type].sort(function (a, b) {
                    return a.template.order - b.template.order;
                });
            }
            return this._dataList[type];
        };
        ModelFashion.prototype.checkFashionRed = function (typeFashion) {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.roleFashion))
                return false;
            var infos = this.getFashionData(typeFashion);
            for (var i = 0; i < infos.length; i++) {
                if (infos[i].isActived == false) {
                    var activeItem = infos[i].template.consume.split("_");
                    var count = GameModels.bag.getItemCountById(activeItem[0]);
                    if (count >= parseInt(activeItem[1]))
                        return true;
                }
            }
            return false;
        };
        ModelFashion.FASHION_ITEM_CHANGE = "fashion_item_change";
        ModelFashion.TITLE_ITEM_CHANGE = "title_item_change";
        return ModelFashion;
    }(mo.ModelBase));
    mo.ModelFashion = ModelFashion;
    __reflect(ModelFashion.prototype, "mo.ModelFashion");
})(mo || (mo = {}));
