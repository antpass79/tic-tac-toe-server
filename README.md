# Tic Tac Toe

## Introduction

I started to work on this project for the purpose of to learn some new technologies. A simple application to put all together what I wanted to study was perfect for my aim.

I take it for granted that this game is known, otherwise it's easy to find on google something about it.

In the past, every time that a new language came in front of me for work or hobby, I used the Tic Tac Toe game to learn it. MFC, C#, javascript are examples of languages that I learnt thanks to this game. 

### Goals

On the client side my goals are to learn react.js (TODO) and redux concepts.

On the server side my goals are to learn node.js and express.

The last goal, but the most important, is to learn python and tensorflow. In the reference section, there is a link of a very good article and code about deep learning, from which I took all the code for the agent project.

During the development other concepts came in my mind, the first one is Docker, so I decided to move all projects on containers. The second one is based on the gift I made to myself, the Raspberry, so my aim is to move all on that device...step by step.

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

In the server folder there are two sub folders:
- tictactoe is the project that exposes the web service, based on node.js and express. The clients call it to play ti tac toe.
- agent is the project that exposes the web service to manage the AI, written in python and based on tensorflow. tictactoe project call it to manage the next best move.

## Setup

Once you cloned or downloaded the project from github, you have to install all packages for each project. Follow these steps.

### Client -> Angular

From cmd prompt, under the client\angular folder, type:

- npm install, installs all dependencies

Now the client angular is ready to run

### Server -> Tic Tac Toe

From cmd prompt, under the server\tictactoe folder, type:

- npm install, installs all dependencies

Now the tictactoe service is ready to run

### Server -> Agent

The prerequisite is to have installed on your computer python 3.6

From cmd prompt, under the server\agent folder, type:

- pip install virtualenv, installs virtualenv package in order to create and use a virtual environment to work with
- virtualenv env, creates the virtual folder env
- env\scripts\activate, activates the virtual environment
- pip install -r agent/requirements.txt, installs in the virtula environment the packages listed in the requirements.txt file

Now the agent service is ready to run

## Run

In order to play the game you have to run the client application and the two services. The following steps work if you install all dependencies for every projects as you can read in Setup section.

### Client -> Angular

Under the client\angular folder, run 'ng serve tic-tac-toe'.

### Server -> Tic Tac Toe

Under the server\tictactoe folder, run 'npm start'.

### Server -> Agent

Under the server\agent folder, run python src\TicTacToe.py.

## Tests

Each project has a test suite. Follow these steps to run them.

### Client -> Angular

- open a cmd with administrative privileges
- go inside the project root (client\angular)
- call 'ng test'

### Server -> Tic Tac Toe

- open a cmd with administrative privileges
- go inside the project root (server\tictactoe)
- call 'npm test' for one cycle of test
- call 'npm test -- -w' for watching file changes

### Server -> Agent

- open a cmd with administrative privileges
- go inside the project root (server\agent)
- create and activate the virtual folder
- call python -m tests.entrypoint

## Docker

Each project can run on a docker container.

### Client -> Angular

TODO

### Server -> Tic Tac Toe

TODO

### Server -> Agent

- create the image

    - go under server\agent
    - from cmd: docker build -t agent .

- run the container

    - from cmd: docker run -p 8080:8080 -i -t agent

## Raspberry

TODO

## Put all together

TODO

## References

In the following sections the are the references about the main topics. In each project there is a folder README in which it's possible to find other links and examples that I have taken note. 

### Tests

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
