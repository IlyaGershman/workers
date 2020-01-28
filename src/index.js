import _ from 'lodash';

import './styles/styles.less';
import { promiseWorker } from './services';
import SelectStuffWorker from './services/workers/select.worker'; // gotta use webpack worker-loader for this

// take worker
const worker = new SelectStuffWorker();
const resolveKey = '$Vasya_key_42';

console.log('Calling worker');

// wrapper service gives promises when worker is done or threw error
const onSelect = (resolveKey) => {
	return promiseWorker(worker, resolveKey)		
		.then((res) => console.log('Got result: ' + res))
		.catch((err) => console.log('Got error: ' + err));;
}


const throttleOnSelect = _.throttle(onSelect, 1000, {leading: true, trailing: true});

setInterval(() => {
	throttleOnSelect(resolveKey)
}, 40);

console.log('thread keeps running');