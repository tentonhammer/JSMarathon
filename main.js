const nikita = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['kunai', 'shuriken'],
    attack: () => console.log(nikita.name + ' Fight...')
}

const eugene = {
    name: 'Sub-Zero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['spear', 'axe'],
    attack: () => console.log(eugene.name + ' Fight...')
}

const createPlayer = () => {
    let player1 = document.createElement('div');
    player1.classList.add('player1');
    let progress = document.createElement('div');
    progress.classList.add('progressbar');
    let character = document.createElement('div');
    character.classList.add('character');
    let life = document.createElement('div');
    life.classList.add('life');
    life.style.width = '100%';
    let name = document.createElement('div');
    name.classList.add('name');
    name.innerText = eugene.name;
    let img = document.createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif';
}
