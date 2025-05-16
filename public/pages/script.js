
// Toggle mobile menu
 document.getElementById('menuToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('active');
});

// Handle dropdowns
const dropdowns = document.querySelectorAll('.dropdown-toggle');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent document click from firing immediately
        
        // Close all other dropdowns first
        dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                otherDropdown.nextElementSibling.classList.remove('active');
            }
        });
        
        // Toggle current dropdown
        const dropdownContent = this.nextElementSibling;
        dropdownContent.classList.toggle('active');
    });
});

// Close dropdowns when clicking elsewhere
document.addEventListener('click', function() {
    dropdowns.forEach(dropdown => {
        dropdown.nextElementSibling.classList.remove('active');
    });
});

// Simple calendar generator
function generateCalendar() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    let calendarHTML = `
        <div class="calendar-header">
            <div class="month-year">${monthNames[currentMonth]} ${currentYear}</div>
        </div>
        <div class="calendar-weekdays">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>
        </div>
        <div class="calendar-days">
    `;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        calendarHTML += '<div class="empty"></div>';
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === now.getDate() ? 'today' : '';
        calendarHTML += `<div class="${isToday}">${day}</div>`;
    }
    
    calendarHTML += '</div>';
    
    document.getElementById('calendar').innerHTML = calendarHTML;
}

// Add calendar styles
const calendarStyles = document.createElement('style');
calendarStyles.textContent = `
    .calendar-header {
        text-align: center;
        margin-bottom: 10px;
    }
    
    .month-year {
        font-weight: bold;
    }
    
    .calendar-weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        text-align: center;
        font-weight: bold;
        margin-bottom: 5px;
    }
    
    .calendar-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 2px;
    }
    
    .calendar-days div {
        padding: 6px;
        text-align: center;
        font-size: 12px;
    }
    
    .calendar-days .today {
        background-color: #3498db;
        color: white;
        border-radius: 50%;
    }
    
    .calendar-days .empty {
        background: none;
    }
`;
document.head.appendChild(calendarStyles);

// Generate the calendar
generateCalendar();

function confirmLogout(event) {
    event.preventDefault(); // Prevent link from jumping immediately
    const confirmed = confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.clear();
      window.location.href = "./../index.html";
    }
  }