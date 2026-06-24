// openlayer
import Tile from 'ol/layer/Tile.js';
import LayerGroup from 'ol/layer/Group.js';
import XYZ from 'ol/source/XYZ.js';

// self
import { tianditu_key } from "../init.js"

// url
// 所有图层资源的坐标参考系统均为：EPSG:900913（CGCS2000/Spherical Mercator）
// 天地图矢量图层资源
const tianditu_vec_w_url = "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + tianditu_key
const tianditu_cva_w_url = "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + tianditu_key
// 天地图影像图层资源
const tianditu_img_w_url = "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + tianditu_key
const tianditu_cia_w_url = "http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + tianditu_key
// 天地图地形图层资源
const tianditu_ter_w_url = "http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + tianditu_key
const tianditu_cta_w_url = "http://t0.tianditu.gov.cn/cta_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cta&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + tianditu_key
// 天地图全球境界图层资源
const tianditu_ibo_w_url = "http://t0.tianditu.gov.cn/ibo_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ibo&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=" + tianditu_key

// 天地图矢量图层组合 + 天地图全球境界图层组合
export const tianditu_vector_layergroup = new LayerGroup({
    layers: [
        // 天地图矢量图层
        new Tile({
            title: '天地图矢量图层',
            source: new XYZ({
                url: tianditu_vec_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            })
        }),
        // 天地图矢量注记图层
        new Tile({
            title: '天地图矢量注记图层',
            source: new XYZ({
                url: tianditu_cva_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            })
        }),
        // 天地图全球境界图层
        new Tile({
            title: '天地图矢量图层',
            source: new XYZ({
                url: tianditu_ibo_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            }),
            visible: false
        })
    ]
})

// 天地图影像图层组合 + 天地图全球境界图层组合
export const tianditu_image_layergroup = new LayerGroup({
    layers: [
        // 天地图影像图层
        new Tile({
            title: '天地图影像图层',
            source: new XYZ({
                url: tianditu_img_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            })
        }),
        // 天地图影像注记图层
        new Tile({
            title: '天地图影像注记图层',
            source: new XYZ({
                url: tianditu_cia_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            })
        }),
        // 天地图全球境界图层
        new Tile({
            title: '天地图矢量图层',
            source: new XYZ({
                url: tianditu_ibo_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            }),
            visible: false
        })
    ]
})

// 天地图地形图层组合 + 天地图全球境界图层组合
export const tianditu_terrian_layergroup = new LayerGroup({
    layers: [
        // 天地图地形图层
        new Tile({
            title: '天地图地形图层',
            source: new XYZ({
                url: tianditu_ter_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            })
        }),
        // 天地图矢量注记图层
        new Tile({
            title: '天地图地形图层注记',
            source: new XYZ({
                url: tianditu_cta_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            })
        }),
        // 天地图全球境界图层
        new Tile({
            title: '天地图矢量图层',
            source: new XYZ({
                url: tianditu_ibo_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            }),
            visible: false
        })
    ]
})

// 天地图 3d 图层组合 + 天地图全球境界图层组合
// TODO: 等待实现，暂时占位
export const tianditu_3d_layergroup = new LayerGroup({
    layers: [
        // 天地图地形图层
        new Tile({
            title: '天地图地形图层',
            source: new XYZ({
                url: tianditu_ter_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            })
        }),
        // 天地图矢量注记图层
        new Tile({
            title: '天地图地形图层注记',
            source: new XYZ({
                url: tianditu_cta_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            })
        }),
        // 天地图全球境界图层
        new Tile({
            title: '天地图矢量图层',
            source: new XYZ({
                url: tianditu_ibo_w_url,
                wrapX: true,
                projection: "EPSG:900913"
            }),
            visible: false
        })
    ]
})

// 天地图底图对应映射
const tianditu_basemap = {
    "tianditu_vector": tianditu_vector_layergroup,
    "tianditu_image": tianditu_image_layergroup,
    "tianditu_terrian": tianditu_terrian_layergroup,
    "tianditu_3d": tianditu_3d_layergroup
}

// 更换底图函数
export function change_basemap(map, old_basemap, new_basemap) {
    let old_basemap_layer = tianditu_basemap[old_basemap]
    if (map) {
        map.removeLayer(old_basemap_layer)
        map.addLayer(tianditu_basemap[new_basemap])
    }
}

// 控制【注记图层】【全球境界】切换显示
export function switch_annotation_global_visual(basemap, annotation_visual, global_visual) {
    let layer_group = tianditu_basemap[basemap]
    layer_group.getLayers().item(1).setVisible(annotation_visual)
    layer_group.getLayers().item(2).setVisible(global_visual)
}