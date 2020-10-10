var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var CameraManager = (function () {
        function CameraManager(view) {
            this._view = view;
        }
        CameraManager.prototype.initialize = function () {
        };
        /**跟踪目标移动 */
        CameraManager.prototype.lookAt = function (actor, forceFellow) {
            if (forceFellow === void 0) { forceFellow = true; }
            //this._view.camera.lookAt(actor, forceFellow);
            if (s.GameManager.instance.gameCurrent.type == TypeGame.LEGION_WAR) {
                this._view.lookAt(actor, forceFellow);
                this.startViewHigh();
            }
            else if (TypeGame.isFormationGame()) {
                this.startViewHighMax();
            }
            else {
                this._view.lookAt(actor, forceFellow);
                this.startViewNormal();
            }
        };
        /**启动最高视角 */
        CameraManager.prototype.startViewHighMax = function () {
            var cameraZ = 300;
            if (this._view.camera.z == cameraZ)
                return;
            //egret.Tween.get(this._view.camera).to({ z: cameraZ1 }, 1000, utils.Ease.cubicOut).to({ z: cameraZ2 }, 1000, utils.Ease.cubicOut).call(this.startCamera, this);
            //egret.Tween.removeTweens(this._view.camera);
            this._view.camera.z = cameraZ;
            //egret.Tween.get(this._view.camera).to({ z: cameraZ }, 3000, utils.Ease.cubicOut);
        };
        /**启动高视角 */
        CameraManager.prototype.startViewHigh = function () {
            var cameraZ = 100;
            if (this._view.camera.z == cameraZ)
                return;
            //egret.Tween.get(this._view.camera).to({ z: cameraZ1 }, 1000, utils.Ease.cubicOut).to({ z: cameraZ2 }, 1000, utils.Ease.cubicOut).call(this.startCamera, this);
            //egret.Tween.removeTweens(this._view.camera);
            this._view.camera.z = cameraZ;
            //egret.Tween.get(this._view.camera).to({ z: cameraZ }, 2000, utils.Ease.cubicOut);
        };
        /**启动低视角 */
        CameraManager.prototype.startViewNormal = function () {
            var cameraZ = 100;
            if (this._view.camera.z == cameraZ)
                return;
            //egret.Tween.get(this._view.camera).to({ z: cameraZ1 }, 1000, utils.Ease.cubicOut).to({ z: cameraZ2 }, 1000, utils.Ease.cubicOut).call(this.startCamera, this);
            //egret.Tween.removeTweens(this._view.camera);
            this._view.camera.z = cameraZ;
            //egret.Tween.get(this._view.camera).to({ z: cameraZ }, 2000, utils.Ease.cubicOut);
        };
        CameraManager.prototype.lookAtCenter = function (actor) {
            var x = this._view.scene.mapWidth / 1.5 >> 0;
            var y = this._view.scene.mapHeight / 2 >> 0;
            x = this._view.scene.getMapRealX(this._view.scene.data.born.x);
            y = this._view.scene.getMapRealY(this._view.scene.data.born.y);
            this._view.lookAt(actor, true);
            this.startViewHigh();
        };
        CameraManager.prototype.lookAtCenterFix = function (tileX, tileY, forceFellow) {
            if (forceFellow === void 0) { forceFellow = true; }
            var x = this._view.scene.getMapRealX(tileX);
            var y = this._view.scene.getMapRealX(tileY);
            var point = new egret.Point(x, y);
            this._view.lookAt(point, forceFellow);
            this.startViewHighMax();
        };
        CameraManager.prototype.lookAtCenterMax = function (tileX, tileY) {
            var x = this._view.scene.getMapRealX(tileX);
            var y = this._view.scene.getMapRealX(tileY);
            this._view.scene.setCenter(x, y);
            this._view.lookAt(this._view.scene.center, true);
            this.startViewHighMax();
        };
        CameraManager.prototype.lookAtViewHight = function (actor) {
            //this._view.camera.lookAt(actor, forceFellow);
            this._view.lookAt(actor, false);
            this.startViewHigh();
        };
        CameraManager.prototype.lookAtPlayer = function () {
            this.lookAtViewHight(this._view.scene.manager.player);
        };
        return CameraManager;
    }());
    s.CameraManager = CameraManager;
    __reflect(CameraManager.prototype, "s.CameraManager");
})(s || (s = {}));
