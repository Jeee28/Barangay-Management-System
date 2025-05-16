const allTimes = ['08:00 AM', '09:00 AM', '10:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'];
let availableTimes = {
  '2025-04-19': ['08:00 AM', '09:00 AM', '01:00 PM', '02:00 PM'],
  '2025-04-20': ['09:00 AM', '10:00 AM', '03:00 PM']
};

let selectedTime = '';

function loadAvailableSlots() {
  const date = document.getElementById('date').value;
  const slotContainer = document.getElementById('slots');
  slotContainer.innerHTML = '';

  if (availableTimes[date]) {
    availableTimes[date].forEach(time => {
      const btn = document.createElement('div');
      btn.classList.add('slot');
      btn.textContent = time;
      btn.onclick = () => {
        document.querySelectorAll('.slot').forEach(el => el.classList.remove('selected'));
        btn.classList.add('selected');
        selectedTime = time;
      };
      slotContainer.appendChild(btn);
    });
  } else {
    slotContainer.innerHTML = '<p>No available slots for this date.</p>';
  }
}

function confirmAppointment() {
  const purpose = document.getElementById('purpose').value;
  const fullname = document.getElementById('fullname').value;
  const address = document.getElementById('address').value;
  const contact = document.getElementById('contact').value;
  const date = document.getElementById('date').value;

  if (!purpose || !fullname || !address || !contact || !date || !selectedTime) {
    alert('Please complete all fields and select a time slot.');
    return;
  }

  const confirm = window.confirm('Are you sure all information is correct?');
  if (confirm) {
    alert(`Appointment booked!\n\nStatus: Pending\nDate: ${date}\nTime: ${selectedTime}`);
    // Here you could send this data to a server or update a list
  }
}

function loadAdminSlots() {
  const adminDate = document.getElementById('admin-date').value;
  const adminSlots = document.getElementById('admin-slots');
  adminSlots.innerHTML = '';

  allTimes.forEach(time => {
    const btn = document.createElement('div');
    btn.classList.add('admin-slot');
    btn.textContent = time;

    if (availableTimes[adminDate]?.includes(time)) {
      btn.classList.add('active');
    }

    btn.onclick = () => {
      btn.classList.toggle('active');
    };

    adminSlots.appendChild(btn);
  });
}

function saveSchedule() {
  const adminDate = document.getElementById('admin-date').value;
  const activeSlots = document.querySelectorAll('.admin-slot.active');
  const selectedSlots = Array.from(activeSlots).map(btn => btn.textContent);

  if (!adminDate) {
    alert('Please select a date to set schedule.');
    return;
  }

  availableTimes[adminDate] = selectedSlots;
  alert(`Availability saved for ${adminDate}`);
  updateScheduleDisplay();
}

function updateScheduleDisplay() {
  const list = document.getElementById('schedule-list');
  list.innerHTML = '';
  Object.keys(availableTimes).sort().forEach(date => {
    const times = availableTimes[date].join(', ');
    const li = document.createElement('li');
    li.textContent = `${date}: ${times}`;
    list.appendChild(li);
  });
}

// Load initial display
updateScheduleDisplay();