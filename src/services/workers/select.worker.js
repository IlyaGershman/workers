import _ from 'lodash';
import { selectStuff } from '../../selectors';
// babel-loader gives us ability to use imports

function doWork(resolveKey, cb) {
	console.log('doWork');
	// we can't put anything generic here. callback instead of selectStuff won't work:
	// https://stackoverflow.com/questions/53518607/nodejs-datacloneerror-function-native-code-could-not-be-cloned
	let result = selectStuff(resolveKey),
		err = null;

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
