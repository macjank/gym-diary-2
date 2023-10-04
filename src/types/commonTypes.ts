/* eslint-disable @typescript-eslint/no-explicit-any */
export type SomeObj = Record<string, any>;

export type Dictionary = Record<string, string>;

export type ValueOf<T> = T[keyof T];

export type SomeError = Error & SomeObj;

export type EventDefault<T = Event> = (event: T) => void;
export type OnClickDefault<T = Element> = EventDefault<React.MouseEvent<T>>;
export type OnChangeDefault<T = Element> = EventDefault<React.ChangeEvent<T>>;
export type OnSelectDefault<T = Element> = EventDefault<React.ChangeEvent<T>>;
export type OnBlurDefault<T = Element> = EventDefault<React.FocusEvent<T>>;
export type OnFocusDefault<T = Element> = EventDefault<React.FocusEvent<T>>;
export type OnKeyboardEventDefault<T = Element> = EventDefault<React.KeyboardEvent<T>>;

export type CallbackDefault = () => void;
export type PromiseCallbackDefault = () => Promise<void>;

export type CallbackSomeData<T = any> = (data?: T) => void;

export type EffectWithoutPayload = () => Promise<void> | void;

export type ArrayOfSomeObj = SomeObj[];

export type ReactReducer<S, A> = (state: S, action: A) => S;

interface ReactReducerActionSimple<T = string> {
  type: T;
}

export interface ReactReducerAction<T = string, P = unknown> extends ReactReducerActionSimple<T> {
  payload: P;
}

export type Timeout = ReturnType<typeof setTimeout>;
export type Timer = ReturnType<typeof setInterval>;

export type TypeFromConstObject<T> = T extends Record<string, infer U> ? U : never;
