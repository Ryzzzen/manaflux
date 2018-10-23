/* Tab Handler */
const Dots = {};

Dots.onClickEvent = function(dot, tabId, i) {
	document.querySelectorAll('.tabcontent').forEach(x => x.style.display = 'none');
	document.querySelector(`.tabcontent[data-tabid="${tabId}"][data-tabn="${i}"]`).style.display = 'block';

	if (!dot) return;
	if (Dots.lastSelected) Dots.lastSelected.classList.remove('selected');
	dot.classList.add('selected');

	Dots.lastSelected = dot;

	Sounds.play('buttonClick');
}

document.addEventListener("DOMContentLoaded", function() {
	document.querySelectorAll('.btn.tab').forEach(tab => {
		tab.addEventListener('click', event => {
			Sounds.play('buttonClick');

			document.querySelector('.tab.active').classList.remove('active');
			event.target.classList.add('active');

			const dotsNumber = document.querySelectorAll(`.tabcontent[data-tabid="${$(event.target).data('tabid')}"]`).length, dots = document.getElementById('dots');

			if (dotsNumber === 0) Dots.onClickEvent(null, event.target.getAttribute('data-tabid'), 0);
			else if (dots) {
				while (dots.firstChild) dots.removeChild(dots.firstChild);

				if (dotsNumber > 1)
					for (let i = 0; i < dotsNumber; i++) {
						const dot = document.createElement('div');

						dot.className = 'dot';
						dot.onclick = () => Dots.onClickEvent(dot, $(event.target).data('tabid'), i);
						dots.appendChild(dot);
					}

				Dots.onClickEvent(dots.firstChild, event.target.getAttribute('data-tabid'), 0);
			}

			document.getElementById('selected').style.marginLeft = ($(event.target).offset().left + ($(event.target).width() / 2)) + 'px';
		});
	});
});

$(document).ready(function() {
	$('.btn.tab').click(function() {
	}).eq(0).click();
});
