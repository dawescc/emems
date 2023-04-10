#!/bin/bash

# Run the Docker container and forward port 6900 to the host machine
docker run -d -p 3000:80 testspace