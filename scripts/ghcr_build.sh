#!/bin/bash

# Get the Git commit hash
container="ghcr.io/dawescc/emems"
vers="nightly"
imagetag=$(git rev-parse --short HEAD)

# Build the Docker image using the Dockerfile
docker build -t $container:$vers-v$imagetag -t $container:beta .

docker push $container:$vers-v$imagetag