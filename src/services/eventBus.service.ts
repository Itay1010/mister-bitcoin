function on(eventName: any, listener: Function) {
    const callListener = ({ detail }: { detail: any }) => {
        listener(detail);
    };
    window.addEventListener(eventName, callListener);
    return () => {
        window.removeEventListener(eventName, callListener);
    };
}

function emit(eventName: any, data: Object) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}

export const eventBus = { on, emit };