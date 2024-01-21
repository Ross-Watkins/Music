window.onload = function() {
    var audio = new Audio();
    var playlist = document.getElementById('playlist');
    var tracks = [];
    var currentTrack = 0;

    fetch('https://api.github.com/repos/Ross-Watkins/Music/contents/library')
        .then(response => response.json())
        .then(data => {
            tracks = data.map(item => 'https://raw.githubusercontent.com/Ross-Watkins/Music/main/library/' + item.name);
            tracks.forEach(function(track, index) {
                var li = document.createElement('li');
                li.textContent = track;
                playlist.appendChild(li);
            });
            playTrack(currentTrack);
        });

    function playTrack(index) {
        audio.src = tracks[index];
        audio.play();
    }

    document.getElementById('prev').addEventListener('click', function() {
        currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
        playTrack(currentTrack);
    });

    document.getElementById('play').addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    document.getElementById('next').addEventListener('click', function() {
        currentTrack = (currentTrack + 1) % tracks.length;
        playTrack(currentTrack);
    });

    audio.addEventListener('timeupdate', function() {
        document.getElementById('scrubber').max = audio.duration;
        document.getElementById('scrubber').value = audio.currentTime;
    });

    document.getElementById('scrubber').addEventListener('input', function() {
        audio.currentTime = this.value;
    });
};
