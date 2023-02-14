export type TaxonomyType = 'spot' | 'subregion' | 'region' | 'geoname';

export type TaxonomyQuery = {
  id: string,

  // Most queries should use `type=taxonomy`, other types are not frequently useful
  // If setting `type`, ensure `id` references a taxonomy of that type (eg. if `type=spot` use `SpotTaxonomy.spot` as id)
  type?: 'taxonomy' | TaxonomyType,

  // `maxDepth` controls how many "levels" of data is returned 
  // eg. if fetching "Earth" taxonomy, a depth of 0 returns continents, while a depth of 1 returns continents and countries
  maxDepth?: number,
};

// useful for more slightly explicit typings later on...
export type TaxonomyId = string;
export type SpotId = string;
export type SubregionId = string;
export type RegionId = string;
export type GeonameId = string;

export type Location = {
  coordinates : [number, number],
  // TODO: I think this is the only observed type?
  type : 'Point' 
};

export type AssociatedLink = {
  href: string,
  key: 'taxonomy' | 'api' | 'www' | 'travel'
};

// All taxomies include these base properties
type BaseTaxonomy = {
  _id: TaxonomyId,
  location: Location,
  associated: {
    // observed: all taxonomies have at least 1 non-null link
    links: [
      AssociatedLink, 
      AssociatedLink | null, 
      AssociatedLink | null
    ]
  },
  name: string,
  type: TaxonomyType,
  category: 'surfline' | 'geonames',
  depth: number,
  hasSpots: boolean,
  // other taxonomy ids
  // first item is null if geoname is earth, string in all other cases
  // most type=spot taxonomies have 2 'liesIn', but a few have 1 or 3
  liesIn: [
    string | null, 
    string | null, 
    string | null
  ],
  updatedAt: string,
};

// Type specific taxonomy properties
export type SpotTaxonomy = BaseTaxonomy & {
  type: 'spot',
  category: 'surfline',
  spot: SpotId,
  // note: have observed some spots have hasSpots=true, but don't actually contain any spots
  // going to assume this is a data error and keep this typed as-is
  hasSpots: false,
};

export type SubregionTaxonomy = BaseTaxonomy & {
  type: 'subregion',
  category: 'surfline',
  subregion: SubregionId,
  hasSpots: true,
};

export type RegionTaxonomy = BaseTaxonomy & {
  type: 'region',
  category: 'surfline',
  region: RegionId,
  hasSpots: true,
};

export type GeonameTaxonomy = BaseTaxonomy & {
  type: 'geoname',
  category: 'geonames',
  geonameId: GeonameId,
  // comma separated string path to this geoname
  enumeratedPath: string, 
  // 'string' vals may have better enum types, could clean this up...
  geonames: {
    population: number,
    fcode: string,
    fcl: string,
    lat: string,
    adminName1: string,
    fcodeName: string,
    toponymName: string,
    fclName: string,
    name: string,
    geonameId: number,
    lng: string,
  }
};

export type Taxonomy = SpotTaxonomy | SubregionTaxonomy | RegionTaxonomy | GeonameTaxonomy;

// Top level response includes a few extra fields
export type TaxonomyResponse = Taxonomy & {
  in: Taxonomy[],
  contains: Taxonomy[],
};

// type refinement helpers
export const isSpotTaxonomy = (t: Taxonomy): t is SpotTaxonomy => t.type === 'spot';
export const isSubregionTaxonomy = (t: Taxonomy): t is SubregionTaxonomy => t.type === 'subregion';
export const isRegionTaxonomy = (t: Taxonomy): t is RegionTaxonomy => t.type === 'region';
export const isGeonameTaxonomy = (t: Taxonomy): t is GeonameTaxonomy => t.type === 'geoname';
