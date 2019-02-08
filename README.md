# Tic Tac Toe

## Introduction

Tic Tac Toe is an easy puzzle game that in the past helped me to learn new languages. More than 15 years ago, I started to learn and improve my knowledge of C++ and MFC, implementing Tic Tac Toe. That was the first version of the game. In the subsequent years other versions were made, in C# before and in javascript after.

Now it’s time for a new and revolutionary version, the Tic Tac Toe Enterprise, more complex and advanced, but mainly useful for me to learn new topics.

I take it for granted that this game is known, otherwise it's easy to find on Google something about it.

### Goals

The aim of the project is to use, learn and improve the following technologies:

- Client
  - Angular + Redux
  - React + Redux (TODO)

- Server
  - node.js
  - express.js

- Database (TODO)
  - MongoDB

- Infrastructure
  - Docker
  - Rabbit (TODO)

- Architecture (TODO)
  - CQRS
  - Event Sourcing

- Machine Learning
  - Keras
  - TensorFlow
  - Python

During the development other concepts came in my mind, based on the gift that I made to myself, the Raspberry, so the last goal is to move all on that device...step by step.  (TODO)

## Projects

The game is organized in the following projects:

- client
  - angular
  - react (TODO)

- server
  - tictactoe
  - agent
  
In the client folder there are two versions of the same application:

- the first one is written in angular 6+.
- the second one is written in react (TODO).

The projects expose the GUI for the human player.

In the server folder there are two projects:

- tictactoe is the project that exposes the web service, based on node and express. The clients call it to play ti tac toe.
- agent is the project that exposes the web service to manage the AI, written in python and based on tensorflow. tictactoe project call it to manage the next best move.

### Architecture

In the following picture there is a sequence diagram shows how any single user action is handled by the system.

![user action sequence diagram](assets/images/user_action_sequence.jpg)

## Prerequirements

The following requirements are needed to run the system.
I list only the main components, I take for granted the boundary components.

- Node.js
- Python 3.6 (it's the version that I'm using)
- Tensorflow
- MongoDB (TODO)

If you want to run the system on containers

- Docker or Docker Toolbox (I'm using both based on which computer I'm working on)

If you want to run the system on Raspberry

- Raspberry (I have the Raspberry Pi 3 Model B+)

## Setup and Run

Once you cloned or downloaded the project from github, you have to install all packages for each project. Follow these steps.

### Setup and Run the Client

The following commands have to run under the folder client\angular through a cmd prompt with administrative privileges.

    npm install

installs all dependencies

Now the client angular is ready to run.

Try it, typing the command defined in package.json

    ng serve run:tic-tac-toe

### Setup and Run the Application Server

The following commands have to run under the folder server\tictactoe through a cmd prompt with administrative privileges.

    npm install

installs all dependencies

Now the tictactoe service is ready to run.

Try it, typing the command

    npm start

### Setup and Run the Agent

The following commands have to run under the folder server\agent through a cmd prompt with administrative privileges.

    pip install virtualenv

installs virtualenv package in order to create and use a virtual environment to work in

    virtualenv env

creates the virtual folder env

    env\scripts\activate

activates the virtual environment

    pip install -r agent/requirements.txt

installs in the virtual environment the packages listed in the requirements.txt file

Now the agent service is ready to run.

Try it, typing the command

    python src\TicTacToeService.py

## Tests

Each project has a test suite. Follow these steps to run them.

### Test the Client

The following commands have to run under the folder client\angular through a cmd prompt with administrative privileges.

    ng test

### Test the Application Server

The following commands have to run under the folder server/tictactoe through a cmd prompt with administrative privileges.

    npm test

for one cycle of test

    npm test -- -w

for watching file changes

### Test the Agent

The following commands have to run under the folder server/agent through a cmd prompt with administrative privileges.

Create (if it doesn't exist) and activate the virtual folder (see [Setup and Run the Agent](#Setup-and-Run-the-Agent))

    python -m tests.entrypoint

## Docker

Each project can run on a docker container.

### Docker for the Client

The following commands have to run under the folder client\angular through a cmd prompt with administrative privileges.

- build the angular application

        ng build --prod

- create the image

        docker image build -t tictactoe-client .

- run the container listen on port 4200

        docker run -p 4200:80 --rm tictactoe-client

### Docker for the Application Server

The following commands have to run under the folder server\tictactoe through a cmd prompt with administrative privileges.

- create the image

        docker build -t tictactoe .

- run the container listen on the port 3000

        docker run -p 3000:3000 -i -t tictactoe

### Docker for the Agent

The following commands have to run under the folder server\agent through a cmd prompt with administrative privileges.

- create the image

        docker build -t agent .

- run the container listen on the port 8080

        docker run -p 8080:8080 -i -t agent

### Docker for all together

In the folder root the docker-compose.yml file is present.
In order to build and run all containers together, it's enough to follow these steps.

The following commands have to run under the folder root, where there is the docker-compose.yml, through a cmd prompt with administrative privileges.

Before all, remember to build the client (see [Docker for the Client](#Docker-for-the-Client))

- build images

        docker-compose build

- run containers

        docker-compose up -d
        (-d flag used to detach and run containers in background)

- stop containers

        docker-compose down

## Raspberry

TODO

## Put all together

TODO

## References

In the following sections the are the references about the main topics. In each project there is a folder README in which it's possible to find other links and examples that I have taken note.

### Tools for testing

#### Jasmine for Angular

- https://scotch.io/tutorials/testing-angular-with-jasmine-and-karma-part-1

#### Mocha for Node.js

- https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d
- https://scotch.io/tutorials/nodejs-tests-mocking-http-requests

#### Unitest for Python

- https://docs.python.org/2/library/unittest.html
- https://medium.com/@ramrajchandradevan/python-init-py-modular-imports-81b746e58aae

### Deep Learning

- https://medium.com/@carsten.friedrich/teaching-a-computer-to-play-tic-tac-toe-88feb838b5e3

### Dockers

- https://medium.com/@DenysVuika/your-angular-apps-as-docker-containers-471f570a7f2
