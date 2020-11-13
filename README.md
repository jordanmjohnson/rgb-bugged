 # RGB Bugged

For this assignment you will be doing something like the google developers debugging tutorial. The code has a bug and you’ll need to fix it. 
  * After forking my repository, use what you’ve learned to debug and fix the code.
  * In your commit message, describe the problem(s) you found and how you fixed it. 
  * Make a pull request with your changes. 
  * Links to materials used to complete the assignment: 
    * https://developer.mozilla.org/en-US/docs/Mozilla/Debugging/Debugging_JavaScript
    * https://developers.google.com/web/tools/chrome-devtools/javascript




Line 61: original: if (clickedColor = pickedColor){ (using this would make it so any square clicked would be considered the right answer) 
fixed code: if (clickedColor === pickedColor){

  Line 34,72: added +score to end of localstorage so that it would be read as a number instead of a string.

  Line 76: fixed code: this.style.pointerEvents = "none"; (makes it so that whenever an incorrect square is clicked the player cannot continue losing points from clicking on it again)

  Line 135: original: for(var i = 1; i < squares.length; i++){ (this would cause the first square to be ignored when changing colors to the correct answer)
fixed: for(var i = 1; i < squares.length; i++){