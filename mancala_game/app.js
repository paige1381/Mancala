$(() => {

  // Global variables =======================================
  // Player 1 total marbles
  let player1Marbles = 24;

  // Player 2 total marbles
  let player2Marbles = 24;

  // Tracks the current player's turn
  let currentPlayer = null;

  // Tracks the current number of marbles to distribute
  let numMarbles = null;

  // Tracks the location of the hole where marbles were grabbed
  let index = null;





  // Event handlers =========================================
  // Setting up game logic for a single play
  const setVariables = (event) => {
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    console.log('current hole:', $hole);
    numMarbles = $hole.children().length; // store the number of marbles in the selected hole
    console.log('previous # of marbles in hole:', numMarbles);
    index = $hole.index(); // set the index equal to the location of the selected hole
    console.log('index of hole:', index);
    if ($hole.hasClass('hole-1')) {
      currentPlayer = 1; // change the player based on the class of the selected hole
      player1Marbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    else {
      currentPlayer = 2; // change the player based on the class of the selected hole
      player2Marbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    console.log('Player', currentPlayer + '\'s turn');
    console.log('Player 1 total marbles:', player1Marbles);
    console.log('Player 2 total marbles:', player2Marbles);
    removeMarbles(event);
  }


  const removeMarbles = (event) => {
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    $hole.children().remove(); // remove the marbles from the selected hole
    console.log('new # of marbles in hole:', $hole.children().length);
    distributeMarbles(event); // go on to distribute the marbles from the selected hole
  }


  const distributeMarbles = (event) => {
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    let limit = numMarbles; // create a variable to store the for loop iteration limit
    if (currentPlayer === 1) { // when the hole is in player 1's row
      if (index <= limit) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = index; // only distribute the number of marbles that match the number of holes, hold the rest
      }
      for (let i = index - 1; i >= index - limit; i--) {
        const $marble = $('<div>').addClass('marble'); // create a marble
        $('#row-1').children().eq(i).append($marble); //add marble to the next hole
        player1Marbles++; // increase player 1's total marbles by 1
        // console.log('Player 1 total marbles:', player1Marbles);
        numMarbles--; //decrease the marbles to distribute
        // console.log('marbles left to distribute:', numMarbles);
      }
    }
    else { // when the hole is in player 2's row
      // console.log('number of marbles:', limit);
      // console.log('number of holes:', $('#row-2').children().length - index - 1);
      if ($('#row-2').children().length - index - 1 <= limit) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = $('#row-2').children().length - 1; // only distribute the number of marbles that match the number of holes, hold the rest
      }
      for (let i = index + 1; i <= limit; i++) { // if hole is in player 2's row
        const $marble = $('<div>').addClass('marble'); // create a marble
        $('#row-2').children().eq(i).append($marble); //add marble to the next hole
        player2Marbles++; // increase player 2's total marbles by 1
        // console.log('Player 2 total marbles:', player1Marbles);
        numMarbles--;
        // console.log('marbles left to distribute:', numMarbles);
      }
    }
  }














  // Creating initial mancala board setup
  // player 1
  for (let i = 0; i < 6; i++) {
    const $hole = $('<div>').addClass('hole-1'); // creating holes (not the mancala)
    $('#row-1').append($hole); // adding holes to the mancala board
    $hole.on('click', setVariables) // adding an event listner to all the holes
    for (let j = 0; j < 4; j++) {
      const $marble = $('<div>').addClass('marble'); // creating marbles
      $hole.append($marble); // adding marbles to the mancala board
    }
  }

  // player 2
  for (let i = 0; i < 6; i++) {
    const $hole = $('<div>').addClass('hole-2'); // creating holes (not the mancala)
    $('#row-2').append($hole); // adding holes to the mancala board
    $hole.on('click', setVariables) // adding an event listner to all the holes
    for (let j = 0; j < 4; j++) {
      const $marble = $('<div>').addClass('marble'); // creating marbles
      $hole.append($marble); // adding marbles to the mancala board
    }
  }






})
