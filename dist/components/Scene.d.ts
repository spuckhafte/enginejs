import { Scene_Init } from "../../types";
import Criya from "../helpers/criya";
import { GameObject } from "./gameObject";
export declare class Scene {
    fps: number;
    private delta;
    requestFrame: CallableFunction | null;
    gameObjects: GameObject[];
    element: Criya;
    G: number;
    massyObjects: GameObject[];
    collidables: GameObject[];
    constructor(init: Scene_Init);
    pack(items: GameObject[]): void;
    newBind(object: GameObject): void;
    start(): void;
    private gravitySimulator;
    private collisonDetector;
    private afterCollision;
}
