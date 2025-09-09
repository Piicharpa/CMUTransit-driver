declare module 'react-native-mqtt' {
  export type MqttEvent = 'connect' | 'disconnect' | 'message' | 'error';

  export interface MqttConfig {
    host: string;
    port?: number;
    protocol?: string;
    username?: string;
    password?: string;
    clientId?: string;
  }

  export type SubscribeCallback = (error: Error | null) => void;
  export type PublishCallback = (error: Error | null) => void;

  export class MqttClient {
    constructor(config: MqttConfig);
    connect(): Promise<void> | void;
    disconnect(): void;
    on(event: 'connect', listener: () => void): void;
    on(event: 'disconnect', listener: () => void): void;
    on(event: 'message', listener: (topic: string, payload: any) => void): void;
    on(event: 'error', listener: (error: Error) => void): void;
    subscribe(topic: string, callback?: SubscribeCallback): void;
    publish(topic: string, payload: string | ArrayBuffer | Uint8Array, callback?: PublishCallback): void;
  }

  export default MqttClient;
}


