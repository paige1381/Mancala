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
  let startIndex = null;

  // Tracks the location of the hole where the last marble was added
  let endIndex = null;





  // Event handlers =========================================
  // Setting up game logic for a single play
  const setVariables = (event) => {
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    // console.log('current hole:', $hole);
    numMarbles = $hole.children().length; // store the number of marbles in the selected hole
    console.log('hole originally had', numMarbles + ' marbles');
    startIndex = $hole.index(); // set the index equal to the location of the selected hole
    console.log('hole located at index', startIndex);
    if ($hole.hasClass('hole-1')) {
      currentPlayer = 1; // change the player based on the class of the selected hole
      player1Marbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    else {
      currentPlayer = 2; // change the player based on the class of the selected hole
      player2Marbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    console.log('it\s player', currentPlayer + '\'s turn');
    console.log('player 1 total:', player1Marbles);
    console.log('player 2 total:', player2Marbles);
    removeMarbles(event);
  }


  const removeMarbles = (event) => {
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    $hole.children().remove(); // remove the marbles from the selected hole
    // console.log('the hole now has', $hole.children().length + ' marbles');
    distributeInitialPlayerRowMarbles(event); // go on to distribute the marbles from the selected hole
  }


  const distributeInitialPlayerRowMarbles = (event) => { // function to distribute marbles along the player's row based on hole selected
    // const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    console.log(numMarbles);
    let limit = null; // create a variable to store the for loop iteration limit
    if (currentPlayer === 1) { // when the hole is in player 1's row
      if (startIndex <= numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 0; // only distribute the number of marbles that match the number of holes, hold the rest
      }
      else {
        limit = startIndex - numMarbles;
      }
      for (let i = startIndex - 1; i >= limit; i--) {
        const $marble = $('<div>').addClass('marble'); // create a marble
        $('#row-1').children().eq(i).append($marble); //add marble to the next hole
        player1Marbles++; // increase player 1's total marbles by 1
        numMarbles--; //decrease the marbles to distribute
        // console.log('marbles left to distribute:', numMarbles);
        endIndex = startIndex - limit; // set the index equal to the last hole where a marble was added
      }
    }
    else { // when the hole is in player 2's row
      // console.log('number of marbles:', limit);
      // console.log('number of holes:', $('#row-2').children().length - index - 1);
      if (5 - startIndex <= numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 5; // only distribute the number of marbles that match the number of holes, hold the rest
      }
      else {
        limit = startIndex + numMarbles;
      }
      for (let i = startIndex + 1; i <= limit; i++) { // if hole is in player 2's row
        const $marble = $('<div>').addClass('marble'); // create a marble
        $('#row-2').children().eq(i).append($marble); //add marble to the next hole
        player2Marbles++; // increase player 2's total marbles by 1
        numMarbles--;
        // console.log('marbles left to distribute:', numMarbles);
        endIndex = limit; // set the index equal to the last hole where a marble was added
      }
    }
    console.log('ended at index', endIndex);
    console.log('there are', numMarbles + ' left to distribute');
    console.log('player 1 total:', player1Marbles);
    console.log('player 2 total:', player2Marbles);
    distributeMancalaMarbles(); // go on to distribute marbles to players's mancalas
  }


  const distributeMancalaMarbles = () => { // funtion to distribute marbles in the mancalas
    if (numMarbles > 0 && currentPlayer === 1) { // if player 1 still has marbles to distribute
      $('#mancala-1').append($('<div>').addClass('marble')); // add a marble to their mancala
      player1Marbles++; // increase player 1's total marbles by 1
      numMarbles--; //decrease the marbles to distribute
      console.log('there are', numMarbles + ' left to distribute');
      distributeOpponentRowMarbles();
    }
    else if (numMarbles > 0 && currentPlayer === 2) { // if player 2 still has marbles to distribute
      $('#mancala-2').append($('<div>').addClass('marble')); // add a marble to their mancala
      player2Marbles++; // increase player 2's total marbles by 1
      numMarbles--; //decrease the marbles to distribute
      console.log('there are', numMarbles + ' left to distribute');
      distributeOpponentRowMarbles();
    }
    else { // there are no more marbles left to distribute
      determinePlayer(); // go on to determine what player should go next
    }
    console.log('there are', numMarbles + ' left to distribute');
    console.log('player 1 total:', player1Marbles);
    console.log('player 2 total:', player2Marbles);
  }


  const distributeOpponentRowMarbles = () => { // function to distribute marbles along the opponent's row
    let limit = null; // create a variable to store the for loop iteration limit
    if (numMarbles > 0 && currentPlayer === 1) { // if player 1 still has marbles to distribute
      if (6 < numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 6; // only distribute the number of marbles that match the number of holes, hold the rest
      }
      else {
        limit = numMarbles;
      }
      for (let i = 0; i < limit; i++) { // if hole is in player 2's row
        const $marble = $('<div>').addClass('marble'); // create a marble
        $('#row-2').children().eq(i).append($marble); //add marble to the next hole
        player2Marbles++; // increase player 2's total marbles by 1
        numMarbles--;
        console.log('there are', numMarbles + ' left to distribute');
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
      distributePlayerRowMarbles();
    }
    else if (numMarbles > 0 && currentPlayer === 2) {
      if (6 < numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 0; // only distribute the number of marbles that match the number of holes, hold the rest
      }
      else {
        limit = 6 - numMarbles;
      }
      for (let i = 5; i >= limit; i--) {
        const $marble = $('<div>').addClass('marble'); // create a marble
        $('#row-1').children().eq(i).append($marble); //add marble to the next hole
        player1Marbles++; // increase player 1's total marbles by 1
        numMarbles--; //decrease the marbles to distribute
        console.log('there are', numMarbles + ' left to distribute');
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
      distributePlayerRowMarbles();
    }
    else { // there are no more marbles left to distribute
      determinePlayer(); // go on to determine what player should go next
    }
    console.log('ended at index', endIndex);
    console.log('there are', numMarbles + ' left to distribute');
    console.log('player 1 total:', player1Marbles);
    console.log('player 2 total:', player2Marbles);
  }


  const distributePlayerRowMarbles = () => { // function to distribute marbles along the player's row
    let limit = null; // create a variable to store the for loop iteration limit
    if (numMarbles > 0 && currentPlayer === 1) { // when the hole is in player 1's row
      if (6 < numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 0; // only distribute the number of marbles that match the number of holes, hold the rest
        }
        else {
          limit = 6 - numMarbles;
        }
        for (let i = 5; i >= limit; i--) {
        const $marble = $('<div>').addClass('marble'); // create a marble
        $('#row-1').children().eq(i).append($marble); //add marble to the next hole
        player1Marbles++; // increase player 1's total marbles by 1
        numMarbles--; //decrease the marbles to distribute
        console.log('there are', numMarbles + ' left to distribute');
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
    }
    else if (numMarbles > 0 && currentPlayer === 2) { // when the hole is in player 2's row
      if (6 < numMarbles) { // if there are less holes to distribute marbles to, than marbles themselves
        limit = 6; // only distribute the number of marbles that match the number of holes, hold the rest
        }
        else {
          limit = numMarbles;
        }
        for (let i = 0; i < limit; i++) { // if hole is in player 2's row
        const $marble = $('<div>').addClass('marble'); // create a marble
        $('#row-2').children().eq(i).append($marble); //add marble to the next hole
        player2Marbles++; // increase player 2's total marbles by 1
        numMarbles--;
        console.log('there are', numMarbles + ' left to distribute');
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
    }
    console.log('ended at index', endIndex);
    console.log('there are', numMarbles + ' left to distribute');
    console.log('player 1 total:', player1Marbles);
    console.log('player 2 total:', player2Marbles);
    distributeMancalaMarbles(); // go on to distribute marbles to players's mancalas
  }













  const determinePlayer = () => { // function to determine which player goes next
    console.log('to do');
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
