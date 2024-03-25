import { Scene_Init } from "../../types";
import Criya from "../helpers/criya";
import { GameObject } from "./gameObject";
/**
 * The `Scene` class is the core component in Criya applications, serving as a container for game objects and orchestrating their interactions. It allows developers to define the FPS for animations, pack multiple game objects within the scene, and manage gravitational simulations.
*/
export declare class Scene {
    fps: number;
    private delta;
    /**This function will get called on every refresh after all internal methods complete.  */
    requestFrame: CallableFunction | null;
    /**All the GameObjects packed in this scene */
    gameObjects: GameObject[];
    /**Criya element, parent of all the packed gameObjects in this scene */
    element: Criya;
    /**Gravitational constant */
    G: number;
    massyObjects: GameObject[];
    collidables: GameObject[];
    constructor(init: Scene_Init);
    /**Bind different GameObjects in this scene (before starting the animation, i.e., before using `.start`) */
    pack(items: GameObject[]): void;
    /**Bind a new element to the scene anytime anywhere. */
    newBind(object: GameObject): void;
    start(): void;
    /**Calculates and apply gravitational effects on every "massy" object due to every "massy" object */
    private gravitySimulator;
    /**Checks if any of the `collidables` is colliding with another */
    private collisonDetector;
    private afterCollision;
}
