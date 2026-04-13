#!/bin/bash
# Script to deploy Next-Scholar on Oracle Cloud Free Tier
docker-compose down
docker-compose build
docker-compose up -d
echo "Deployment successful."
