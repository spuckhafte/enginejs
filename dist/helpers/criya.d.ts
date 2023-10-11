export type criya_Init = {
    type: string;
    parent: string;
    class?: string;
    id?: string;
};
export type criya_Css = Partial<CSSStyleDeclaration>;
export type criya_Prop = {
    html?: string;
    text?: string;
    value?: string;
    css?: criya_Css;
} | undefined;
export type criya_Events = {
    [index in keyOf<HTMLElementEventMap>]?: EventListenerOrEventListenerObject;
} | undefined;
export type criya_Attributes = {
    [index: string]: string;
} | undefined;
export type criya_States = {
    [index: string]: any;
};
export type criya_ASubscriber<T> = {
    subscriber: T;
    states: string[];
};
export type criya_Subscribers<T> = criya_ASubscriber<T>[];
export type criya_AnEffect = {
    func: CallableFunction;
    deps: string[];
    ranOnce: boolean;
    onFirst: boolean;
    currentStates: any[];
};
export type criya_Effects = criya_AnEffect[];
export type criya_Func<T, K> = (value: T) => K;
type keyOf<T> = keyof T;
declare class Criya {
    /**Initialize the element by defining its type, parent(query-selector), classes and id*/
    init: criya_Init;
    /**Define the text, html or value(attribute) of the element */
    prop: criya_Prop;
    /**Add some events that the element will listen to like click, input etc */
    events: criya_Events;
    /**Define the attributes of the element */
    attr: criya_Attributes;
    /**The actual physical element present in the dom */
    domElement: HTMLElement | undefined;
    /**The state object, contains all the states and their current values */
    states: criya_States;
    pseudoStates: criya_States;
    /**List of all the subscribers and the states they are subscribed to */
    subscribers: criya_Subscribers<Criya>;
    private onmount;
    private onunmount;
    private onsubscribed;
    private onnewsubscriber;
    effects: criya_Effects;
    private renderCondition;
    constructor(init: criya_Init, prop?: criya_Prop, events?: criya_Events, attr?: criya_Attributes);
    /**Converts the virtual element into a physical element */
    render(): void;
    /**Append the element to the DOM */
    mount(): this;
    /**Remove the element from the DOM */
    unMount(): void;
    private _directMount;
    /**Check if this element is in the DOM */
    isMount(): boolean;
    /**Combines render and mount methods and returns the element */
    make(): this;
    /**Make an element subscribe to the other so that it can access its states as pseudo-states.
     * @param subscriber - the element which will access the states by subscribing to other.
     * @param main - the element that'll share its states.
     * @param forStates - States of the `main` element to be shared, leave the array empty to trigger all.
    */
    static subscribe(subscriber: Criya, main: Criya, forStates: string[]): void;
    /**States are internal variables that when change automatically update their special references in some specific properties, i.e., `html, text, css, value, class, id`
     * @param stateName - name of the state
     * @param initialValue - initial value of the state
     * @returns Two functions in an array, one to get state (non reactive) another to set state
    */
    state<T>(stateName: string, initialValue: T, autoRender?: boolean): [(() => T), ((newVal: T | criya_Func<T, T>) => void)];
    /**
     * Effects are functions that get called when some states or pseudoStates (dependencies) change
     * @param func - this function will get called when the dependencies change
     * @param dependencyArray - add states that will affect the effect, examples:
     * - `['$count$', '%color%']`
     * - `['f']`
     * - `['e']`
     * @param onFirst - `default: true`, by default every effect runs on its first render whether the deps change or not.
     * */
    effect(func: CallableFunction, dependencyArray: string[], onFirst?: boolean): void;
    /**Define a condition for when an element should be in the DOM
     * @param condition - function or a text condition that'll return boolean signifying mount or not, eg:
     * - Function - `putIf(() => state() > 2)`
     * - Text - `putIf('$state$ > 2')`
     * - Conditions can include pseudo-states also
     * @param stick - if true, the element will be in its position after remounting. Bydefault: `false`
     * @returns a [getter and setter] (just like `.state` does) for the "sticky" state
    */
    putIf(condition: ((() => boolean) | string), stick?: boolean): [() => boolean, (newVal: boolean | criya_Func<boolean, boolean>) => void];
    /**Called when the element is added to the dom */
    onMount(func: ((didMount?: boolean) => void)): void;
    /**Called when the element is removed from the dom */
    onUnmount(func: CallableFunction): void;
    /**Called on the element to which the subscriber is subscribing when subscription is added */
    onNewSubscriber(func: CallableFunction): void;
    /**Called on the subscriber element when subscription is added */
    onSubscribed(func: CallableFunction): void;
    private getState;
    private getPState;
    private formatString;
    private stateExtracter;
}
declare const subscribe: typeof Criya.subscribe;
export { subscribe };
export default Criya;
