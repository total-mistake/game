"use strict"

let userStats = {};

//Из URL получаем данные о выбранном уровне
var searchParams = new URLSearchParams(window.location.search);
var level = searchParams.get('level');
// console.log('Уровень:', level);

//Авторизация игрока (ввод имени)
function authorization() {
    userStats.name = user_name.value;

    if(userStats.name) {
        
    } else {
        user_name.classList.add('shaking');
        setTimeout(()=>
        user_name.classList.remove('shaking')
        , 1000);
    }
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