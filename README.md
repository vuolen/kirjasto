# kirjasto
![E2E tests](https://github.com/vuolen/kirjasto/workflows/E2E%20tests/badge.svg)

Kirjasto is a library management system.

# Demo
You can find a demo running [here](https://kirjasto-demo.herokuapp.com/). Please note that Heroku has a long startup time if the demo hasn't been visited for a while. You can login as an admin with the email `admin@example.com` and the password `admin` or as a normal user with the email `user@example.com` and the password `user`. Github Actions automatically updates the demo for every successful push to the main branch.

# Documentation
## Local development environment
This project is dockerized. To run the whole project locally, use `./kirjasto.sh start-dev`. This starts the containers for the frontend, backend and database. Please note that the containers run on the host network, which means that if the ports (defaulting to 8001, 8000 and 5432) are taken by other processes, the containers cannot run.

`kirjasto.sh` is a script for running common docker-compose commands. You can also pass any valid docker-compose commands as an argument to `kirjasto.sh compose`

Examples:

Build all the images: `./kirjasto.sh compose build`

See the logs for a container: `./kirjasto.sh compose logs (backend|frontend|db)`

Attach to the running containers logs: `./kirjasto.sh compose up frontend backend db`

## E2E tests
First run the project locally with `./kirjasto.sh start-dev`, then open a new terminal and run `./kirjasto.sh e2e`. If you need to debug the e2e tests, you can use `cd e2e` and `npm run e2e-gui` to run cypress without docker. Github Actions also runs the tests for each push to the main branch.

## Project structure

The [backend](https://github.com/vuolen/kirjasto-backend) and [frontend](https://github.com/vuolen/kirjasto-frontend) are in separate repositories. This repository is mainly for documentation of the project as a whole, more in-depth documentation will be in the specific repositories.

I also recommend checking out the original [API plan](https://github.com/vuolen/kirjasto/blob/main/doc/api_plan.md), which explains the problem domain a bit better.

## Contributing

This project uses issues as user stories to be implemented. Feel free to open new ones. The backlog is located in the [projects](https://github.com/vuolen/kirjasto/projects/1) tab.

## Motivation

This project is made to fit the needs of [Satakunta Nation's](https://satakuntalainenosakunta.fi/fi/en/) library. This means that some technical decisions are a result of maintaining compatibility with other projects.
