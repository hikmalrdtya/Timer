let interval;
let isRunning = false;
let savedInterval = null;
let alertSource = null;

// Nav
const navLinks = document.querySelectorAll("#pomodoro, #stopwatch, #timer");
const contentsNav = document.querySelectorAll("nav ul li");
const watch = document.querySelector(".wrapper-date");
const textHeader =document.querySelector("header h1");

const contents = {
	pomodoro: document.querySelector(".pomodoro-content"),
	stopwatch: document.querySelector(".stopwatch-content"),
	timer: document.querySelector(".timer-content")
};
const background = {
	pomodoro: "assets/village.webp",
	stopwatch: "assets/night.webp",
	timer: "assets/fall.webp",
	backgroundPosition : "center",
	backgroundSize: "cover"
};

navLinks.forEach(nav => {
	nav.addEventListener('click', () => {
		if (isRunning) {
			showAlert("Timer Masih Berjalan, Hentikan Dulu Sebelum Berpindah!", 'nav');
			return;
		}

		Object.values(contents).forEach(content => content.classList.add('hidden'));
		contents[nav.id].classList.remove('hidden');
		contents[nav.id].classList.add('display');

		if (contents[nav.id].classList.contains("pomodoro-content")) {
			document.body.style.background = `url(${background.pomodoro})`;
			document.body.style.backgroundPosition = `${background.backgroundPosition}`;
			document.body.style.backgroundSize = `${background.backgroundSize}`;

			watch.classList.remove('stopwatch-style');
			textHeader.classList.remove('font-style-stopwatch');
			watch.classList.remove('timer-style');
			textHeader.classList.remove('font-style-timer');

			contentsNav.forEach(nav => {
				nav.classList.remove('stopwatch-style');
			});
			contentsNav.forEach(nav => {
				nav.classList.remove('timer-style');
			});
		} else if (contents[nav.id].classList.contains("stopwatch-content")) {
			document.body.style.background = `url(${background.stopwatch})`;
			document.body.style.backgroundPosition = `${background.backgroundPosition}`;
			document.body.style.backgroundSize = `${background.backgroundSize}`;

			watch.classList.remove('timer-style');
			textHeader.classList.remove('font-style-timer');
			watch.classList.add('stopwatch-style');
			textHeader.classList.add('font-style-stopwatch');

			contentsNav.forEach(nav => {
				nav.classList.remove('timer-style');
			});
			contentsNav.forEach(nav => {
				nav.classList.add('stopwatch-style');
			});
		} else {
			document.body.style.background = `url(${background.timer})`;
			document.body.style.backgroundPosition = `${background.backgroundPosition}`;
			document.body.style.backgroundSize = `${background.backgroundSize}`;

			watch.classList.add('timer-style');
			textHeader.classList.add('font-style-timer');

			contentsNav.forEach(nav => {
				nav.classList.add('timer-style');
			});
		}
	});
});

// Nav Mobile
const prevArrow =  document.getElementById("leftArrow");
const nextArrow = document.getElementById("rightArrow");
const menuContainer = document.querySelector(".wrapper-links");
const menuItems = [
	document.getElementById("pomodoroMobile"),
	document.getElementById("stopwatchMobile"),
	document.getElementById("timerMobile")
];
const contentsMobile = [
	document.querySelector(".pomodoro-content"),
	document.querySelector(".stopwatch-content"),
	document.querySelector(".timer-content")
];
let currentIndex = 0;

function updateArrow() {
	if (currentIndex === 0) {
		prevArrow.classList.add("arrow-disabled");
	} else {
		prevArrow.classList.remove("arrow-disabled");
	}

	if (currentIndex === menuItems.length - 1) {
		nextArrow.classList.add("arrow-disabled");
	} else {
		nextArrow.classList.remove("arrow-disabled");
	}
}

