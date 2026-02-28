"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Plus, DoorOpen, UserCheck, Command } from "lucide-react";

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Switch } from "@workspace/ui/components/switch";

import { AddCheckerSheet } from "./components/add-checker-sheet";
import { CheckerCardMobile } from "./components/checker-card-mobile";
import { CheckerTable } from "./components/checker-table";
import { EntranceCard } from "./components/entrance-card";
import {
  CheckerModeSelector,
  type CheckerMode,
} from "./components/checker-mode-selector";
import { ScannerLinkSection } from "./components/scanner-link-section";

interface Checker {
  id: string;
  name: string;
  email: string;
}

interface Entrance {
  id: string;
  name: string;
}

type Assignments = Record<string, string>;
const UNASSIGNED = "__unassigned__";

export default function CheckersPage() {
  const { eventId } = useParams<{ eventId: string }>();

  // Mode selection
  const [selectedMode, setSelectedMode] = useState<CheckerMode | null>(null);
  const [modeConfirmed, setModeConfirmed] = useState(false);

  // Checkers state
  const [checkers, setCheckers] = useState<Checker[]>([]);

  // Entrances state — starts with one default entrance
  const [entrances, setEntrances] = useState<Entrance[]>([
    { id: crypto.randomUUID(), name: "Main Entrance" },
  ]);

  // Check-in enabled toggle
  const [checkInEnabled, setCheckInEnabled] = useState(false);

  // Assignments: checkerId -> entranceId
  const [assignments, setAssignments] = useState<Assignments>({});

  // --- Checker handlers ---
  const handleAddChecker = (checker: { name: string; email: string }) => {
    setCheckers((prev) => [...prev, { id: crypto.randomUUID(), ...checker }]);
  };

  const handleRemoveChecker = (id: string) => {
    setCheckers((prev) => prev.filter((c) => c.id !== id));
    setAssignments((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // --- Entrance handlers ---
  const handleAddEntrance = () => {
    setEntrances((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: `Entrance ${prev.length + 1}` },
    ]);
  };

  const handleRemoveEntrance = (id: string) => {
    if (entrances.length <= 1) return;
    setEntrances((prev) => prev.filter((e) => e.id !== id));
    setAssignments((prev) => {
      const next = { ...prev };
      for (const [checkerId, entranceId] of Object.entries(next)) {
        if (entranceId === id) delete next[checkerId];
      }
      return next;
    });
  };

  const handleRenameEntrance = (id: string, newName: string) => {
    setEntrances((prev) =>
      prev.map((e) => (e.id === id ? { ...e, name: newName } : e))
    );
  };

  // --- Assignment handlers ---
  const handleAssign = (checkerId: string, entranceId: string) => {
    setAssignments((prev) => {
      if (entranceId === UNASSIGNED) {
        const next = { ...prev };
        delete next[checkerId];
        return next;
      }
      return { ...prev, [checkerId]: entranceId };
    });
  };

  const getCheckersForEntrance = (entranceId: string): Checker[] =>
    checkers.filter((c) => assignments[c.id] === entranceId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Checkers & Entrances</h1>
        <p className="text-muted-foreground">
          Manage checkers and entrances of your event
        </p>
      </div>

      {/* Step 1 — Mode selection */}
      {!modeConfirmed ? (
        <CheckerModeSelector
          selected={selectedMode}
          onSelect={setSelectedMode}
          onNext={() => setModeConfirmed(true)}
        />
      ) : selectedMode === "copy-link" ? (
        /* ── Copy Link mode ─────────────────── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Entrances column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex gap-2 flex-wrap items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <DoorOpen className="h-5 w-5 text-muted-foreground" />
                Entrances
              </h2>
              <Button size="sm" variant="outline" onClick={handleAddEntrance}>
                <Plus className="h-4 w-4 mr-1" />
                Add Entrance
              </Button>
            </div>
            <div className="grid gap-4">
              {entrances.map((entrance, index) => (
                <EntranceCard
                  key={entrance.id}
                  index={index}
                  name={entrance.name}
                  assignedCheckers={[]}
                  canRemove={entrances.length > 1}
                  onRename={(newName) => handleRenameEntrance(entrance.id, newName)}
                  onRemove={() => handleRemoveEntrance(entrance.id)}
                />
              ))}
            </div>
          </div>

          {/* Scanner link column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Command className="h-5 w-5 text-muted-foreground" />
              Scanner Access
            </h2>
            <ScannerLinkSection eventId={eventId} />
          </div>
        </div>
      ) : (
        /* ── Assign Checkers mode ──────────── */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column — Checkers List + Control */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3 space-x-2 justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-muted-foreground" />
                  Checkers
                </h2>
                <AddCheckerSheet onAdd={handleAddChecker} />
              </div>
              {checkers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center rounded-md border">
                  <UserCheck className="h-10 w-10 text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">No checkers added yet</p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    Add checkers who will scan tickets at the event
                  </p>
                </div>
              ) : (
                <>
                  {/* Mobile: Card view */}
                  <div className="grid gap-3 md:hidden">
                    {checkers.map((checker) => (
                      <CheckerCardMobile
                        key={checker.id}
                        name={checker.name}
                        email={checker.email}
                        assignedEntranceId={assignments[checker.id]}
                        entrances={entrances}
                        unassignedValue={UNASSIGNED}
                        onAssign={(value) => handleAssign(checker.id, value)}
                        onRemove={() => handleRemoveChecker(checker.id)}
                      />
                    ))}
                  </div>
                  {/* Desktop: Table view */}
                  <CheckerTable
                    checkers={checkers}
                    entrances={entrances}
                    assignments={assignments}
                    unassignedValue={UNASSIGNED}
                    onAssign={handleAssign}
                    onRemove={handleRemoveChecker}
                  />
                </>
              )}
            </div>

            {/* Control */}
            <div className="space-y-2">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Command className="h-5 w-5 text-muted-foreground" />
                Control
              </h2>
              <Card className="p-0">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">Enable Check-in</h3>
                        {checkInEnabled ? (
                          <Badge variant="default" className="text-xs">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Inactive</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {checkInEnabled
                          ? "Checkers can now scan tickets at their assigned entrances."
                          : "Enable check-in to allow checkers to start scanning tickets."}
                      </p>
                    </div>
                    <Switch
                      checked={checkInEnabled}
                      onCheckedChange={setCheckInEnabled}
                      disabled={checkers.length === 0}
                    />
                  </div>
                  {checkers.length === 0 && (
                    <p className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t">
                      Add at least one checker before enabling check-in.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column — Entrances */}
          <div className="space-y-4">
            <div className="flex gap-2 flex-wrap items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <DoorOpen className="h-5 w-5 text-muted-foreground" />
                Entrances
              </h2>
              <Button size="sm" variant="outline" onClick={handleAddEntrance}>
                <Plus className="h-4 w-4 mr-1" />
                Add Entrance
              </Button>
            </div>
            <div className="grid gap-4">
              {entrances.map((entrance, index) => {
                const assignedCheckers = getCheckersForEntrance(entrance.id);
                return (
                  <EntranceCard
                    key={entrance.id}
                    index={index}
                    name={entrance.name}
                    assignedCheckers={assignedCheckers}
                    canRemove={entrances.length > 1}
                    onRename={(newName) => handleRenameEntrance(entrance.id, newName)}
                    onRemove={() => handleRemoveEntrance(entrance.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Change mode link */}
      {modeConfirmed && (
        <button
          type="button"
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
          onClick={() => {
            setModeConfirmed(false);
            setSelectedMode(null);
          }}
        >
          ← Change access method
        </button>
      )}
    </div>
  );
}
