alert(
  "Правила гри: одне натискання на неїстівне – програш; 10 натискань на їстівне – виграш. Успіхів!"
);

let timer; // таймер
let i; // номер рядка масиву
let j; // номер стовпця масиву
let number = 0; // номер картинки
let count = 0; // початкове значення рахунку
let interval = 1000; // початкове значення швидкісті
let createButton = document.getElementById("create");
createButton.addEventListener("click", create); // додаємо подію на натискання
let thingsArr = [
  [
    "./images/children.png",
    "./images/dog.png",
    "./images/money.png",
    "images/bag.png",
  ],
  [
    "./images/pizza.png",
    "./images/ice-cream.webp",
    "./images/chicken.png",
    "images/donut.png",
  ],
];

let field = document.getElementById("field"); // поле
let msg = document.getElementById("msg"); // повідомлення
let repeatButton = document.getElementById("repeat"); // кнопка повтору

repeatButton.addEventListener("click", start); // додаємо подію на натискання

function getRandomInt(n) {
  // випадкове число
  return Math.floor(Math.random() * n);
}

function create() {
  i = getRandomInt(2); // номер рядка масиву
  j = getRandomInt(3); // номер стовпця масиву
  let left = getRandomInt(550); // лівий відступ
  let top = getRandomInt(350); // верхній відступ
  let id = "thing" + number; // створюємо id за номером
  let thing = document.createElement("img"); // створюємо елемент img
  thing.id = id; // додаємо id='thing0' і т.д.
  //thing.setAttribute('id', id);
  thing.src = thingsArr[i][j]; // додаємо src='images/...' з масиву.
  //thing.setAttribute('src', thingsArr[i][j]);

  thing.setAttribute("onclick", "check(" + id + ")"); // додаємо обробку події click

  thing.style.left = left + "px"; // встановлюємо лівий відступ
  thing.style.top = top + "px"; // встановлюємо верхній відступп
  if (i == 0) thing.className = "noneatable"; // додаємо class='noneatable'
  else thing.className = "eatable"; // додаємо class='eatable'

  field.appendChild(thing); // вбудовуємо елемент на полі
  removeThing(id);
  number++;
}

function removeThing(id) {
  let item = document.getElementById(id);
  setTimeout(function () {
    field.removeChild(item);
  }, interval); // видаляємо через секунду
}

function check(thing) {
  if (thing.className == "eatable") {
    speed();
    count++; // збільшуємо рахунок
    msg.innerHTML = "Спроб: " + count;
  } else {
    count--; // зменьшуємо рахунок
  }
  if (thing.className == "noneatable") {
    stop(); // завершуємо гру, бо натиснув на неїстівне
    msg.innerHTML = " На жаль, гра завершена!";
  } else if (thing.className == "eatable" && count == 10) {
    stop(); // завершуємо гру, бо 10 раз натиснув на їстівне
    msg.innerHTML = " Ти виграв, вітаю!";
  }
}

timer = setInterval(create, interval); // малювати кожні 10 мс

function stop() {
  clearInterval(timer); // завершити анімацію
}

function start() {
  // функція для перезапуску
  count = 0; // обнуляємо спроби
  msg.innerHTML = "На цей раз пощастить!";
  stop();
  timer = setInterval(create, interval); // запускаєм заново
  check();
}

function speed() {
  // фунція для збільшення швидкості
  interval -= 30; // встановили новий час
  clearInterval(timer); // очищаємо старий інтервал
  timer = setInterval(create, interval); // задаємо новий
}
