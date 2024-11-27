
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










