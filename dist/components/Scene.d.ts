import { Scene_Init } from "../../types";
import Criya from "../helpers/criya";
import { GameObject } from "./gameObject";
export declare class Scene {
    fps: number;
    private delta;
    gameObjects: GameObject[];
    element: Criya;
    G: number;
    private massyObjects;
    private collidables;
    constructor(init: Scene_Init);
    pack(items: GameObject[]): void;
    start(): void;
    private gravitySimulator;
    private collisonDetector;
    private afterCollision;
}
