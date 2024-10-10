// Minuteur
let timerInterval;
document.getElementById('startTimer').addEventListener('click', function() {
    const input = document.getElementById('timerInput').value;
    let time = parseInt(input);

    // Check if the input is a valid number
    if (isNaN(time) || time < 0) {
        alert("Veuillez entrer un temps valide en secondes.");
        return;
    }

    timerInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(timerInterval);
            showExplosionMessage("KA BOOOOOOOOOOOOOOOOOM !");
            document.getElementById('timerDisplay').innerText = "00:00"; // Reset display
        } else {
            time--;
            document.getElementById('timerDisplay').innerText = formatTime(time);
        }
    }, 1000);
});

// Function to show explosion message
function showExplosionMessage(message) {
    const explosionDiv = document.createElement('div');
    explosionDiv.className = 'explosion-message';
    explosionDiv.innerText = message;
    document.body.appendChild(explosionDiv);

    // Remove the message after animation
    setTimeout(() => {
        explosionDiv.remove();
    }, 3000); // Adjust time as needed
}

// Chronomètre
let stopwatchInterval;
let stopwatchTime = 0;
document.getElementById('startStopwatch').addEventListener('click', function() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    } else {
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            document.getElementById('stopwatchDisplay').innerText = formatStopwatchTime(stopwatchTime);
        }, 1000);
    }
});

document.getElementById('lap').addEventListener('click', function() {
    const lapTime = formatStopwatchTime(stopwatchTime);
    const li = document.createElement('li');
    li.innerText = lapTime;
    document.getElementById('laps').appendChild(li);
});

document.getElementById('resetStopwatch').addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    document.getElementById('stopwatchDisplay').innerText = "00:00:00";
});

// Horloge
setInterval(() => {
    const now = new Date();
    const options = { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('clockDisplay').innerText = now.toLocaleTimeString('fr-FR', options);
}, 1000);

// Réveil
let alarms = [];
document.getElementById('setAlarm').addEventListener('click', function() {
    const time = document.getElementById('alarmTime').value;
    const message = document.getElementById('alarmMessage').value;
    alarms.push({ time, message });
    updateAlarmsList();
});

// Fonction pour mettre à jour la liste des alarmes
function updateAlarmsList() {
    const alarmsList = document.getElementById('alarmsList');
    alarmsList.innerHTML = '';
    alarms.forEach(alarm => {
        const li = document.createElement('li');
        li.innerText = `${alarm.time} - ${alarm.message}`;
        alarmsList.appendChild(li);
    });
}

// Fonctions d'affichage du temps
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function formatStopwatchTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
