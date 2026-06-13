import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {

    getCurrentLocation(): Promise<{latitude: number, longitude: number}>;
    reverseGeocode(latitude: number, longitude: number): Promise<{cityName: string}>
    startTracking(): void;
    stopTracking(): void;
    addListner(eventName: string): void;
    removeListner(count: number): void;

}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeLocationModule');