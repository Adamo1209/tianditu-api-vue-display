// vue
import { createApp, h } from 'vue'

// self components
import DataDownloadDialog from '@/components/widgets/DataDownloadDialog.vue'
import ElementPlus from 'element-plus'

// self 
import { useServiceController } from "@/controller.js"

// 根据数据下载请求表单的内容生成下载链接
function generateDownloadLink(requestForm) {
    if (requestForm) {
        return `${useServiceController("data_download")}?&request=GetFeature&outputFormat=${requestForm.format}&TYPENAME=${requestForm.layer}`
    } else {
        return ""
    }
}

// 存储承载 DataDownloadDialog 空间的独立 Vue 应用实例对象
let currentApp = null

// 新建并打开数据下载模态弹窗
export function showDataDownloadDialog(requestForm) {
    // 保证 currentApp 和 container 为空
    destroyDataDownloadDialog()

    const container = document.createElement('div')
    container.id = "data-download-dialog-container"
    document.body.appendChild(container)

    currentApp = createApp({
        render() {
            return h(DataDownloadDialog, {
                requestForm: requestForm,
                downloadLink: generateDownloadLink(requestForm),
                onClose: () => {
                    destroyDataDownloadDialog()
                },
            })
        }
    })

    currentApp.use(ElementPlus)
    currentApp.mount(container)
}

// 关闭并销毁数据下载模态弹窗
function destroyDataDownloadDialog() {
    if (currentApp) {
        currentApp.unmount()
        currentApp = null

        const container = document.getElementById("data-download-dialog-container")
        if (container) {
            container.remove()
        }
    }
}