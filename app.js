$(() => {

  // Global variables =======================================
  let totalMarbles = 24;

  // Player 1 total marbles
  let player1Marbles = totalMarbles;

  // Player 2 total marbles
  let player2Marbles = totalMarbles;

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

  // Pre-canned marble colors
  const marbleColors = [
    ['#e54ed0, #ff72ff'],
    ['#b106df, #06dfb1'],
    ['#1e48e2, #060e2d'],
    ['#42e100, #f6ff6a'],
    ['#fab340, #fe8787'],
    ['#b400a2, #9e0031']
  ]




  // Event handlers =========================================
  // Setting up game logic for a single play
  const setVariables = (event) => {
    console.log('=== setVariables  ===');
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    // console.log($hole.children('.hover-number'));
    $hole.hover(mouseEnter, mouseLeave);
    numMarbles = $hole.children().children().length; // store the number of marbles in the selected hole
    console.log('numMarbles:', numMarbles);
    startIndex = $hole.index(); // set the index equal to the location of the selected hole
    console.log('startIndex:', startIndex);
    if ($hole.hasClass('hole-1')) {
      player1Marbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    else {
      player2Marbles -= numMarbles; // reduce the number of marbles by the amount grabbed
    }
    console.log('currentPlayer:', currentPlayer);
    console.log('player1Marbles:', player1Marbles);
    console.log('player2Marbles:', player2Marbles);
    console.log('=====================');
    removeMarbles(event);
  }

  const removeMarbles = (event) => {
    console.log('removeMarbles');
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    $hole.children('.marble-layer').remove(); // remove the marbles from the selected hole
    // console.log('the hole now has', $hole.children().length + ' marbles');
    // console.log('currentPlayer:', currentPlayer);
    distributeInitialPlayerRowMarbles(); // go on to distribute the marbles from the selected hole
  }

  const mouseEnter = (event) => {
    const hoverNumber = $(event.currentTarget).children('.marble-layer').children().length;
    $(event.currentTarget).children('.hover-number').css('visibility', 'visible').text(hoverNumber);
  }

  const mouseLeave = (event) => {
    $(event.currentTarget).children('.hover-number').css('visibility', 'hidden')
  }


  // Functions ==============================================

  const randomRotate = () => { // used to randomly rotate marble layers
    return 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
  }


  const randomMarbleColor = (arr) => {
    const random = Math.floor(Math.random() * 6)
    // console.log(random);
    return 'radial-gradient(' + arr[random] + ')';
  }


  const checkMarbleLayers = (i, row) => { // check for how many marble layers exist for a hole
    const numMarbleLayers = $(row).children().eq(i).children('.marble-layer').length;
    console.log('numMarbleLayers', numMarbleLayers);
    if (numMarbleLayers === 0) {
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $(row).children().eq(i).append($marbleLayer);
      checkMarbleLayers(i, row);
    }
    else {
      checkLastLayer(numMarbleLayers, i, row); // pass the number of layers to checkLastLayer function
    }
  }


  const checkLastLayer = (numMarbleLayers, i, row) => {
    const numLastLayerMarbles = $(row).children().eq(i).children('.marble-layer').eq(numMarbleLayers - 1).children().length;
    console.log('numLastLayerMarbles', numLastLayerMarbles);
    createMarbleLayers(numMarbleLayers, numLastLayerMarbles, i, row); // pass the number of marbles in the last layer to createMarbleLayers function
  }


  const createMarbleLayers = (numMarbleLayers, numLastLayerMarbles, i, row) => {
    const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // create a marble
    if (numLastLayerMarbles < 5) { // check if the last marble layer has less than 5 marbles
      $(row).children().eq(i).children('.marble-layer').eq(numMarbleLayers - 1).append($marble); //add marble to that marble layer
      console.log('marble appended');
    }
    else {
      const $marbleLayer = $('<div>').addClass('marble-layer').css('transform', randomRotate()); // create a new marble layer
      $(row).children().eq(i).append($marbleLayer) // add this to the hole
      $marbleLayer.append($marble); //add marble to the new marble layer
    }
  }


  const distributeInitialPlayerRowMarbles = () => { // function to distribute marbles along the player's row based on hole selected
    console.log('=== distributeInitialPlayerRowMarbles ===');
    console.log('numMarbles:', numMarbles);
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
        checkMarbleLayers(i, '#row-1');
        // const $marble = $('<div>').addClass('marble'); // create a marble
        // $('#row-1').children().eq(i).append($marble); //add marble to the next hole
        player1Marbles++; // increase player 1's total marbles by 1
        numMarbles--; //decrease the marbles to distribute
        console.log('numMarbles:', numMarbles);
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
      checkMarbleLayers(i, '#row-2');
        // const $marble = $('<div>').addClass('marble'); // create a marble
        // $('#row-2').children().eq(i).append($marble); //add marble to the next hole
        player2Marbles++; // increase player 2's total marbles by 1
        numMarbles--;
        console.log('numMarbles:', numMarbles);
        endIndex = i; // set the index equal to the last hole where a marble was added
      }
    }
    // console.log('ended at index', endIndex);
    console.log('player1Marbles:', player1Marbles);
    console.log('player2Marbles:', player2Marbles);
    // console.log('endRow:', endRow);
    distributeMancalaMarbles(); // go on to distribute marbles to players's mancalas
  }


  const distributeMancalaMarbles = () => { // funtion to distribute marbles in the mancalas
    console.log('=== distributeMancalaMarbles ===');
    console.log('numMarbles:', numMarbles);
    if (numMarbles > 0 && currentPlayer === 1) { // if player 1 still has marbles to distribute
      endRow = 1; // the endIndex will be in player 1's mancala
      const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // create a marble
      $('#mancala-1').append($marble); // add a marble to their mancala
      player1Marbles++; // increase player 1's total marbles by 1
      numMarbles--; // decrease the marbles to distribute
      endIndex = null; // set this to null because the mancalas don't need indexes
      console.log('endIndex:', endIndex);
      console.log('numMarbles:', numMarbles);
      console.log('player1Marbles:', player1Marbles);
      console.log('player2Marbles:', player2Marbles);
      distributeOpponentRowMarbles();
    }
    else if (numMarbles > 0 && currentPlayer === 2) { // if player 2 still has marbles to distribute
      endRow = 2; // the endIndex will be in player 2's mancala
      const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // create a marble
      $('#mancala-2').append($marble); // add a marble to their mancala
      player2Marbles++; // increase player 2's total marbles by 1
      numMarbles--; //decrease the marbles to distribute
      endIndex = null; // set this to null because the mancalas don't need indexes
      console.log('endIndex:', endIndex);
      console.log('numMarbles:', numMarbles);
      console.log('player1Marbles:', player1Marbles);
      console.log('player2Marbles:', player2Marbles);
      distributeOpponentRowMarbles();
    }
    else { // there are no more marbles left to distribute
      console.log('endIndex:', endIndex);
      determineNextPlayer(); // go on to determine what player should go next
    }
    // console.log('there are', numMarbles + ' left to distribute');
    // console.log('player 1 total:', player1Marbles);
    // console.log('player 2 total:', player2Marbles);
  }


  const distributeOpponentRowMarbles = () => { // function to distribute marbles along the opponent's row
    console.log('=== distributeOpponentRowMarbles ===');
    console.log('numMarbles:', numMarbles);
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
        checkMarbleLayers(i, '#row-2');
        // const $marble = $('<div>').addClass('marble'); // create a marble
        // $('#row-').children().eq(i).append($marble); //add marble to the next hole
        player2Marbles++; // increase player 2's total marbles by 1
        numMarbles--;
        console.log('numMarbles:', numMarbles);
        console.log('player1Marbles:', player1Marbles);
        console.log('player2Marbles:', player2Marbles);
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
        checkMarbleLayers(i, '#row-1');
        // const $marble = $('<div>').addClass('marble'); // create a marble
        // $('#row-1').children().eq(i).append($marble); //add marble to the next hole
        player1Marbles++; // increase player 1's total marbles by 1
        numMarbles--; //decrease the marbles to distribute
        console.log('numMarbles:', numMarbles);
        console.log('player1Marbles:', player1Marbles);
        console.log('player2Marbles:', player2Marbles);
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
    console.log('=== distributePlayerRowMarbles ===');
    console.log('numMarbles:', numMarbles);
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
        checkMarbleLayers(i, '#row-1');
        // const $marble = $('<div>').addClass('marble'); // create a marble
        // $('#row-1').children().eq(i).append($marble); //add marble to the next hole
        player1Marbles++; // increase player 1's total marbles by 1
        numMarbles--; //decrease the marbles to distribute
        console.log('numMarbles:', numMarbles);
        console.log('player1Marbles:', player1Marbles);
        console.log('player2Marbles:', player2Marbles);
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
        checkMarbleLayers(i, '#row-2');
        // const $marble = $('<div>').addClass('marble'); // create a marble
        // $('#row-2').children().eq(i).append($marble); //add marble to the next hole
        player2Marbles++; // increase player 2's total marbles by 1
        numMarbles--;
        console.log('numMarbles:', numMarbles);
        console.log('player1Marbles:', player1Marbles);
        console.log('player2Marbles:', player2Marbles);
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
    console.log('=== determineNextPlayer ===');
    console.log('numMarbles:', numMarbles);
    console.log('player1Marbles:', player1Marbles);
    console.log('player2Marbles:', player2Marbles);
    // console.log(endRow);
    if (currentPlayer === 1 && endRow === 1) { // if player 1's last marble is added to their row
      // console.log('endIndex:', endIndex);
      // console.log($('.hole-1').eq(endIndex));
      console.log($('.hole-1').eq(endIndex).children().children().length);
      if ($('.hole-1').eq(endIndex).children().children().length === 1 && endIndex !== null) { // if the marble layers of the hole that the last marble was added to are empty and it's not the mancala
        for (let i = 0; i < $('.hole-2').eq(endIndex).children().children().length; i++) {
          checkMarbleLayers(endIndex, '#row-1');
          // const $marble = $('<div>').addClass('marble'); // create a marble
          // $('.hole-1').eq(endIndex).append($marble); // add all of player 2's marbles from the adjacent hole, to this hole
          player1Marbles++; // increase player 1's total marbles
          player2Marbles--; // decrease player 2's marbles
          console.log('player1Marbles:', player1Marbles);
          console.log('player2Marbles:', player2Marbles);
        }
        $('.hole-2').eq(endIndex).children().remove(); // remove all marbles from player 2's adjacent hole
      }
      disablePlayer2(); // they get to go again so disable player 2's row
    }
    else if (currentPlayer === 2 && endRow === 2) { // if player 2's last marble is added to their row
      // console.log('endIndex:', endIndex);
      // console.log($('.hole-1').eq(endIndex));
      if ($('.hole-2').eq(endIndex).children().children().length === 1 && endIndex !== null) { // if the hole that the last marble was added to was empty and it's not the mancala
        for (let i = 0; i < $('.hole-1').eq(endIndex).children().children().length; i++) {
          checkMarbleLayers(endIndex, '#row-2');
          // const $marble = $('<div>').addClass('marble'); // create a marble
          // $('.hole-2').eq(endIndex).append($marble); // add all of player 1's marbles from the adjacent hole, to this hole
          player2Marbles++; // increase player 2's total marbles
          player1Marbles--; // decrease player 1's marbles
          console.log('player1Marbles:', player1Marbles);
          console.log('player2Marbles:', player2Marbles);
        }
        $('.hole-1').eq(endIndex).children().remove(); // remove all marbles from player 1's adjacent hole
      }
      disablePlayer1(); // they get to go again so disable player 1's row
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
      determineRoundOver();
    }


  const disablePlayer1 = () => {
    console.log('disablePlayer1');
    // $('#player-1').css('border', 'none');
    $('#player-1').css('color', 'silver');
    $('.hole-1').off(); // disabling all of player 1's holes
    console.log('====== new round ======');
    console.log('player1Marbles:', player1Marbles);
    console.log('player2Marbles:', player2Marbles);
  }


  const disablePlayer2 = () => {
    console.log('disablePlayer2');
    // $('#player-2').css('border', 'none');
    $('#player-2').css('color', 'silver');
    $('.hole-2').off(); // disabling all of player 2's holes
    console.log('====== new round ======');
    console.log('player1Marbles:', player1Marbles);
    console.log('player2Marbles:', player2Marbles);
  }


  const enablePlayer1 = () => {
    console.log('enablePlayer1');
    // $('#player-1').css('border', '1px solid black');
    $('#player-1').css('color', 'black');
    $('.hole-1').on('click', setVariables); // adding an event listner to all the holes
  }


  const enablePlayer2 = () => {
    console.log('enablePlayer2');
    // $('#player-2').css('border', '1px solid black');
    $('#player-2').css('color', 'black');
    $('.hole-2').on('click', setVariables); // adding an event listner to all the holes
  }


  const determineFirstPlayer = () => {
    currentPlayer = 1;
    enablePlayer1();
    disablePlayer2();
  }


  const determineRoundOver = () => {
    console.log('=== determineRoundOver ===');
    console.log('player 1 empty?', checkPlayer1Marbles());
    console.log('player 2 empty?', checkPlayer2Marbles());
    if (checkPlayer1Marbles() || checkPlayer2Marbles()) { // Round is over only after all a player's holes are empty
      determineWinner();
    }
  }


  const checkPlayer1Marbles = () => {
    console.log('=== checkPlayer1Marbles ===');
    for (let i = 0; i < $('.hole-1').length; i++) {
      // console.log($('.hole-1').length);
      if ($('.hole-1').eq(i).children('.marble-layer').length > 0) { // stop the function once a hole is found not empty
        return false;
      }
    }
    return true; // only return true if all player 1 holes are empty
  }


  const checkPlayer2Marbles = () => {
    console.log('=== checkPlayer2Marbles ===');
    for (let i = 0; i < $('.hole-2').length; i++) {
      // console.log($('.hole-1').length);
      if ($('.hole-2').eq(i).children('.marble-layer').length > 0) { // stop the function once a hole is found not empty
        return false;
      }
    }
    return true; // only return true if all player 2 holes are empty
  }


  const determineWinner = () => {
    console.log('=== determineWinner ===');
    // if (checkPlayer1Marbles()) {
    //   console.log('player2Marbles:', player2Marbles);
    //   $('.hole-2').children().remove();
    //   $('#mancala-2').children().remove();
    //   for (let i = 0; i < player2Marbles; i++) {
    //     const $marble = $('<div>').addClass('marble'); // creating marbles
    //     $('#mancala-2').append($marble); // adding marbles to the mancala board
    //   }
    // }
    // else {
    //   console.log('player1Marbles:', player1Marbles);
    //   $('.hole-1').children().remove();
    //   $('#mancala-1').children().remove();
    //   for (let i = 0; i < player1Marbles; i++) {
    //     const $marble = $('<div>').addClass('marble'); // creating marbles
    //     $('#mancala-1').append($marble); // adding marbles to the mancala board
    //   }
    // }
    tallyScore();
  }


  // used same function set up seen here: https://raventools.com/blog/create-a-modal-dialog-using-css-and-javascript/
  const tallyScore = () => {
    console.log('=== tallyScore ===');
    disablePlayer1();
    disablePlayer2();
    const $p = $('<p>').attr('id', 'winner');
    $('#winning-message').prepend($p);
    // const $yesButton = $('<button>').addClass('button').text('Yes');
    // const $noButton = $('<button>').addClass('button').text('No');
    if (player1Marbles > player2Marbles) {
      $p.text('Player 1 is the winner!');
      // $('#winning-message').text('Player 1 is the winner!');
    }
    else if (player1Marbles < player2Marbles) {
      $p.text('Player 2 is the winner!');
      // $('#winning-message').text('Player 2 is the winner!');
    }
    else {
      $p.text('It\'s a tie, great job!');
      // $('#winning-message').text('It\'s a tie, great job!');
    }
    $('#winning-modal').css('visibility', 'visible');
    // $('.buttons').append($yesButton);
    // $('.buttons').append($noButton);
    $('.yes').on('click', newRound);
    $('.no').on('click', endRound);
    // clearBoard();
  }

  const newRound = (event) => {
    $('#winning-modal').css('visibility', 'hidden');
    $('#winner').remove();
    clearBoard();
    createBoard();
    player1Marbles = totalMarbles;
    player2Marbles = totalMarbles;
    determineFirstPlayer();
  }

  const endRound = (event) => {
    $('#winning-modal').css('visibility', 'hidden');
    $('#winner').remove();
    clearBoard();
    // createBoard();
    player1Marbles = totalMarbles;
    player2Marbles = totalMarbles;
  }

  const clearBoard = () => {
    console.log('=== clearBoard ===');
    $('.marble').remove();
  }

  const createBoard = () => { // Creating initial mancala board setup
    $('#row-1').empty();
    $('#row-2').empty();
    // player 1
    for (let i = 0; i < 6; i++) {
      const $hole = $('<div>').addClass('hole-1'); // creating holes (not the mancala)
      const $hoverNumber = $('<div>').addClass('hover-number');
      $('#row-1').append($hole); // adding holes to the mancala board
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $hole.append($marbleLayer); // adding marble layer to holes
      for (let j = 0; j < totalMarbles/6; j++) {
        const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // creating marbles
        $marbleLayer.append($marble); // adding marbles to the marble layer
      }
      $hoverNumber.text($hole.children('.marble-layer').children().length);
      $hole.append($hoverNumber);
      // $hole.hover(mouseEnter, mouseLeave);
    }
    // player 2
    for (let i = 0; i < 6; i++) {
      const $hole = $('<div>').addClass('hole-2'); // creating holes (not the mancala)
      const $hoverNumber = $('<div>').addClass('hover-number');
      $('#row-2').append($hole); // adding holes to the mancala board
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $hole.append($marbleLayer); // adding marble layer to holes
      for (let j = 0; j < totalMarbles/6; j++) {
        const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // creating marbles
        $marbleLayer.append($marble); // adding marbles to the marble layer
      }
      $hoverNumber.text($hole.children('.marble-layer').children().length);
      $hole.append($hoverNumber);
      // $hole.hover(mouseEnter, mouseLeave);
    }
  }


  // Event listeners

  $('#start-over').on('click', newRound);
  $('#instructions-button').on('click', () => {
    $('#instructions-modal').css('visibility', 'visible');
  });
  $('#close-button').children().on('click', () => {
    $('#instructions-modal').css('visibility', 'hidden');
  });


  // Invoking Functions

  createBoard();
  determineFirstPlayer();






}) //end
