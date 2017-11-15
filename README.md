# Mancala
This is an interactive mancala game that can be played right on your desktop! In order to play, simply grab a friend and load the Github link found in this markdown in your browser window.

## Technologies Used
### JQuery/JavaScript:
#### Event listeners:
  * Marble holes (moving marbles on click, providing marble count on hover)
  * Navigation buttons 
  * Modal window buttons
#### Event handlers:
  * Setting global variables
  * Removing marbles from holes 
  * Determining hover behavior on mouse leaving and entering holes
#### Functions:
  * Creating the board and marble setup
  * Moving the marbles around the board
  * Determining the color of marbles and location within their holes/mancalas
  * Disabling players’ holes
  * Determining the winner
  * Starting over/clearing the board
#### Global variables:
  * Total marble counts for both players
  * Current player’s turn
  * Number of marbles to distribute in a single turn
  * Location of the starting and ending holes on a given turn
  * Marble color combinations
### HTML
### CSS:
  * Images (wooden background for board)
  * Font families (“Tex Gyre Adventor”)
  * Animations (scaling and fade out of mancala text)


## Approach
### Research: 
I wanted to avoid a typical board game for this project, but I still wanted to pick one that was familiar and with simple enough rules that would allow for some time to focus on really perfecting the CSS and logical components. Immediately, I thought back to my younger days as a swimmer, playing mancala with friends at meets. This being said, I hadn’t played Mancala for a few years so I refreshed myself with the rules of the game, referencing the site below, and wrote up my own interpretation as well that served as the basis for the “How to Play” content on the game’s page:
   
Reference: 
http://www.instructables.com/id/How-to-play-MANCALA/
   
My interpretation: https://docs.google.com/document/d/1zCyLNDBNG5bCVxa3xOu4CqjjiAvR59iLPQdIjKA2Abo/edit

### Wireframe: 
Once I had decided on the game, I created the wireframe below to lay out the board and the navigation. Because the board is the only real focus of the game, there wasn’t much need to develop more mockups. There is also a feature I included here, the score section, that was intended to keep a running tally of player 1 and player 2 scores over multiple games, but I decided to remove that functionality; I thought it cluttered the page design.

<img src="https://i.imgur.com/5hs3sdy.png" 
alt="Wireframe" width="500" height="400" border="10" /></a>

### Pseudocode: 
Next, I took some time to pseudocode the steps involved in a single round of pla in order to loop that logic to simulate multiple turns and eventually multiple games. Below is a link to my pseudocode:

https://docs.google.com/document/d/1h9wqd1S77iLKfHLgmyNY1nSv4pqgXyzTMRsSE2CWrzY/edit

### User Stories: 
To manage the creation of the game, I roughly framed out a series of user stories that are listed in the document below. I bolded the stories that were required in order to produce the minimum viable product, while leaving the others there as stretch goals. In working through these stories, I began with those in bold, but made sure to start with the most basic, functional pieces first. Under the first story I worked on, I built out the board in HTML and CSS first, before adding in jQuery elements to simulate the marbles. From there I focused on moving the marbles about the board using event listeners and functions with jQuery, and lastly, included restart logic along with some finishing touches (CSS, “How to Play” modal window, etc.)
https://docs.google.com/document/d/1kzOUCamyCi-VFBqtMUJ0Vn-cOycBvt45TfqnRmt3_hY/edit


## Github Link: 

https://paige1381.github.io/Mancala/

## Instructions:
Each player is set up with their own row of 6 holes and a mancala (player 1 on the right, player 2 on the left). At this point, the game is set up so that player 1 will always go first. Player 2’s holes are disabled during this time so the user cannot click any of them, and the “PLAYER 2” text is grayed-out. When it is player 2’s turn, the same behavior will occur, but for player 1. The mancalas are always disabled because marbles cannot be moved from these.

A player makes their move by clicking one of their holes where they would like to distribute marbles from. The marbles will automatically distribute themselves among the other holes and macalas in a counter-clockwise direction. Only one marble will be placed in a hole and the opponent’s mancala is always skipped.

When marbles are distributed and the last marble is added to a hole on that player’s side, that player takes another turn (opponent’s holes are disabled and corresponding text is grayed-out). If this last marble is also added to a hole that was previously empty, all of the marbles in the opponent’s hole directly across the board are added to that hole automatically.

The game is over when one row of holes, not the mancalas, are completely empty. Any marbles left in a row should be added to the corresponding player’s mancala, but for the sake of presentation, this game leaves these marbles in place. The winner is determined by the total number of marbles each user ends with (in their row of holes and their mancala). Once the marbles have been tallied, users are welcome to quit the game or continue another one. Because there are an even number of marbles (48), there is the potential for a tied game.


## Future Enhancements
### Static marble colors: 
Right now, the marble elements in the game are removed and re-created at each move around the board so the gradient colors are reassigned. The fact that the colors randomly change may confuse some players.

### Greeting modal: 
When users first load the page, it would be nice to have some sort of greeting or quick explanation about how to start the game. It might not be intuitive to click on the different holes in order to get the game moving. 

### Randomly determine who goes first: 
As I was playing the game, I realized there could be a slight advantage in going first, meaning being player 1. Players could alternatively decide amongst themselves who gets to be player 1 with each game, but it would be a nice touch to add some randomization in choosing the first player to move or even alternating automatically between player 1 and player 2 with each game played.

### Animation to show marbles being dropped in holes/mancalas: 
I also noticed that the difference between the real Mancala game and my computerized version is the time it takes to actually move your marbles around the board game. There were many times while I was playing that I had to check the console log generated to make sure that the resulting distribution of marbles from a play was correct. In the end, the code should always execute the plays correctly, but it all happens so fast that certain moves can leave you confused, especially when your last marble is placed in your row in an empty hole.

