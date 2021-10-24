const arena = document.querySelector('.arenas');
const fightButton = document.querySelector('.button');
const form = document.querySelector('.control');
const chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

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
    attack: () => console.log(this.name + ' Fight...'),
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

/**
 * Generate logs for fight
 * @param type action name
 * @param player1 the player who strikes
 * @param player2 the player getting hit
 * @param damage description is unnecessary ;)
 * @see logs
 */
const generateLogs = (type, player1, player2, damage) => {
    const timeString = (new Date()).toLocaleTimeString();
    const time = timeString.substring(0, 5);
    let text = '';
    switch (type) {
        case 'hit':
            text = logs[type][random(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            text = `${time} - ${text} -${damage} [${player2.hp}/100]`;
            break;
        case 'defence':
            text = logs[type][random(logs[type].length - 1)].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            text = `${time} - ${text}`;
            break;
        case 'end':
            text = logs[type][random(logs[type].length - 1)].replace('[playerLose]', player1.name).replace('[playerWins]', player2.name);
            break;
        case 'start':
            text = logs[type].replace('[player1]', player1.name).replace('[player2]', player2.name).replace('[time]', time);
            break;
        case 'draw':
            text = logs[type];
            break;
    }
    const message = `<p>${text}</p>`;
    chat.insertAdjacentHTML("afterbegin", message);
}

const onSubmit = (event) => {
    event.preventDefault();

    const computerFight = enemyAttack();
    const playerFight = playerAttack();

    if (computerFight.hit !== playerFight.defence) {
        player.changeHp(computerFight.value);
        generateLogs('hit', computer, player, computerFight.value);
    } else {
        generateLogs('defence', computer, player);
    }
    if (playerFight.hit !== computerFight.defence) {
        computer.changeHp(playerFight.value);
        generateLogs('hit', player, computer, playerFight.value);
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
