var params = new URLSearchParams(window.location.search);

var scoMusic = {
	extractValue: (input) => {
		const valueRegex = /\("([^\s]+)"\)/g;
		const match = valueRegex.exec(input);
		return match[1];
	},
	changeMusicBg: (isChangeBg = true) => {
		const MusicBg = document.getElementById("Music-bg");
		const MusicLoading = document.getElementsByClassName("Music-loading");

		if (isChangeBg) {
			const musiccover = document.querySelector("#Music-page .aplayer-pic");
			let img = new Image();
			img.src = scoMusic.extractValue(musiccover.style.backgroundImage);
			img.onload = () => {
				MusicBg.style.backgroundImage = musiccover.style.backgroundImage;
			};
		} else {
			let timer = setInterval(() => {
				const musiccover = document.querySelector("#Music-page .aplayer-pic");
				if (musiccover) {
					MusicLoading[0].style.display = "none";
					clearInterval(timer);
					document.querySelector('meting-js')
						.aplayer.volume(0.8, true);

					scoMusic.addEventListenerChangeMusicBg();
					MusicBg.style.display = "block";
				}
			}, 100);
		}
	},
	lrcupdate: () => {
		const aplayerLrcContents = document.querySelector('.aplayer-lrc-contents');
		const currentLrc = aplayerLrcContents.querySelector('p.aplayer-lrc-current');

		if (currentLrc) {
			const currentIndex = Array.from(aplayerLrcContents.children)
				.indexOf(currentLrc);
			const translateYValue = -currentIndex * 80;

			aplayerLrcContents.style.transform = `translateY(${translateYValue}px)`;
		}
	},
	buttonlist: () => {
		document.querySelector(".aplayer-lrc")
			.addEventListener("click", () => {
				const aplayerList = document.querySelector(".aplayer-list");
				aplayerList.classList.toggle("aplayer-list-hide");
			});
	},
	addEventListenerChangeMusicBg: () => {
		const MusicPage = document.getElementById("Music-page");

		MusicPage.querySelector("meting-js")
			.aplayer.on('loadeddata', () => {
			scoMusic.changeMusicBg();
		});
		MusicPage.querySelector("meting-js")
			.aplayer.on('timeupdate', () => {
			scoMusic.lrcupdate();
		});
		scoMusic.buttonlist();
	},
	getCustomPlayList: () => {
		const MusicPage = document.getElementById("Music-page");
		const playlistType = params.get("type") || "playlist";

		if (params.get("id") && params.get("server")) {
			let id = params.get("id");
			let server = params.get("server");
			MusicPage.innerHTML = `<meting-js id="${id}" server="${server}" type="${playlistType}" preload="auto" order="random"></meting-js>`;
		} else {
			MusicPage.innerHTML = `<meting-js id="${userId}" server="${userServer}" type="${userType}" preload="auto" order="random"></meting-js>`;
		}
		scoMusic.changeMusicBg(false);
	}
};

window.onload = () => {
	scoMusic.getCustomPlayList();

	const keyActions = {
		'Space': () => {
			document.querySelector('meting-js').aplayer.toggle();
		},
		'ArrowRight': () => {
			document.querySelector('meting-js').aplayer.skipForward();
		},
		'ArrowLeft': () => {
			document.querySelector('meting-js').aplayer.skipBack();
		},
		'ArrowUp': () => {
			let volume = document.querySelector('meting-js').aplayer.audio.volume;
			if (volume <= 0.9) {
				volume += 0.1;
				document.querySelector('meting-js').aplayer.volume(volume, true);
			}
		},
		'ArrowDown': () => {
			let volume = document.querySelector('meting-js').aplayer.audio.volume;
			if (volume >= 0.1) {
				volume -= 0.1;
				document.querySelector('meting-js').aplayer.volume(volume, true);
			}
		}
	};

	document.addEventListener("keydown", (event) => {
		const action = keyActions[event.code];
		if (action) {
			event.preventDefault();
			action();
		}
	});
};

var vh = window.innerHeight * 1;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
	vh = window.innerHeight * 1;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
});