import {createElement} from "./utils.js";

class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
    }

    attack = () => {
        console.log(this.name + ' Fight...')
    }

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    elHP = () => {
        return document.querySelector(`.player${this.player} .life`);
    }

    changeHp = (hp) => {
        this.hp -= hp;
        if (this.hp <= 0) {
            this.hp = 0;
        }
        this.renderHP();
    }
}

const player = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'shuriken']
}

const computer = {
    player: 2,
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['spear', 'axe']
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

export {player, computer, createPlayer, Player}