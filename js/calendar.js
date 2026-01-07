let currentMonth;
let currentYear;
let allContests = [];

export function initCalendar(contests) {
  allContests = contests;

  const today = new Date();
  currentMonth = today.getMonth();
  currentYear = today.getFullYear();

  document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  document.getElementById('next-month').addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  renderCalendar();
}

function renderCalendar() {
  const monthLabel = document.getElementById('current-month');
  const calendar = document.getElementById('calendar');

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  monthLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  calendar.innerHTML = `
    <div class="calendar-header">
      <div>Sun</div><div>Mon</div><div>Tue</div>
      <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
    </div>
    <div class="calendar-grid"></div>
  `;

  const grid = calendar.querySelector('.calendar-grid');

  // empty cells before first day
  for (let i = 0; i < firstDay.getDay(); i++) {
    grid.appendChild(createEmptyCell());
  }

  // days of month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(currentYear, currentMonth, day);
    grid.appendChild(createDateCell(date));
  }
}

function createEmptyCell() {
  const cell = document.createElement('div');
  cell.className = 'calendar-date other-month';
  return cell;
}

function createDateCell(date) {
  const cell = document.createElement('div');
  cell.className = 'calendar-date';

  const dayNumber = document.createElement('div');
  dayNumber.className = 'date-number';
  dayNumber.textContent = date.getDate();

  const dots = document.createElement('div');
  dots.className = 'date-events';

  const contestsToday = allContests.filter(c =>
    sameDay(new Date(c.startTime), date)
  );

  contestsToday.forEach(c => {
    const dot = document.createElement('div');
    dot.className = `dot ${c.platform}`;
    dots.appendChild(dot);
  });

  cell.appendChild(dayNumber);
  cell.appendChild(dots);

  return cell;
}

function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
