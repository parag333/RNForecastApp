
// execution after a delay
function debounce(fn, delay){
    let timer;
    return function(...args){
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

// execution only once for given interval

function throttle(fn, delay){
    let shouldWait = false;

    return function(...args){
        if(shouldWait) return;

        fn(...args);
        shouldWait = true;

        setTimeout(() => {
            shouldWait = false;
        }, delay);
    };
}



