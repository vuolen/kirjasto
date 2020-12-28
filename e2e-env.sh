#!/usr/bin/env sh

docker-compose -f dev.yml -f e2e.yml --env-file config.env $@
