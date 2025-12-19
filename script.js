let power = 100;
let hour = 0; // 0 = 12 AM
let usage = 1;
let doors = { left: true, right: true }; // true = ouvert
let lights = { left: false, right: false };

// --- GESTION DU TEMPS ---
// 1h = 90 secondes (1.5 min)
const hourDuration = 90000; 

let clockInterval = setInterval(() => {
    hour++;
    if (hour > 6) {
        alert("6 AM - Tu as survécu !");
        clearInterval(clockInterval);
    }
    document.getElementById('clock').innerText = (hour === 0 ? 12 : hour) + " AM";
}, hourDuration);

// --- GESTION DE L'ÉNERGIE ---
setInterval(() => {
    // Calcul de la consommation
    usage = 1; 
    if (!doors.left) usage++;
    if (!doors.right) usage++;
    if (lights.left || lights.right) usage++;
    
    // Affichage de l'usage (les petits batonnets)
    document.getElementById('usage-dots').innerText = "I".repeat(usage);

    if (power > 0) {
        power -= (usage * 0.1); // Baisse de la batterie
        document.getElementById('power-val').innerText = Math.max(0, Math.floor(power));
    } else {
        outOfPower();
    }
}, 1000);

// --- FONCTIONS ACTIONS ---
function toggleDoor(side) {
    doors[side] = !doors[side];
    const doorEl = document.getElementById(`door-${side}`);
    doorEl.classList.toggle('open');
}

function toggleLight(side, state) {
    lights[side] = state;
    const lightEl = document.getElementById(`light-${side}`);
    if (state) lightEl.classList.add('light-on');
    else lightEl.classList.remove('light-on');
}

function outOfPower() {
    // Tout s'éteint
    document.getElementById('office').style.display = 'none';
    document.body.style.backgroundColor = 'black';
    alert("Plus de batterie... Prépare-toi au jumpscare.");
    location.reload();
}
