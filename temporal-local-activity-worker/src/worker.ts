import { Worker } from '@temporalio/worker';
import * as activities from './activities';

const taskQueue = `hello-world`

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: taskQueue,
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
