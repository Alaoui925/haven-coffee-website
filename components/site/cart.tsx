"use client";

import * as React from "react";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type CartItem = {
  id: string;
  label: string;
  sublabel: string;
  price: number;
  kind: "roast" | "plan";
};

type Toast = { id: number; message: string };

type CartContextValue = {
  count: number;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  total: number;
  toast: (message: string) => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [toast, setToast] = React.useState<Toast | null>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = React.useCallback((message: string) => {
    if (timer.current) clearTimeout(timer.current);
    const id = Date.now();
    setToast({ id, message });
    timer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  const addItem = React.useCallback(
    (item: CartItem) => {
      setItems((prev) => [...prev, item]);
      if (item.kind === "plan") {
        showToast(`${item.label} reserved — first roast this Thursday.`);
      } else {
        showToast(`${item.label} added to your bag — roasted Thursday, shipped Friday.`);
      }
    },
    [showToast],
  );

  const count = items.length;
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const value = React.useMemo(
    () => ({ count, items, addItem, total, toast: showToast }),
    [count, items, addItem, total, showToast],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      {toast ? (
        <div
          key={toast.id}
          className="pointer-events-none fixed inset-x-0 bottom-6 z-70 flex justify-center px-4"
        >
          <div
            role="status"
            aria-live="polite"
            className="animate-fade-up pointer-events-auto flex max-w-md items-start gap-3 rounded-lg border border-input bg-popover px-4 py-3 shadow-lg"
          >
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground">{toast.message}</p>
          </div>
        </div>
      ) : null}
    </CartContext.Provider>
  );
}

export function CartInline({ className }: { className?: string }) {
  const { count, items, total, toast } = useCart();
  return (
    <button
      type="button"
      onClick={() =>
        count === 0
          ? toast("Your bag is empty — the drops are one scroll down.")
          : toast(
              `Bag: ${items.map((item) => item.id).join(" · ")} — ${count} ${count === 1 ? "item" : "items"}, $${total.toFixed(2)} total.`,
            )
      }
      className={cn("group relative inline-flex size-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-accent", className)}
      aria-label={count === 0 ? "Open bag, empty" : `Open bag, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
        <path d="M6 8h12l-1 12a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      {count > 0 ? (
        <span
          key={count}
          className="animate-fade-up absolute -top-1 -right-1 grid size-4.5 place-items-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}
