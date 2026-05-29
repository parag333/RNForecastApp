export interface WeatherData {
    name: string;
    main: {
        temp: number;
        humidity: number;
        pressure: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
    visibility: number;
    sys: {
        sunrise: number;
        sunset: number;
        country: string;
    };
}