function showNextMenu() {
	if (isRunning) {
			showAlert("Timer Masih Berjalan, Hentikan Dulu Sebelum Berpindah!", 'nav');
			return;
	}

	if (currentIndex < menuItems.length - 1) {
		menuItems[currentIndex + 1].classList.remove("hidden");
		menuItems[currentIndex + 1].classList.add("next-in");
		contentsMobile[currentIndex + 1].classList.remove("hidden");

		if (contentsMobile[currentIndex + 1].classList.contains("pomodoro-content")) {
			document.body.style.background = `url(${background.pomodoro})`;
			document.body.style.backgroundPosition = `${background.backgroundPosition}`;
			document.body.style.backgroundSize = `${background.backgroundSize}`;

			watch.classList.remove('stopwatch-style');
			textHeader.classList.remove('font-style-stopwatch');
			watch.classList.remove('timer-style');
			textHeader.classList.remove('font-style-timer');

			menuContainer.classList.remove("stopwatch");
			menuContainer.classList.remove("timer");
		} else if (contentsMobile[currentIndex + 1].classList.contains("stopwatch-content")) {
			document.body.style.background = `url(${background.stopwatch})`;
			document.body.style.backgroundPosition = `${background.backgroundPosition}`;
			document.body.style.backgroundSize = `${background.backgroundSize}`;

			watch.classList.remove('timer-style');
			textHeader.classList.remove('font-style-timer');
			watch.classList.add('stopwatch-style');
			textHeader.classList.add('font-style-stopwatch');

			menuContainer.classList.add("stopwatch");
		} else {
			document.body.style.background = `url(${background.timer})`;
			document.body.style.backgroundPosition = `${background.backgroundPosition}`;
			document.body.style.backgroundSize = `${background.backgroundSize}`;

			watch.classList.add('timer-style');
			textHeader.classList.add('font-style-timer');

			menuContainer.classList.remove("stopwatch");
			menuContainer.classList.add("timer");
		}

		menuItems[currentIndex].classList.add("hidden");
		menuItems[currentIndex].classList.remove("prev-in", "next-in");
		contentsMobile[currentIndex].classList.add("hidden");

		currentIndex++;
		updateArrow();

		setTimeout(() => {
			menuItems[currentIndex - 1].classList.remove("next-in");
			menuItems[currentIndex].classList.remove("prev-in");
		}, 300)
	}
}

function showPrevMenu() {
	if (isRunning) {
			showAlert("Timer Masih Berjalan, Hentikan Dulu Sebelum Berpindah!", 'nav');
			return;
	}

	if (currentIndex > 0) {
		menuItems[currentIndex - 1].classList.remove("hidden");
		menuItems[currentIndex - 1].classList.add("prev-in");
		contentsMobile[currentIndex - 1].classList.remove("hidden");

		if (contentsMobile[currentIndex - 1].classList.contains("pomodoro-content")) {
			document.body.style.background = `url(${background.pomodoro})`;
			document.body.style.backgroundPosition = `${background.backgroundPosition}`;
			document.body.style.backgroundSize = `${background.backgroundSize}`;

			watch.classList.remove('stopwatch-style');
			textHeader.classList.remove('font-style-stopwatch');
			watch.classList.remove('timer-style');
			textHeader.classList.remove('font-style-timer');

			menuContainer.classList.remove("stopwatch");
		} else if (contentsMobile[currentIndex - 1].classList.contains("stopwatch-content")) {
			document.body.style.background = `url(${background.stopwatch})`;
			document.body.style.backgroundPosition = `${background.backgroundPosition}`;
			document.body.style.backgroundSize = `${background.backgroundSize}`;

			watch.classList.remove('timer-style');
			textHeader.classList.remove('font-style-timer');
			watch.classList.add('stopwatch-style');
			textHeader.classList.add('font-style-stopwatch');

			menuContainer.classList.add("stopwatch");
			menuContainer.classList.remove("timer");
		} 

		menuItems[currentIndex].classList.add("hidden");
		menuItems[currentIndex].classList.remove("prev-in", "next-in");
		contentsMobile[currentIndex].classList.add("hidden");

		currentIndex--;
		updateArrow();

		setTimeout(() => {
			menuItems[currentIndex + 1].classList.remove("prev-in");
			menuItems[currentIndex].classList.remove("next-in");
		}), 300;
	}
}

