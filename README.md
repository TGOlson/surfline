# surfline

Surfline API bindings and types in JS. Zero external dependencies.

### usage

The publically available Surfline API is undocumented, but relatively easy to call. However, the response types are quite messy, semi-recursive (for taxonomies), and at times inconsistent. Likely the greatest value to users of this library will be the detailed Typescript bindings.

**Taxonomy**

Surfline provides a `/taxonomy` endpoint which can be used to fetch location entities (eg. countries, cities, surf spots, etc). They don't use those names in all cases, instead opting for the term "taxonomy" to generally mean any location object. Each taxonomy also has a subtype which can be one of: `spot`, `subregion`, `region` or `geoname` (each type having mostly similar, but occasionally different properties).

Taxonomies can fetch using `fetchTaxonomy`.

```ts
async function fetchTaxonomy(q: TaxonomyQuery): Promise<TaxonomyResponse>
```

A `TaxonomyQuery` takes in an id, an optional `type`, and an optional `maxDepth`. The most general `type` is `taxonomy`, and should be used for the majority of cases when querying this api. If a `type` other than `taxonomy` is provided, make sure the `id` also corresponds to that type (eg. is querying for `type=spot` ensure you using `SpotTaxomony.spot` as the id).

Setting `maxDepth` defines how many "steps" away from the base taxonomy are included in the response. For example, querying the "Earth" taxonomy with `maxDepth: 0` returns continents, while querying the "Earth" taxonomy with `maxDepth: 1` return continents and countries. 

```ts
export type TaxonomyType = 'spot' | 'subregion' | 'region' | 'geoname';

export type TaxonomyQuery = {
  id: string,
  type?: 'taxonomy' | TaxonomyType,
  maxDepth?: number,
};
```

**Forecast**

TOOD:

### dev

```
npm install
```

```
npm run build

// or

npm run watch
```
