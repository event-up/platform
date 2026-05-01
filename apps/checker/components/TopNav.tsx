"use client";

import Image from "next/image";
import * as React from "react";
import { ChevronDown, LogOut } from "lucide-react";

import { useAuth } from "@/lib/auth-context";

function getUserLabel(displayName: string | null, email: string | null) {
  const name = (displayName ?? "").trim();
  if (name) return name;
  const mail = (email ?? "").trim();
  if (!mail) return "Account";
  return mail.split("@")[0] || mail;
}

export default function TopNav() {
  const { user, signOut } = useAuth();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  const userLabel = React.useMemo(
    () => getUserLabel(user.displayName, user.email),
    [user.displayName, user.email],
  );

  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onLogout = async () => {
    setOpen(false);
    await signOut();
  };

  return (
    <div className="sticky fixed top-0 z-50 pt-safe">
      <div className="px-4 pt-4 pb-2 sm:px-6">
        <div className="mx-auto max-w-md">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-[20px] border border-border/50 bg-background/80 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl">
              <Image
                src="/images/eventup-logo-full.svg"
                alt="EventUp"
                width={80}
                height={30}
                priority
              />
            </div>

            <div className="relative  " ref={menuRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className="flex max-w-[6rem] items-center gap-2 rounded-[20px] border border-border/50 bg-background/80 px-3 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl transition-colors hover:bg-background/90"
              >
                <span className="max-w-[10.5rem] truncate text-sm font-semibold">
                  {userLabel}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open ? (
                <div
                  role="menu"
                  aria-label="User menu"
                  className="absolute  right-0 mt-2 w-44 overflow-hidden rounded-[20px] border border-border/50 bg-background/95 shadow-[0_16px_48px_rgba(0,0,0,0.16)] backdrop-blur-xl"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={onLogout}
                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-semibold transition-colors hover:bg-muted/60"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
