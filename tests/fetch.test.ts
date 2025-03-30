import {
  fetchWeiboHot,
  fetchHoroscope,
  fetchDailyEnglish,
  fetchAllHotspots,
  fetchToutiaoHotspots,
  fetchPaperNews
} from '../src/utils/fetch.js';

// Helper function to run a test
async function runTest(name: string, testFn: () => Promise<any>) {
  try {
    console.log(`Testing ${name}...`);
    const result = await testFn();
    console.log(`✅ ${name} test passed!`);
    console.log('Sample result:', JSON.stringify(result, null, 2).substring(0, 200) + '...');
    return true;
  } catch (error) {
    console.error(`❌ ${name} test failed:`, error);
    return false;
  }
}

// Main test function
async function runTests() {
  const tests = [
    {
      name: 'fetchWeiboHot',
      fn: async () => {
        const data = await fetchWeiboHot();
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Expected an array of Weibo hot items');
        }
        if (!data[0].title || !data[0].hot) {
          throw new Error('Expected items to have title and hot properties');
        }
        return data.slice(0, 3); // Return first 3 items for sample output
      }
    },
    {
      name: 'fetchHoroscope',
      fn: async () => {
        const data = await fetchHoroscope('scorpio', 'today');
        if (!data.success || !data.data) {
          throw new Error('Failed to fetch horoscope data');
        }
        if (!data.data.fortunetext || !data.data.fortune) {
          throw new Error('Expected horoscope to have fortune properties');
        }
        return data.data;
      }
    },
    {
      name: 'fetchDailyEnglish',
      fn: async () => {
        const data = await fetchDailyEnglish();
        if (!data.success || !data.data) {
          throw new Error('Failed to fetch daily English data');
        }
        if (!data.data.en || !data.data.zh) {
          throw new Error('Expected daily English to have en and zh properties');
        }
        return data.data;
      }
    },
    {
      name: 'fetchDailyEnglish (random)',
      fn: async () => {
        const data = await fetchDailyEnglish(true);
        if (!data.success || !data.data) {
          throw new Error('Failed to fetch random daily English data');
        }
        return data.data;
      }
    },
    {
      name: 'fetchAllHotspots',
      fn: async () => {
        const data = await fetchAllHotspots();
        if (!data.success || !data.data) {
          throw new Error('Failed to fetch all hotspots data');
        }
        if (!Array.isArray(data.data) || data.data.length === 0) {
          throw new Error('Expected an array of hotspot categories');
        }
        return {
          categories: data.data.map(cat => cat.name),
          sampleCategory: data.data[0]
        };
      }
    },
    {
      name: 'fetchToutiaoHotspots',
      fn: async () => {
        const data = await fetchToutiaoHotspots();
        if (!data.success || !data.data) {
          throw new Error('Failed to fetch Toutiao hotspots');
        }
        if (!Array.isArray(data.data)) {
          throw new Error('Expected an array of Toutiao hotspots');
        }
        return data.data.slice(0, 3);
      }
    },
    {
      name: 'fetchPaperNews',
      fn: async () => {
        const data = await fetchPaperNews();
        if (!data.success || !data.data) {
          throw new Error('Failed to fetch Paper News');
        }
        if (!Array.isArray(data.data)) {
          throw new Error('Expected an array of Paper News items');
        }
        return data.data.slice(0, 3);
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const success = await runTest(test.name, test.fn);
    if (success) {
      passed++;
    } else {
      failed++;
    }
    console.log('-----------------------------------');
  }

  console.log(`\n📊 Test Summary: ${passed} passed, ${failed} failed`);
  
  if (failed > 0) {
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Fatal error running tests:', error);
  process.exit(1);
});
