const arena = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

function changeHp(hp) {
    this.hp -= hp;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    this.renderHP();
}

const nikita = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'shuriken'],
    attack: () => console.log(nikita.name + ' Fight...'),
    changeHp: changeHp,
    elHP: elHP,
    renderHP: renderHP
}

const eugene = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['spear', 'axe'],
    attack: () => console.log(eugene.name + ' Fight...'),
    changeHp: changeHp,
    elHP: elHP,
    renderHP: renderHP
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

const random = (num) => {
    return Math.ceil(Math.random() * num)
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

function createReloadButton() {
    let wrap = createElement('div', 'reloadWrap');
    let button = createElement('button', 'button');
    button.innerText = 'Reload';
    wrap.append(button);
    button.onclick = function () {
        window.location.reload()
    }
    arena.append(wrap);
}

randomButton.addEventListener('click', () => {
    nikita.changeHp(random(20));
    eugene.changeHp(random(20));
    if (nikita.hp === 0 || eugene.hp === 0) {
        randomButton.disabled = true;
        createReloadButton();
    }
    let statusText = getWinner(nikita, eugene);
    if (statusText) {
        arena.append(winnerStatus(statusText));
    }
})

arena.append(createPlayer(nikita));
arena.append(createPlayer(eugene));
