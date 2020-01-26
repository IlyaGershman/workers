import './styles.css';
import './styles.scss';
import './styles.less';
import { promiseWorker } from './services';
import SelectStuffWorker from './services/workers/select.worker'; // gotta use webpack worker-loader for this

// take worker
const worker = new SelectStuffWorker();
const resolveKey = '$Vasya_key_42';

console.log('Calling');

// wrapper service gives promises when worker is done or threw error
promiseWorker(worker, resolveKey)
	.then((res) => console.log('Got result: ' + res))
	.catch((err) => console.log('Got error: ' + err));

console.log('thread keeps running');