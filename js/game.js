"use strict"

let userStats = {};

//Из URL получаем данные о выбранном уровне
var searchParams = new URLSearchParams(window.location.search);
var level = searchParams.get('level');

showStyle();
console.log(level);
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if(user_name.value) {
        userStats.name = user_name.value;
        loginForm.classList.add('hidden');
        document.getElementById('level').classList.remove('hidden');
        startGame();
    } else {
        user_name.classList.add('shaking');
        setTimeout(()=>
        user_name.classList.remove('shaking')
        , 1000);
    }
  });

function startGame() {
    //Алгоритм в зависимости от выбранного уровня
    switch (level) {
        //Если игра запущена через кнопку "Начать"
        case 0:
        
            break;
        //Уровень 1
        case 1:
            firstLevel();
            break;
        //Уровень 2
        case 2:
            secondLevel();
            break;
        //Уровень 3
        case 3:
            thirdLevel();
            break;
    }

    // addPlayerStats(userStats)
}

function firstLevel() {
    level_num.textContent = `Уровень 1`;
    rools.textContent = "Найди все цветы в горшочках";
}

function secondLevel() {
    level_num.textContent = `Уровень 2`;
    rools.textContent = "Найди все цветы в горшочках";
}

function thirdLevel() {
    level_num.textContent = `Уровень 3`;
    rools.textContent = "Найди все цветы в горшочках";
}
//Оформление страницы
function showStyle() {
    let lvl;
    if (level == 0) {lvl = 1} else {lvl = level }
    document.body.style.backgroundImage = `url('./backgroundImages/level${lvl}.jpg')`;
    document.querySelector('.icon_home').src = `./elements/icons/home_icon_l${lvl}.png`;
}

//Добавление статистики игрока
function addPlayerStats(userStats) {
    // Получение текущего массива данных из localStorage
    const storedAllUsersStats = localStorage.getItem('UsersStats');
    let allUsersStats = JSON.parse(storedAllUsersStats) || [];

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

//Функция сортировки массива по убыванию суммы очков
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