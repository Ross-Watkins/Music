// URL of the JSON file in your GitHub repository
const jsonUrl = 'https://api.github.com/repos/Ross-Watkins/Music/contents/library';

fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        const audio = new Audio();
        const tracklist = document.getElementById('tracklist');

        let currentTrack = 0;

        function loadTrack(trackIndex) {
            audio.src = data[trackIndex].download_url;
            audio.pause();
            audio.load();
            audio.play();
        }

        loadTrack(currentTrack);

        audio.addEventListener('ended', () => {
            currentTrack = (currentTrack + 1) % data.length;
            loadTrack(currentTrack);
        });

        // Create the track list
        data.forEach((track, index) => {
            const trackElement = document.createElement('div');
            trackElement.className = 'track';
            trackElement.innerHTML = `
                <span onclick="loadTrack(${index})">${track.name.substring(0, track.name.lastIndexOf('.'))}</span>
            `;
            tracklist.appendChild(trackElement);
        });

        // Control bar buttons
        document.getElementById('prev').addEventListener('click', () => {
            currentTrack = (currentTrack - 1 + data.length) % data.length;
            loadTrack(currentTrack);
        });
        document.getElementById('play').addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
        document.getElementById('next').addEventListener('click', () => {
            currentTrack = (currentTrack + 1) % data.length;
            loadTrack(currentTrack);
        });
    });
