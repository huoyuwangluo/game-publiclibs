var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mg;
(function (mg) {
    var DragonbonesManager = (function () {
        function DragonbonesManager() {
            this._displayList = {};
        }
        Object.defineProperty(DragonbonesManager, "instance", {
            get: function () {
                if (!DragonbonesManager._instance) {
                    DragonbonesManager._instance = new DragonbonesManager();
                }
                return DragonbonesManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        DragonbonesManager.prototype.initialize = function (stage) {
            this._displayList = {};
            this._dragonbonesFactory = dragonBones.EgretFactory.factory;
            mg.stageManager.addTick(this, this.rendder, 60);
        };
        DragonbonesManager.prototype.clear = function () {
            this._dragonbonesFactory.clear(true);
        };
        DragonbonesManager.prototype.createAnimation = function (caller, method, resId, type) {
            if (type === void 0) { type = 'MovieClip'; }
            if (!this._displayList)
                return;
            if (this._displayList[resId]) {
                method.call(caller, this._displayList[resId]);
                return;
            }
            RES.getResByUrl(game.GameConfig.resource_path + "/animation/" + resId + "_ske.dbbin", function (dragonbonesData) {
                RES.getResByUrl(game.GameConfig.resource_path + "/animation/" + resId + "_tex.json", function (textureData) {
                    RES.getResByUrl(game.GameConfig.resource_path + "/animation/" + resId + "_tex.png", function (texture) {
                        this._dragonbonesFactory.parseDragonBonesData(dragonbonesData);
                        this._dragonbonesFactory.parseTextureAtlasData(textureData, texture);
                        method.call(caller, this._dragonbonesFactory.buildArmatureDisplay(type, resId));
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                }, this, RES.ResourceItem.TYPE_JSON);
            }, this, RES.ResourceItem.TYPE_BIN);
        };
        DragonbonesManager.prototype.destoryAnimation = function (resId) {
            this._dragonbonesFactory.removeDragonBonesData(resId, true);
            RES.destroyRes(game.GameConfig.resource_path + "/animation/" + resId + "_ske.dbbin");
            RES.destroyRes(game.GameConfig.resource_path + "/animation/" + resId + "_tex.json");
            RES.destroyRes(game.GameConfig.resource_path + "/animation/" + resId + "_tex.png");
        };
        DragonbonesManager.prototype.addAnimation = function (name, display) {
            if (!this._displayList)
                return;
            if (!this._displayList[name]) {
                this._displayList[name] = display;
            }
            this.updateRenderState();
            dragonBones.WorldClock.clock.add(display.armature);
        };
        DragonbonesManager.prototype.removeAnimation = function (name) {
            if (!this._displayList)
                return;
            if (this._displayList[name]) {
                dragonBones.WorldClock.clock.remove(this._displayList[name].armature);
                this._displayList[name] = null;
                delete this._displayList[name];
            }
            this.updateRenderState();
        };
        DragonbonesManager.prototype.replaceDisplay = function (slot, displayData, displayIndex) {
            this._dragonbonesFactory.replaceDisplay(slot, displayData, displayIndex);
        };
        DragonbonesManager.prototype.updateRenderState = function () {
            var count = 0;
            for (var key in this._displayList) {
                if (!!this._displayList[key]) {
                    count++;
                }
            }
            if (count) {
                this.start();
            }
            else {
                this.stop();
            }
        };
        DragonbonesManager.prototype.start = function () {
            if (this._isRender)
                return;
            this._isRender = true;
            //dragonBones.WorldClock.clock.timeScale=1;
        };
        DragonbonesManager.prototype.stop = function () {
            if (!this._isRender)
                return;
            this._isRender = false;
            //dragonBones.WorldClock.clock.timeScale=0;
            dragonBones.WorldClock.clock.clear();
        };
        DragonbonesManager.prototype.rendder = function (timeStamp) {
            dragonBones.WorldClock.clock.advanceTime(-1);
        };
        return DragonbonesManager;
    }());
    mg.DragonbonesManager = DragonbonesManager;
    __reflect(DragonbonesManager.prototype, "mg.DragonbonesManager");
})(mg || (mg = {}));
