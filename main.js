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

function contentLoadHandler(event) {
  for (var i = 0; i < data.entries.length; i++) {
    for(var k = 0; k < $viewDays.length; k++) {
      if (data.entries[i].day === $viewDays[k].dataset.view) {
        $viewDays[k].appendChild(addEntry(data.entries[i]));
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', contentLoadHandler);

var $addButton = document.querySelector('.add-button');
var $submitButton = document.querySelector('.submit-button');
var $modalContainer = document.querySelector('.modal-container');
var $overlay = document.querySelector('.overlay');
var $form = document.querySelector('form');
var $viewDays = document.querySelectorAll('tbody');
var $dayTitle = document.querySelector('h2');
var $updateModal = document.querySelector('.update-modal-container');
var $table = document.querySelector('table')

function addHandler(event) {
  $modalContainer.className = 'modal-container';
  $overlay.className = 'overlay';
}

$addButton.addEventListener('click', addHandler);

function submitHandler(event) {
  event.preventDefault();
  $modalContainer.className = 'modal-container hidden';
  $overlay.className = 'overlay hidden';
  var entryId = data.nextEntryId;
  var time = $form.elements.time.value;
  var description = $form.elements.description.value;
  var day = $form.elements.dayWeek.value;
  var entryObj = { time, description, day, entryId };
  data.entries.unshift(entryObj);
  data.nextEntryId++;
  for(var i = 0; i < $viewDays.length; i++) {
    if (entryObj.day === $viewDays[i].dataset.view) {
      console.log($viewDays[i].dataset.view);
      console.log(entryObj.day)
      $viewDays[i].appendChild(addEntry(entryObj));
    }
  }
}

$form.addEventListener('submit', submitHandler);

var $allDays = document.querySelector('.all-days');

var $eachDay = document.querySelectorAll('.days');

function addEntry(entry) {
  var tRow = document.createElement('tr');
  var time = document.createElement('td');
  var description = document.createElement('td');
  var updateButton = document.createElement('button');
  tRow.appendChild(time);
  tRow.appendChild(description);
  time.textContent = entry.time;
  description.textContent = entry.description;
  description.appendChild(updateButton);
  updateButton.className = 'update-button';
  updateButton.textContent = 'Update';
  tRow.dataset.entry = entry.entryId;
  return tRow;
}

function daysHandler(event) {
  for (var i = 0; i < $eachDay.length; i++) {
    if (event.target.getAttribute('id') === $eachDay[i].getAttribute('id')) {
      $viewDays[i].className = 'day';
      $dayTitle.textContent = 'Scheduled events for ' + $eachDay[i].textContent;
    } else {
      $viewDays[i].className = 'day hidden';
    }
  }
}

$allDays.addEventListener('click', daysHandler);

var $updateForm = document.querySelector('.update-form');
console.log($updateForm)

function updateHandler(event) {
  if(event.target.className === 'update-button') {
    $updateModal.className = 'update-modal-container';
    $overlay.className = 'overlay';
  }
  data.editing = event.target.parentNode.parentNode.dataset.entry;
  $updateForm.elements.description.value = event.target.parentNode.firstChild.textContent;
  $updateForm.elements.time.value = event.target.parentNode.parentNode.firstChild.textContent;
  $updateForm.elements.dayWeek.value = event.target.parentNode.parentNode.parentNode.dataset.view;
}

$table.addEventListener('click', updateHandler);

var $updateSubmit = document.querySelector('.submit-button.update');
function updateSubmitHandler(event) {
  event.preventDefault();
  for(var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === Number(data.editing)) {
      data.entries[i].description = $updateForm.elements.description.value;
      data.entries[i].time = $updateForm.elements.time.value;
      data.entries[i].day = $updateForm.elements.dayWeek.value;
    }
  }
  var $eachRow = document.querySelectorAll('tr');
  for(i = 0; i < $eachRow.length; i++) {
    console.log($eachRow[i])
    console.log(data.editing)
    if(data.editing === $eachRow[i].dataset.entry) {
      $eachRow[i].firstChild.textContent = $updateForm.elements.time.value;
      $eachRow[i].firstChild.nextSibling.textContent = $updateForm.elements.description.value;
      $eachRow[i].dataset.view = $updateForm.elements.dayWeek.value;
      var updateButton = document.createElement('button');
      $eachRow[i].firstChild.nextSibling.appendChild(updateButton);
      updateButton.className = 'update-button';
      updateButton.textContent = 'Update'
    }
  }
  $updateModal.className = 'update-modal-container hidden';
  $overlay.className = 'overlay hidden';
}

$updateSubmit.addEventListener('click', updateSubmitHandler);
