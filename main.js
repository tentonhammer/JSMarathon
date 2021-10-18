const arena = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const nikita = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'shuriken'],
    attack: () => console.log(nikita.name + ' Fight...')
}

const eugene = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['spear', 'axe'],
    attack: () => console.log(eugene.name + ' Fight...')
}

const createElement = (tagName, className) => {
    const tag = document.createElement(tagName);
    if (className) {
        tag.classList.add(className)
    }
    return tag;
}

const createPlayer = ({player, name, hp, img}) => {
    let divPlayer = createElement('div', `player${player}`);
    let progress = createElement('div', 'progressbar');
    let character = createElement('div', 'character');
    let divLife = createElement('div', 'life');
    divLife.style.width = `${hp}%`;
    let divName = createElement('div', 'name');
    divName.innerText = name;
    let divImg = createElement('img');
    divImg.src = img;
    divPlayer.append(progress, character);
    progress.append(divLife, divName);
    character.append(divImg);

    return divPlayer;
}

const changeHp = (player) => {
    let playerLife = document.querySelector(`.player${player.player} .life`);
    player.hp -= random(20);
    if (player.hp <= 0) {
        player.hp = 0;
        randomButton.disabled = true;
    }
    playerLife.style.width = `${player.hp}%`;
}

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
    return player1.hp === 0 && player2.hp === 0 ? 'draw' : player1.hp === 0 ? player2.name : player2.hp === 0 ? player1.name : '';
}

const random = (num) => {
    return Math.ceil(Math.random() * num)
}

randomButton.addEventListener('click', () => {
    changeHp(nikita);
    changeHp(eugene);
    let statusText = getWinner(nikita, eugene);
    if (statusText) {
        arena.append(winnerStatus(statusText));
    }
})

arena.append(createPlayer(nikita));
arena.append(createPlayer(eugene));
