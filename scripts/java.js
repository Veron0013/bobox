let mWords = ['Design', 'Innovations', 'Reputation', 'Cyber Punk 2077'];

class Typewriter {
	constructor(element, words, period = 2000) {
		this.element = element;
		this.words = words;
		this.period = period;
		this.loopNum = 0;
		this.txt = '';
		this.isDeleting = false;
		this.type();
	}

	type() {
		const current = this.loopNum % this.words.length;
		const fullTxt = this.words[current];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.element.innerHTML = `<span class="hero_wrap">${this.txt}</span>`;

		//тут, бо вже є літера
		const heroWrap = document.querySelector('.hero_wrap');

		let delta = 180 - Math.random() * 100;

		if (this.isDeleting) delta /= 2;

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;

			//моргання
			this.blinkCursor(heroWrap, 3, () => {
				this.isDeleting = true;
				this.type();
			});
			return;
		}
		else if (this.isDeleting && this.txt === '') {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(() => this.type(), delta);
	}

	blinkCursor(element, times, callback) {
		let count = 0;
		const blinkInterval = setInterval(() => {
			element.style.borderColor = (element.style.borderColor === "transparent") ? "var(--button-txt-light)" : "transparent";
			count++;
			if (count >= times * 2) { // times * 2 because blink includes turning off and on
				clearInterval(blinkInterval);
				if (callback) callback();
			}
		}, 400);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const elements = document.querySelectorAll('.js-rotate-tagline');
	elements.forEach(element => {
		//const words = JSON.parse(element.getAttribute('data-rotate'));
		const period = parseInt(element.getAttribute('data-period'), 10) || 2000;
		new Typewriter(element, mWords, period);
	});
});

/* CSS for smooth typing effect */
//const style = document.createElement('style');
//style.innerHTML = `.hero-wrap { border-right: 0.1em solid #666; }`;
//document.head.appendChild(style);