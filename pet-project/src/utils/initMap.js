
import { Map, View } from 'ol'
import Tile from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import Overlay from 'ol/Overlay'
import { fromLonLat } from 'ol/proj'

export function initMap(target, overlay, longitude, latitude) {
    return new Map({
        target: target,
        layers: [
          new Tile({
            source: new OSM()
          })
        ],
        overlays: [overlay],
        view: new View({
          center: fromLonLat([longitude, latitude]),
          zoom: 3
        })
      })
}

export function setCoordinates(overlay, longitude, latitude) {
    const coordinate = [longitude, latitude]
    setTimeout(() => {
    overlay.setPosition(fromLonLat(coordinate), 'EPSG:3857')
    }, 0)
}

export function closePopup(overlay) {
    overlay.setPosition(undefined)
}

export function createOverlay(ref) {
    return new Overlay({
        element: ref,
        autoPan: true
    })
}
