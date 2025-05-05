const form = document.getElementById('entryForm');
const winnersList = document.getElementById('winnersList');
let participants = JSON.parse(localStorage.getItem('vox_participants') || '[]');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (firstName && lastName && email && phone) {
        participants.push({ firstName, lastName, email, phone });
        localStorage.setItem('vox_participants', JSON.stringify(participants));
        alert('Pieteikums iesniegts!');
        form.reset();
    }
});

document.getElementById('drawBtn').addEventListener('click', function() {
    winnersList.innerHTML = '';
    if (participants.length < 3) {
        alert('Nepietiek dalībnieku izlozei!');
        return;
    }

    const shuffled = [...participants].sort(() => 0.5 - Math.random());
    const winners = shuffled.slice(0, 3);
    winners.forEach(w => {
        const li = document.createElement('li');
        li.textContent = `${w.firstName} ${w.lastName} (${w.email})`;
        winnersList.appendChild(li);
    });
});
