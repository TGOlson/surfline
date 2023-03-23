import { SurflineError } from "../error";
import { SpotInfoQuery, SpotInfoResponse } from "./types";

const SPOTS_URL = 'https://services.surfline.com/kbyg/spots/batch';

export async function fetchSpotInfo(q: SpotInfoQuery): Promise<SpotInfoResponse> {
  const body = JSON.stringify({spotIds: q.spotIds});

  const url = q.proxy ? `${q.proxy}${SPOTS_URL}` : SPOTS_URL;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body,
  });

  const resJSON = await res.json();

  if (res.status! !== 200) {
    const message = (resJSON as {message: string}).message;
    throw new SurflineError({status: res.status, message});
  }

  return resJSON as SpotInfoResponse;
}
