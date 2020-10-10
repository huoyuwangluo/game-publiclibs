// module s {
// 	export class GamePhantom extends egret.DisplayObjectContainer implements ISceneObject{
//         public autoRecover:boolean=true;
//         public toPoolTime:number=0;
//         protected _scene:s.Scene;
//         protected _master:GamePlayer;
//         protected _skilling:boolean;
//         protected _lastSkillTime:number;
//         protected _effect: s.AnimationSprite;
//         protected _phantomSkillTemp: templates.heroPhantomSkillLv;
//         protected _phantomSkillTalent: templates.skillTalent;
//         public constructor(){
//             super();
//             this.createAnimation();
//         }
//         private createAnimation(){
//             this._effect=new s.AnimationSprite();
//             this.addChild(this._effect);
//             this._effect.frameRate = 12;
//         }
//         public addTo(scene:Scene){
// 			this._scene=scene;
//             scene.effectFrontLayer.addChild(this);
//             this.updatePosition();
// 		}
// 		public remove(){
// 			this._scene=null;
//             if(this.parent){
//                 this.parent.removeChild(this);
//             }
// 		}
// 		public initialize(master:GamePlayer){
// 			this._master=master;
//             if(this._master.scene){
//                 this.addTo(this._master.scene);
//             }
//             this._master.onTileChange(this,this.tileChangeHandler);
//             //(this._master.vo as vo.GamePlayerVO)
//             //显示自己的外观
//             if(this._master.vo as vo.GamePlayerVO){
//                 var phantomBattleId:number = (this._master.vo as vo.GamePlayerVO).getProperty(TypeProperty.PHANTOM_BATTLE_Id);
//                 if(phantomBattleId != 0) {
//                     this.updatePhantom(phantomBattleId);
//                     //this.updatePhantom(300100);//测试用
//                 }
//             }
// 		}
// 		public reset(){
//             if(this._master){
//                 this._master.offTileChange(this,this.tileChangeHandler);
//             }
//             this._master=null;
//             this._effect.stop();
//             this._effect.reset();
//             utils.timer.clearAll(this);
//             this._phantomSkillTemp=null;
//             this._skilling=false;
// 		}
//         private updatePhantom(id:number){
//             if (this._effect){
//                 var phantomVO:vo.PhantomVO = GameModels.role.getBattlePhantom(id);
//                 if(phantomVO){
//                     this._effect.resId = phantomVO.modelId;
//                     this._effect.play();
//                     /*this._phantomSkillTemp = Templates.getTemplateById(templates.Map.HEROPHANTOMSKILLLV, phantomVO.partSkillId);
//                     if(this._phantomSkillTemp&&this._phantomSkillTemp.talent){
//                         this._phantomSkillTalent=Templates.getTemplateById(templates.Map.SKILLTALENT, this._phantomSkillTemp.talent);
//                         if(this._phantomSkillTalent){
//                             utils.timer.loop(this._phantomSkillTalent.interval,this,this.skillHandler)
//                         }
//                         //utils.timer.loop(1000,this,this.skillHandler)
//                     }*/
//                 }
//             }
//         }
//         private tileChangeHandler(){
//             // if(this._skilling) return;
//             if(this._master){
//                 this.updatePosition(true);
//             }
//         }
//         public updatePosition(tween:boolean=false):void{
//             if(!this._master||!this._master.tileNode) return;
//             if(!tween){
//                 this.x= game.MapConfig.getReaX(this._master.tileNode.x) + 60;
//                 this.y= game.MapConfig.getReaY(this._master.tileNode.y) - 60;
//                 return;
//             }
//             egret.Tween.removeTweens(this);
//             var posX:number = game.MapConfig.getReaX(this._master.tileNode.x) + 60;
//             var posY:number = game.MapConfig.getReaY(this._master.tileNode.y) - 60;
//             egret.Tween.get(this).to({x:posX,y:posY},500);
//         }
//         private skillHandler(){
//             //主人的目标
//             if(this._master.target instanceof SmartObject&&this._master.target.vo){
//                 this._skilling=true;
//                 if(this._phantomSkillTalent){
//                    if(((Math.random()*10000)>>0)<=this._phantomSkillTalent.triggerRate){
//                         egret.Tween.removeTweens(this);
//                         if(!this._scene){
//                             this._lastSkillTime=egret.getTimer();
//                             return;
//                         }
//                         var distanceBoo:boolean = this.checkDistance();
//                         if(distanceBoo){
//                             var effect:AnimationSprite=utils.ObjectPool.from(AnimationSprite) as AnimationSprite;
//                             effect.resId='5001';
//                             effect.frameRate=24;
//                             var effectlength:number=217;
//                             var length:number=utils.MathUtil.getDistance(this.x,this.y,this._master.target.x,this._master.target.y-100);
//                             var angle:number=utils.MathUtil.getAngle(this._master.target.x-this.x,this._master.target.y-100-this.y);
//                             effect.scaleX=length/effectlength;
//                             effect.rotation=angle;
//                             effect.x=this.x;
//                             effect.y=this.y;
//                             this._scene.effectFrontLayer.addChild(effect);
//                             effect.play();
//                             effect.onCompleteOnce(this,this.effectOver,effect);
//                         }
//                         this._lastSkillTime=egret.getTimer();
//                    } 
//                 }
//             }
//         }
//         private effectOver(effect:AnimationSprite){
//             this._skilling=false;
//             effect.stop();
//             effect.reset();
//             effect.scaleX=effect.scaleY=1;
//             effect.rotation=0;
//             utils.ObjectPool.to(effect);
//             this.tileChangeHandler();
//         }
//         private checkDistance():boolean{
// 			if(Math.abs(this._master.tileX-this._master.target.tileX)<=3&&Math.abs(this._master.tileY-this._master.target.tileY)<=3){
// 				return true
// 			}
// 			return false;
// 		}
//     }
// } 
