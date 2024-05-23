import { Controller, Physics, TheBody } from "../../types/types";
import Criya from "../helpers/criya";
/**
 * The `GameObject` class in Criya encapsulates the attributes and behavior of individual game objects, including their physical properties, appearance details, and customizable logic hooks (eg: `onrefresh` and `onready`).
 */
export declare class GameObject extends Criya {
    /**Physical properties of a game object, viz: position, velocity, etc. */
    physics: Physics;
    /**Describe how the object will look like */
    body: TheBody;
    /**This function will be called when the game object is ready and is on the scene */
    onready: CallableFunction | null;
    /**This function gets called whenever the screen refreshes */
    onrefresh: CallableFunction | null;
    /**This function will get called whenver this object will collide with another `collidable` object */
    onCollision: ((object: GameObject) => void) | null;
    /**Manage the controller interface (keyboard) */
    controller?: Controller;
    constructor(init?: {
        controller?: Controller;
        class?: string;
        id?: string;
    });
}
