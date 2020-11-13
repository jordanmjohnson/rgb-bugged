/* Initialize variables for use in game */ 
var numSquares = 6; 
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square"); 
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var score = 0; //initialize score to zero 
var scoreDisplay = document.querySelector("#scoreDisplay"); 
var resetPressed = true; 

/* call initialization function */ 
init();

/* 
name of function: init
parameters: none 
return value: none 

Initialize the beginning setup of the game 
*/ 
function init(){
	setupModeButtons();
	setupSquares();
	var lsScore = localStorage.getItem('score');
	if( lsScore !== null ){
		score = lsScore; 
		scoreDisplay.textContent = score;
	}
	else {
		localStorage.setItem('score', +score); 
	}
	reset();
}

/* setup mode based on game difficulty */ 
function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			reset();
		});
	}
}

/* setup squares to tell whether they win the game
or you need to try again */ 
function setupSquares(){
	for(var i = 0; i < squares.length; i++){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.background;
			//compare color to pickedColor
			if(clickedColor === pickedColor){ 
				updateColorName();
				messageDisplay.textContent = "Correct!";
				resetButton.textContent = "Play Again?"
				changeColors(clickedColor);
				h1.style.background = clickedColor;
				if(resetPressed){
					score+=5; 
					resetPressed = false;
				}
				scoreDisplay.textContent = score;
				localStorage.setItem('score', +score);
			} else {
				this.style.background = "#232323";
				messageDisplay.textContent = "Try Again";
				this.style.pointerEvents = "none";
				score--;
				scoreDisplay.textContent = score; 
				localStorage.setItem('score', +score);
			}
		} );
	}
}

/* update the color name once you've won the game */ 
async function updateColorName(){
	const regex = /\([^\)]+\)/g; 
	var rgbColors = pickedColor.match(regex); 
	const url = "https://www.thecolorapi.com/id?rgb="+rgbColors[0];
	var requestOptions = {
	  method: 'GET',
	  redirect: 'follow'
	};

	let result = await fetch(url, requestOptions); 
	let colorData = await result.json(); 

	if(colorData.name.exact_match_name) {
		colorDisplay.textContent = colorData.name.value; 
	}
	else {
		colorDisplay.textContent = colorData.name.value + "-ish"; 
	}
}

/* reset the game so you can start over */ 
function reset(){
	resetPressed = true;
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of squares
	for(var i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block"
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.background = "steelblue";
}

/* when you click the reset button reset */ 
resetButton.addEventListener("click", function(){
	reset();
})

/* change the colors of all the squares */ 
function changeColors(color){
	//loop through all squares
	for(var i = 0; i < squares.length; i++){ 
		//change each color to match given color
		squares[i].style.background = color;
	}
}

/* choose a random color */ 
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

/* generate random colors in an array */ 
function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

/* puts  together an RGB color */ 
function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from  0 -255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from  0 -255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}