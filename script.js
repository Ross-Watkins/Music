// URL of the JSON file in your GitHub repository
const jsonUrl = 'https://api.github.com/repos/Ross-Watkins/Music/contents/library';

fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
        const player = document.getElementById('player');
        const audio = document.getElementById('audio');
        const title = document.getElementById('title');
        const tracklist = document.getElementById('tracklist');

        let currentTrack = 0;

        function loadTrack(trackIndex) {
            title.textContent = data[trackIndex].name.substring(0, data[trackIndex].name.lastIndexOf('.'));
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
                <span>${track.name.substring(0, track.name.lastIndexOf('.'))}</span>
                <button onclick="loadTrack(${index})">Play</button>
            `;
            tracklist.appendChild(trackElement);
        });
    });
