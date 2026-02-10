"use client";

import { useParams } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

import { Button } from "@workspace/ui/components/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { ParticipantCreateForm } from "@/app/(main)/event/[eventId]/participants/components/participant-create-form";
import { ParticipantDrawer } from "@/app/(main)/event/[eventId]/participants/components/participant-drawer";
import { useGetRegistrationQuery } from "@/hooks/query/registration";
import { useRegistrationFormQuery } from "@/hooks/query/registration-form";
import { useAuth } from "@/lib/auth-context";
import { Registration } from "@workspace/models/db/registration";
import { FormField } from "@workspace/models/dynamic-form";

/**
 * Generate dynamic table columns based on registration form fields
 */
function generateColumnsFromFormFields(
  fields: FormField[],
): ColumnDef<Registration>[] {
  return fields.map((field) => ({
    id: field.id,
    accessorFn: (row: Registration) => row.registrationData?.[field.id],
    header: field.label,
    cell: ({ getValue }) => {
      const value = getValue();
      if (value === undefined || value === null) {
        return <span className="text-muted-foreground">-</span>;
      }
      // Handle array values (e.g., multiselect)
      if (Array.isArray(value)) {
        return <span>{value.join(", ")}</span>;
      }
      return <span>{String(value)}</span>;
    },
  }));
}

function ParticipantsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const prevLastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(
    null,
  );
  const pageSize = 10;

  // State for participant drawer
  const [selectedParticipant, setSelectedParticipant] =
    useState<Registration | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetch registration form to get form schema fields
  const {
    registrations: registrationForm,
    isRegistrationLoading: isFormLoading,
  } = useRegistrationFormQuery(user?.uid || "", eventId);

  // Fetch registrations (participants)
  const { registrations, isRegistrationLoading, registrationError } =
    useGetRegistrationQuery(user?.uid || "", eventId, {
      lastDoc: lastDoc,
      pageSize: pageSize,
    });

  // Get form fields for drawer and column generation
  const formFields = registrationForm?.formSchema?.fields || [];

  // Generate columns dynamically based on form schema fields
  const columns = useMemo<ColumnDef<Registration>[]>(() => {
    return generateColumnsFromFormFields(formFields);
  }, [formFields]);

  const table = useReactTable({
    data: registrations?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: -1, // Unknown page count for cursor-based pagination
  });

  const handleRowClick = (participant: Registration) => {
    setSelectedParticipant(participant);
    setIsDrawerOpen(true);
  };

  const handleNextPage = () => {
    if (registrations?.hasMore && registrations?.lastDoc) {
      prevLastDocRef.current = lastDoc;
      setLastDoc(registrations.lastDoc);
    }
  };

  // const handlePreviousPage = () => {
  //   ;
  //   // if ( registrations?.lastDoc){
  //     setLastDoc(prevLastDocRef.current);
  //   // }
  // };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Participants</h1>
          <p className="text-muted-foreground">
            Manage participants for event {eventId}
          </p>
        </div>
        <ParticipantCreateForm />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFormLoading || isRegistrationLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length || 1}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length || 1}
                  className="h-24 text-center"
                >
                  {columns.length === 0
                    ? "No registration form found for this event."
                    : "No participants found."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-2">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={ isRegistrationLoading}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button> */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!registrations?.hasMore || isRegistrationLoading}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Participant Details Drawer */}
      <ParticipantDrawer
        participant={selectedParticipant}
        formFields={formFields}
        organizerId={user?.uid || ""}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </div>
  );
}

export default ParticipantsPage;
