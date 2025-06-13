"use client";

import {
  forwardRef,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { cn } from "../../lib/utils";

const SheetContext = createContext({});

function Sheet({ children, open = false, onOpenChange }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SheetContext.Provider>
  );
}

const SheetTrigger = forwardRef(
  ({ className, children, asChild = false, ...props }, ref) => {
    const { setIsOpen } = useContext(SheetContext);
    const Comp = asChild ? "div" : "button";

    return (
      <Comp
        ref={ref}
        className={className}
        onClick={() => setIsOpen(true)}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);
SheetTrigger.displayName = "SheetTrigger";

const SheetContent = forwardRef(
  ({ className, children, side = "right", ...props }, ref) => {
    const { isOpen, setIsOpen } = useContext(SheetContext);

    if (!isOpen) return null;

    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsOpen(false)}
        />
        <div
          ref={ref}
          className={cn(
            "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
            {
              "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm": side === "right",
              "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm": side === "left",
              "inset-x-0 top-0 h-auto": side === "top",
              "inset-x-0 bottom-0 h-auto": side === "bottom",
            },
            className
          )}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
