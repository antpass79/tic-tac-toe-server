// import { expect } from 'chai';
// import { Side } from '../../../src/game/players/player';
// import { AgentPlayer } from '../../../src/game/players/agent-player';
// import { Board, GameResult } from '../../../src/game/board';

// describe('AgentPlayer - initialize', () => {

//     it('Should have default side value set to EMPTY', () => {

//         let player = new AgentPlayer();
//         expect(player.side).to.equal(Side.EMPTY);
//     });

//     it('Should have side value set to CROSS', () => {

//         let player = new AgentPlayer();
//         player.newGame(Side.CROSS);
//         expect(player.side).to.equal(Side.CROSS);
//     });

//     it('Should have side value set to NAUGHT', () => {

//         let player = new AgentPlayer();
//         player.newGame(Side.NAUGHT);
//         expect(player.side).to.equal(Side.NAUGHT);
//     });

//     it('move - Should return !finished after player creation', () => {

//         let board = new Board();
//         let player = new AgentPlayer();
//         player.move(board).subscribe((moveResult) => {
//             expect(moveResult.finished).to.equal(false);
//         });        
//     });

//     it('move - Should return finished after a game', () => {

//         let result = {
//             gameResult: GameResult.NOT_FINISHED,
//             finished: false
//         };

//         let board = new Board();
//         let player = new AgentPlayer();

//         player.newGame(Side.CROSS);

//         let counter = 0;
//         while (!result.finished && counter < 10) {
//             player.move(board).subscribe((moveResult) => {
//                 result = moveResult;
//             });
//         }

//         expect(result.finished).to.equal(true);
//     });
// });