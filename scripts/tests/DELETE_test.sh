#!/bin/bash

# Send DELETE request
echo "Sending DELETE request..."
if ! curl -sS -X DELETE localhost:3000/api/memos/1 > /dev/null; then
  echo "ERROR: DELETE request FAILED"
  exit 1
fi
echo "DELETE request SUCCESS"
