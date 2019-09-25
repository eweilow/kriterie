import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";

import { FallbackResponse } from "./fallbackResponse";
import { TouchResponder } from "./responder";
import { TouchResponseShape } from "./response";
import { Press } from "./types";

type ReturnProps<TElement extends HTMLElement = HTMLButtonElement> = {
  onPointerDown?: (e: React.PointerEvent<TElement>) => void;
  onPointerUp?: (e: React.PointerEvent<TElement>) => void;
  onPointerCancel?: (e: React.PointerEvent<TElement>) => void;
  onPointerEnter?: (e: React.PointerEvent<TElement>) => void;
  onPointerOut?: (e: React.PointerEvent<TElement>) => void;
  onPointerLeave?: (e: React.PointerEvent<TElement>) => void;
  onTouchEnd?: (e: React.TouchEvent<TElement>) => void;
  onTouchStart?: (e: React.TouchEvent<TElement>) => void;
  onTouchCancel?: (e: React.TouchEvent<TElement>) => void;
  onMouseDown?: (e: React.MouseEvent<TElement, MouseEvent>) => void;
  onMouseUp?: (e: React.MouseEvent<TElement, MouseEvent>) => void;
};
type ReturnValue<TElement extends HTMLElement = HTMLButtonElement> = [
  ReturnProps<TElement>,
  React.ReactElement
];

export function useTouchResponder<
  TElement extends HTMLElement = HTMLButtonElement
>(
  color: string,
  opacity: number,
  shape: TouchResponseShape = TouchResponseShape.Circular
): ReturnValue<TElement> {
  if (
    !(typeof window !== "undefined" && (window as any).PointerEvent) ||
    shape === TouchResponseShape.NoRipple
  ) {
    const time = 120;
    const [lastTouch, setLastTouch] = useState(0);
    const [touching, setTouching] = useState(false);

    if (typeof window !== "undefined") {
      useLayoutEffect(() => {
        const delay = lastTouch + time - Date.now();
        if (delay >= 0) {
          const id = setTimeout(() => {
            setTouching(false);
          }, delay);
          return () => clearTimeout(id);
        }
        return;
      }, [lastTouch]);
    }

    const onTouchStart: (
      e: React.TouchEvent<TElement>
    ) => void = useCallback(() => {
      setTouching(true);
      setLastTouch(Date.now());
    }, []);
    const onMouseDown: (
      e: React.MouseEvent<TElement>
    ) => void = useCallback(() => {
      setTouching(true);
      setLastTouch(Date.now());
    }, []);

    return [
      {
        onTouchStart,
        onMouseDown
      },
      <span suppressHydrationWarning key="touchTarget">
        <FallbackResponse color={color} opacity={opacity} touching={touching} />
      </span>
    ];
  }
  const props: ReturnProps<TElement> = {};
  const [activePress, setActivePress] = useState<Press | null>(null);
  const previousPointerId = useRef<number | null>(null);
  const currentTarget = useRef<TElement | null>(null);
  props.onPointerDown = useCallback((e: React.PointerEvent<TElement>) => {
    if (!e.isPrimary) {
      return;
    }
    if (
      previousPointerId.current != null &&
      previousPointerId.current !== e.pointerId
    ) {
      return;
    }
    previousPointerId.current = e.pointerId;
    currentTarget.current = e.currentTarget;
    // currentTarget.current.setPointerCapture(e.pointerId);
    const rect = e.currentTarget.getBoundingClientRect();
    setActivePress([
      e.clientX - rect.left,
      e.clientY - rect.top,
      Math.max(
        Math.hypot(
          Math.abs(e.clientX - rect.left),
          Math.abs(e.clientY - rect.top)
        ),
        Math.hypot(
          Math.abs(e.clientX - rect.right),
          Math.abs(e.clientY - rect.top)
        ),
        Math.hypot(
          Math.abs(e.clientX - rect.left),
          Math.abs(e.clientY - rect.bottom)
        ),
        Math.hypot(
          Math.abs(e.clientX - rect.right),
          Math.abs(e.clientY - rect.bottom)
        )
      )
    ]);
  }, []);

  props.onPointerLeave = useCallback((e: React.PointerEvent<TElement>) => {
    if (previousPointerId.current !== e.pointerId) {
      return;
    }
    document.addEventListener("pointerup", cancel);
  }, []);

  useEffect(() => {
    return () => document.removeEventListener("pointerup", cancel);
  }, []);

  const cancel = useCallback((e: PointerEvent) => {
    if (previousPointerId.current !== e.pointerId) {
      return;
    }
    document.removeEventListener("pointerup", cancel);
    setActivePress(null);
    previousPointerId.current = null;
    if (currentTarget.current != null) {
      // currentTarget.current.releasePointerCapture(e.pointerId);
    }
    currentTarget.current = null;
  }, []);

  props.onPointerUp = props.onPointerCancel = (cancel as any) as ((
    e: React.PointerEvent<TElement>
  ) => void);

  return [
    props,
    <span suppressHydrationWarning key="touchResponder">
      <TouchResponder
        shape={shape}
        color={color}
        opacity={opacity}
        activePress={activePress}
      />
    </span>
  ];
}
