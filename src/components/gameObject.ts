import { Physics, TheBody } from "../../types";
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

    constructor(init?: { class?: string, id?: string }) {
        super({ type: "div", parent: "#app", ...init });

        this.prop = {
            ...this.prop,
            css: {
                position: 'absolute',
                transform: "translate(-50%, -50%)",
            }
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