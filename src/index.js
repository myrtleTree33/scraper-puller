import Puller from './lib/puller';

export default function app() {
  const puller = new Puller({
    timeDelay: 1000,
    numWorkers: 2,
    jobsIntervalMaxSeedMs: 1000
  });

  puller.start();
}

if (require.main === module) {
  app();
}
