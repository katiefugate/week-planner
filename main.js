var data = {
  editing: null,
  nextEntryId: 1,
  entries: []
};

var previousDataJSON = localStorage.getItem('week-planner');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function store(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('week-planner', dataJSON);
}

window.addEventListener('beforeunload', store);

var $addButton = document.querySelector('.add-button');
var $submitButton = document.querySelector('.submit-button');
var $modalContainer = document.querySelector('.modal-container');
var $overlay = document.querySelector('.overlay');
var $form = document.querySelector('form');
var $viewDays = document.querySelectorAll('tbody');

function addHandler(event) {
  $modalContainer.className = 'modal-container';
  $overlay.className = 'overlay';
}

$addButton.addEventListener('click', addHandler);

function submitHandler(event) {
  event.preventdefault();
  $modalContainer.className = 'modal-container hidden';
  $overlay.className = 'overlay hidden';

  console.log('testing');
  var entryId = data.nextEntryId;
  var time = $form.elements.time.value;
  var description = $form.elements.description.value;
  var day = $form.elements.dayWeek.value;
  var entryObj = { time, description, day, entryId };
  data.entries.unshift(entryObj);
  data.nextEntryId++;

}

$form.addEventListener('submit', submitHandler);

var $allDays = document.querySelector('.all-days');

var $eachDay = document.querySelectorAll('.days');

function daysHandler(event) {
  for (var i = 0; i < $eachDay.length; i++) {
    if (event.target.getAttribute('id') === $eachDay[i].getAttribute('id')) {
      $viewDays[i].className = 'day';
    } else {
      $viewDays[i].className = 'day hidden';
    }
    console.log($viewDays[i].className);
  }
}

$allDays.addEventListener('click', daysHandler);
