let timer; // таймер
let i; // номер строки массива
let j; // номер столбца массива
let number = 0; // номер картинки
let count = 0; // начальное значение счета
let interval = 1000;
let createButton = document.getElementById("create");
createButton.addEventListener("click", create);
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
let msg = document.getElementById("msg");

function getRandomInt(n) {
  // случайное число
  return Math.floor(Math.random() * n);
}

function create() {
  i = getRandomInt(2); // номер строки массива
  j = getRandomInt(3); // номер столбца массива
  let left = getRandomInt(550); // левый отступ
  let top = getRandomInt(350); // верхний отступ
  let id = "thing" + number; // создаем id по номеру
  let thing = document.createElement("img"); // Создаем элемент img
  thing.id = id; // Добавляем id='thing0' и т.д.
  //thing.setAttribute('id', id);
  thing.src = thingsArr[i][j]; // Добавляем src='images/...' из массива.
  //thing.setAttribute('src', thingsArr[i][j]);

  thing.setAttribute("onclick", "check(" + id + ")"); // Добавляем обработку события click

  thing.style.left = left + "px"; // Устанавливаем левый отступ
  thing.style.top = top + "px"; // Устанавливаем верхний отступ
  if (i == 0) thing.className = "noneatable"; // Добавляем class='noneatable'
  else thing.className = "eatable"; // Добавляем class='eatable'

  field.appendChild(thing); // Встраиваем элемент на поле
  removeThing(id);
  number++;
  // if (number >= 20) {
  //   stop();
  //   score.innerHTML = count + " Game over!";
  // }
}

function removeThing(id) {
  let item = document.getElementById(id);
  setTimeout(function () {
    field.removeChild(item);
  }, interval); //удаляем через секунду
}

function check(thing) {
  // let thing = document.getElementById(id);
  if (thing.className == "eatable") {
    speed();
    count++; //увеличиваем счет
  } else count--; //уменьшаем счет
  // msg.innerHTML = count;
  if (thing.className == "noneatable") {
    stop();
    msg.innerHTML = " Game over!";
  } else if (thing.className == "eatable" && count == 10) {
    stop();
    msg.innerHTML = " You win!";
  }
}

timer = setInterval(create, interval); // рисовать каждые 10мс

function stop() {
  clearInterval(timer); // завершить анимацию
}

function speed() {
  interval -= 30;
  clearInterval(timer);
  timer = setInterval(create, interval);
}
