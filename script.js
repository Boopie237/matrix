// Select the canvas element from the HTML
const canvas = document.getElementById("canvas");

/*
Get the 2D drawing context.
This allows us to draw shapes, text, and animations on the canvas.
*/
const ctx = canvas.getContext("2d");

/*
Set the canvas size to match the browser window size
so the animation fills the entire screen.
*/
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*
These are the characters that will fall down the screen.
They will be randomly selected to create the Matrix-style effect.
*/
const letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/*
Size of each character drawn on the screen.
This also determines the spacing of the falling columns.
*/
const fontSize = 18;

/*
Calculate how many columns of characters fit across the screen.
Example:
If the screen is 900px wide and font size is 18px,
then there will be about 50 columns.
*/
const columns = Math.floor(canvas.width / fontSize);

/*
Array that stores the vertical position of each falling column.
Each index represents one column of falling characters.
*/
let drops = [];

/*
Initialize the drop positions.
Each column starts at a random height so they do not all start together.
*/
for (let i = 0; i < columns; i++) {
  drops[i] = Math.random() * canvas.height / fontSize;
}

/*
Main animation function.
This function continuously runs to create the falling effect.
*/
function animate() {

  /*
  Draw a semi-transparent black rectangle over the entire canvas.

  This slightly darkens the previous frame instead of clearing it completely,
  which creates the trailing "rain" effect.
  */
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /*
  Set the color of the falling characters.
  */
  ctx.fillStyle = "lime";

  /*
  Set the font style and size used when drawing characters.
  Monospace ensures equal spacing between characters.
  */
  ctx.font = fontSize + "px monospace";

  /*
  Loop through each column of falling characters.
  */
  for (let i = 0; i < drops.length; i++) {

    /*
    Select a random character from the letters string.
    */
    const text = letters.charAt(
      Math.floor(Math.random() * letters.length)
    );

    /*
    Draw the character on the canvas.

    X position = column index * fontSize
    Y position = drop position * fontSize
    */
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    /*
    Move the drop down one row for the next frame.
    */
    drops[i]++;

    /*
    If the drop reaches the bottom of the screen,
    randomly reset it back to the top.

    This randomness prevents all columns from resetting together.
    */
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.97) {
      drops[i] = 0;
    }
  }

  /*
  requestAnimationFrame tells the browser to run the animate()
  function again before the next screen repaint.

  This creates a smooth and efficient animation loop.
  */
  requestAnimationFrame(animate);
}

/*
Start the animation loop.
*/
animate();

/*
When the browser window is resized,
update the canvas size so the animation continues
to fill the entire screen.
*/
window.addEventListener("resize", function () {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

});
