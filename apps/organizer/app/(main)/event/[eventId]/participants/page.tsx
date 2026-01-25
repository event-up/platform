"use client";

import { useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
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
import { useGetRegistrationQuery } from "@/hooks/query/registration";
import { useAuth } from "@/lib/auth-context";
import { Registration } from "@workspace/models/db/registration";

type Participant = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
};

// Dummy data for visualization
const participants: Participant[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Attendee",
    status: "Confirmed",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Speaker",
    status: "Pending",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Attendee",
    status: "Confirmed",
  },
];

const columnHelper = createColumnHelper<Registration>();

const columns = [
  columnHelper.accessor("registrationData.name", {
    header: "Name",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  columnHelper.accessor("registrationData.email", {
    header: "Email",
  }),
];

function ParticipantsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useAuth();

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const prevLastDocRef = useRef<QueryDocumentSnapshot<DocumentData> | null>(
    null,
  );
  const pageSize = 10;

  const { registrations, isRegistrationLoading, registrationError } =
    useGetRegistrationQuery(user?.uid || "", eventId, {
      lastDoc: lastDoc,
      pageSize: pageSize,
    });

  const table = useReactTable({
    data: registrations?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: -1, // Unknown page count for cursor-based pagination
  });

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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No participants found.
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
    </div>
  );
}

export default ParticipantsPage;
