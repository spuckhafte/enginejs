import { Physics, TheBody } from "../../types";
import Criya from "../helpers/criya";
export declare class GameObject extends Criya {
    physics: Physics;
    body: TheBody;
    onready: CallableFunction | null;
    onrefresh: CallableFunction | null;
    constructor(init?: {
        class?: string;
        id?: string;
    });
}
