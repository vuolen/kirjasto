#!/usr/bin/env sh

usage() 
{
    echo ""
    echo "Usage: kirjasto.sh COMMAND"
    echo "Commands:"
    echo "  start-dev"
    echo "    starts the frontend, backend and db services in detached mode"
    echo "  stop-dev"
    echo "    stops all the services"
    echo "  e2e"
    echo "    runs the e2e service"
    echo "  compose ARGS"
    echo "     pass custom valid docker-compose arguments"
    echo ""
}

compose_cmd()
{
    docker-compose --env-file config.env $@
}

case $1 in
    "start-dev")
        compose_cmd up -d frontend backend db
        ;;
    "stop-dev")
        compose_cmd down
        ;;
    "e2e")
        compose_cmd run --rm e2e
        ;;
    "compose")
        shift
        compose_cmd $@
        ;;
    *)
        usage
        ;;
esac
