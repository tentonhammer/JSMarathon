const arena = document.getElementsByClassName('arenas').item(0);

const nikita = {
    player: 1,
    name: 'Scorpion',
    hp: 23,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'shuriken'],
    attack: () => console.log(nikita.name + ' Fight...')
}

const eugene = {
    player: 2,
    name: 'Sub-Zero',
    hp: 49,
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

arena.append(createPlayer(nikita));
arena.append(createPlayer(eugene));
