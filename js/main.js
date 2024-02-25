"use strict"

const $ = document.getElementById.bind(document);
let userStats = {};

$('level_selection').addEventListener('click', ()=>{
    userStats.name = $("user_name").value;
    if(userStats.name) {
        $('menu').classList.add('hidden');
        $('levels_menu').classList.remove('hidden');
        document.querySelector("body").insertAdjacentHTML('afterbegin',
        `<header class="header">
            <a href="index.html"><img class="icon_home" src="./elements/icons/home_icon.png"></a>
        </header>`)
    } else {
        $('user_name').classList.add('shaking');
        setTimeout(()=>
            $('user_name').classList.remove('shaking')
        , 1000);
    }
})
userStats = {
    name: "test5",
    points: [5, 1, 3]
}
addPlayerStats(userStats);
function addPlayerStats(userStats) {
    // Получение текущего массива данных из localStorage
    const storedAllUsersStats = localStorage.getItem('UsersStats');
    let allUsersStats = storedAllUsersStats ? JSON.parse(storedAllUsersStats) : [];

    // Поиск игрока по имени в массиве
    const existingPlayerIndex = allUsersStats.findIndex(user => user.name === userStats.name);
    // Если игрок существует, обновляем его данные, иначе добавляем нового игрока
    if (existingPlayerIndex !== -1) {
        const existingPlayer = allUsersStats[existingPlayerIndex];
        // Обновление существующего игрока
        for (let i = 0; i < userStats.points.length; i++) {
            if (userStats.points[i] > existingPlayer.points[i]) {
                existingPlayer.points[i] = userStats.points[i];
            }
        }
    } else {
        // Добавление нового игрока
        allUsersStats.push(userStats);
    }

    console.log(arraySorting(allUsersStats));
    // Сохранение обновленного массива в localStorage
    localStorage.setItem('UsersStats', JSON.stringify(arraySorting(allUsersStats)));
}

function arraySorting(array) {
    const sortedStats = [...array];

    // Сортировка по убыванию суммы очков
    sortedStats.sort((a, b) => {
        const sumA = a.points.reduce((acc, value) => acc + value, 0);
        const sumB = b.points.reduce((acc, value) => acc + value, 0);

        return sumB - sumA;
    });

    return sortedStats;
}

function startGame() {
    userStats.name = $("user_name").value;

    if(userStats.name) {

    } else {
        $('user_name').classList.add('shaking');
        setTimeout(()=>
            $('user_name').classList.remove('shaking')
        , 1000);
    }
    // Ваш код для начала игры
    console.log('Игра начата');
}

function selectLevel() {
    // Ваш код для выбора уровня
    console.log('Выбран уровень');
}



    