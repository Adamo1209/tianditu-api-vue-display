// self
import { tianditu_key } from "@/utils/init.js"
import { map_instance } from "@/utils/map/map_instance.js"

// ol
import { Overlay } from "ol"
import { transform } from 'ol/proj'

// vue
import { createApp, h } from 'vue'

// self components
import DistrictServiceDialog from '@/components/widgets/DistrictServiceDialog.vue'
import ElementPlus from 'element-plus'

// 行政区服务功能函数
export function district_service(keyword) {
    let url = `http://api.tianditu.gov.cn/v2/administrative?keyword=${keyword}&childLevel=${1}&extensions=true&tk=${tianditu_key}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let status = String(data["status"])
            // 状态值判断
            if (status === "200") {
                showDistricServiceDialog(data["data"])
            } else {
                let msg = data["msg"]
                alert(`错误: ${msg}`)
            }
        })
}

// 存储承载 DistricServiceDialog 空间的独立 Vue 应用实例对象
let currentApp = null

// 新建并打开行政区服务功能模态弹窗
function showDistricServiceDialog(data) {
    // 保证 currentApp 和 container 为空
    destroyDistricServiceDialog()

    const container = document.createElement('div')
    container.id = "district-dialog-container"
    document.body.appendChild(container)

    currentApp = createApp({
        render() {
            return h(DistrictServiceDialog, {
                data: data,
                onClose: () => {
                    destroyDistricServiceDialog()
                }
            })
        }
    })

    currentApp.use(ElementPlus)
    currentApp.mount(container)
}

// 关闭并销毁新增区服务功能模态弹窗
function destroyDistricServiceDialog() {
    if (currentApp) {
        currentApp.unmount()
        currentApp = null

        const container = document.getElementById("district-dialog-container")
        if (container) {
            container.remove()
        }
    }
}
