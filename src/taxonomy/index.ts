import { Taxonomy, TaxonomyQuery, TaxonomyResponse } from "./types";

// helpful ids to use when starting a search
export const EARTH_GEONAME_ID = '58f7ed51dadb30820bb38782';
export const SOUTH_AMERICA_GEONAME_ID = '58f7eef5dadb30820bb55cba';
export const NORTH_AMERICA_GEONAME_ID = '58f7ed51dadb30820bb38791';
export const EUROPE_GEONAME_ID = '58f7eef8dadb30820bb5601b';
export const OCEANIA_GEONAME_ID = '58f7eef9dadb30820bb5626e';
export const AFRICA_GEONAME_ID = '58f7f00ddadb30820bb69bbc';
export const ASIA_GEONAME_ID = '58f7eef1dadb30820bb556be';

// for whatever reason Jaluit Atoll (5bdb2e9e1349f51cb0e83182) in Greece references an id in `liesIn` that doesn't exist
export const NONEXISTENT_GREECE_SUBREGION_ID = '5bdb2d7ed43f7a0001c07d01';

// this subregion seems to be used for testing
// any spots that 'lie in' this id are not real
export const NONEXISTENT_BAJA_SUBREGION_ID = '58f806e9dadb30820bcc7440';

const BASE_TAXONOMY_URL = 'https://services.surfline.com/taxonomy';

export async function fetchTaxonomy(q: TaxonomyQuery): Promise<TaxonomyResponse> {
  const type = q.type ?? 'taxonomy';
  const maxDepth = q.maxDepth ?? 0;

  const url = `${BASE_TAXONOMY_URL}?type=${type}&id=${q.id}&maxDepth=${maxDepth}`;

  const res = await fetch(url);
  return await res.json() as TaxonomyResponse;
}

export async function fetchEarthTaxonomy(q: Pick<TaxonomyQuery, 'maxDepth'>): Promise<TaxonomyResponse> {
  return fetchTaxonomy({id: EARTH_GEONAME_ID, maxDepth: q.maxDepth});
}

// useful when filtering taxonomies
export const referencesBadId = (tx: Taxonomy): boolean => {
  return tx.liesIn.includes(NONEXISTENT_GREECE_SUBREGION_ID) 
    || tx.liesIn.includes(NONEXISTENT_BAJA_SUBREGION_ID);
};
