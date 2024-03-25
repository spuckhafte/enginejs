import { PVector, Vector } from "./src"

export interface Scene_Init {
    fps: number
}

export interface Physics {
    position: PVector
    velocity: Vector
    acceleration: Vector
    mass?: number,
    collision?: 'rectangle' | 'circle',
    restitution?: number
}

export interface TheBody {
    width: number,
    height: number,
    color: string,
    /**Radius: [value, unit] */
    radius: [number, '%'|'px']
}

export interface Controller {
    activate: boolean,
    w?: () => void,
    a?: () => void,
    s?: () => void,
    d?: () => void,
}
