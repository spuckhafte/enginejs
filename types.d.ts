import { PVector, Vector } from "./src"

export interface Scene_Init {
    fps: number
}

export interface Physics {
    position: PVector
    velocity: Vector
    acceleration: Vector
    mass?: number,
}

export interface TheBody {
    width: number,
    height: number,
    color: string,
}