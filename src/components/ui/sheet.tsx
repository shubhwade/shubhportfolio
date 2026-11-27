import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;

export function SheetContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Content>) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=open]:animate-[fadeIn_.3s_ease]" />
      <Dialog.Content
        className={cn(
          "fixed inset-x-3 top-3 z-50 rounded-3xl border border-line bg-surface p-6 shadow-2xl",
          "data-[state=open]:animate-[sheetIn_.45s_cubic-bezier(.16,1,.3,1)]",
          className,
        )}
        {...props}
      >
        {children}
        <Dialog.Close className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-line text-ink-2 hover:text-ink" aria-label="Close menu">
          <X className="size-4" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
