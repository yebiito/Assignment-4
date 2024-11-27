document.addEventListener('DOMContentLoaded', function () {
    const calendarTable = document.getElementById("Calendar");
    const searchForm = document.getElementById("search-form");

    
    fetch('/timeslot/data')
        .then(response => response.json())
        .then(timeslots => {
            timeslots.forEach(({ day, time, dj }) => {
                const dayIndex = {
                    "Monday": 1,
                    "Tuesday": 2,
                    "Wednesday": 3,
                    "Thursday": 4,
                    "Friday": 5,
                    "Saturday": 6,
                    "Sunday": 7,
                }[day];
                const hourIndex = {
                    "08:00": 1,
                    "09:00": 2,
                    "10:00": 3,
                    "11:00": 4,
                    "12:00": 5,
                    "13:00": 6,
                    "14:00": 7,
                    "15:00": 8,
                    "16:00": 9,
                }[time];

                const row = calendarTable.rows[hourIndex];
                if (row) {
                    const cell = row.cells[dayIndex];
                    if (cell) {
                        cell.textContent = dj || "Select";
                        cell.style.backgroundColor = dj ? "lightgreen" : "";
                        cell.style.color = dj ? "black" : "";
                    }
                }
            });
        });

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const day = document.getElementById("day").value;
            const time = document.getElementById("time").value;

            if (!day || !time) {
                alert("Please, select both a day and time.");
                return;
            }

            const dayIndex = {
                "Monday": 1,
                "Tuesday": 2,
                "Wednesday": 3,
                "Thursday": 4,
                "Friday": 5,
                "Saturday": 6,
                "Sunday": 7,
            }[day];
            const hourIndex = {
                "08:00": 1,
                "09:00": 2,
                "10:00": 3,
                "11:00": 4,
                "12:00": 5,
                "13:00": 6,
                "14:00": 7,
                "15:00": 8,
                "16:00": 9,
            }[time];

            const row = calendarTable.rows[hourIndex];
            if (row) {
                const cell = row.cells[dayIndex];
                if (cell) {
                    if (cell.textContent.trim() === "Occupied") {
                        alert("This schedule is already occupied.");
                    } else {
                        
                        cell.textContent = "DJ FELIBOX";
                        cell.style.backgroundColor = "lightgreen";
                        cell.style.color = "black";

                        fetch('/timeslot/update', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                day,
                                time,
                                djName: "DJ FELIBOX",
                            }),
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log("Schedule updated:", data);
                            })
                            .catch(err => {
                                console.error("Error updating schedule:", err);
                            });
                    }
                }
            }
        });
    }
});
