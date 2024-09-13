import type { IncomingMessage } from "http";
import type { Dispatch, SetStateAction } from "react";
import type React from "react";

export type MouseEvent = React.MouseEvent<HTMLButtonElement | HTMLElement>;
export type MouseEventHandler = React.MouseEventHandler<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
export type FocusEvent = React.FocusEvent<HTMLInputElement>;
export type KeyboardEvent = React.KeyboardEvent<HTMLButtonElement>;
export type SetState<T> = Dispatch<SetStateAction<T>>;
export type Request = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};
