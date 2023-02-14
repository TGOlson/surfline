export type ForecastType = 'wind' | 'wave' | 'rating' | 'tides' | 'weather' | 'conditions' | 'combined';

export type ForecastQuery = {
  spotId: string,
  type: ForecastType,
  days?: number,
  intervalHours?: number,
};

export type Units = {
  // TODO: are there other values that are ever returned? 
  temperature: "F",
  tideHeight: "FT",
  swellHeight: "FT",
  waveHeight: "FT",
  windSpeed: "KTS",
  pressure: "MB"
};

export type Location = {
  lon: number,
  lat: number,
};

// TODO: probably useful to make these enums:

// eg. "FAIR"
export type RatingDescription = string;

// eg. "Waist to chest"
export type WaveSizeDescription = string;

export type Wind = {
  timestamp: number,
  utcOffset: number,
  speed: number,
  direction: number,
  // TODO: could be an enum: "Onshore", ...
  directionType: string 
  gust: number,
  optimalScore: number
};

export type WindForecast = {
  associated: {
    units: Units,
    utcOffset: number,
    location: Location,
    runInitializationTimestamp: number
  },
  data: {
    wind: Wind[]
  }
};

export type Swell = {
  height: number,
  period: number,
  impact: number,
  direction: number,
  directionMin: number,
  optimalScore: number,
};

export type Wave = {
  timestamp: number,
  probability: null,
  utcOffset: number,
  surf: {
    min: number,
    max: number,
    optimalScore: number,
    plus: boolean,
    humanRelation: WaveSizeDescription, 
    raw: {
      min: number,
      max: number
    }
  }
  swells: Swell[]
};

export type WaveForecast = {
  associated: {
    units: Units,
    utcOffset: number,
    location: Location,
    runInitializationTimestamp: number,
    forecastLocation: Location,
    offshoreLocation: Location,
  },
  data: {
    wave: Wave[]
  }
};

export type Rating = {
  timestamp: number,
  utcOffset: number,
  rating: {
    key: RatingDescription 
    value: number
  }
};

export type RatingForecast = {
  associated: {
    location: Location,
    runInitializationTimestamp: number,
  },
  data: {
    rating: Rating[]
  }
};

export type Tide = {
  timestamp: number,
  utcOffset: number,
  type: 'HIGH' | 'LOW' | 'NORMAL',
  height: number
};

export type TideForecast = {
  associated: {
    utcOffset: number,
    units: Units,
    tideLocation: Location & {
      name: string,
      min: number,
      max: number,
      mean: number
    }
  },
  data: {
    tides: Tide[],
  }
};

export type SunriseSunsetTimes = {
  midnight: number,
  sunrise: number,
  sunset: number,
};

export type SunlightTimes = SunriseSunsetTimes & {
  midnightUTCOffset: number,
  dawn: number,
  dawnUTCOffset: number,
  sunriseUTCOffset: number,
  sunsetUTCOffset: number,
  dusk: number,
  duskUTCOffset: number,
};


export type Weather = {
  timestamp: number,
  utcOffset: number,
  temperature: number,
  // eg. "NIGHT_MOSTLY_CLOUDY",
  condition: string, 
  pressure: number
};

export type WeatherForecast = {
  associated: {
    units: Units,
    utcOffset: number,
    weatherIconPath: string,
    runInitializationTimestamp: number,
  },
  data: {
    sunlightTimes: SunlightTimes[],
    weather: Weather[],
  }
};

export type ConditionDetails = {
  timestamp: number,
  observation: string,
  rating: RatingDescription,
  minHeight: number,
  maxHeight: number,
  plus: boolean,
  humanRelation: WaveSizeDescription;
  occasionalHeight: null; // TODO: what can this be?
}

export type Condition = {
  timestamp: number,
  forecastDay: string,
  forecaster: {
    name: string,
    avatar: string,
  },
  // true when forecast.name/avatar, would those fields be available if this was false?
  human: boolean,
  observation: string,
  am: ConditionDetails,
  pm: ConditionDetails,
  utcOffset: number,
};

export type ConditionsForecast = {
  associated: {
    units: Units,
    utcOffset: number,
  },
  data: {
    conditions: Condition[]
  }
};

export type Forecast = {
  timestamp: number,
  weather: Pick<Weather, 'temperature' | 'condition'>,
  wind: Pick<Wind, 'speed' | 'direction'>,
  surf: Wave['surf']['raw'],
  swells: Pick<Swell, 'height' | 'period' | 'direction' | 'directionMin'>[]
};

export type CombinedForecast = {
  associated: {
    units: Units,
    utcOffset: number,
    weatherIconPath: string,
  },
  data: {
    sunriseSunsetTimes: SunriseSunsetTimes[],
    tideLocation: TideForecast['associated']['tideLocation'],
    forecasts: Forecast[],
    tides: Pick<Tide, 'timestamp' | 'type' | 'height'>
  }
};

export declare interface ForecastResponse {
  wind: WindForecast;
  wave: WaveForecast;
  rating: RatingForecast;
  tides: TideForecast;
  weather: WeatherForecast;
  conditions: ConditionsForecast;
  combined: CombinedForecast;
}
