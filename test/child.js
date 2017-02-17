const fork = require('child_process').fork;

const autoGraph = fork('index.js');

autoGraph.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

autoGraph.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

autoGraph.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
