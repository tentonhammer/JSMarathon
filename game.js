import {createPlayer, Player} from "./players.js";
import {createReloadButton, generateLogs, random} from "./utils.js";
import {getWinner, playerAttack, winnerStatus} from "./fight.js";
import RequestService from "./request-service.js";

export default class Game {
    constructor() {
        this.arena = document.querySelector('.arenas');
        this.fightButton = document.querySelector('.button');
        this.form = document.querySelector('.control');
        this.requestService = new RequestService();
    }

    player1;
    player2;

    start = async () => {
        const players = await this.requestService.getPlayers();

        // Get chosen character from localStorage
        const savedPlayer = JSON.parse(localStorage.getItem('player1'));
        const p1 = savedPlayer ? savedPlayer : players[random(players.length - 1)];
        const p2 = await this.requestService.getRandomPlayer();
        this.player1 = new Player({
            ...p1,
            player: 1
        });
        this.player2 = new Player({
            ...p2,
            player: 2
        });
        // Creating players
        this.arena.append(createPlayer(this.player1));
        this.arena.append(createPlayer(this.player2));

        // Show start message
        generateLogs('start', this.player1, this.player2);
        this.form.addEventListener('submit', this.onSubmit);
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const player = playerAttack();
        const {player1: {hit: pHit, value: pValue, defence: pDefence}, player2: {hit: eHit, value: eValue, defence: eDefence}} = await this.requestService.fight(player);

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
