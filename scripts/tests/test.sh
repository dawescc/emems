#!/bin/bash

# Send POST request
echo "Sending POST request..."
if ! curl -sS -X POST -H "Content-Type: application/json" -d '{"content": "this is a scheduled test memo"}' localhost:3000/api/memos/ > /dev/null; then
  echo "Failed to send POST request!"
  exit 1
fi

# Send GET request and count objects
echo "Sending GET request..."
objects=$(curl -sS -H "Content-Type: application/json" localhost:3000/api/memos/ | jq length)
if [ -z "$objects" ]; then
  echo "Failed to get objects!"
  exit 1
fi
echo "Got $objects objects"
if [ "$objects" != "1" ]; then
  echo "Expected 1 object, got $objects"
  exit 1
fi

# Send DELETE request
echo "Sending DELETE request..."
if ! curl -sS -X DELETE localhost:3000/api/memos/1 > /dev/null; then
  echo "Failed to send DELETE request!"
  exit 1
fi

echo "Tests passed successfully"
