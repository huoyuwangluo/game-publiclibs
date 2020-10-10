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
    var GameCrossPetFight = (function (_super) {
        __extends(GameCrossPetFight, _super);
        function GameCrossPetFight(type) {
            return _super.call(this, type ? type : TypeGame.CROSS_PET_FIGHT) || this;
        }
        GameCrossPetFight.prototype.initialize = function (view) {
            _super.prototype.initialize.call(this, view);
            this._userPets = [];
            this._enemyPets = [];
        };
        GameCrossPetFight.prototype.getExitAutoOpenUI = function () {
            return this._exitOpenUI ? this._exitOpenUI : s.UserfaceName.crossServer;
        };
        GameCrossPetFight.prototype.getExitAutoOpenUITableIndex = function () {
            return this._exitOpenUITabIndex ? this._exitOpenUITabIndex : 2;
        };
        GameCrossPetFight.prototype.enter = function () {
            _super.prototype.enter.call(this);
            //Loading.instance.add();
            //Loading.instance.updateProgress(1);
            this._scene.removePlayer(this._player);
            this._scene.clear(true);
            this.enterMap(2028);
        };
        GameCrossPetFight.prototype.exit = function () {
            _super.prototype.exit.call(this);
            copy.GameCrossPetFightUI.instance.exit();
            this.clearSights();
            GameModels.scene.clearSights();
            this._scene.manager.clear();
            this._scene.clear(true);
        };
        GameCrossPetFight.prototype.start = function () {
            //Loading.instance.remove();
            copy.GameCrossPetFightUI.instance.enter(this._modelScene);
            this.displaySightPets();
            this.displayUserPets();
            this._scene.start();
            this._scene.cameraManager.lookAtCenter(null);
            //this._scene.view.camera.lookAt(null);
            //this._scene.view.camera.x=this._scene.mapWidth/2;
            //this._scene.view.camera.y=this._scene.mapHeight/2;
            s.CopyTimerCountDown.instance.start(3, this, this.startHandler);
            GameModels.scene.onGameOver(this, this.endHandler);
        };
        GameCrossPetFight.prototype.startHandler = function () {
            GameModels.scene.startGame();
            _super.prototype.startHandler.call(this);
        };
        GameCrossPetFight.prototype.stop = function () {
            for (var _i = 0, _a = this._userPets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.offSkillStart();
                pet.offMoveStart();
            }
            this._scene.stop();
            GameModels.scene.offGameOver();
        };
        GameCrossPetFight.prototype.displayUserPets = function () {
            //GameModels.user.player.resetState();
            var playerVO;
            ;
            for (var i = 0; i < GameModels.scene.sights.length; i++) {
                if (GameModels.scene.sights[i].uid == (GameModels.user.player.uid + "_clone")) {
                    playerVO = GameModels.scene.sights[i];
                }
            }
            if (!playerVO) {
                return;
            }
            this._userPets = this.addPlayerPets(playerVO, s.AISmartSync, 'mine');
            //PetGroup.formatPetPosition(playerVO.tileX, playerVO.tileY, this._userPets, TypeDirection.UP);
            copy.GameCrossPetFightUI.instance.initMyPets(playerVO.petList.upFormats);
        };
        GameCrossPetFight.prototype.displaySightPets = function () {
            var playerVO;
            ;
            for (var i = 0; i < GameModels.scene.sights.length; i++) {
                if (GameModels.scene.sights[i].uid != (GameModels.user.player.uid + "_clone")) {
                    playerVO = GameModels.scene.sights[i];
                }
            }
            if (!playerVO) {
                return;
            }
            this._enemyPets = this.addPlayerPets(playerVO, s.AISmartSync, 'enemy');
            //PetGroup.formatPetPosition(playerVO.tileX, playerVO.tileY, this._enemyPets, TypeDirection.LEFT_DOWN);
            copy.GameCrossPetFightUI.instance.initEnemyPets(playerVO.petList.upFormats);
        };
        GameCrossPetFight.prototype.addPlayerPets = function (playerVO, aiClass, groupId) {
            if (aiClass === void 0) { aiClass = null; }
            if (groupId === void 0) { groupId = ""; }
            var pets = [];
            for (var _i = 0, _a = playerVO.petList.upFormats; _i < _a.length; _i++) {
                var petVO = _a[_i];
                var pet = utils.ObjectPool.from(s.GamePet);
                pet.aiClass = aiClass ? aiClass : s.AISmartSync;
                petVO.damgeEnabled = true;
                petVO.effectEnabled = true;
                pet.initialize(petVO);
                pet.groupId = groupId;
                this._scene.addPet(pet);
                pet.autoAttack = false;
                pet.focusMode = true;
                pet.damgeEnabled = true;
                pet.effectEnabled = true;
                pet.tapEnabled = false;
                pet.bloodVisible = true;
                //pet.actionTo(TypeAction.IDLE, TypeDirection.DOWN);
                pets.push(pet);
            }
            return pets;
        };
        GameCrossPetFight.prototype.clearSights = function () {
            for (var _i = 0, _a = this._userPets; _i < _a.length; _i++) {
                var pet = _a[_i];
                pet.offSkillStart();
                pet.offMoveStart();
                pet.remove();
                pet.reset();
                utils.ObjectPool.to(pet);
            }
            this._userPets.length = 0;
            for (var _b = 0, _c = this._enemyPets; _b < _c.length; _b++) {
                var pet = _c[_b];
                pet.offSkillStart();
                pet.offMoveStart();
                pet.remove();
                pet.reset();
                utils.ObjectPool.to(pet, true);
            }
            this._enemyPets.length = 0;
            utils.timer.clearAll(this);
        };
        GameCrossPetFight.prototype.getObjectByUID = function (uid) {
            for (var _i = 0, _a = this._userPets; _i < _a.length; _i++) {
                var pet = _a[_i];
                if (uid == pet.vo.uid) {
                    return pet;
                }
            }
            for (var _b = 0, _c = this._enemyPets; _b < _c.length; _b++) {
                var pet = _c[_b];
                if (uid == pet.vo.uid) {
                    return pet;
                }
            }
            return null;
        };
        GameCrossPetFight.prototype.getObjectByVO = function (smartVO) {
            for (var _i = 0, _a = this._userPets; _i < _a.length; _i++) {
                var pet = _a[_i];
                if (smartVO == pet.vo) {
                    return pet;
                }
            }
            for (var _b = 0, _c = this._enemyPets; _b < _c.length; _b++) {
                var pet = _c[_b];
                if (smartVO == pet.vo) {
                    return pet;
                }
            }
            return null;
        };
        GameCrossPetFight.prototype.endHandler = function (result, totalStar, dropItems) {
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            GameModels.warKing.syncPetLadderInfo();
            copy.GameCrossPetFightUI.instance.showKO();
            utils.timer.once(2000, this, function () {
                this.end(result, totalStar, dropItems);
            });
        };
        return GameCrossPetFight;
    }(s.GameBase));
    s.GameCrossPetFight = GameCrossPetFight;
    __reflect(GameCrossPetFight.prototype, "s.GameCrossPetFight");
})(s || (s = {}));
