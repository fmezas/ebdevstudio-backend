var opbeat = require('opbeat').start({
  appId: 'db20cdd824',
  organizationId: 'e4bf3355c21f486ca74bee8e48a27ac6',
  secretToken: 'b0bd4ad679cbb2506ac244d87333d2a64022b193',
  active: true,
  instrument: true
});

const R = require('ramda');

const name = 'foo';
const type = 'bar';

const trans = opbeat.startTransaction(name, type);

const trace = opbeat.buildTrace();
console.log(trace);
if (trace) { trace.start('doing stuff'); }

const ns = R.times((_) => Math.floor(Math.random() * 1000), 1000);
console.log(R.reduce((a, n) => a + n, 0, ns));

if (trace) { trace.end(); }

trans.result = 200;
trans.end();

setTimeout(() => {console.log('done');}, 60000);

