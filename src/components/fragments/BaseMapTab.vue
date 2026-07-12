<template>
    <div id="map-ol" style="width: 100%; height: 100%"></div>
    <el-button 
        type="info" 
        style="position: absolute; top: 10px; right: 10px;"
        @click="basemap_drawer = true">切换底图</el-button>
    <el-drawer 
        title="选择底图"
        direction="rtl"
        v-model="basemap_drawer">
        <BaseMapChoice :modelValue="basemap_choice" @update:modelValue="on_update_basemap_choice"/>
    </el-drawer>
    <MapSearchBar style="position: absolute; top: 10px; left: 130px;"/>
</template>

<script setup>
// openlayer
import Map from 'ol/Map.js'
import View from 'ol/View.js'
import TileLayer from 'ol/layer/Tile.js'
import { transform } from 'ol/proj'
import 'ol/ol.css'

// self
import { change_basemap, tianditu_vector_layergroup } from "../../utils/map/basemap_layer.js"
import { map_instance } from "../../utils/map/map_instance.js"
import { tianditu_basemap_init } from "../../utils/init.js"

// vue
import { onActivated, ref } from "vue"
// vue self
import MapSearchBar from "../widgets/MapSearchBar.vue"

// 首次挂载组件事件
// 重新激活事件
onActivated(() => {
    if (!map_instance.get()) {
        const new_map_instance = new Map({
            layers: [tianditu_vector_layergroup],
            view: new View({
                center: transform([114, 30], "EPSG:4326", "EPSG:900913"),
                zoom: 4,
                projection: "EPSG:900913"
            }),
            target: 'map-ol',
        });
        map_instance.set(new_map_instance)
    } else {
        map_instance.get().updateSize();
    }
})

// 底图 drawer 状态控制
const basemap_drawer = ref(false)

// 底图选择
const basemap_choice = ref(tianditu_basemap_init)
// 底图选择更新事件
function on_update_basemap_choice(e) {
    change_basemap(map_instance.get(), basemap_choice.value, e)
    basemap_choice.value = e
}

</script>