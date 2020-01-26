import _ from 'lodash';
import { selectStuff } from '../../selectors';
// babel-loader gives us ability to use imports

function doWork(resolveKey, cb) {
	let result = selectStuff(resolveKey),
		err = null;

	_.get({a:1}, 'a');
	cb(err, result);
}

// Handle incoming messages
self.onmessage = function(msg) {
	const { id, payload } = msg.data;

	doWork(payload, function(err, result) {
		const msg = {
			id,
			err,
			payload: result
		};
		self.postMessage(msg);
	});
};
