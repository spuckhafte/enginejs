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
    init: criya_Init;
    prop: criya_Prop;
    events: criya_Events;
    attr: criya_Attributes;
    domElement: HTMLElement | undefined;
    states: criya_States;
    pseudoStates: criya_States;
    subscribers: criya_Subscribers<Criya>;
    private onmount;
    private onunmount;
    private onsubscribed;
    private onnewsubscriber;
    effects: criya_Effects;
    private renderCondition;
    constructor(init: criya_Init, prop?: criya_Prop, events?: criya_Events, attr?: criya_Attributes);
    render(): void;
    mount(): this;
    unMount(): void;
    private _directMount;
    isMount(): boolean;
    make(): this;
    static subscribe(subscriber: Criya, main: Criya, forStates: string[]): void;
    state<T>(stateName: string, initialValue: T, autoRender?: boolean): [(() => T), ((newVal: T | criya_Func<T, T>) => void)];
    effect(func: CallableFunction, dependencyArray: string[], onFirst?: boolean): void;
    putIf(condition: ((() => boolean) | string), stick?: boolean): [() => boolean, (newVal: boolean | criya_Func<boolean, boolean>) => void];
    onMount(func: ((didMount?: boolean) => void)): void;
    onUnmount(func: CallableFunction): void;
    onNewSubscriber(func: CallableFunction): void;
    onSubscribed(func: CallableFunction): void;
    private getState;
    private getPState;
    private formatString;
    private stateExtracter;
}
declare const subscribe: typeof Criya.subscribe;
export { subscribe };
export default Criya;
