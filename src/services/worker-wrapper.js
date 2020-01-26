const resolves = {}
const rejects = {}
let globalMsgId = 0
// Activate calculation in the worker, returning a promise
function sendMsg(payload, worker){
  const msgId = globalMsgId++
  const msg = {
    id: msgId,
    payload
  }
  return new Promise(function (resolve, reject) {
    // save callbacks for later
    resolves[msgId] = resolve
    rejects[msgId] = reject
    worker.postMessage(msg)
  }) 
}
// Handle incoming calculation result
function handleMsg(msg) {
  const {id, err, payload} = msg.data
  if (payload) {
    const resolve = resolves[id]
    if (resolve) {
      resolve(payload)
    }
  } else {
    // error condition
    const reject = rejects[id]
    if (reject) {
        if (err) {
          reject(err)
        } else {
          reject('Got nothing')
        }
    }
  }
  
  // purge used callbacks
  delete resolves[id]
  delete rejects[id]
}
// Wrapper class
export class Wrapper {
  constructor(worker) {
    this.worker = worker;
    this.worker.onmessage = handleMsg
  }
  
  work(str) {
    return sendMsg(str, this.worker)
  }
}

























// /*
//  * Wraps "func" with a web worker thread, and
//  * returns a jQuery deferred so the caller can
//  * get the result.
//  *
//  */
// function worker( func ) {
//     return (function() {
        
//         // Creates the blob URL. We have to construct
//         // the web worker code here by-hand.
//         var blob = URL.createObjectURL( new Blob( [ "\
//             onmessage = function(){\
//                 postMessage((" + func.toString() + ")());\
//             };"])),
            
//         // The web worker the actually runs the code,
//         // and the deferred used to pass the result
//         // back to the caller.
//         worker = new Worker( blob ),
//         deferred = new $.Deferred();
        
//         // We can resolve the deferred when we hear back
//         // from the web worker thread.
//         worker.onmessage = function( e ) {
//             deferred.resolve( e.data );    
//         };
        
//         // Start the worker, and return the deferred back
//         // to the caller.
//         worker.postMessage();
//         return deferred;
//     });
// }

// // Arbitrary worker function that takes
// // some time to complete. Returns the time
// // it took to do the computations.
// function doWork() {
//     var start = new Date(), stop;
//     for ( var i=0; i<100000; i++ ) {
//         for ( var j=0; j<100000; j++ ) {
//             j * 1000000;
//         }
//     }
//     stop = new Date();
//     return stop - start;
// }

// // Use the "worker" wrapper to make "doWork",
// // an asynchronous web worker thread that returns
// // a deferred.
// var asyncWork = worker( doWork );

// $(function() {

//     $( 'button' ).click(function( e ) {
        
//         // For illustrative purposes, disable the button.
//         $( this ).prop( 'disabled', true );
        
//         // Do some work that'll take at least a few seconds
//         // to complete.
//         asyncWork().done(function( result ) {
//             $( '<p/>' ).text( result / 1000 )
//                 .appendTo( 'body' );
//         });
        
//         // For illustative purposes, re-enable the button.
//         // Note that it's enabled right away - not after the
//         // few seconds it takes to do the work.
//         $( this ).prop( 'disabled', false );
//     });
// });
