const arena = document.querySelector('.arenas');
const fightButton = document.querySelector('.button');
const form = document.querySelector('.control');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

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

const player = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'shuriken'],
    attack: () => console.log(this.name + ' Fight...'),
    changeHp,
    elHP,
    renderHP
}

const computer = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['spear', 'axe'],
    attack: enemyAttack(),
    changeHp,
    elHP,
    renderHP
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

const onSubmit = (event) => {
    event.preventDefault();

    const computerFight = enemyAttack();
    const playerFight = playerAttack();

    if (computerFight.hit !== playerFight.defence) {
        player.changeHp(computerFight.value);
    }
    if (playerFight.hit !== computerFight.defence) {
        computer.changeHp(playerFight.value);
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

arena.append(createPlayer(player));
arena.append(createPlayer(computer));

form.addEventListener('submit', onSubmit);
