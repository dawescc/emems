#!/bin/bash

# Send POST request
echo "Sending POST request"
if ! curl -sS -X POST -H "Content-Type: application/json" -d '{"content": "this is a scheduled test memo"}' localhost:3000/api/memos/ > /dev/null; then
  echo "ERROR: POST request FAILED"
  exit 1
fi
echo "POST request SUCCESS"