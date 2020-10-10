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
var s;
(function (s) {
    var GameCrossCity = (function (_super) {
        __extends(GameCrossCity, _super);
        function GameCrossCity() {
            var _this = _super.call(this, TypeGame.CROSS_CITY) || this;
            _this._objectTouchEnabled = false;
            return _this;
        }
        GameCrossCity.prototype.enter = function () {
            this._isEnter = true;
            this._isEnterOver = false;
            this._scene.clear(true);
            this.enterMap(1021);
        };
        GameCrossCity.prototype.exit = function () {
            this.removeNpcs();
            _super.prototype.exit.call(this);
        };
        GameCrossCity.prototype.start = function () {
            _super.prototype.start.call(this);
            this.addNpcs();
            this.enableControl();
            //去掉下雪粒子效果
            // mg.assetsManager.loadGroup('particle_snow', this, () => {
            // 	if (this._isEnter) {
            // 		if (!this._snow) this._snow = new particle.GravityParticleSystem(RES.getRes('snow_png'), RES.getRes('snow_json'));
            // 		this._snow.touchEnabled = false;
            // 		mg.layerManager.mapEffect.addChild(this._snow);
            // 		(this._snow as any).emitterXVariance = mg.stageManager.stageWidth;
            // 		this._snow.start();
            // 	}
            // });
            // mg.stageManager.onResize(this, this.resizeHandler);
        };
        GameCrossCity.prototype.stop = function () {
            if (this._snow) {
                this._snow.stop();
                if (this._snow.parent) {
                    this._snow.parent.removeChild(this._snow);
                }
            }
            this.disableControl();
            this._player.offMoveStart();
            _super.prototype.stop.call(this);
        };
        GameCrossCity.prototype.resizeHandler = function (w, h) {
            if (this._snow)
                this._snow.emitterXVariance = mg.stageManager.stageWidth;
        };
        GameCrossCity.prototype.addNpcs = function () {
            this._npcs = [];
            for (var _i = 0, _a = this._scene.data.npcs; _i < _a.length; _i++) {
                var npcData = _a[_i];
                var npcTemplate = Templates.getTemplateById(templates.Map.CITYNPC, npcData.id);
                if (npcTemplate.type == 3) {
                    var npcVO = vo.fromPool(vo.GameNpcVO, npcTemplate);
                    var npc = utils.ObjectPool.from(s.GameNpc);
                    npc.tapEnabled = true;
                    npc.initialize(npcVO);
                    npc.bloodVisible = false;
                    this._scene.addNpc(npc);
                    npc.setTile(npcData.node);
                    npc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.npcTouchHandler, this);
                    this._npcs.push(npc);
                }
            }
        };
        GameCrossCity.prototype.removeNpcs = function () {
            for (var _i = 0, _a = this._npcs; _i < _a.length; _i++) {
                var npc = _a[_i];
                npc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.npcTouchHandler, this);
                utils.ObjectPool.to(npc, true);
            }
            this._npcs = null;
        };
        GameCrossCity.prototype.onSceneTap = function (tileX, tileY) {
            this._player.movePathTo(tileX, tileY);
        };
        GameCrossCity.prototype.npcTouchHandler = function (e) {
            var npc = e.currentTarget;
            if (npc.vo.template.type == 3) {
                if ((npc.vo.id == 402001)) {
                    var gamefun = Templates.getTemplateById(templates.Map.GAMEFUNCTIONS, npc.openId);
                    // var isOpen:boolean = GameModels.peaksBattleCross.checkPeaksBattleIsOpen();
                    // if(!isOpen){
                    // 	var godLv:number = Math.floor(gamefun.openLv/1000);
                    // 	mg.alertManager.tip(Language.getExpression(Language.E_KFD1TKQ, gamefun.openDay,godLv), 0xff0000);
                    // 	return;
                    // }
                }
            }
        };
        return GameCrossCity;
    }(s.GameMutiPlayerBoss));
    s.GameCrossCity = GameCrossCity;
    __reflect(GameCrossCity.prototype, "s.GameCrossCity");
})(s || (s = {}));
