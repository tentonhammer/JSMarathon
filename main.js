const nikita = {
    name: 'Scorpion',
    hp: 23,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'shuriken'],
    attack: () => console.log(nikita.name + ' Fight...')
}

const eugene = {
    name: 'Sub-Zero',
    hp: 49,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['spear', 'axe'],
    attack: () => console.log(eugene.name + ' Fight...')
}

const arena = document.getElementsByClassName('arenas').item(0);

const createPlayer = (_className, {name, hp, img}) => {
    let player = document.createElement('div');
    player.classList.add(_className);
    let progress = document.createElement('div');
    progress.classList.add('progressbar');
    let character = document.createElement('div');
    character.classList.add('character');
    let divLife = document.createElement('div');
    divLife.classList.add('life');
    divLife.style.width = `${hp}%`;
    let divName = document.createElement('div');
    divName.classList.add('name');
    divName.innerText = name;
    let divImg = document.createElement('img');
    divImg.src = img;
    player.append(progress, character);
    progress.append(divLife, divName);
    character.append(divImg);
    arena.append(player);
}

createPlayer('player1', nikita);
createPlayer('player2', eugene);
