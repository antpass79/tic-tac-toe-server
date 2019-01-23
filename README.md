# Tic Tac Toe

## Introduction



## Projects

The project is organized in the following folders:
- client
  - angular
  - react
- server
  - tictactoe
  - agent
  
In the client folder there are two versions of the same application, the first one written in angular 6+ and the second one written in react. The projects expose the GUI for the human players.

In the server folder there are two sub folders:
- tictactoe is the project that exposes the web service, based on node.js and express. The clients call it to play ti tac toe.
- agent is the project that exposes the web service to manage the AI, written in python and based on tensorflow. tictactoe project call it to manage the next best move.

## Setup

## Tests

Each project has a test suite.

##### client -> angular

##### server -> ticatactoe

- open a cmd with administrative privileges
- go inside the project root (server\tictactoe)
- call 'npm test' for one cycle of test
- call 'npm test -- -w' for watching file changes

##### server -> agent

- open a cmd with administrative privileges
- go inside the project root (server\agent)
- create and activate the virtual folder
- call python -m tests.entrypoint

## References

##### deep learning
- https://medium.com/@carsten.friedrich/part-1-computer-tic-tac-toe-basics-35964f92fa03
