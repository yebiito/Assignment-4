
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



document.getElementById("apply-filters").addEventListener("click", function(event) {
    const genreSelect = document.getElementById("genre");
    const songSearchInput = document.getElementById("song-search");

    
    const existingError = document.querySelector(".error-message");
    if (existingError) {
        existingError.remove();
    }

    
    if (genreSelect.value === "-- Select Genre --" || songSearchInput.value.trim() === "") {
        event.preventDefault(); 
        const errorMessage = document.createElement("div");
        errorMessage.className = "error-message";
        errorMessage.style.color = "red";
        errorMessage.textContent = "Pllease select a valid genre and song.";
        document.querySelector(".search-section").appendChild(errorMessage); 
    } else {
        
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.style.color = "green";
        successMessage.textContent = "Correctly applied filters.";
        document.querySelector(".search-section").appendChild(successMessage);
    }
});

