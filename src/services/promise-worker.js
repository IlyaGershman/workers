// https://codeburst.io/promises-for-the-web-worker-9311b7831733
const resolves = {};
const rejects = {};
let globalMsgId = 0;

export const promiseWorker = (worker, payload) => {
	// Activate calculation in the worker, returning a promise
	const sendMsg = (payload, worker) => {
		const msgId = globalMsgId++;
		const msg = {
			id: msgId,
			payload
		};
		return new Promise(function(resolve, reject) {
			// save callbacks for later
			resolves[msgId] = resolve;
			rejects[msgId] = reject;
			worker.postMessage(msg);
		});
	};
	// Handle incoming calculation result
	const handleMsg = (msg) => {
		const { id, err, payload } = msg.data;
		if (payload) {
			const resolve = resolves[id];
			if (resolve) {
				resolve(payload);
			}
		} else {
			// error condition
			const reject = rejects[id];
			if (reject) {
				if (err) {
					reject(err);
				} else {
					reject('Got nothing');
				}
			}
		}

		// purge used callbacks
		delete resolves[id];
		delete rejects[id];
	};

	worker.onmessage = handleMsg;
	return sendMsg(payload, worker);
};
