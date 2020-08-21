
const start = document.querySelector("#start-button")
const restart = document.querySelector("#restart-button")
const feed = document.querySelector("#feed-button")
const play = document.querySelector("#play-button")
const work = document.querySelector("#work-button")
const game_buttons = document.querySelector(".game-buttons")
let face = document.getElementById("#face")
let text = document.getElementById("h2")

happyPhrases = ["I'm posting this in my Gram!", "", "Guys, seriously, I love working with you.", "LOL <3!", "", "See! This is why we're frandz!", "", ""];
okayPhrases = ["", "", "Wut? What did I do?", "...Wow you guys", "Ugh, and everyone wants to work at a standup these days", "Maki isn't going to like this one bit.", "", ""];
sadPhrases = ["Well, this is my life meow", "", "I need a walk", "Whateverz", "Noo I don't want to be on-call this week", "", "", ""];
deadPhrases = ["I blame n8", "You killed Kenny!", "This is how you treat your coworkers?", "Top 10 Betrayal", "BRB dead", "I hate dis"];



/* Create the default levels for Kenny */

let kennygotchi = {
  ego: 11,
  food: 5,
  work: 1,
}


/* Define Kenny's moods */

// ego has no limit
// food has limit of 17
// work has limit of 10

let mood;
const getMood = () => {
  if (kennygotchi.ego >= 9 && (kennygotchi.food <= 10 && kennygotchi.food >= 7) && kennygotchi.work <= 3) {
    mood = 'happy'
  }
   if ((kennygotchi.ego > 4 && kennygotchi.ego < 9) && kennygotchi.food <= 6 || (kennygotchi.food >= 13 && kennygotchi.food < 15) && kennygotchi.work >= 4) {
    mood = 'okay'
  }
   if ((kennygotchi.ego <= 4 && kennygotchi.ego > 0) || (kennygotchi.food <= 3 && kennygotchi.food > 0) || (kennygotchi.food >= 15 && kennygotchi.food < 17) || kennygotchi.work >= 7) {
    mood = 'sad'
  }
   if (kennygotchi.ego === 0 || kennygotchi.food === 0 || kennygotchi.food === 17 || kennygotchi.work === 10) {
    mood = 'dead'
  }
};

/* Set Kenny's faces and call Phrases */

const changeFace = () => {
  if (mood === 'happy') {
    document.getElementById("face").src = "https://bit.ly/3kCSV79";
    gethappyPhrase();
  } if (mood === 'okay') {
    document.getElementById("face").src = "https://bit.ly/3fZmP1D";
    getOkayPhrase();
  } if (mood === 'sad') {
    document.getElementById("face").src = "https://bit.ly/3g2r4d7"
    getSadPhrase();
  } if (mood === 'dead') {
    document.getElementById("face").src = "https://bit.ly/2E38pk4";
    game_buttons.style.display = "none";
    restart.style.display = "block";
    getDeadPhrase();
  }
}

/* Call Kenny's phrases */

const getPhrases = () => {
  gethappyPhrase()
  getOkayPhrase()
  getSadPhrase()
  getDeadPhrase()
}


/* Pick random phrase */

const gethappyPhrase = function () {
  const randomVal = Math.floor(Math.random() * happyPhrases.length);
  document.getElementById("text").innerHTML = happyPhrases[randomVal];
}
const getOkayPhrase = function () {
  const randomVal = Math.floor(Math.random() * okayPhrases.length);
  document.getElementById("text").innerHTML = okayPhrases[randomVal];
}
const getSadPhrase = function () {
  const randomVal = Math.floor(Math.random() * sadPhrases.length);
  document.getElementById("text").innerHTML = sadPhrases[randomVal];
}
const getDeadPhrase = function () {
  const randomVal = Math.floor(Math.random() * deadPhrases.length);
  document.getElementById("text").innerHTML = deadPhrases[randomVal];
}


/* Define Kenny's moods and phrases*/

const setMood = () => {
  changeFace(getMood())
}


/* Set Time Passes function*/

let timer;
function timePasses() {

  setMood();

  const alive = kennygotchi.ego > 0 && kennygotchi.food > 0 && kennygotchi.food < 17 && kennygotchi.work < 10;
  const aliveAndRested = kennygotchi.ego > 0 && kennygotchi.food > 0 && kennygotchi.food < 17 && kennygotchi.work === 0;
  const notAlive = kennygotchi.ego === 0 || kennygotchi.food === 17 || kennygotchi.food === 0 || kennygotchi.work === 10;

  if (notAlive) {
    window.clearInterval(timer)
  }
  else if (alive || aliveAndRested) {
    kennygotchi.ego -= 1;
    kennygotchi.food -= 1;
    //if (alive) {
    kennygotchi.work > 0 ? kennygotchi.work -= 1 : kennygotchi.work === 0;

    //}
  }
  console.log(kennygotchi, mood)
};


/* Display game buttons when user clicks `Start` */


start.addEventListener("click", function () {
  start.style.display = "none";
  game_buttons.style.display = "block";

  timer = setInterval(function () { timePasses() }, 2000);

  document.getElementById("text").innerHTML = ""
  document.getElementById("text").style.fontFamily = "'Calibre', sans-serif";
  document.getElementById("text").style.fontSize = "x-large";
})

restart.addEventListener("click", function () {
  start.style.display = "none";
  restart.style.display = "none";
  game_buttons.style.display = "block";
  kennygotchi = {
    ego: 11,
    food: 10,
    work: 1,
  }
  timer = setInterval(function () { timePasses() }, 2000);
  document.getElementById("text").innerHTML = "";
  document.getElementById("face").src = "https://bit.ly/3kCSV79";
})


/* Track game click events */

play.addEventListener("click", function () {
  if (kennygotchi.ego < 17) kennygotchi.ego += 1;
  if (kennygotchi.ego < 10) document.getElementById("text").innerHTML = "Thanks, I needed that!";
  if (kennygotchi.ego > 10) document.getElementById("text").innerHTML = "Aww shucks guys!";
})

feed.addEventListener("click", function () {
  if (kennygotchi.food < 17) kennygotchi.food += 1;
  if (kennygotchi.food < 5)
    document.getElementById("text").innerHTML = "So Hungooo";
  if (kennygotchi.food > 5)
    document.getElementById("text").innerHTML = "Nom nom nom!"; 
  if (kennygotchi.food > 13)
    document.getElementById("text").innerHTML = "Ahh so full!";   

})

work.addEventListener("click", function () {
  if (kennygotchi.work < 10) kennygotchi.work += 1;
  if (kennygotchi.work < 5)
    document.getElementById("text").innerHTML = "I'm on it!";  
  if (kennygotchi.work > 5)
    document.getElementById("text").innerHTML = "Nooo, why?";  
})

