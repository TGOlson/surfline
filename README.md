# surfline

Surfline API bindings and types in JS with no external dependencies.

The publicly available Surfline API is undocumented, but relatively easy to call. However, the response types are often quite messy, and at times inconsistent. 

This library provides more clarity of response types by providing rigorous Typescript bindings for the available Surfline API calls. 

### install

```
$ npm install surfline --save
```

### usage

**`fetchTaxonomy`**

Taxonomies are used by Surfline to represent location entities (eg. countries, cities, surf spots, etc). Each taxonomy also has a subtype which can be one of: `spot`, `subregion`, `region` or `geoname`.

Taxonomies can fetched using `fetchTaxonomy`. For initial exploration `fetchEarthTaxonomy` can also be used as a convenient starting point. 

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

Surfline provides a number of different forecasts available to query, enumerated by `ForecastType`.

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

* `combined` forecast is useful for a quick overview, but doesn't provide quite the same level of detail as individual forecasts
* Use `days` to specify how far out you want the forecast. Some forecasts are limited to 6 days max.
* Use `intervalHours` to specify granularity of data (eg. `intervalHours=3` returns 8 forecast items per day)
* `intervalHours` doesn't seem to do anything with `tide` forecasts, those always default to 1 hour intervals

### dev

```
npm install
```

```
npm run build

// or

npm run watch
```
