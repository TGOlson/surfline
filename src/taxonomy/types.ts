export type TaxonomyQuery = {
  id: string,
  type?: 'taxonomy' | TaxonomyType,
  maxDepth?: number,
};

export type TaxonomyType = 'spot' | 'subregion' | 'region' | 'geoname';

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
  _id: string,
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
  spot: string,
  // note: have observed some spots have hasSpots=true, but don't actually contian any spots
  // going to assume this is a data error and keep this typed as-is
  hasSpots: false,
};

export type SubregionTaxonomy = BaseTaxonomy & {
  type: 'subregion',
  category: 'surfline',
  subregion: string,
  hasSpots: true,
};

export type RegionTaxonomy = BaseTaxonomy & {
  type: 'region',
  category: 'surfline',
  region: string,
  hasSpots: true,
};

export type GeonameTaxonomy = BaseTaxonomy & {
  type: 'geoname',
  category: 'geonames',
  geonameId: string,
  // comma seperated string path to this geoname
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
