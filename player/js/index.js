window.addEventListener('DOMContentLoaded', function() {
    const audio = document.querySelector('audio');
    let btnPlay = document.getElementById('start');
    let btnPrev = document.querySelector('.prev');
    let btnNext = document.querySelector('.next');
    let progressBar = document.getElementById('progress-bar');
    let currentTimeElem = document.querySelector('.current-time');
    let durationTimeElem = document.querySelector('.duration-time');
    

    const audioArray = [{
        audio: 'assets/audio/beyonce.mp3',
        title: 'Beyonce',
        subtitle: "Don't Hurt Yourself",
        image: 'assets/img/lemonade.png'
    }, {
        audio: 'assets/audio/dontstartnow.mp3',
        title: 'Dua Lipa',
        subtitle: "Don't Start Now",
        image: 'assets/img/dontstartnow.png'
    }];
    
    let isPlay = false;
    let playNum = 0;

    audio.src = audioArray[0].audio;

    //* Добавляем начальные обработчики событий
    function addEventListeners() {
        btnPlay = document.getElementById('start'); 
        btnNext = document.querySelector('.next');  
        btnPrev = document.querySelector('.prev');
        progressBar = document.getElementById('progress-bar');
        currentTimeElem = document.querySelector('.current-time');
        durationTimeElem = document.querySelector('.duration-time');
        
       
        if (btnPlay) {
            btnPlay.addEventListener('click', function() {
                playAudio();
            });
        }

    
        if (btnNext) {
            btnNext.addEventListener('click', function() {
                playNum++;
                playNum >= audioArray.length ? playNum = 0 : null;
                songOnPage(audioArray[playNum]);
            });
        }

        
        if (btnPrev) {
            btnPrev.addEventListener('click', function() {
                playNum--;
                playNum < 0 ? playNum = audioArray.length - 1 : null;
                songOnPage(audioArray[playNum]);
            });
        }

        audio.addEventListener('timeupdate',  updateProgressBar);

                
                audio.addEventListener('loadedmetadata', function() {
                    progressBar.max = audio.duration; 
                    durationTimeElem.textContent = formatTime(audio.duration); 
                });
        
                
                progressBar.addEventListener('input', function() {
                    audio.currentTime = progressBar.value; 
                });
    }

    addEventListeners(); 

    //* Функция для воспроизведения и паузы аудио
    function playAudio() {
        if (!isPlay) {
            audio.currentTime = 0;
            audio.play();
            isPlay = true;
            btnPlay.src = 'assets/svg/pause.png';
        } else {
            audio.pause();
            isPlay = false;
            btnPlay.src = 'assets/svg/play.png';
        }
    }

    //* Функция для обновления страницы при переключении песен
    function songOnPage({ audio: audioSrc, title, subtitle, image }) {
        const wrapper = document.querySelector('.wrapper');
        if (audioSrc) {
            const background = document.querySelector('.background-song').src = image
            audio.src = audioSrc;
            wrapper.innerHTML = `
            <div class="player__container">
                <div class="player__image">
                    <img src=${image} alt="songImage" class="song-image">
                </div>
                <div class="btn__box">
                    <img id="start" src="assets/svg/play.png" alt="btn" class="start">
                    <div class="song__name">
                        <h3 class="title">${title}</h3>
                        <h4 class="subtitle">${subtitle}</h4>
                    </div>
                    <div class="container__btn">
                        <img src="assets/svg/backward.png" class="prev">
                        <img src="assets/svg/forward.png" class="next">
                    </div>
                </div>
                <div class="progress-bar__container">
                    <input type="range" id="progress-bar" min="0" max="233.717551" value="0">
                    <div class="duration-time">0:00</div>
                    <div class="current-time">0:00</div>
                </div>
            </div>`;
            
            isPlay = false; 
            addEventListeners(); 
        }
    }

    function updateProgressBar() {
        progressBar.value = audio.currentTime; 
        currentTimeElem.textContent = formatTime(audio.currentTime); 
    }

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
});
