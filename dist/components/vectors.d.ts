export declare class Vector {
    x: number;
    x0: number;
    y: number;
    y0: number;
    constructor(x: number, y: number, x0: number, y0: number);
    value(): number;
    dirn(): number;
    dot(vec: Vector): number;
    scale(scalar: number): Vector;
    normalize(): Vector;
    flip(): Vector;
    shiftToPVector(): PVector;
    get X(): number;
    get Y(): number;
}
export declare class PVector extends Vector {
    constructor(x: number, y: number);
    vectorTo(vec: PVector): Vector;
    resultant(vec: PVector): Vector;
}
