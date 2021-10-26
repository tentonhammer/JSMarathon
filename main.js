import {createReloadButton, generateLogs} from './utils.js';
import {computer, createPlayer, player} from './players.js'
import {enemyAttack, getWinner, playerAttack, winnerStatus} from "./fight.js";

const arena = document.querySelector('.arenas');
const fightButton = document.querySelector('.button');
const form = document.querySelector('.control');

const onSubmit = (event) => {
    event.preventDefault();

    const {hit: eHit, value: eValue, defence: eDefence} = enemyAttack();
    const {hit: pHit, value: pValue, defence: pDefence} = playerAttack();

    if (eHit !== pDefence) {
        player.changeHp(eValue);
        generateLogs('hit', computer, player, eValue);
    } else {
        generateLogs('defence', computer, player);
    }
    if (pHit !== eDefence) {
        computer.changeHp(pValue);
        generateLogs('hit', player, computer, pValue);
    } else {
        generateLogs('defence', player, computer);
    }

    if (player.hp === 0 || computer.hp === 0) {
        fightButton.disabled = true;
        createReloadButton();
    }
    let statusText = getWinner(player, computer);
    if (statusText) {
        arena.append(winnerStatus(statusText));
    }
}
form.addEventListener('submit', onSubmit);

// Creating players
arena.append(createPlayer(player));
arena.append(createPlayer(computer));
// Show start message
generateLogs('start', player, computer);
