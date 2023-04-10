#!/bin/bash

# Send GET request and count objects
echo "Sending GET request"
response=$(curl -sS -H "Content-Type: application/json" localhost:3000/api/memos/)
objects=$(echo "$response" | jq length)
if [ -z "$objects" ]; then
  echo "ERROR: GET request FAILED"
  exit 1
fi
echo "GET request SUCCESS"
echo "GET Response: $objects Objects"
if [ "$objects" != "1" ]; then
    echo "ERROR: GET request FAILED"
    echo "GET Response: $objects Objects.\nExpected 1."
    exit 1
fi