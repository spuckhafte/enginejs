import { Physics, TheBody } from "../../types";
import Criya, { criya_Init } from "../helpers/criya";
import { PVector } from "./vectors";

export class GameObject extends Criya {

    /**Physical properties of a game object, viz: position, velocity, etc. */
    physics: Physics = {
        position: new PVector(0, 0),
        velocity: new PVector(0, 0),
        acceleration: new PVector(0, 0)
    }

    /**Describe how the object will look like */
    body: TheBody = {
        width: 10,
        height: 10,
        color: 'black'
    }

    /**This function will be called when the game object is ready and is on the scene */
    onready: CallableFunction|null = null;

    constructor(init: criya_Init) {
        super(init);

        const _this = this
        function __renderEffect() {
            _this.physics.velocity.x += _this.physics.acceleration.x;
                _this.physics.velocity.y += _this.physics.acceleration.y;
    
                _this.physics.position.x += _this.physics.velocity.x;
                _this.physics.position.y += _this.physics.velocity.y;
    
                _this.prop = {
                    ..._this.prop,
                    css: {
                        ..._this.prop?.css,
                        position: 'absolute',
    
                        left: _this.physics.position.x + "px",
                        top: -_this.physics.position.y + "px",
    
                        width: _this.body.width + "px",
                        height: _this.body.height + "px",
                        backgroundColor: _this.body.color,
    
                    }
                }
    
            _this.render();
        }

        this.onSubscribed(() => {
            if (!this.effects.find(eff => eff.func.name == "__renderEffect")) {
                this.effect(__renderEffect, ['%delta%']);
            }
        });
    }
}