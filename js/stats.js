"use strict"

showRating();

//Вывод рейтинга игроков (только первые 4 в рейтинге)
function showRating() {
    const storedAllUsersStats = localStorage.getItem('UsersStats');
    let allUsersStats = storedAllUsersStats ? JSON.parse(storedAllUsersStats) : [];

    //Если массив пустой
    if (!allUsersStats.length) {
        document.getElementById('st_header').textContent = "Рейтинг игроков пуст";
    } else {
        for (let i = 0; i < 4; i++) {
            const currentUser = allUsersStats[i];
            document.getElementById('rating').insertAdjacentHTML('beforeend',
                `<div class="user">
                    <p class="user_name">№${i+1} ${currentUser.name}</p>
                    <p class="points">points: ${currentUser.points.reduce((sum, point) => sum + point, 0)} | 1: ${currentUser.points[0]} | 2: ${currentUser.points[1]} | 3: ${currentUser.points[2]}</p>
                </div>`
            )
        }
    }
}