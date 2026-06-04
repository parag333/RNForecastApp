
// practice

function throttle<T extends (...args: any[]) => void> (
    func: T, limit: number) : (...args: Parameters<T>) => void {

        let initThrottle: boolean = false;

        return function(this: any, ...args: Parameters<T>){
            if(!initThrottle){
                func.apply(this, args);
                initThrottle = true;

                setTimeout(() => {
                    initThrottle = false;

                }, limit);
            }
        };
}

export default throttle;