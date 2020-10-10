var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Mediator = (function () {
    function Mediator(view) {
        this._view = view;
    }
    Mediator.registerMediator = function (view) {
        var name = egret.getQualifiedClassName(view);
        if (!this._lib[name]) {
            this._lib[name] = new Mediator(view);
        }
        return this._lib[name];
    };
    Mediator.removeMediator = function (view) {
        var name = egret.getQualifiedClassName(view);
        if (this._lib[name]) {
            var mediator = this._lib[name];
            mediator.offAll();
            this._lib[name] = null;
            delete this._lib[name];
        }
    };
    Mediator.getMediator = function (view) {
        var name = egret.getQualifiedClassName(view);
        if (!this._lib[name]) {
            this.registerMediator(view);
        }
        return this._lib[name];
    };
    Mediator.prototype.onAdd = function (caller, method) {
        if (this._addedHandler) {
            this._addedHandler.recover();
            this._addedHandler = null;
        }
        this._addedHandler = utils.Handler.create(caller, method, null, false);
        return this;
    };
    Mediator.prototype.onRemove = function (caller, method) {
        if (this._removeedHandler) {
            this._removeedHandler.recover();
            this._removeedHandler = null;
        }
        this._removeedHandler = utils.Handler.create(caller, method, null, false);
    };
    Mediator.prototype.onUpdate = function (caller, method) {
        if (this._updateHandler) {
            this._updateHandler.recover();
            this._updateHandler = null;
        }
        this._updateHandler = utils.Handler.create(caller, method, null, false);
    };
    Mediator.prototype.offAll = function () {
        if (this._addedHandler) {
            this._addedHandler.recover();
            this._addedHandler = null;
        }
        if (this._removeedHandler) {
            this._removeedHandler.recover();
            this._removeedHandler = null;
        }
        if (this._updateHandler) {
            this._updateHandler.recover();
            this._updateHandler = null;
        }
    };
    Mediator.prototype.added = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._view instanceof base.View) {
            this._view.refreshMarkImagesDisplay();
        }
        if (this._addedHandler) {
            (_a = this._addedHandler).runWith.apply(_a, args);
        }
        var _a;
        // if(this._referenceTextures){
        // 	for(var textureName of this._referenceTextures){
        // 		mg.assetsManager.addUIReference(this,textureName);
        // 	}
        // }
    };
    Mediator.prototype.removed = function () {
        if (this._removeedHandler) {
            this._removeedHandler.run();
        }
        // if(this._referenceTextures){
        // 	for(var textureName of this._referenceTextures){
        // 		mg.assetsManager.removeUIReference(this,textureName);
        // 	}
        // }
    };
    Mediator.prototype.update = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._updateHandler) {
            (_a = this._updateHandler).runWith.apply(_a, args);
        }
        var _a;
    };
    Mediator._lib = {};
    return Mediator;
}());
__reflect(Mediator.prototype, "Mediator");
