"use client";

import { useState } from "react";
import { Copy, Check, Link2 } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";

interface ScannerLinkSectionProps {
  eventId: string;
}

export function ScannerLinkSection({ eventId }: ScannerLinkSectionProps) {
  const [copied, setCopied] = useState(false);

  const scannerUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/scanner/${eventId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scannerUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — select the input
    }
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Link2 className="h-4 w-4 text-muted-foreground shrink-0" />
          <div>
            <p className="text-sm font-medium">Scanner Link</p>
            <p className="text-xs text-muted-foreground">
              Share this link with anyone who will be scanning tickets.
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            readOnly
            value={scannerUrl}
            className="font-mono text-xs bg-muted"
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            className="shrink-0 gap-1.5"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
