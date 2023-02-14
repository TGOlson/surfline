# surfline

Surfline API bindings and types in JS with no external dependencies.

The publicly available Surfline API is undocumented, but relatively easy to call. However, the response types are often quite messy, and at times inconsistent. 

This library provides more clarity of response types by providing rigorous Typescript bindings for the available Surfline API calls. 

_note: as Surfline responses are pretty unwieldy, there might be some edge cases errors in the types provided by this library, if you find any errors please open an issue to let me know!_

### install

```
$ npm install surfline --save
```

### usage

This library exposes two Surfline API calls: `fetchTaxonomy` (used to fetch location entities) and `fetchForecast`.

```ts
import {fetchTaxonomy} from 'surfline';
import {fetchEarthTaxonomy} from 'surfline/taxonomy';

fetchTaxonomy({id: <some-id>}).then((res: TaxonomyResponse) => {
  // do something with result...
  // eg. fetch all taxonomies in res.contains
})

// or for initial exploration `fetchEarthTaxonomy` can be used as a convenient starting point
fetchEarthTaxonomy().then((res: TaxonomyResponse) => { ... })
```

```ts
import {fetchForecast} from 'surfline';

fetchForecast({spotId: <some-spot-id>, type: 'wave'}).then((res: WaveForecast) => {
  // do something with result...
})
```

### types

**`fetchTaxonomy`**

```ts
function fetchTaxonomy(q: TaxonomyQuery): Promise<TaxonomyResponse>

function fetchEarthTaxonomy(q: Pick<TaxonomyQuery, 'maxDepth'>): Promise<TaxonomyResponse>

type TaxonomyType = 'spot' | 'subregion' | 'region' | 'geoname';

export type TaxonomyQuery = {
  id: string,

  // Most queries should use `type=taxonomy`, other types are not frequently useful
  // If setting `type`, ensure `id` references a taxonomy of that type 
  // (eg. if `type=spot` use `SpotTaxonomy.spot` as id)
  type?: 'taxonomy' | TaxonomyType,

  // `maxDepth` controls how many "levels" of data is returned 
  // eg. if fetching "Earth" taxonomy, a depth of 0 returns continents, 
  // while a depth of 1 returns continents and countries
  maxDepth?: number,
};

// individual xTaxonomy types omitted... see type files for more details
type Taxonomy = SpotTaxonomy | SubregionTaxonomy | RegionTaxonomy | GeonameTaxonomy;

type TaxonomyResponse = Taxonomy & {
  in: Taxonomy[],
  contains: Taxonomy[],
};
```

**`fetchForecast`**

```ts
function fetchForecast<T extends ForecastType>(q: ForecastQuery<T>): Promise<ForecastResponse[T]>

export type ForecastType 
  = 'wind' 
  | 'wave' 
  | 'rating' 
  | 'tides' 
  | 'weather' 
  | 'conditions' 
  // `combined` provides a quick overview, 
  // but doesn't give the same level of detail as individual forecasts
  | 'combined';

export type ForecastQuery<T extends ForecastType> = {
  spotId: string,
  type: T,

  // `days` specifies how far out you want the forecast, 
  // some forecasts are limited to 6 days max
  days?: number,

  // `intervalHours` specifies granularity of data 
  // (eg. `intervalHours=3` returns 8 forecast items per day)
  // `intervalHours` is ignored for `tide` forecasts, 
  // those always default to 1 hour intervals
  intervalHours?: number,
};

// individual xForecast types omitted... see type files for more details
export declare interface ForecastResponse {
  wind: WindForecast;
  wave: WaveForecast;
  rating: RatingForecast;
  tides: TideForecast;
  weather: WeatherForecast;
  conditions: ConditionsForecast;
  combined: CombinedForecast;
}
```
_note: a subset of forecasts are available for subregions via the surfline API (`/regions/forecasts/conditions?subregionId=...`), but that is not currently exposed by this library_

### dev

```
npm install
```

```
npm run build

// or

npm run watch
```
