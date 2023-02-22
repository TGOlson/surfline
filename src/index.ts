import { fetchTaxonomy } from "./taxonomy/index";
import { fetchForecast } from "./forecasts/index";
import { fetchSpotInfo } from "./spots/index";

export {fetchTaxonomy, fetchForecast, fetchSpotInfo};

console.log('running!')

const config = {
  spotIds: [
    "5842041f4e65fad6a77088c4", 
    // "584204214e65fad6a7709bba", 
    // "5842041f4e65fad6a77088cc", 
    // "5842041f4e65fad6a7708839", 
    // "584204204e65fad6a7709435", 
    // "5c008f5313603c0001df5318", 
    // "5842041f4e65fad6a77088a0", 
    // "5842041f4e65fad6a770883b", 
    // "5842041f4e65fad6a7708840", 
    // "59cac82265827d001b256033"
  ]
}

fetchSpotInfo(config)
  .then(() => console.log('success'))
  .catch((err) => console.log('err', err))
