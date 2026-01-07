import { generateContestData } from './contestData.js';
import { fetchCodeforcesContests } from './api.js';
import { renderUI } from './ui.js';
import { initCalendar } from './calendar.js';

async function initAlgoWatch() {
  // 1. Generate fixed contests
  const generatedContests = generateContestData();

  // 2. Fetch Codeforces contests
  const codeforcesContests = await fetchCodeforcesContests();

  // 3. Merge all contests
  const allContests = [...generatedContests, ...codeforcesContests];

  // 4. Sort by start time
  allContests.sort((a, b) => a.startTime - b.startTime);

  // 5. Render UI
  renderUI(allContests);

  // 6. Init calendar
  initCalendar(allContests);

  // 7. Update countdowns every minute
  setInterval(() => renderUI(allContests), 60000);
}

// Start app
document.addEventListener('DOMContentLoaded', initAlgoWatch);
