import fetch from "node-fetch";
import {JSDOM} from "jsdom";
import Player from "play-sound";

const player = Player();

const url = "https://pass.rw.by/ru/route/?from=%D0%9C%D0%B8%D0%BD%D1%81%D0%BA-%D0%9F%D0%B0%D1%81%D1%81%D0%B0%D0%B6%D0%B8%D1%80%D1%81%D0%BA%D0%B8%D0%B9&from_exp=2100001&from_esr=140210&to=%D0%93%D0%BE%D0%BC%D0%B5%D0%BB%D1%8C&to_exp=2100100&to_esr=150000&date=today&type=1"
const trainNumber = "708Б";

async function main(url, trainNumber) {
  const response = await fetch(url);
  const rawDOM = await response.text();
  const jsDom = new JSDOM(rawDOM);

  const window = jsDom.window;
  const document = window.document;

  const numbers = [...document.querySelectorAll(".train-number")];
  const $number = numbers.find(n => n.textContent === trainNumber);
  const $container = $number.closest(".sch-table__row");

  const $lastCell = $container.querySelector(".sch-table__cell.cell-4");
  if($lastCell.classList.contains("empty")) {
    console.log("EMPTY");
  } else {
    console.log("FOUND");
    player.play("beep.mp3")
  }
}

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms))
}

for(;;) {

try {
  await main(url, trainNumber);
  await wait(10000);
} catch(e) {
  console.log(e)
}

}
