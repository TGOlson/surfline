import { Rating, RatingDescription, Swell, Tide, Units, Wave, Weather, Wind } from "../forecasts/types"

export type SpotInfoQuery = {
  spotIds: string[]
};

export type AbilityLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

// TODO: cameras are a pretty large data structure, 
// unsure if all this is typed exactly correct...
export type Camera = {
  _id: string,
  title: string,
  isPremium: boolean,
  isPrerecorded: boolean,
  lastPrerecordedClipStartTimeUTC: string,
  lastPrerecordedClipEndTimeUTC: string,
  status: { 
    isDown: boolean, 
    message: string, 
    subMessage: string, 
    altMessage: string 
  },
  supportsHighlights: boolean,
  supportsCrowds: boolean,
  streamUrl: string,
  stillUrl: string,
  pixelatedStillUrl: string,
  rewindBaseUrl: string,
  alias: string,
  // TODO: what types can this be?
  highlights: null,
  control: string,
  nighttime: boolean,
  rewindClip: string,
};

export type SpotInfo = {
  _id: string,
  abilityLevels: AbilityLevel[],
  // TODO: boardTypes can probably be made into an enum...
  boardTypes: string[],
  cameras: object[],
  conditions: {
    expired: boolean,
    human: boolean,
    sortableCondition: number,
    value: RatingDescription
  },
  hasLiveWind: false,
  lat: number,
  legacyId: number,
  legacyRegionId: number,
  lon: number,
  name: string,
  offshoreDirection: number,
  parentTaxonomy: string[],
  rank: number,
  rating: Rating['rating'] & {
    _id: string,
    human: boolean
  },
  relivableRating: number,
  saveFailures: number,
  slug : "DEPRECATED",
  subregion: {
    name: string
  },
  subregionId: string,
  surf: Omit<Wave['surf'], 'raw' | 'optimalScore'> & {human: boolean},
  swells: Omit<Swell, 'impact' | 'optimalScore'>[],
  thumbnail: string,
  tide: {
    current: Tide,
    next: Tide,
    previous: Tide
  },
  timezone: string,
  waterTemp: {
    max: number,
    min: number
  },
  waveHeight: Omit<Wave['surf'], 'raw' | 'optimalScore'> & {human: boolean} & {occasional: null},
  weather: Pick<Weather, 'condition' | 'temperature'>,
  wind: Pick<Wind, 'direction'| 'directionType' | 'gust' | 'speed'>
}

export type SpotInfoResponse = {
  associated: {
    units: Units
  },
  data: SpotInfo[]
}
