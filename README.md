# kirjasto
![E2E tests](https://github.com/vuolen/kirjasto/workflows/E2E%20tests/badge.svg)

Kirjasto is a library management system.

# Demo
You can find a demo running [here](https://kirjasto-demo.herokuapp.com/). You can login as an admin with the email `admin@example.com` and the password `admin` or as a normal user with the email `user@example.com` and the password `user`

# Dev environment
To run the whole project locally, use `./kirjasto.sh start-dev`.

`kirjasto.sh` is a script for running common docker-compose commands. You can also pass any valid docker-compose commands as an argument to `kirjasto.sh compose`

# E2E tests
First run the project locally with `./kirjasto.sh start-dev`, then open a new terminal and run `./kirjasto.sh e2e`

# Project structure

The [backend](https://github.com/vuolen/kirjasto-backend) and [frontend](https://github.com/vuolen/kirjasto-frontend) are in separate repositories. This repository is mainly for documentation of the project as a whole, more in-depth documentation will be in the specific repositories.

# Motivation

This project is made to fit the needs of [Satakunta Nation's](https://satakuntalainenosakunta.fi/fi/en/) library. This means that some technical decisions are a result of maintaining compatibility with other projects.
