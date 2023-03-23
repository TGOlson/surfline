import { SurflineError } from "../error";
import { EARTH_GEONAME_ID, NONEXISTENT_BAJA_SUBREGION_ID, NONEXISTENT_GREECE_SUBREGION_ID } from "./constants";
import { Taxonomy, TaxonomyQuery, TaxonomyResponse } from "./types";

const BASE_TAXONOMY_URL = 'https://services.surfline.com/taxonomy';

export async function fetchTaxonomy(q: TaxonomyQuery): Promise<TaxonomyResponse> {
  const type = q.type ?? 'taxonomy';
  const maxDepth = q.maxDepth ?? 0;

  const url = `${BASE_TAXONOMY_URL}?type=${type}&id=${q.id}&maxDepth=${maxDepth}`;

  const res = await fetch(url, {mode: 'no-cors'});
  const resJSON = await res.json();

  if (res.status! !== 200) {
    const message = (resJSON as {message: string}).message;
    throw new SurflineError({status: res.status, message});
  }

  return resJSON as TaxonomyResponse;
}

export async function fetchEarthTaxonomy(q?: {maxDepth: number}): Promise<TaxonomyResponse> {
  return fetchTaxonomy({id: EARTH_GEONAME_ID, maxDepth: q?.maxDepth});
}

// useful when filtering taxonomies
export const referencesBadId = (tx: Taxonomy): boolean => {
  return tx.liesIn.includes(NONEXISTENT_GREECE_SUBREGION_ID) 
    || tx.liesIn.includes(NONEXISTENT_BAJA_SUBREGION_ID);
};
