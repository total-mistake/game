"use strict"

var $ = document.getElementById.bind(document);
let userStats = {};


//Из URL получаем данные о выбранном уровне
var searchParams = new URLSearchParams(window.location.search);
var level = searchParams.get('level');
var timeRemaining; //Начальное значение таймера
var timerInterval;

showStyle(level);
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if(user_name.value) {
        userStats.name = user_name.value;
        loginForm.classList.add('hidden');
        $('level').classList.remove('hidden');
        startGame();
    } else {
        user_name.classList.add('shaking');
        setTimeout(()=>
        user_name.classList.remove('shaking')
        , 1000);
    }
});

function startGame() {
    anew.classList.add('hidden');
    //Алгоритм в зависимости от выбранного уровня
    switch (level) {
        //Если игра запущена через кнопку "Начать"
        case '0':
            firstLevel();

            break;
        //Уровень 1
        case '1':
            firstLevel();
            
            break;
        //Уровень 2
        case '2':
            secondLevel();
            break;
        //Уровень 3
        case '3':
            thirdLevel();
            break;
    }
}

function firstLevel() {
    level_num.textContent = `Уровень 1`;
    timeRemaining = 60;
    startTimer();
    let levelIndex = 0;
    let maxAnimationTime = [8, 5, 2];

    function generateNextLevel() {
        if (levelIndex < 3) {
            timer.classList.add('hidden');
            level_field.classList.add('hidden');
            let taskType; //Три типа вопроса
            let taskSubtype; //Подтип вопроса
            taskType = random(0, 2); //Три типа вопроса
            let numOfCorrectItems = 0;  //Количество правильных элементов на поле
            let arrayOfElements = creatingArrayOfElements(24);
            switch (taskType) {
                case 0:
                    taskSubtype = animalTypes[random(0, animalTypes.length - 1)];
                    rools.textContent = `Найди всех ${taskSubtype}.`;
                    break;
                case 1:
                    taskSubtype = animalTypes2[random(0, animalTypes2.length - 1)];
                    rools.textContent = `Найди всех животных, у которых ${taskSubtype} ноги.`;
                    break;
                case 2:
                    taskSubtype = backgroundColors[random(0, backgroundColors.length - 1)].name;
                    rools.textContent = `Найди все изображения, у которых цвет фона ${taskSubtype}.`;
                    break;
            }

            // Узнаем сколько элементов на поле соответствует условию
            arrayOfElements.forEach(element => {
                switch (taskType) {
                    case 0:
                        if (element.type == taskSubtype) {
                            numOfCorrectItems++;
                            element.correct = true;
                        } else { element.correct = false }
                        break;
                
                    case 1:
                        if (element.legs == taskSubtype) {
                            numOfCorrectItems++;
                            element.correct = true;
                        } else { element.correct = false }
                        break;
                    case 2:
                        if (element.colorName == taskSubtype) {
                            numOfCorrectItems++;
                            element.correct = true;
                        } else { element.correct = false }
                        break;
                }
            });

            //Если нет ни одного элемента запускаем заново
            if(numOfCorrectItems == 0) {
                generateNextLevel();
            }

            //Добавление анимации мерцания элементов
            arrayOfElements.forEach(element => {
                element.classList.add('flicker');
                element.style.animationDuration = `${randomFloat(1, maxAnimationTime[levelIndex])}s`;
            });

            //Обработка щелчков на элементы
            arrayOfElements.forEach(element => {
                element.addEventListener('click', () => {
                    if (element.correct) {
                        element.classList.remove('flicker');
                        numOfCorrectItems--;
                        element.disabled = true;
                        element.style.opacity = 0.1;
                    } else { makeMistake()}
                    if (numOfCorrectItems == 0) {
                        clearField();
                        levelIndex++;
                        generateNextLevel();
                    }
                });
            });

            delayCorrection();
            //Задаем задержку перед выводом содержания уровня
            setTimeout(() => {
                timer.classList.remove('hidden');
                level_field.classList.remove('hidden');
                generationField(arrayOfElements);
            }, 5000);
        } else {
            stopTimer();
            let points = timeRemaining;
            level_num.textContent = `Поздравляю! Количество набранных очков: ${points}`;
            rools.textContent = "Хочешь попробовать заново?";
            clearField();
            timer.classList.add('hidden');
            level_field.classList.add('hidden');
            anew.classList.remove('hidden');
            userStats.points = [points, 0, 0];
            addPlayerStats(userStats);
            localStorage.getItem('UsersStats');
            }
    }

    generateNextLevel();
}

