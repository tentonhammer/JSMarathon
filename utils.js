import {logs} from "./constants.js";

const createElement = (tagName, className) => {
    const tag = document.createElement(tagName);
    if (className) {
        tag.classList.add(className)
    }
    return tag;
}

const random = (num) => Math.ceil(Math.random() * num);

/**
 * Generate logs for fight
 * @param type action name
 * @param player1 the player who strikes
 * @param player2 the player getting hit
 * @param damage description is unnecessary ;)
 * @see logs
 */
const generateLogs = (type, {name: player1Name} = null, {name: player2Name, hp: player2Hp} = null, damage = null) => {
    const chat = document.querySelector('.chat');
    if (!chat) {
        return;
    }
    const timeString = (new Date()).toLocaleTimeString();
    const time = timeString.substring(0, 5);
    let text = '';
    switch (type) {
        case 'hit':
            text = logs[type][random(logs[type].length - 1)].replace('[playerKick]', player1Name).replace('[playerDefence]', player2Name);
            text = `${time} - ${text} -${damage} [${player2Hp}/100]`;
            break;
        case 'defence':
            text = logs[type][random(logs[type].length - 1)].replace('[playerKick]', player1Name).replace('[playerDefence]', player2Name);
            text = `${time} - ${text}`;
            break;
        case 'end':
            text = logs[type][random(logs[type].length - 1)].replace('[playerLose]', player1Name).replace('[playerWins]', player2Name);
            break;
        case 'start':
            text = logs[type].replace('[player1]', player1Name).replace('[player2]', player2Name).replace('[time]', time);
            break;
        case 'draw':
            text = logs[type];
            break;
    }
    const message = `<p>${text}</p>`;
    chat.insertAdjacentHTML("afterbegin", message);
}

const createReloadButton = () => {
    const arena = document.querySelector('.arenas');
    if (!arena) {
        return;
    }
    let wrap = createElement('div', 'reloadWrap');
    let button = createElement('button', 'button');
    button.innerText = 'Reload';
    wrap.append(button);
    button.onclick = function () {
        window.location.reload()
    }
    arena.append(wrap);
}

export {createElement, random, generateLogs, createReloadButton}
