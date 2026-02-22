import { Button } from "@workspace/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { Mail, Trash2, User } from "lucide-react";

interface Checker {
  id: string;
  name: string;
  email: string;
}

interface Entrance {
  id: string;
  name: string;
}

interface CheckerTableProps {
  checkers: Checker[];
  entrances: Entrance[];
  assignments: Record<string, string>;
  unassignedValue: string;
  onAssign: (checkerId: string, entranceId: string) => void;
  onRemove: (checkerId: string) => void;
}

export function CheckerTable({
  checkers,
  entrances,
  assignments,
  unassignedValue,
  onAssign,
  onRemove,
}: CheckerTableProps) {
  return (
    <div className="rounded-md border hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Entrance</TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {checkers.map((checker) => (
            <TableRow key={checker.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  {checker.name}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {checker.email}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <Select
                  value={assignments[checker.id] || unassignedValue}
                  onValueChange={(value) => onAssign(checker.id, value)}
                >
                  <SelectTrigger size="sm" className="w-[160px]">
                    <SelectValue placeholder="Assign entrance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={unassignedValue}>
                      <span className="text-muted-foreground">
                        Unassigned
                      </span>
                    </SelectItem>
                    {entrances.map((entrance) => (
                      <SelectItem key={entrance.id} value={entrance.id}>
                        {entrance.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(checker.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
