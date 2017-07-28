/**
 * Created by adame on 27.07.2017.
 */

declare module "gl-matrix"
{
    interface vec2type
    {
        readonly "0": number,
        readonly "1": number
    }

    interface vec3type
    {
        readonly "0": number,
        readonly "1": number
        readonly "2": number
    }

    namespace vec2
    {
        /**
         * Creates a new, empty vec2type
         *
         * @returns {vec2type} a new 2D vector
         */
        function create() : vec2type;

        /**
         * Creates a new vec2type initialized with values from an existing vector
         *
         * @param {vec2type} a vector to clone
         * @returns {vec2type} a new 2D vector
         */
        function clone(a : vec2type) : vec2type;

        /**
         * Creates a new vec2type initialized with the given values
         *
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2type} a new 2D vector
         */
        function fromValues(x : number, y : number) : vec2type;

        /**
         * Copy the values from one vec2type to another
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the source vector
         * @returns {vec2type} out
         */
        function copy(out : vec2type, a : vec2type) : vec2type;

        /**
         * Set the components of a vec2type to the given values
         *
         * @param {vec2type} out the receiving vector
         * @param {Number} x X component
         * @param {Number} y Y component
         * @returns {vec2type} out
         */
        function set(out : vec2type, x : number, y : number) : vec2type;

