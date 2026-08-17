// vue
import { ref } from "vue"

// export
// 初始 tab
export const default_active = "BaseMapTab"
export const fragment_tab = ref(default_active)
// 天地图 key
export const tianditu_key = import.meta.env.VITE_TIANDITU_KEY || ""
// 初始化天地图底图
export const tianditu_basemap_init = "tianditu_vector"
// 天地图底图对应映射:
// "tiantitu_vector": tianditu_vector_layergroup,
// "tiantitu_image": tianditu_image_layergroup,
// "tianditu_terrian": tianditu_terrian_layergroup