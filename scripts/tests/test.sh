#!/bin/bash

tests() {
  if ! scripts/tests/POST_test.sh; then
    echo "POST Test FAILED"
    exit 1
  fi

  if ! scripts/tests/GET_test.sh; then
    echo "GET Test FAILED"
    exit 1
  fi

  if ! scripts/tests/DELETE_test.sh; then
    echo "DELETE Test FAILED"
    exit 1
  fi
}


if tests; then
  echo "TESTS 3/3 PASSED"
fi
exit 0