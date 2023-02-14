# surfline

Surfline API bindings and types in JS with no external dependencies.

The publically available Surfline API is undocumented, but relatively easy to call. However, the response types are often quite messy, and at times inconsistent. 

This library provides more clarity of response types by providing rigorous Typescript bindings for the available Surfline API calls. 

### install

```
$ npm install surfline --save
```

### usage

**`fetchTaxonomy`**

Taxonomies are used Surfline by to represent location entities (eg. countries, cities, surf spots, etc). Each taxonomy also has a subtype which can be one of: `spot`, `subregion`, `region` or `geoname` (each type having mostly similar properties, with some differences).

Taxonomies can fetched using `fetchTaxonomy`.

```ts
async function fetchTaxonomy(q: TaxonomyQuery): Promise<TaxonomyResponse>

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

A few things to keep in mind:

* Querying for types other than 'taxonomy' isn't really that useful, almost all queries should use `TaxonomyQuery.type=taxonomy`
* If setting a `TaxonomyQuery.type` make sure the `TaxonomyQuery.id` also references a taxonomy of that type (eg. if `type=spot` make sure to use `SpotTaxonomy.spot` as the id)
* `maxDepth` controls how many "levels" of data is returned (eg. if fetching the "Earth" taxonomy, a depth of 0 returns continents, while a depth of 1 returns continents and countries)
* Query Earth with a `maxDepth` of 6 returns almost every taxonomy (with a few edge case exceptions)

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
