// Generate fixed-schedule contests for AlgoWatch

export function generateContestData() {
  const contests = [];
  const today = new Date();

  // Generate for next 90 days
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const day = date.getDay();

    // Sunday — LeetCode Weekly (8 AM)
    if (day === 0) {
      contests.push(createLeetCodeWeekly(date));
      contests.push(createGFGWeekly(date));
    }

    // Saturday — LeetCode Biweekly (alternate weeks, 8 PM)
    if (day === 6 && isBiWeekly(date)) {
      contests.push(createLeetCodeBiweekly(date));
    }

    // Wednesday — CodeChef (8 PM)
    if (day === 3) {
      contests.push(createCodeChef(date));
    }
  }

  return contests;
}

/* ---------- HELPERS ---------- */

function createLeetCodeWeekly(date) {
  const start = new Date(date);
  start.setHours(8, 0, 0, 0);

  return buildContest(
    'leetcode',
    'LeetCode Weekly Contest',
    start,
    90
  );
}

function createLeetCodeBiweekly(date) {
  const start = new Date(date);
  start.setHours(20, 0, 0, 0);

  return buildContest(
    'leetcode',
    'LeetCode Biweekly Contest',
    start,
    90
  );
}

function createCodeChef(date) {
  const start = new Date(date);
  start.setHours(20, 0, 0, 0);

  return buildContest(
    'codechef',
    'CodeChef Contest',
    start,
    120
  );
}

function createGFGWeekly(date) {
  const start = new Date(date);
  start.setHours(19, 0, 0, 0);

  return buildContest(
    'gfg',
    'GFG Weekly Coding Contest',
    start,
    120
  );
}

// function buildContest(platform, name, startTime, durationMinutes) {
//   const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

//   return {
//     id: `${platform}-${startTime.getTime()}`,
//     platform,
//     name,
//     startTime,
//     endTime
//   };
// }

function buildContest(platform, name, startTime, durationMinutes) {
  const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

  const urls = {
    leetcode: 'https://leetcode.com/contest/',
    codechef: 'https://www.codechef.com/contests',
    gfg: 'https://practice.geeksforgeeks.org/contests'
  };

  return {
    id: `${platform}-${startTime.getTime()}`,
    platform,
    name,
    startTime,
    endTime,
    url: urls[platform] || '#'
  };
}


function isBiWeekly(date) {
  const reference = new Date(2024, 0, 6); // known biweekly
  const diffWeeks =
    Math.floor((date - reference) / (7 * 24 * 60 * 60 * 1000));
  return diffWeeks % 2 === 0;
}
