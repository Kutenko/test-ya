document.addEventListener('DOMContentLoaded', function () {
	const runningLines = document.querySelectorAll('.ticker__list');
	runningLines.forEach(function (runningLine) {
		moveLine(runningLine);
	});
});

function moveLine(runningLine) {
	let position = 0;
	const lineItems = runningLine.querySelectorAll('li');
	const lineHeight = lineItems[0].offsetWidth;

	// Клонируем все элементы и добавляем их в конец списка
	lineItems.forEach(function (lineItem) {
		const clonedLine = lineItem.cloneNode(true);
		runningLine.appendChild(clonedLine);
	});

	// Запускаем анимацию
	const move = function () {
		position -= 0.35;
		runningLine.style.transform = `translateX(${position}px)`;

		// Когда первый элемент вышел за границу контейнера, сдвигаем его в конец
		if (position <= -lineHeight) {
			runningLine.appendChild(runningLine.firstElementChild);
			position = 0;
		}

		// Повторяем анимацию
		requestAnimationFrame(move);
	};

	// Запускаем передвижение строки
	move();
};

// Слайдеры
document.addEventListener("DOMContentLoaded", function() {
	let e = document.querySelector(".partic__slides"),
			t = document.querySelectorAll(".partic-slider__slide"),
			n = document.querySelector(".partic-prev"),
			i = document.querySelector(".partic-next"),
			r = 0,
			s = t.length,
			a = document.createElement("div"),
			c = window.innerWidth < 768;

	function l() {
			a.textContent = `${r + 1}/${s}`;
	}

	function o(n) {
			t.forEach((e, t) => {
					t === n ? e.classList.add("active") : e.classList.remove("active");
			});
			let i = t[0].offsetWidth,
					s = c ? 0 : n * (i + 20);
			e.style.transform = `translateX(-${s}px)`;
			r = n;
			l();
	}

	function d() {
			c ? e.style.transition = "none" : e.style.transition = "transform 0.5s ease";
	}

	a.className = "slide-counter";
	l();
	n.after(a);
	n.addEventListener("click", () => {
			o(0 === r ? s - 1 : r - 1);
	});
	i.addEventListener("click", () => {
			o(r === s - 1 ? 0 : r + 1);
	});
	o(r);
	window.addEventListener("resize", function() {
			c = window.innerWidth < 768;
			d();
			o(r);
	});
	d();

	function startAutoSlideShow() {
			let intervalId;

			function nextSlide() {
					if (r === s - 1) {
							o(0);
					} else {
							o(r + 1);
					}
			}

			function stopAutoSlideShow() {
					clearInterval(intervalId);
			}

			intervalId = setInterval(nextSlide, 3000);

			document.querySelector('.partic-slider-controls').addEventListener('mouseover', stopAutoSlideShow);
			document.querySelector('.partic-slider-controls').addEventListener('mouseout', () => {
					clearInterval(intervalId);
					intervalId = setInterval(nextSlide, 4000);
			});
	}

	startAutoSlideShow();
});


document.addEventListener("DOMContentLoaded", function () {
	let stagesContainer = document.querySelector(".stages__stages-elements");
	let stages = document.querySelectorAll(".stages-elements__element");
	let prevButton = document.querySelector(".stages-prev");
	let nextButton = document.querySelector(".stages-next");
	let controls = document.querySelector(".stages-elements-controls");
	let currentIndex = 0;
	let isMobile = window.innerWidth < 768;

	function showSlide(index) {
			if (index < 0) {
					currentIndex = 0;
			} else if (index >= stages.length) {
					currentIndex = stages.length - 1;
			} else {
					currentIndex = index;
			}

			stages.forEach((stage, i) => {
					if (i === currentIndex) {
							stage.style.display = "block";
					} else {
							stage.style.display = "none";
					}
			});
			updateActiveDot();
			updateButtons();
	}

	function createDots() {
			let dotsContainer = document.querySelector(".stages-elements-controls .stages-elements__dots");
			if (!dotsContainer) {
					console.error("No element with class 'stages-elements__dots' found inside '.stages-elements-controls'.");
					return;
			}
			let dotsHTML = "";
			for (let i = 0; i < stages.length; i++) {
					dotsHTML += `<span class="stages-elements__dot" data-index="${i}"></span>`;
			}
			dotsContainer.innerHTML = dotsHTML;
			updateActiveDot();
	}

	function updateActiveDot() {
			document.querySelectorAll(".stages-elements-controls .stages-elements__dot").forEach((dot, index) => {
					if (index === currentIndex) {
							dot.classList.add("active");
					} else {
							dot.classList.remove("active");
					}
			});
	}

	function updateButtons() {
			if (currentIndex === stages.length - 1) {
					nextButton.classList.add("disabled");
			} else {
					nextButton.classList.remove("disabled");
			}
	}

	function setDisplayMode() {
			if (isMobile) {
					stagesContainer.style.display = "flex";
					controls.style.display = "flex";
					stages.forEach(stage => {
							stage.style.display = "flex";
					});
			} else {
					stagesContainer.style.display = "grid";
					controls.style.display = "none";
					stagesContainer.style.gridTemplateAreas = "";
					stages.forEach(stage => {
							stage.style.display = "block";
					});
			}
	}

	function addDotEventListeners() {
			document.querySelectorAll(".stages-elements-controls .stages-elements__dot").forEach(dot => {
					dot.addEventListener("click", function () {
							showSlide(parseInt(this.getAttribute("data-index")));
					});
			});
	}

	prevButton.addEventListener("click", () => {
			showSlide(currentIndex - 1);
	});

	nextButton.addEventListener("click", () => {
			if (currentIndex < stages.length - 1) {
					showSlide(currentIndex + 1);
			}
	});

	createDots();
	addDotEventListeners();
	setDisplayMode();

	window.addEventListener("resize", function () {
			isMobile = window.innerWidth < 768;
			createDots();
			addDotEventListeners();
			setDisplayMode();
	});
});

