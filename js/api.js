// Fetch Codeforces contests from official API

export async function fetchCodeforcesContests() {
  try {
    const res = await fetch('https://codeforces.com/api/contest.list');
    const data = await res.json();

    if (data.status !== 'OK') return [];

    return data.result
      .filter(contest => contest.phase === 'BEFORE')
      .map(contest => {
        const startTime = new Date(contest.startTimeSeconds * 1000);
        const durationMs = contest.durationSeconds * 1000;

        return {
          id: `codeforces-${contest.id}`,
          platform: 'codeforces',
          name: contest.name,
          startTime,
          endTime: new Date(startTime.getTime() + durationMs)
        };
      });

  } catch (err) {
    console.error('Codeforces API error', err);
    return [];
  }
}