function clearField() {
    while ($('level_field').firstChild) {
        $('level_field').removeChild($('level_field').firstChild);
    }
}

function secondLevel() {
    level_num.textContent = `Уровень 2`;
    rools.textContent = "Найди все цветы в горшочках";

    generationField(24, 'plant');
}

function thirdLevel() {
    level_num.textContent = `Уровень 3`;
    rools.textContent = "Найди все цветы в горшочках";
}

$('no').addEventListener('click', ()=>{
    window.location.href = 'index.html';
});

//Оформление страницы
function showStyle(lvl) {
    if (lvl == 0) {lvl = 1}
    document.body.style.backgroundImage = `url('./backgroundImages/level${lvl}.jpg')`;
    document.querySelector('.icon_home').src = `./elements/icons/home_icon_l${lvl}.png`;
}

function creatingArrayOfElements(numOfElement) {
    //Массив элементов
    let arrayOfElements = [];
    for (let i = 0; i < numOfElement; i++) {
        //Создание нового элемента
        const newElement = document.createElement('div');
        newElement.classList.add('element');
        let elementColor = backgroundColors[random(0, backgroundColors.length - 1)];
        newElement.style.backgroundColor = elementColor.color;
        const newImg = document.createElement('img');
        let pic = animals[random(0, animals.length - 1)];
        newImg.src = pic.path;
        newElement.appendChild(newImg);
        //Добавим property для дальнейшего сравнения
        newElement.colorName = elementColor.name;
        newElement.type = pic.type;
        newElement.legs = pic.legs;

        arrayOfElements.push(newElement);
    }

    return arrayOfElements;
}

//Вывод элементов из массива на поле
function generationField(array) {
    array.forEach(element => {
        level_field.appendChild(element);
    });
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

//ФУНКЦИИ ТАЙМЕРА
// Функция для обновления отображения таймера
function updateTimer() {
    timer.textContent = timeRemaining;
    if (timeRemaining <= 10) {
        timer.classList.add('flash');
        setTimeout(() => {
        timer.classList.remove('flash');
        }, 500);
    }
}

// Функция для старта таймера
function startTimer() {
    // Обновляем отображение таймера при старте
    updateTimer();
    
    // Запускаем интервал, уменьшающий оставшееся время каждую секунду
    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimer();

        if (timeRemaining <= 0) {
          stopTimer(); // Останавливаем таймер при завершении времени
          gameOver();
        }
        }, 1000);
}

// Функция, вызываемая при ошибке
function makeMistake() {
    timeRemaining = Math.max(0, timeRemaining - 1);
    updateTimer();
    timer.classList.add('flash');
    setTimeout(() => {
    timer.classList.remove('flash');
    }, 500);
}

function delayCorrection() {
    timeRemaining = timeRemaining + 5;
    updateTimer();
}

function stopTimer() {
    clearInterval(timerInterval); // Останавливаем таймер
}

// Функция, вызываемая при завершении времени
function gameOver() {
    level_num.textContent = "Ты проиграл"
    rools.textContent = "Хочешь попробовать заново?";
    clearField();
    timer.classList.add('hidden');
    level_field.classList.add('hidden');
    anew.classList.remove('hidden');
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

//Рандомное число от min до max
function random(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

function randomFloat(min, max) {
    let randomNumber = Math.random() * (max - min) + min;

    // Округляем до 1 знака после запятой
    let roundedNumber = Math.round(randomNumber * 10) / 10;

    return roundedNumber;
}