import http from 'http';

function waitForDevServer(url, retries = 30) {
  return new Promise((resolve, reject) => {
    let attempted = 0;

    function attempt() {
      attempted++;
      console.log(`Waiting for dev server... attempt ${attempted}/${retries}`);

      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          retry();
        }
      }).on('error', retry);

      function retry() {
        if (attempted >= retries) {
          reject(new Error('Dev server not ready'));
        } else {
          setTimeout(attempt, 1000);
        }
      }
    }

    attempt();
  });
}

waitForDevServer('http://localhost:5173')
  .then(() => {
    console.log('Dev server is ready!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Failed to connect to dev server:', err);
    process.exit(1);
  }); 