prevArrow.addEventListener('click', showPrevMenu);
nextArrow.addEventListener('click', showNextMenu);

updateArrow();

// alert
function showAlert(message, source) {
	clearInterval(interval);
	savedInterval = interval;
	isRunning = false;
	alertSource = source;

	document.getElementById("alert-msg").textContent = message;
	document.querySelector(".wrapper-alert").classList.remove("hidden");
}

function closeAlert() {
	document.querySelector(".wrapper-alert").classList.add("hidden");

	if (alertSource === "nav" && !isRunning && !contents.pomodoro.classList.contains("hidden")) {
		startTimerPomodoro();
	} else if (alertSource === "nav" && isValid && !isRunning && !contents.stopwatch.classList.contains("hidden")) {
		startStopwatch();
	} else if (alertSource === "nav" && !isRunning && !contents.timer.classList.contains("hidden")) {
		startTimer();
	} else if (alertSource === "pomodoro" && !isRunning && !contents.pomodoro.classList.contains("hidden")) {
		startTimerPomodoro();
	} 
	alertSource = null
}

// Pomodoro Timer
let workTime = 25 * 60;
let breakTime = 5 * 60;
let longBreak = 15 * 60;
let practice = 0;
let currentTime = workTime;
let isWorkSession = true;

const displayPomodoro = document.querySelector(".display p");
const startPomodoro = document.getElementById("startPomodoro");
const stopPomodoro = document.getElementById("stopPomodoro");
const resetPomodoro = document.getElementById("resetPomodoro");
const detail = document.getElementById("detailPomodoro");
const itemPomodoro = document.querySelectorAll('.item-pomodoro');
const firstItem = itemPomodoro[0];
const secondItem = itemPomodoro[1];
const thirdItem = itemPomodoro[2];

