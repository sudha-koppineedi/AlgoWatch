/* ================= TIME HELPERS ================= */

function formatDateTime(date) {
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

function getCountdown(startTime) {
  const diff = startTime - new Date();
  if (diff <= 0) return 'Started';

  const totalMinutes = Math.floor(diff / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
  return `Starts in ${minutes}m`;
}

/* ================= MAIN RENDER ================= */

export function renderUI(contests) {
  const upcoming = contests
    .filter(c => c.startTime > new Date())
    .sort((a, b) => a.startTime - b.startTime);

  renderNextContest(upcoming[0]);
  renderUpcoming(upcoming.slice(1, 5));
  renderPlatforms(upcoming);
}

/* ================= NEXT CONTEST ================= */

function renderNextContest(contest) {
  const container = document.getElementById('next-contest-card');

  if (!contest) {
    container.innerHTML = '<p>No upcoming contests</p>';
    return;
  }

  container.innerHTML = `
    <h3>${contest.name}</h3>
    <div class="next-contest-meta">${formatDateTime(contest.startTime)}</div>
    <div class="next-contest-timer">${getCountdown(contest.startTime)}</div>
    <button class="register-btn" data-url="${contest.url}">
      Register →
    </button>
  `;
}

/* ================= UPCOMING CONTESTS ================= */

function renderUpcoming(contests) {
  const container = document.getElementById('upcoming-contests');
  container.innerHTML = '';

  contests.forEach(contest => {
    const card = document.createElement('div');
    card.className = `upcoming-card ${contest.platform}`;

    card.innerHTML = `
      <div class="platform">${contest.platform}</div>
      <h4>${contest.name}</h4>
      <div class="time">${getCountdown(contest.startTime)}</div>
      <button class="register-link" data-url="${contest.url}">
        Register
      </button>
    `;

    container.appendChild(card);
  });
}

/* ================= PLATFORMS ================= */

function renderPlatforms(contests) {
  const groups = {
    leetcode: [],
    codechef: [],
    codeforces: [],
    gfg: []
  };

  contests.forEach(c => {
    if (groups[c.platform]) groups[c.platform].push(c);
  });

  Object.keys(groups).forEach(platform => {
    const container = document.getElementById(`${platform}-contests`);
    container.innerHTML = '';

    groups[platform].slice(0, 3).forEach(c => {
      const item = document.createElement('div');
      item.className = 'platform-item';

      item.innerHTML = `
        <strong>${c.name}</strong>
        <span>${formatDateTime(c.startTime)}</span>
        <button class="register-link small" data-url="${c.url}">
          Visit
        </button>
      `;

      container.appendChild(item);
    });
  });
}

/* ================= GLOBAL CLICK HANDLER ================= */
/* Guaranteed navigation – no CSS / overlay issues */

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-url]');
  if (!btn) return;

  const url = btn.dataset.url;
  if (!url || url === '#') return;

  window.open(url, '_blank', 'noopener');
});
