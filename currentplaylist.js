
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const sidebarcontent = document.getElementById("barcontent");

    
    
    toggleBtn.addEventListener('click', function() {
        
        if (sidebar.classList.contains('collapsed')) {
            
            sidebar.classList.remove('collapsed');
            sidebarcontent.style.display = 'block';
        } else {
            
            sidebar.classList.add('collapsed');
            sidebarcontent.style.display = 'none';  
        }
    });
});

const playButton = document.getElementById("play");

    playButton.addEventListener("click", function() {
        if (playButton.textContent === "||") {
            // Change to '>|' (play)
            playButton.textContent = ">|";
        } else {
            // Change to '||' (pause)
            playButton.textContent = "||";
    }
});

document.getElementById("remove-song").addEventListener("click", function(event) {
    const songSearchInput = document.getElementById("search-remove");

    
    const existingError = document.querySelector(".error-message");
    if (existingError) {
        existingError.remove();
    }

    if (songSearchInput.value.trim() === "") {
        event.preventDefault(); 
        alert("You must choose a song to remove.");
    } 
});




document.getElementById('remove-song').addEventListener('click', function() {
    
    const songName = document.getElementById('search-remove').value.trim().toLowerCase();

    
    if (songName === "") {
        alert("Por favor, ingresa el nombre de una canción.");
        return;
    }

    
    const playlist = document.querySelectorAll(".Playlistlist li");

    
    let songFound = false;

    
    playlist.forEach(function(songItem) {
        if (songItem.textContent.toLowerCase() === songName) {
            
            songItem.remove();
            songFound = true;
        }
    });

   
    if (!songFound) {
        alert("La canción no se encuentra en la lista.");
    }

    
    document.getElementById('search-remove').value = "";
});


class Song {
    constructor(title, artist, genre) {
      this.title = title;
      this.artist = artist;
      this.genre = genre;
    }
  
    display() {
      return `${this.title} by ${this.artist} (${this.genre})`;
    }
  }
  
  
  class Playlist {
    constructor(name) {
      this.name = name;
      this.songs = [];
    }
  
    addSong(song) {
      if (song instanceof Song) {
        this.songs.push(song);
      } else {
        console.log('Only Song objects can be added to the playlist.');
      }
    }
  
    removeSong(title) {
      this.songs = this.songs.filter(song => song.title !== title);
    }
  
    displayPlaylist() {
      if (this.songs.length === 0) {
        console.log('No songs in this playlist.');
      } else {
        console.log(`Playlist: ${this.name}`);
        this.songs.forEach(song => {
          console.log(song.display());
        });
      }
    }
  }
  

    const song1 = new Song('Dale Don Dale', 'Don Omar', 'Reggaeton');
    const song2 = new Song('Fanática Sensual', 'Plan B', 'Reggaeton');
    const song3 = new Song('Gasolina', 'Daddy Yankee', 'Reggaeton');
    const song4 = new Song('Una Vaina Loca', 'Fuego', 'Reggaeton');
    const song5 = new Song('Limbo', 'Daddy Yankee', 'Reggaeton');
    const song6 = new Song('Me Rehúso', 'Danny Ocean', 'Latin Pop');
    const song7 = new Song('Angelito Sin Alas', 'DCS, Juan Magán', 'Dancehall');
    const song8 = new Song('El Mambo', 'Kiko Rivera', 'Reggaeton');

  
 
  const myPlaylist = new Playlist('My Favorites');
  myPlaylist.addSong(song1);
  myPlaylist.addSong(song2);
  myPlaylist.addSong(song3);
  myPlaylist.addSong(song4);
  myPlaylist.addSong(song5);
  myPlaylist.addSong(song6);
  myPlaylist.addSong(song7);
  myPlaylist.addSong(song8);


  myPlaylist.displayPlaylist();
  

