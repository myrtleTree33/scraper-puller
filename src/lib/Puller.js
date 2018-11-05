import sleep from 'await-sleep';
import logger from './util/logger';
import Item from './models/Item';

class Puller {
  constructor({ timeDelay, numWorkers, jobsIntervalMaxSeedMs }) {
    this.timeDelay = timeDelay;
    this.numWorkers = numWorkers;
    this.jobsIntervalMaxSeedMs = jobsIntervalMaxSeedMs;
  }

  processPage() {
    (async () => {
      // processes a single page here
      //   const currItem = await Item.findOneAndRemove({});
      const currItem = await Item.findOne({});
      const { url, htmlText, lastUpdated } = currItem;
      const $ = cheerio.load(htmlText);
    })();
  }

  start() {
    const { timeDelay, numWorkers } = this;
    logger.info(`Starting ${numWorkers} workers..`);
    const runJob = jobId => {
      // Task activated here
      this.processPage();
      logger.info(`hihi from ${jobId}`);
      setTimeout(() => runJob(jobId), timeDelay);
    };

    for (let i = 0; i < numWorkers; i++) {
      (async () => {
        const sleepIntervalMs = Math.random() * this.jobsIntervalMaxSeedMs;
        await sleep(sleepIntervalMs);
        runJob(i);
      })();
    }
  }
}

export default Puller;
