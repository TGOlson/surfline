type Location = {
  coordinates : [number, number],
  type : "Point"
};

type AssociatedLink = {
  href: string,
  key: 'taxonomy' | 'api' | 'www' | 'travel'
}

// All taxomies include these base properties
type SurflineBaseTaxonomy = {
  _id: string,
  associated: {
    links: [AssociatedLink, AssociatedLink | null, AssociatedLink | null]
  },
  contains: SurflineTaxonomy[],
  location: Location,
  name: string,
  type: 'spot' | 'subregion' | 'region' | 'geoname',
  category: 'surfline' | 'geonames',
  depth: number,
  hasSpots: boolean,
  liesIn: string[], // other taxonomy ids
  updatedAt: string,
};

// Type specific taxonomy properties
type SurflineSpotTaxonomy = {
  type: 'spot',
  category: 'surfline',
  spot: string,
  hasSpots: false,
  liesIn: [string, string]
};

type SurflineSubregionTaxonomy = {
  type: 'subregion',
  category: 'surfline',
  subregion: string,
  hasSpots: true,
  liesIn: [string, string]
};


type SurflineRegionTaxonomy = {
  type: 'region',
  category: 'surfline',
  region: string,
  hasSpots: true,
  liesIn: [string]
};

type SurflineGeonameTaxonomy = {
  type: 'geoname',
  category: 'geonames',
  geonameId: string,
  hasSpots: true,
  enumeratedPath: string,
  liesIn: [string | null] // null if geoname is earth, string in all other cases
  geonames: object, // not well typed, unclear if this is useful
};


export type SurflineTaxonomy 
  = (SurflineBaseTaxonomy & SurflineSpotTaxonomy)
  | (SurflineBaseTaxonomy & SurflineSubregionTaxonomy)
  | (SurflineBaseTaxonomy & SurflineRegionTaxonomy)
  | (SurflineBaseTaxonomy & SurflineGeonameTaxonomy);
