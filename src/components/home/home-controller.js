import { itemsData } from "mockAPI/items";
import { storeData } from "mockAPI/store";

export const getItems = () => {
    let items = itemsData.slice(1, 25);
    for (let i = 1; i <= items.length; i++) {
        items[i - 1]["id"] = i;
    }
    return items;
}

export const getStore = (latitude, longitude) => {
    let minLength = Infinity;
    let result = {};
    for (let store of storeData) {
        let d1 = latitude - Number(store.Latitude);
        let d2 = longitude - Number(store.Longitude);
        let distance = Math.sqrt(d1 * d1 + d2 * d2);
        if (distance < minLength) {
            minLength = distance
            result = { ...store };
        }
    }
    return result;
}