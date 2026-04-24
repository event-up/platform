#!/usr/bin/env bash
set -euo pipefail

echo "Running architecture guardrails checks..."

deprecated_hits="$(rg -n 'get\.sever|@workspace/models/db/Event|edwde|@workspace/database/(event|get|organizer|registration|registration-form|invitation-job)/' apps functions packages/database packages/models || true)"
if [[ -n "$deprecated_hits" ]]; then
  echo "Deprecated import/path patterns found:"
  echo "$deprecated_hits"
  exit 1
fi

client_files="$(rg -l '^\"use client\"|^'\''use client'\''' apps packages || true)"
if [[ -n "$client_files" ]]; then
  client_server_import_hits="$(printf '%s\n' "$client_files" | xargs rg -n '@workspace/database/server/' || true)"
  if [[ -n "$client_server_import_hits" ]]; then
    echo "Server database imports found in client files:"
    echo "$client_server_import_hits"
    exit 1
  fi
fi

echo "Architecture guardrails passed."
