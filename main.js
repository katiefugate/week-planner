var $addButton = document.querySelector('.add-button');
var $submitButton = document.querySelector('.submit-button');
var $modalContainer = document.querySelector('.modal-container');
var $overlay = document.querySelector('.overlay');

function addHandler(event) {
  $modalContainer.className = 'modal-container';
  $overlay.className = 'overlay';
}

$addButton.addEventListener('click', addHandler);

function submitHandler(event) {
  event.preventdefault();
  $modalContainer.className = 'modal-container hidden';
  $overlay.className = 'overlay hidden';
}

$submitButton.addEventListener('submit', submitHandler);
