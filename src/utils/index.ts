/**
 * Promise Wrapper to always return a promise in an array like approach
 *
 * @export
 * @template T
 * @param {Promise<T>} promise
 * @param {object} errorExt
 * @returns {Promise<[object, T]>}
 */
export function to<T>(promise: Promise<T>, errorExt?: any): Promise<[any, T]> {
    return promise
        .then((data: T) => [undefined, data])
        .catch((err: object) => {

            if (errorExt) {
                Object.assign(err, errorExt);
            }

            return [err, undefined];
        }) as Promise<[any, T]>;
}

/**
 * A simple broadcast class created in a "Reactive" model
 * @constructor
 * @template T t
 */
export class Subject<T> {

    _changeObservers: { (param: T): void; }[] = [];

    /**
     * Subscribe to listener new messages about this subject
     * @public
     * @memberof Subject
     * @param {function(t: T)} fn function passed as parameter
     */
    subscribe = (fn: (T) => void) => {
        this._changeObservers.push(fn);
    };

    /**
     * Remove subscription about this subject
     * It's a best practice unsubscribe in the  app dispose life cycle
     * @public
     * @memberof Subject
     * @param {function(t: T)} fn function passed as parameter
     */
    unsubscribe = (fn: (T) => void) => {
        this._changeObservers = this
            ._changeObservers
            .filter((item) => {
                if (item !== fn) return item;
            });
    };


    /**
     * Emits a new value on this stream
     * @param {T} newObject
     * @memberof Subject
     */
    emit = (newObject: T) => {
        this._changeObservers.forEach((observer) => observer(newObject));
    }

}
