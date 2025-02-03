export enum Weather {
    Sunny = 'sunny',
    Rainy = 'rainy',
    Cloudy = 'cloudy',
    Stormy = 'stormy',
    Windy = 'windy'
}

export enum Visibility {
    Great = 'great',
    Good = 'good',
    Ok = 'ok',
    Poor = 'poor'
}

export interface FlightEntry {
    id: number;
    date: string;
    visibility: Visibility;
    weather: Weather;
    comment: string;
}

export type NewFlightEntry = Omit<FlightEntry, 'id'>;