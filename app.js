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

  // Tracks the row of th hole where the last marble was added
  let endRow = null;





  // Event handlers =========================================
  // Setting up game logic for a single play
  const setVariables = (event) => {
    console.log('setVariables');
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    // console.log('current hole:', $hole);
    numMarbles = $hole.children().length; // store the number of marbles in the selected hole
    console.log('hole originally had', numMarbles + ' marbles');
    startIndex = $hole.index(); // set the index equal to the location of the selected hole
    console.log('hole located at index', startIndex);
    if ($hole.hasClass('hole-1')) {
      player1Marbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    else {
      player2Marbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    console.log('it\s player', currentPlayer + '\'s turn');
    console.log('player 1 total:', player1Marbles);
    console.log('player 2 total:', player2Marbles);
    removeMarbles(event);
  }


  const removeMarbles = (event) => {
    console.log('removeMarbles');
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    $hole.children().remove(); // remove the marbles from the selected hole
    // console.log('the hole now has', $hole.children().length + ' marbles');
    console.log('current player:', currentPlayer);
    distributeInitialPlayerRowMarbles(); // go on to distribute the marbles from the selected hole
  }


  // Functions ==============================================
  const distributeInitialPlayerRowMarbles = () => { // function to distribute marbles along the player's row based on hole selected
    console.log('distributeInitialPlayerRowMarbles');
    console.log('endRow:', endRow);
    let limit = null; // create a variable to store the for loop iteration limit
    if (currentPlayer === 1) { // when the hole is in player 1's row
      endRow = 1; // the endIndex will be in player 1's row of holes
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
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
    }
    else { // when the hole is in player 2's row
      // console.log('number of marbles:', limit);
      // console.log('number of holes:', $('#row-2').children().length - index - 1);
      endRow = 2; // the endIndex will be in player 2's row of holes
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
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
    }
    // console.log('ended at index', endIndex);
    // console.log('there are', numMarbles + ' left to distribute');
    // console.log('player 1 total:', player1Marbles);
    // console.log('player 2 total:', player2Marbles);
    console.log('endRow:', endRow);
    distributeMancalaMarbles(); // go on to distribute marbles to players's mancalas
  }


  const distributeMancalaMarbles = () => { // funtion to distribute marbles in the mancalas
    console.log('distributeMancalaMarbles');
    console.log(endRow);
    if (numMarbles > 0 && currentPlayer === 1) { // if player 1 still has marbles to distribute
      endRow = 1; // the endIndex will be in player 1's mancala
      $('#mancala-1').append($('<div>').addClass('marble')); // add a marble to their mancala
      player1Marbles++; // increase player 1's total marbles by 1
      numMarbles--; // decrease the marbles to distribute
      endIndex = null; // set this to null because the mancalas don't need indexes
      console.log('there are', numMarbles + ' left to distribute');
      distributeOpponentRowMarbles();
    }
    else if (numMarbles > 0 && currentPlayer === 2) { // if player 2 still has marbles to distribute
      endRow = 2; // the endIndex will be in player 2's mancala
      $('#mancala-2').append($('<div>').addClass('marble')); // add a marble to their mancala
      player2Marbles++; // increase player 2's total marbles by 1
      numMarbles--; //decrease the marbles to distribute
      endIndex = null; // set this to null because the mancalas don't need indexes
      console.log('there are', numMarbles + ' left to distribute');
      distributeOpponentRowMarbles();
    }
    else { // there are no more marbles left to distribute
      determineNextPlayer(); // go on to determine what player should go next
    }
    // console.log('there are', numMarbles + ' left to distribute');
    // console.log('player 1 total:', player1Marbles);
    // console.log('player 2 total:', player2Marbles);
  }


  const distributeOpponentRowMarbles = () => { // function to distribute marbles along the opponent's row
    console.log('distributeOpponentRowMarbles');
    console.log(endRow);
    let limit = null; // create a variable to store the for loop iteration limit
    if (numMarbles > 0 && currentPlayer === 1) { // if player 1 still has marbles to distribute
      endRow = 2; // the endIndex will be in player 2's row of holes
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
      endRow = 1; // the endIndex will be in player 1's row of holes
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
      determineNextPlayer(); // go on to determine what player should go next
    }
    // console.log('ended at index', endIndex);
    // console.log('there are', numMarbles + ' left to distribute');
    // console.log('player 1 total:', player1Marbles);
    // console.log('player 2 total:', player2Marbles);
  }


  const distributePlayerRowMarbles = () => { // function to distribute marbles along the player's row
    console.log('distributePlayerRowMarbles');
    console.log(endRow);
    let limit = null; // create a variable to store the for loop iteration limit
    if (numMarbles > 0 && currentPlayer === 1) { // when the hole is in player 1's row
    endRow = 1; // the endIndex will be in player 1's row of holes
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
      endRow = 2; // the endIndex will be in player 2's row of holes
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
    distributeMancalaMarbles(); // go on to distribute marbles to players's mancalas
    // console.log('ended at index', endIndex);
    // console.log('there are', numMarbles + ' left to distribute');
    // console.log('player 1 total:', player1Marbles);
    // console.log('player 2 total:', player2Marbles);
  }


  const determineNextPlayer = () => { // function to determine which player goes next
    console.log('determineNextPlayer');
    console.log(currentPlayer);
    console.log(endRow);
    if (currentPlayer === 1 && endRow === 1) { // if player 1's last marble is added to their row
      disablePlayer2(); // they get to go again so disable player 2's row
      if ($('.hole-1').eq(endIndex).children().length === 1) { // if the hole that the last marble was added to was empty
        for (let i = 0; i < $('.hole-2').eq(endIndex).children().length; i++) {
          const $marble = $('<div>').addClass('marble'); // create a marble
          $('.hole-1').eq(endIndex).append($marble); // add all of player 2's marbles from the adjacent hole, to this hole
          player1Marbles++; // increase player 1's total marbles
        }
        $('.hole-2').eq(endIndex).children().remove(); // remove all marbles from player 2's adjacent hole
      }
    }
    else if (currentPlayer === 2 && endRow === 2) { // if player 2's last marble is added to their row
      disablePlayer1(); // they get to go again so disable player 1's row
      if ($('.hole-2').eq(endIndex).children().length === 1) { // if the hole that the last marble was added to was empty
        for (let i = 0; i < $('.hole-1').eq(endIndex).children().length; i++) {
          const $marble = $('<div>').addClass('marble'); // create a marble
          $('.hole-2').eq(endIndex).append($marble); // add all of player 1's marbles from the adjacent hole, to this hole
          player2Marbles++; // increase player 2's total marbles
        }
        $('.hole-1').eq(endIndex).children().remove(); // remove all marbles from player 1's adjacent hole
      }
    }
    else if (currentPlayer === 1) {
      enablePlayer2();
      currentPlayer = 2;
      disablePlayer1();
    }
    else {
      enablePlayer1();
      currentPlayer = 1;
      disablePlayer2();
      }
    }


  const disablePlayer1 = () => {
    console.log('disablePlayer1');
    $('.hole-1').off(); // disabling all of player 1's holes
  }


  const disablePlayer2 = () => {
    console.log('disablePlayer2');
    $('.hole-2').off(); // disabling all of player 2's holes
  }


  const enablePlayer1 = () => {
    console.log('enablePlayer1');
    $('.hole-1').on('click', setVariables); // adding an event listner back to all the holes
  }


  const enablePlayer2 = () => {
    console.log('enablePlayer2');
    $('.hole-2').on('click', setVariables); // adding an event listner back to all the holes
  }


  const determineFirstPlayer = () => {
    currentPlayer = 1;
    enablePlayer1();
  }









  // Creating initial mancala board setup
  // player 1
  for (let i = 0; i < 6; i++) {
    const $hole = $('<div>').addClass('hole-1'); // creating holes (not the mancala)
    $('#row-1').append($hole); // adding holes to the mancala board
    // $hole.on('click', setVariables) // adding an event listner to all the holes
    for (let j = 0; j < 4; j++) {
      const $marble = $('<div>').addClass('marble'); // creating marbles
      $hole.append($marble); // adding marbles to the mancala board
    }
  }

  // player 2
  for (let i = 0; i < 6; i++) {
    const $hole = $('<div>').addClass('hole-2'); // creating holes (not the mancala)
    $('#row-2').append($hole); // adding holes to the mancala board
    // $hole.on('click', setVariables) // adding an event listner to all the holes
    for (let j = 0; j < 4; j++) {
      const $marble = $('<div>').addClass('marble'); // creating marbles
      $hole.append($marble); // adding marbles to the mancala board
    }
  }

  determineFirstPlayer();






})
