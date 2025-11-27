"use client";

import { InvitationsTable } from "./components/invitations-table";
import { JobCreateForm } from "./components/job-create-form";

export default function InvitationsPage() {
  const handleJobCreated = () => {
    // TODO: Refresh the table data when a new job is created
    console.log("Job created, refreshing table...");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invitations</h1>
          <p className="text-muted-foreground mt-2">
            Manage and send invitations to your event participants
          </p>
        </div>
        <JobCreateForm onJobCreated={handleJobCreated} />
      </div>

      <InvitationsTable />
    </div>
  );
}
