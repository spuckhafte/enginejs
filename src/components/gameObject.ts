import { Controller, Physics, TheBody } from "../../types/types";
import Criya from "../helpers/criya";
import { PVector, Vector } from "./vectors";

/**
 * The `GameObject` class in Criya encapsulates the attributes and behavior of individual game objects, including their physical properties, appearance details, and customizable logic hooks (eg: `onrefresh` and `onready`).
 */
export class GameObject extends Criya {

    /**Physical properties of a game object, viz: position, velocity, etc. */
    physics: Physics = {
        position: new PVector(0, 0),
        velocity: new Vector(0, 0, 0, 0),
        acceleration: new Vector(0, 0, 0, 0),
    }

    /**Describe how the object will look like */
    body: TheBody = {
        width: 10,
        height: 10,
        color: 'black',
        radius: [0, '%']
    }

    /**This function will be called when the game object is ready and is on the scene */
    onready: CallableFunction | null = null;

    /**This function gets called whenever the screen refreshes */
    onrefresh: CallableFunction | null = null;

    /**This function will get called whenver this object will collide with another `collidable` object */
    onCollision: ((object: GameObject) => void) | null = null;
    
    /**Manage the controller interface (keyboard) */
    controller?: Controller = undefined;

    constructor(init?: { controller?: Controller, class?: string, id?: string }) {
        super({ 
            type: "div", 
            parent: "#app", 
            id: init?.id, 
            class: init?.class, 
        });

        this.prop = {
            ...this.prop,
            css: {
                position: 'absolute',
                transform: "translate(-50%, -50%)",
            }
        }

        this.controller = init?.controller;

        if (this?.controller?.activate) {
            window.addEventListener('keydown', ({ key }) => {
                key = key.toLowerCase()
                if (!['w', 'a', 's', 'd'].includes(key)) return;
                if (!this.physics) return;

                if (key == "w") {
                    if (this.controller?.w)
                        this.controller.w();
                    else {
                        if (this.physics.velocity.Y !== 0) return;
                        this.physics.velocity = new Vector(
                            0, Math.abs(this.physics.velocity.value() ?? 1),  
                            0, 0
                        );
                    }
                }

                if (key == "a") {
                    if (this.controller?.a)
                        this.controller.a();
                    else {
                        if (this.physics.velocity.X !== 0) return;
                        this.physics.velocity = new Vector(
                            -Math.abs(this.physics.velocity.value() ?? 1), 0,  
                            0, 0
                        );
                    }
                }

                if (key == "s") {
                    if (this.controller?.s)
                        this.controller.s();
                    else {
                        if (this.physics.velocity.Y !== 0) return;
                        this.physics.velocity = new Vector(
                            0, -Math.abs(this.physics.velocity.value() ?? 1),  
                            0, 0
                        );
                    }
                }

                if (key == "d") {
                    if (this.controller?.d)
                        this.controller.d();
                    else {
                        if (this.physics.velocity.X !== 0) return;
                        this.physics.velocity = new Vector(
                            Math.abs(this.physics.velocity.value() ?? 1), 0,  
                            0, 0
                        );
                    }
                }

                this.render();
            });
        }

        // class' [this] is getting shadowed inside the function
        const This = this;
        function __refresh() {
            

            This.physics.velocity.x += This.physics.acceleration.x;
            This.physics.velocity.y += This.physics.acceleration.y;

            This.physics.position.x += This.physics.velocity.x;
            This.physics.position.y += This.physics.velocity.y;

            This.prop = {
                ...This.prop,
                css: {
                    ...This.prop?.css,

                    left: This.physics.position.x + "px",
                    top: -This.physics.position.y + "px",

                    width: This.body.width + "px",
                    height: This.body.height + "px",
                    backgroundColor: This.body.color,

                    borderRadius: This.body.radius[0] + This.body.radius[1]
                }
            }

            This.render();
        }

        this.onSubscribed(() => {
            if (!this.effects.find(eff => eff.func.name == "__refresh")) {
                this.effect(__refresh, ['%delta%']);
            }
        });
    }
}
