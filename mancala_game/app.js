$(() => {

  // Setting up game logic for a single play
  const playGame = (event) => {
    console.log($(event.currentTarget));
  }















  // Creating initial mancala board setup
  // player 1
  for (let i = 0; i < 6; i++) {
    const $hole = $('<div>').addClass('hole-1'); // creating holes (not the mancala)
    $('#row-1').append($hole); // adding holes to the mancala board
    $hole.on('click', playGame) // adding an event listner to all the holes
    for (let j = 0; j < 4; j++) {
      const $marble = $('<div>').addClass('marble'); // creating marbles
      $hole.append($marble); // adding marbles to the mancala board
    }
  }

  // player 2
  for (let i = 0; i < 6; i++) {
    const $hole = $('<div>').addClass('hole-2'); // creating holes (not the mancala)
    $('#row-2').append($hole); // adding holes to the mancala board
    $hole.on('click', playGame) // adding an event listner to all the holes
    for (let j = 0; j < 4; j++) {
      const $marble = $('<div>').addClass('marble'); // creating marbles
      $hole.append($marble); // adding marbles to the mancala board
    }
  }






})
