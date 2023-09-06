import { Physics, TheBody } from "../../types";
import Criya from "../helpers/criya";
export declare class GameObject extends Criya {
    physics: Physics;
    body: TheBody;
    onready: CallableFunction | null;
    onrefresh: CallableFunction | null;
    onCollision: ((object: GameObject) => void) | null;
    constructor(init?: {
        class?: string;
        id?: string;
    });
}
