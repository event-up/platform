"use client";

import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { Plus } from "lucide-react";

interface Checker {
  name: string;
  email: string;
}

interface AddCheckerSheetProps {
  onAdd: (checker: Checker) => void;
}

export function AddCheckerSheet({ onAdd }: AddCheckerSheetProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    onAdd({ name: name.trim(), email: email.trim() });
    setName("");
    setEmail("");
    setOpen(false);
  };

  return (
    <Sheet  open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Checker
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-1/2 p-2">
        <SheetHeader>
          <SheetTitle>Add Checker</SheetTitle>
          <SheetDescription>
            Add a person who will scan and verify tickets at the event.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
          <div className="space-y-2">
            <Label htmlFor="checker-name">Name</Label>
            <Input
              id="checker-name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="checker-email">Email</Label>
            <Input
              id="checker-email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit">Add Checker</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
