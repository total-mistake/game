"use strict"

const $ = document.getElementById.bind(document);
let user_name = "";

$('level_selection').addEventListener('click', ()=>{
    user_name = $("user_name").value;
    if(user_name !== "") {
        console.log("name");
        $('menu').classList.add('hidden');
        $('levels_menu').classList.remove('hidden');
        document.querySelector("body").insertAdjacentHTML('afterbegin',
        `<header class="header">
            <a href="index.html"><img class="icon_home" src="./elements/icons/home_icon.png"></a>
        </header>`
    )
    } else {
        alert("Введите имя!");
    }
})

function startGame() {
    // Ваш код для начала игры
    console.log('Игра начата');
}

function selectLevel() {
    // Ваш код для выбора уровня
    console.log('Выбран уровень');
}



    