const form = document.getElementById('workout-form');

function getWorkouts() {
  const stored = localStorage.getItem('workouts');
  return stored ? JSON.parse(stored) : [];
}

function saveWorkouts(workouts) {
  localStorage.setItem('workouts', JSON.stringify(workouts));
}

function renderWorkouts() {
  const workouts = getWorkouts();
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  workouts.forEach(function(workout, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${workout.date}</td>
      <td>${workout.type}</td>
      <td>${workout.exercise}</td>
      <td>${workout.sets}</td>
      <td>${workout.reps}</td>
      <td>${workout.weight}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

form.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log('form submitted');

  const workout = {
    date: document.getElementById('date').value,
    type: document.getElementById('workout-type').value,
    exercise: document.getElementById('exercise').value,
    sets: document.getElementById('sets').value,
    reps: document.getElementById('reps').value,
    weight: document.getElementById('weight').value
  };

  const workouts = getWorkouts();
  workouts.push(workout);
  saveWorkouts(workouts);
  renderWorkouts();
  form.reset();
});

document.querySelector('tbody').addEventListener('click', function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.getAttribute('data-index');
    const workouts = getWorkouts();
    workouts.splice(index, 1);
    saveWorkouts(workouts);
    renderWorkouts();
  }
});

renderWorkouts();