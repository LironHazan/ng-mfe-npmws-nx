export enum Channel {
Default = 'default__channel',
TestChannel = 'test_channel'
}

// Simple wrapper around BroadcastChannel used for message bus communication
export class SimpleEventEmitter {
    private static _channel: BroadcastChannel | undefined;

    static init(channel: Channel): SimpleEventEmitter {
        SimpleEventEmitter._channel = new BroadcastChannel(channel);
        return new SimpleEventEmitter();
    }

    public dispatch<T>(data: T) {
        SimpleEventEmitter._channel?.postMessage(data);
    }

    public subscribe<T>(handler: (data: T) => void) {
        if (SimpleEventEmitter._channel) {
            SimpleEventEmitter._channel.onmessage = (event: MessageEvent<T>) => {
                handler(event.data)
            }
        }
    }
}