function updateDisplay() {
	let minutes = Math.floor(currentTime / 60);
	let seconds = currentTime % 60;
	displayPomodoro.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimerPomodoro() {
	if (!isRunning) {
		isRunning = true;

		if (isWorkSession) {
			detail.textContent = "Focus Time";
		}

		if (detail.textContent == "Focus Time") {
			firstItem.classList.add('item-active');
			secondItem.classList.remove('item-active');
			thirdItem.classList.remove('item-active');
		} else if (detail.textContent == "Break Time") {
			firstItem.classList.remove('item-active');
			secondItem.classList.add('item-active');
			thirdItem.classList.remove('item-active');
		} else {
			firstItem.classList.remove('item-active');
			secondItem.classList.remove('item-active');
			thirdItem.classList.add('item-active');
		}

		interval = setInterval(() => {
			if (currentTime > 0) {
				currentTime--;
				updateDisplay();
			} else {
				clearInterval(interval);
				isRunning = false;

				if (isWorkSession) {
					practice++;
				}

				isWorkSession = !isWorkSession;
				
				if (!isWorkSession && practice === 3) {
					currentTime = longBreak;
					practice = 0;
					// alert("Saatnya Istirahat Panjang");
					showAlert("Saatnya Istirahat Panjang", "pomodoro");
					detail.textContent = "Long Break Time";
				} else {
					currentTime = isWorkSession ? workTime : breakTime;
					// alert(isWorkSession ? "Waktu Dimulai!" : "Saatnya Istirahat!");
					showAlert(isWorkSession ? "Waktu Dimulai" : "Saatnya Istirahat", "pomodoro");
					detail.textContent = "Break Time";
				}

				updateDisplay();
				// startTimerPomodoro();
			}
		}, 1000)
	}
}

function stopTimerPomodoro() {
	clearInterval(interval);
	isRunning = false;
	itemPomodoro.forEach(e => {
		e.classList.remove('item-active');
	});
}

function resetTimerPomodoro() {
	clearInterval(interval);
	isRunning = false;
	isWorkSession = true;
	currentTime = workTime;
	itemPomodoro.forEach(e => {
		e.classList.remove('item-active');
	});
	updateDisplay();
}

startPomodoro.addEventListener('click', startTimerPomodoro);
stopPomodoro.addEventListener('click', stopTimerPomodoro);
resetPomodoro.addEventListener('click', resetTimerPomodoro);

updateDisplay();

// Date
const displayDate = document.getElementById('date');

const updateDate = () => {
	const date = new Date();
	const monthYear = date.toLocaleString("id-ID", { month: "long", year: "numeric" });
	const day = date.toLocaleString("id-ID", { day: "numeric" });

	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");
	const time = `${hours}:${minutes}:${seconds}`;

	displayDate.textContent = `${time}, ${day} ${monthYear}`;
}

updateDate();
setInterval(updateDate, 1000);

// Stopwatch
const inputHours = document.querySelector('input[name="hours"]');
const inputMinutes = document.querySelector("input[name='minutes']");
const inputSeconds = document.querySelector("input[name='seconds']");
const displayStopwatch = document.getElementById("stopwatchTimer");
const btnSubmit = document.getElementById("submit");
const btnStartStopwatch = document.getElementById("startStopwatch");
const btnStopStopwatch = document.getElementById("stopStopwatch");
const btnResetStopwatch = document.getElementById("resetStopwatch");
let currentStopwatch = 0;
let isValid = false;

function updateStopwatch(currentStopwatch) {
	const hours = Math.floor(currentStopwatch / 3600);
	const minutes = Math.floor((currentStopwatch % 3600) / 60);
	const seconds = currentStopwatch % 60;
	const format = (num) => num.toString().padStart(2, "0");

	displayStopwatch.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

function startStopwatch() {
	const hours = parseInt(inputHours.value) || 0;
	const minutes = parseInt(inputMinutes.value) || 0;
	const seconds = parseInt(inputSeconds.value) || 0;

	// if (hours == 0 && minutes == 0 && seconds == 0) {
	// 	showAlert("Isi Input Terlebih Dahulu!");
	// 	return;
	// } 
	if (!isValid) {
		validateInput();
		return;
	}

	if (!isRunning) {
		if (currentStopwatch == 0) {
			currentStopwatch = (hours * 3600) + (minutes * 60) + seconds;

			inputHours.value = '0';
			inputMinutes.value = '0';
			inputSeconds.value = '0';
		}

		isRunning = true;
		updateStopwatch(currentStopwatch);

		interval = setInterval(() => {
			if (currentStopwatch > 0) {
				currentStopwatch--;
				updateStopwatch(currentStopwatch);
			} else {
				clearInterval(interval);
				isRunning = false;
				isValid = false;
				currentStopwatch = 0;
				showAlert("Waktu Habis", "stopwatch");
				return false;
			}
		}, 1000)
	}
}

function stopStopwatch() {
	if (isRunning) {
		clearInterval(interval)
		isRunning = false
	}
}

function resetStopwatch() {
	clearInterval(interval);
	isRunning = false;
	currentStopwatch = 0;
	updateStopwatch(currentStopwatch);
}

function validateInput () {
	const hours = parseInt(inputHours.value) || 0;
	const minutes = parseInt(inputMinutes.value) || 0;
	const seconds = parseInt(inputSeconds.value) || 0;
	const format = (num) => num.toString().padStart(2, "0");

	if (hours == 0 && minutes == 0 && seconds == 0) {
		showAlert("Isi Input Terlebih Dahulu!");
		return false;
	} 
	if (hours < 0 || hours > 1000) {
		showAlert("Jam Harus Antara 0 - 1000");
		return false;
	} 
	if (minutes < 0 || minutes > 60) {
		showAlert("Menit Harus Antara 0 - 60");
		return false;
	}
	if (seconds < 0 || seconds > 60) {
		showAlert("Detik Harus Antara 0 - 60");
		return false;
	}

	isValid = true;
	displayStopwatch.textContent = `${format(hours)}:${format(minutes)}:${format(seconds)}`;
	return true;
};

btnStartStopwatch.addEventListener('click', startStopwatch);
btnStopStopwatch.addEventListener('click', stopStopwatch);
btnResetStopwatch.addEventListener('click', resetStopwatch);
btnSubmit.addEventListener('click', validateInput);

// Timer
const displayTimer = document.getElementById("displayTimer");
const btnStartTimer = document.getElementById("startTimer");
const btnStopTimer = document.getElementById("stopTimer");
const btnResetTimer = document.getElementById("resetTimer");
const btnCheckTimer = document.getElementById("checkTimer");
const checkDisplay = document.querySelector(".wrapper-checkpoint ul");
let currentTimer = 0;
let numCheck = 1;

function updateTimer(hours, minutes, currentTimer) {
	const format = (num) => num.toString().padStart(2, '0');
	displayTimer.textContent = `${format(hours)}:${format(minutes)}:${format(currentTimer)}`;
}

function startTimer() {
	if (!isRunning) {
		isRunning = true;
		let hours = 0;
		let minutes = 0;
		interval = setInterval(() => {
			if (currentTimer >= 0) {
				currentTimer++;
				if (currentTimer >= 60) {
					currentTimer = 0;
					minutes++
				}
				if (minutes >= 60) {
					minutes = 0;
					hours++;
				}
				updateTimer(hours, minutes, currentTimer)
			}
		}, 1000)
	} 
}

function stopTimer() {
	if (isRunning) {
		clearInterval(interval);
		isRunning = false;
	}
}

function resetTimer() {
	clearInterval(interval);
	isRunning = false;
	currentTimer = 0;
	numCheck = 1;
	document.querySelectorAll(".wrapper-checkpoint ul li").forEach(e => {
		e.remove();
	})
	updateTimer(0, 0, currentTimer);
}

btnCheckTimer.addEventListener('click', () => {
	if (!isRunning) {
		return;
	}
	const checkPoint = displayTimer.textContent;
	const li = document.createElement("li");
	li.textContent = `${numCheck}. ${checkPoint}`;
	checkDisplay.append(li);
	numCheck++;
});

btnStartTimer.addEventListener('click', startTimer);
btnStopTimer.addEventListener('click', stopTimer);
btnResetTimer.addEventListener('click', resetTimer);

// Animation
const textPomodoro = document.querySelector(".pomodoro-timer h3");
const originalTextPomodoro = textPomodoro.textContent;
const textTimer = document.querySelector(".wrapper-timer h3");
const originalTextTimer = textTimer.textContent;
const textStopwatch = document.querySelector(".stopwatch h3");
const originalTextStopwatch = textStopwatch.textContent;

function animateTextPomodoro() {
	const letters = originalTextPomodoro.split("");
	textPomodoro.innerHTML = letters.map((char, i) => 
		`<span style="animation-delay: ${i * 0.2}s">${char}</span>`
	).join("");
}

function animateTextTimer() {
	const letters = originalTextTimer.split("");
	textTimer.innerHTML = letters.map((char, i) => 
		`<span style="animation-delay: ${i * 0.2}s">${char}</span>`
	).join("");
}

function animateTextStopwatch() {
	const letters = originalTextStopwatch.split("");
	textStopwatch.innerHTML = letters.map((char, i) => 
		`<span style="animation-delay: ${i * 0.2}s">${char}</span>`
	).join("");
}

animateTextPomodoro();
animateTextStopwatch();
animateTextTimer();

setInterval(animateTextPomodoro, 7000);
setInterval(animateTextStopwatch, 5000);
setInterval(animateTextTimer, 4000);
