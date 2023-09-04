import { Physics, TheBody } from "../../types";
import Criya, { criya_Init } from "../helpers/criya";
export declare class GameObject extends Criya {
    physics: Physics;
    body: TheBody;
    onready: CallableFunction | null;
    constructor(init: criya_Init);
}