        /**
         * Adds two vec2type's
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {vec2type} out
         */
        function add(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Subtracts vector b from vector a
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {vec2type} out
         */
        function subtract(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Multiplies two vec2type's
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {vec2type} out
         */
        function multiply(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Divides two vec2type's
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {vec2type} out
         */
        function divide(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Math.ceil the components of a vec2type
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a vector to ceil
         * @returns {vec2type} out
         */
        function ceil(out : vec2type, a : vec2type) : vec2type;

        /**
         * Math.floor the components of a vec2type
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a vector to floor
         * @returns {vec2type} out
         */
        function floor(out : vec2type, a : vec2type) : vec2type;

        /**
         * Returns the minimum of two vec2type's
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {vec2type} out
         */
        function min(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Returns the maximum of two vec2type's
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {vec2type} out
         */
        function max(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Math.round the components of a vec2type
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a vector to round
         * @returns {vec2type} out
         */
        function round (out : vec2type, a : vec2type) : vec2type;

        /**
         * Scales a vec2type by a scalar number
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the vector to scale
         * @param {Number} b amount to scale the vector by
         * @returns {vec2type} out
         */
        function scale(out : vec2type, a : vec2type, b : number) : vec2type;

        /**
         * Adds two vec2type's after scaling the second operand by a scalar value
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @param {Number} scale the amount to scale b by before adding
         * @returns {vec2type} out
         */
        function scaleAndAdd(out : vec2type, a : vec2type, b : vec2type, scale : number) : vec2type;

        /**
         * Calculates the euclidian distance between two vec2type's
         *
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {Number} distance between a and b
         */
        function distance(a : vec2type, b : vec2type) : number;

        /**
         * Calculates the squared euclidian distance between two vec2type's
         *
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {Number} squared distance between a and b
         */
        function squaredDistance(a : vec2type, b : vec2type) : number;

        /**
         * Calculates the length of a vec2type
         *
         * @param {vec2type} a vector to calculate length of
         * @returns {Number} length of a
         */
        function length(a : vec2type) : number;

        /**
         * Calculates the squared length of a vec2type
         *
         * @param {vec2type} a vector to calculate squared length of
         * @returns {Number} squared length of a
         */
        function squaredLength (a : vec2type) : number;

        /**
         * Negates the components of a vec2type
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a vector to negate
         * @returns {vec2type} out
         */
        function negate(out : vec2type, a : vec2type) : vec2type;

        /**
         * Returns the inverse of the components of a vec2type
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a vector to invert
         * @returns {vec2type} out
         */
        function inverse(out : vec2type, a : vec2type) : vec2type;

        /**
         * Normalize a vec2type
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a vector to normalize
         * @returns {vec2type} out
         */
        function normalize(out : vec2type, a : vec2type) : vec2type;

        /**
         * Calculates the dot product of two vec2type's
         *
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {Number} dot product of a and b
         */
        function dot(a : vec2type, b : vec2type) : number;

        /**
         * Computes the cross product of two vec2type's
         * Note that the cross product must by definition produce a 3D vector
         *
         * @param {vec3type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @returns {vec3type} out
         */
        function cross(out : vec3type, a : vec2type, b : vec2type) : vec3type;

        /**
         * Performs a linear interpolation between two vec2type's
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the first operand
         * @param {vec2type} b the second operand
         * @param {Number} t interpolation amount between the two inputs
         * @returns {vec2type} out
         */
        function lerp(out : vec2type, a : vec2type, b : vec2type, t : number) : vec2type;

        /**
         * Generates a random vector with the given scale
         *
         * @param {vec2type} out the receiving vector
         * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns {vec2type} out
         */
        function random(out : vec2type, scale : number) : vec2type;

        /**
         * Transforms the vec2type with a mat2
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the vector to transform
         * @param {mat2} m matrix to transform with
         * @returns {vec2type} out
         */
        function transformMat2(out : vec2type, a : vec2type, m : mat2) : number;

        /**
         * Transforms the vec2type with a mat2d
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the vector to transform
         * @param {mat2d} m matrix to transform with
         * @returns {vec2type} out
         */
        function transformMat2d(out : vec2type, a : vec2type, m : mat2d) : vec2type;

        /**
         * Transforms the vec2type with a mat3
         * 3rd vector component is implicitly '1'
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the vector to transform
         * @param {mat3} m matrix to transform with
         * @returns {vec2type} out
         */
        function transformMat3(out : vec2type, a : vec2type, m : mat3) : vec2type;

        /**
         * Transforms the vec2type with a mat4
         * 3rd vector component is implicitly '0'
         * 4th vector component is implicitly '1'
         *
         * @param {vec2type} out the receiving vector
         * @param {vec2type} a the vector to transform
         * @param {mat4} m matrix to transform with
         * @returns {vec2type} out
         */
        function transformMat4(out : vec2type, a : vec2type, m : mat4) : vec2type;

        /**
         * Returns a string representation of a vector
         *
         * @param {vec2type} a vector to represent as a string
         * @returns {String} string representation of the vector
         */
        function str(a : vec2type) : string;

        /**
         * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
         *
         * @param {vec2type} a The first vector.
         * @param {vec2type} b The second vector.
         * @returns {Boolean} True if the vectors are equal, false otherwise.
         */
        function exactEquals(a : vec2type, b : vec2type) : boolean;

        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         *
         * @param {vec2type} a The first vector.
         * @param {vec2type} b The second vector.
         * @returns {Boolean} True if the vectors are equal, false otherwise.
         */
        function equals(a : vec2type, b : vec2type) : boolean;

        /**
         * Alias for {@link vec2type.length}
         * @function
         */
        function len(a : vec2type) : number;

        /**
         * Alias for {@link vec2type.subtract}
         * @function
         */
        function sub(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Alias for {@link vec2type.multiply}
         * @function
         */
        function mul(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Alias for {@link vec2type.divide}
         * @function
         */
        function div(out : vec2type, a : vec2type, b : vec2type) : vec2type;

        /**
         * Alias for {@link vec2type.distance}
         * @function
         */
        function dist(a : vec2type, b : vec2type) : number;

        /**
         * Alias for {@link vec2type.squaredDistance}
         * @function
         */
        function sqrDist(a : vec2type, b : vec2type) : number;

        /**
         * Alias for {@link vec2type.squaredLength}
         * @function
         */
        function sqrLen (a : vec2type) : number;

        /**
         * Perform some operation over an array of vec2types.
         *
         * @param {Array} a the array of vectors to iterate over
         * @param {Number} stride Number of elements between the start of each vec2type. If 0 assumes tightly packed
         * @param {Number} offset Number of elements to skip at the beginning of the array
         * @param {Number} count Number of vec2types to iterate over. If 0 iterates over entire array
         * @param {Function} fn Function to call for each vector in the array
         * @param {Object} [arg] additional argument to pass to fn
         * @returns {Array} a
         * @function
         */
        function forEach(a : vec2type[], stride : number, offset : number, count : number, fn : Function, arg : object) : vec2type[];
    }
}