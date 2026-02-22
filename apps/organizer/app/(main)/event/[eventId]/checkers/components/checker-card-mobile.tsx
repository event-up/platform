import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Mail, Trash2, User } from "lucide-react";

interface Entrance {
  id: string;
  name: string;
}

interface CheckerCardMobileProps {
  name: string;
  email: string;
  assignedEntranceId: string | undefined;
  entrances: Entrance[];
  unassignedValue: string;
  onAssign: (entranceId: string) => void;
  onRemove: () => void;
}

export function CheckerCardMobile({
  name,
  email,
  assignedEntranceId,
  entrances,
  unassignedValue,
  onAssign,
  onRemove,
}: CheckerCardMobileProps) {
  return (
    <Card className=" p-0 ">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <User className="h-4 w-4 text-muted-foreground" />
            {name}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {email}
        </div>
        <Select
          value={assignedEntranceId || unassignedValue}
          onValueChange={onAssign}
        >
          <SelectTrigger size="sm" className="w-full">
            <SelectValue placeholder="Assign entrance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={unassignedValue}>
              <span className="text-muted-foreground">Unassigned</span>
            </SelectItem>
            {entrances.map((entrance) => (
              <SelectItem key={entrance.id} value={entrance.id}>
                {entrance.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
}
