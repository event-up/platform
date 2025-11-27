"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Badge } from "@workspace/ui/components/badge";
import { useAllInvitationJobGet } from "@/hooks/query/invitation-job";
import { useAuth } from "@/lib/auth-context";
import { useParams } from "next/navigation";
import { InvitationJob } from "@workspace/models/db/invitations";

type JobStatusType = "created" | "processing" | "completed" | "failed";

const getStatusBadge = (status: JobStatusType) => {
  const variants = {
    created: "secondary",
    processing: "default",
    completed: "default",
    failed: "destructive",
  } as const;

  const labels = {
    created: "Created",
    processing: "Processing",
    completed: "Completed",
    failed: "Failed",
  };

  return (
    <Badge variant={variants[status]} className="capitalize">
      {labels[status]}
    </Badge>
  );
};

const getChannelBadge = (channelType: "SMS" | "EMAIL") => {
  return (
    <Badge variant="outline" className="capitalize">
      {channelType}
    </Badge>
  );
};

export function InvitationsTable() {
  const { user } = useAuth();
  const { eventId } = useParams<{ eventId: string }>();
  const { invitationJobs, isInvitationJobsLoading, invitationJobsError } =
    useAllInvitationJobGet(user?.uid || "", eventId);

  const jobs = invitationJobs || [];

  if (isInvitationJobsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invitation Jobs</CardTitle>
          <CardDescription>
            View and manage your invitation sending jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading invitation jobs...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (invitationJobsError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invitation Jobs</CardTitle>
          <CardDescription>
            View and manage your invitation sending jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-destructive">
              Error loading invitation jobs. Please try again.
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invitation Jobs</CardTitle>
        <CardDescription>
          View and manage your invitation sending jobs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Completed</TableHead>
              <TableHead>Failed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground py-8"
                >
                  No invitation jobs found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job, index) => {
                const completedPlusFailedCount = job.completedCount + job.failedCount;
                
                return (
                  <TableRow key={`${job.eventId}-${job.jobName}-${index}`}>
                    <TableCell className="font-medium">{job.jobName}</TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell>
                      {getChannelBadge(job.notifyChannel.channelType)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {completedPlusFailedCount > 0 ? (
                            <>
                              {completedPlusFailedCount}
                              <span className="text-xs ml-1">processed</span>
                            </>
                          ) : (
                            "Not started"
                          )}
                        </span>
                        {completedPlusFailedCount > 0 && (
                          <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary transition-all"
                              style={{
                                width: "100%",
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {job.completedCount}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {job.failedCount}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
