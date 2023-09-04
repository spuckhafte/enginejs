import { Scene_Init } from "../../types";
import Criya, { criya_Func } from "../helpers/criya";
import { GameObject } from "./gameObject";
export declare class Scene {
    fps: number;
    delta: (newVal: number | criya_Func<number, number>) => void;
    gameObjects: GameObject[];
    element: Criya;
    constructor(init: Scene_Init);
    pack(items: GameObject[]): void;
    start(): void;
}
