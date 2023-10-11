/**
 * The `Vector` class is a versatile utility for performing essential two-dimensional vector operations. It encompasses functions for calculating vector magnitude, angle with the x-axis, dot product with other vectors, scaling, and normalization.
*/
export declare class Vector {
    x: number;
    x0: number;
    y: number;
    y0: number;
    constructor(x: number, y: number, x0: number, y0: number);
    /**Magnitude of vector. */
    value(): number;
    /**Angle with the x-axis. */
    dirn(): number;
    /**Dot product of "vec" vector with the OG vector. */
    dot(vec: Vector): number;
    /**Multiply a scalar to the OG vector. */
    scale(scalar: number): Vector;
    /**Get a unit vector along the OG vector. */
    normalize(): Vector;
    /**Flips the sign of each component and returns a new vector. */
    flip(): Vector;
    /**Parallel transforms a vector to origin */
    shiftToPVector(): PVector;
    /**Net component in X-direction. */
    get X(): number;
    /**Net component in Y-direction. */
    get Y(): number;
}
/**
 * The `PVector` class is a specialized version of the `Vector` class, designed for representing position vectors. It simplifies the creation of position vectors with default origin values and provides a method for calculating vectors pointing from the current position to a specified destination.
 */
export declare class PVector extends Vector {
    constructor(x: number, y: number);
    /**Calculate vector going from one to another */
    vectorTo(vec: PVector): Vector;
    /**Calculate resultant vector */
    resultant(vec: PVector): Vector;
}
