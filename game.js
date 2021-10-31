import {computer, createPlayer, player, Player} from "./players.js";
import {createReloadButton, generateLogs} from "./utils.js";
import {enemyAttack, getWinner, playerAttack, winnerStatus} from "./fight.js";
import RequestService from "./request-service.js";

export default class Game {
    constructor() {
        this.arena = document.querySelector('.arenas');
        this.fightButton = document.querySelector('.button');
        this.form = document.querySelector('.control');
        this.requestService = new RequestService();
    }

    player1 = new Player(player);
    player2 = new Player(computer);

    start = () => {
        // Creating players
        this.arena.append(createPlayer(this.player1));
        this.arena.append(createPlayer(this.player2));
        // Show start message
        generateLogs('start', this.player1, this.player2);
        this.form.addEventListener('submit', this.onSubmit);
    }

    onSubmit = (event) => {
        event.preventDefault();

        const {hit: eHit, value: eValue, defence: eDefence} = enemyAttack();
        const {hit: pHit, value: pValue, defence: pDefence} = playerAttack();

        if (eHit !== pDefence) {
            this.player1.changeHp(eValue);
            generateLogs('hit', this.player2, this.player1, eValue);
        } else {
            generateLogs('defence', this.player2, this.player1);
        }
        if (pHit !== eDefence) {
            this.player2.changeHp(pValue);
            generateLogs('hit', this.player1, this.player2, pValue);
        } else {
            generateLogs('defence', this.player1, this.player2);
        }

        if (this.player1.hp === 0 || this.player2.hp === 0) {
            this.fightButton.disabled = true;
            createReloadButton();
        }
        let statusText = getWinner(this.player1, this.player2);
        if (statusText) {
            this.arena.append(winnerStatus(statusText));
        }
    }
}
