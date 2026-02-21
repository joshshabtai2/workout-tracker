const form = document.getElementById('workout-form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const workoutType = document.getElementById('workout-type').value;
    const exercise = document.getElementById('exercise').value;
    const sets = document.getElementById('sets').value;
    const reps = document.getElementById('reps').value;
    const weight = document.getElementById('weight').value;

    const tbody = document.querySelector('tbody');
    const newRow = document.createElement ('tr');

    newRow.innerHTML = `
    <td>${date}</td>
    <td>${workoutType}</td>
    <td>${exercise}</td>
    <td>${sets}</td>
    <td>${reps}</td>
    <td>${weight}</td>
`;

tbody.appendChild(newRow);
form.reset();
});