#!/bin/bash

# Run the Docker container and forward port 6900 to the host machine
docker run -d --name testems -p 6900:3000 testems