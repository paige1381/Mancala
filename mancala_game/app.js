$(() => {

  // adding player 1 holes to the mancala board (not the mancala)
  for (let i = 0; i < 6; i++) {
    const $hole = $('<div>').addClass('hole-1');
    $('#row-1').append($hole);
  }

  // adding player 2 holes to the mancala board (not the mancala)
  for (let i = 0; i < 6; i++) {
    const $hole = $('<div>').addClass('hole-1');
    $('#row-2').append($hole);
  }







})
