#!/bin/bash

# Get the Git commit hash
container="ghcr.io/dawescc/emems"
vers="beta"
imagetag=$(git rev-parse --short HEAD)

# Build the Docker image using the Dockerfile
docker build -t $container:$vers-$imagetag -t $container:latest .

docker push $container:latest