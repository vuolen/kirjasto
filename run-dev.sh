#!/usr/bin/env sh

docker-compose -f dev.yml --env-file config.env up
