export let doLongStuff = (resolveKey) => {
    for ( var i=0; i<100000; i++ ) {
        for ( var j=0; j<100000; j++ ) {
            j * 1000000;
        }
    }
    return 'resolveKey is found: ' + resolveKey;
}