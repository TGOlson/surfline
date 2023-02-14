# surfline

Surfline API bindings and types in JS with no external dependencies.

The publicly available Surfline API is undocumented, but relatively easy to call. However, the response types are often quite messy, and at times inconsistent. 

This library provides more clarity of response types by providing rigorous Typescript bindings for the available Surfline API calls. 

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

// note: for initial exploration `fetchEarthTaxonomy` can be used as a convenient starting point
fetchEarthTaxonomy().then((res: TaxonomyResponse) => { ... })
```

```ts
import {fetchForecast} from 'surfline';

fetchForecast({spotId: <some-spot-id>, type: 'wave'}).then((res: WaveForecast) => {
  // do something with result...
})
```

### more details

**`fetchTaxonomy`**

Taxonomies are used by Surfline to represent location entities (eg. countries, cities, surf spots, etc). Each taxonomy also has a subtype which can be one of: `spot`, `subregion`, `region` or `geoname`.

```ts
function fetchTaxonomy(q: TaxonomyQuery): Promise<TaxonomyResponse>

function fetchEarthTaxonomy(q: Pick<TaxonomyQuery, 'maxDepth'>): Promise<TaxonomyResponse>

type TaxonomyType = 'spot' | 'subregion' | 'region' | 'geoname';

type TaxonomyQuery = {
  id: string,
  type?: 'taxonomy' | TaxonomyType,
  maxDepth?: number,
};

// individual X-Taxonomy types omitted... see type files for more details
type Taxonomy = SpotTaxonomy | SubregionTaxonomy | RegionTaxonomy | GeonameTaxonomy;

type TaxonomyResponse = Taxonomy & {
  in: Taxonomy[],
  contains: Taxonomy[],
};
```

_A few things to keep in mind_

* Most queries should use `TaxonomyQuery.type=taxonomy`, other types are not frequently useful
* If setting `TaxonomyQuery.type` make sure `TaxonomyQuery.id` references a taxonomy of that type (eg. if `type=spot` make sure to use `SpotTaxonomy.spot` as the id)
* `maxDepth` controls how many "levels" of data is returned (eg. if fetching the "Earth" taxonomy, a depth of 0 returns continents, while a depth of 1 returns continents and countries)
* Fetching "Earth" with a `maxDepth` of 6 returns almost every taxonomy (with a few edge case exceptions)

**`fetchForecast`**

```ts
function fetchForecast(q: ForecastQuery): Promise<ForecastResponse[typeof q['type']]>

export type ForecastType = 'wind' | 'wave' | 'rating' | 'tides' | 'weather' | 'conditions' | 'combined';

export type ForecastQuery = {
  spotId: string,
  type: ForecastType,
  days?: number,
  intervalHours?: number,
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
```

_A few things to keep in mind_

* `combined` provides a quick overview, but doesn't give the same level of detail as individual forecasts
* `days` specifies how far out you want the forecast, some forecasts are limited to 6 days max
* `intervalHours` specifies granularity of data (eg. `intervalHours=3` returns 8 forecast items per day)
* `intervalHours` doesn't seem to do anything with `tide` forecasts, those always default to 1 hour intervals
* a subset of regional forecast are available from the surfline API (`/regions/forecasts/rating?subregionId=...`), but that is not currently exposed by this library

### dev

```
npm install
```

```
npm run build

// or

npm run watch
```
