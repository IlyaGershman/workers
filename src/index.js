import './styles.css';
import './styles.scss';
import './styles.less';
import { Wrapper } from './services';
import Worker from './services/workers/select.worker';


const worker = new Worker()
const wrapper = new Wrapper(worker);
console.log('Calling');
wrapper
	.work('$importedWorkflow_4242')
	.then((res) => console.log('Got result: ' + res))
	.catch((err) => console.log('Got error: ' + err));
