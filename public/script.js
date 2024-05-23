const socket = io();
let activePlayer = 'X';

document.getElementById('usernameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    socket.emit('join', { username });
    document.getElementById('usernameForm').style.display = 'none';
    document.getElementById('game').style.display = 'block';
});

socket.on('user joined', function(data) {
    console.log(data.username + ' joined the game.');
});

socket.on('move', function(data) {
    const space = document.getElementById(`space${data.index}`);
    space.innerHTML = data.player;
    space.onclick = null; // Disable further clicks on the occupied space
});

function makeMove(index) {
    const space = document.getElementById(`space${index}`);
    
    if (space.innerHTML === '') {
        space.innerHTML = activePlayer;
        socket.emit('move', { index: index, player: activePlayer });

        // Switch the active player
        activePlayer = (activePlayer === 'X') ? 'O' : 'X';

        // Disable the onclick event
        space.onclick = null;
    }
}