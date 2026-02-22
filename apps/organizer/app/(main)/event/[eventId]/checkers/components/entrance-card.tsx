import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { Input } from "@workspace/ui/components/input";
import { Trash2, User } from "lucide-react";

interface AssignedChecker {
  id: string;
  name: string;
}

interface EntranceCardProps {
  index: number;
  name: string;
  assignedCheckers: AssignedChecker[];
  canRemove: boolean;
  onRename: (newName: string) => void;
  onRemove: () => void;
}

export function EntranceCard({
  index,
  name,
  assignedCheckers,
  canRemove,
  onRename,
  onRemove,
}: EntranceCardProps) {
  return (
    <Card>
      <CardContent className=" space-y-3">
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="shrink-0">
            {index + 1}
          </Badge>
          <Input
            value={name}
            onChange={(e) => onRename(e.target.value)}
            className="flex-1"
            placeholder="Entrance name"
          />
          {canRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={onRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Assigned checkers */}
        {assignedCheckers.length > 0 ? (
          <div className="flex flex-wrap gap-2 pl-10">
            {assignedCheckers.map((checker) => (
              <Badge
                key={checker.id}
                variant="outline"
                className="text-xs font-normal"
              >
                <User className="h-3 w-3 mr-1" />
                {checker.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-xs text-muted-foreground/60 pl-10">
            No checkers assigned
          </p>
        )}
      </CardContent>
    </Card>
  );
}
