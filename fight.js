import {createElement, generateLogs, random} from "./utils.js";
import {ATTACK, HIT} from "./constants.js";

const winnerStatus = (text, lose = false) => {
    const loseTitle = createElement('div', 'loseTitle');
    if (text !== 'draw') {
        loseTitle.innerText = `${text} ${lose ? 'lose' : ' wins'}`;
    } else {
        loseTitle.innerText = `${text}`;
    }
    return loseTitle;
}

const getWinner = (player1, player2) => {
    if (player1.hp === 0 && player2.hp === 0) {
        generateLogs('draw');
        return 'draw';
    }
    if (player1.hp === 0) {
        generateLogs('end', player1, player2);
        return player2.name;
    }
    if (player2.hp === 0) {
        generateLogs('end', player2, player1);
        return player1.name;
    }
}

// Computer player
const enemyAttack = () => {
    const hit = ATTACK[random(3) - 1];
    const defence = ATTACK[random(3) - 1];
    const value = HIT[hit];
    return {
        hit, value, defence
    }
}

const playerAttack = () => {
    const form = document.querySelector('.control');
    if (!form) {
        return;
    }
    const player = {};
    for (let elem of form) {
        if (elem.checked) {
            if (elem.name === 'hit') {
                player.hit = elem.value;
                player.value = random(HIT[elem.value]);
            }
            if (elem.name === 'defence') {
                player.defence = elem.value;
            }
        }
        elem.checked = false;
    }
    return player;
}

export {winnerStatus, getWinner, enemyAttack, playerAttack}
