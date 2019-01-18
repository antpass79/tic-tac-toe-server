import { expect } from 'chai';
import { Done } from 'mocha';
import { Side } from '../../../src/game/players/player';
import { AgentService } from '../../../src/game/players/agent-service';
import { Board, GameResult } from '../../../src/game/board';

describe('AgentService - initialize', () => {

    it('Should return the passed value CROSS', () => {

        let service = new AgentService();
        return service.newGame(Side.CROSS).subscribe((side: Side) => {
            expect(side).to.equal(Side.CROSS);
        });
    });

    it('Should return the passed value NAUGHT', () => {

        let service = new AgentService();
        return service.newGame(Side.NAUGHT).subscribe((side: Side) => {
            expect(side).to.equal(Side.NAUGHT);
        });
    });
});