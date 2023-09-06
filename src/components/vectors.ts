/**
 * The `Vector` class is a versatile utility for performing essential two-dimensional vector operations. It encompasses functions for calculating vector magnitude, angle with the x-axis, dot product with other vectors, scaling, and normalization.
*/
export class Vector {
    x: number; x0: number;
    y: number; y0: number;

    constructor(x: number, y: number, x0: number, y0: number) {
        this.x = x; this.y = y;
        this.x0 = x0; this.y0 = y0;
    }

    /**Magnitude of vector */
    value() {
        return Math.sqrt(
            Math.pow(this.X, 2) + 
            Math.pow(this.Y, 2)
        );
    }

    /**Angle with the x-axis */
    dirn() {
        return Math.atan2(this.Y, this.X);
    }

    /**Dot product of "vec" vector with the OG vector */
    dot(vec: Vector) {
        return (
            (this.X * vec.X) + (this.Y * vec.Y)
        );
    }

    /**Multiply a scalar to the OG vector */
    scale(scalar: number) {
        return new Vector(
            this.x0 + (scalar * this.X), 
            this.y0 + (scalar * this.Y), 
            this.x0, 
            this.y0
        );
    }

    /**Get a unit vector along the OG vector */
    normalize() {
        return new Vector(
            this.X / this.value(),
            this.Y / this.value(),
            this.x0,
            this.y0
        )
    }

    /**Flips the sign of each component and returns a new vector */
    flip() {
        return new Vector(
            -this.x, -this.y,
            this.x0, this.y0
        );
    }

    /**Net component in X-direction */
    get X() {
        return this.x - this.x0
    }

    /**Net component in Y-direction */
    get Y() {
        return this.y - this.y0
    }
}

/**
 * The `PVector` class is a specialized version of the `Vector` class, designed for representing position vectors. It simplifies the creation of position vectors with default origin values and provides a method for calculating vectors pointing from the current position to a specified destination.
 */
export class PVector extends Vector {
    constructor(x: number, y :number) {
        super(x, y, 0, 0);
    }

    vectorTo(vec: PVector) {
        return new Vector(
            vec.x, vec.y,
            this.x, this.y
        );
    }
}