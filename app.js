const form = document.getElementById('workout-form');
const API = 'http://127.0.0.1:5000';

async function getWorkouts() {
  const response = await fetch(`${API}/workouts`);
  const workouts = await response.json();
  return workouts;
}

async function renderWorkouts() {
  const workouts = await getWorkouts();
  workouts.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

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
      <td><button class="delete-btn" data-index="${workout.id}">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

form.addEventListener('submit', async function(event) {
  event.preventDefault();

  const workout = {
    date: document.getElementById('date').value,
    type: document.getElementById('workout-type').value,
    exercise: document.getElementById('exercise').value,
    sets: document.getElementById('sets').value,
    reps: document.getElementById('reps').value,
    weight: document.getElementById('weight').value
  };

  await fetch(`${API}/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workout)
  });

  renderWorkouts();
  form.reset();
});

document.querySelector('tbody').addEventListener('click', async function(event) {
  if (event.target.classList.contains('delete-btn')) {
    const index = event.target.getAttribute('data-index');
    await fetch(`${API}/workouts/${index}`, {
      method: 'DELETE'
    });
    renderWorkouts();
  }
});

renderWorkouts();