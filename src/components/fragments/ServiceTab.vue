<template>
    <el-row :gutter="20" style="padding-inline: 20px; padding-block: 20px;">
        <el-col :span="12">
            <el-card style="height: 100%;">
                <template #header>
                    <p style="margin: 0;">天地图数据下载</p>
                </template>
                <DataRequestForm :request-form="requestForm" ref="data-request-form"/>
                <template #footer>
                    <el-button type="primary" @click="downloadEvent">下载</el-button>
                    <el-button type="danger" @click="clearRequestForm">清空</el-button>
                </template>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card style="height: 100%;">
                <template #header>
                    <p style="margin: 0;">天地图静态地图下载</p>
                </template>
                <StaticMapDownloadForm :request-form="staticMapRequestForm" ref="static-map-request-form"/>
                <template #footer>
                    <el-button type="primary" @click="">保存</el-button>
                    <el-button type="danger" @click="">清空</el-button>
                </template>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup>
// vue
import { ref, useTemplateRef } from "vue"

// element-plus
import { ElMessage } from 'element-plus'

// self components
import DataRequestForm from "@/components/widgets/DataRequestForm.vue"
import StaticMapDownloadForm from "@/components/widgets/StaticMapDownloadForm.vue"

// self
import { showDataDownloadDialog } from "@/utils/service/data_download.js"

// 请求表单数据结构 (天地图数据下载)
const requestForm = ref({
    type: "",
    layer: "",
    format: "",
})

// "清空" 按钮点击事件 (天地图数据下载)
function clearRequestForm() {
    requestForm.value["type"] = ""
    requestForm.value["layer"] = ""
    requestForm.value["format"] = ""
} 

// "下载" 按钮点击事件 (天地图数据下载)
const form = useTemplateRef("data-request-form")
function downloadEvent() {
    if (form?.value?.validate) {
        form.value.validate((valid, fields) => {
            if (valid) {
                showDataDownloadDialog(requestForm.value)
            } else {
                console.log(fields)
                ElMessage.warning(`请完善表单！`)
            }
        })
    } else {
        ElMessage.error("错误: 未找到表单控件")
    }
}

// 请求表单数据结构 (天地图静态地图下载)
const staticMapRequestForm = ref({
    width: "400",
    height: "300",
    center: {
        lon: "116.39127",
        lat: "39.90712",
    },
    zoom: 10,
    layer: "vec",
    note: true,
})

// "清空" 按钮点击事件 (天地图静态地图下载)

// "保存" 按钮点击事件 (天地图静态地图下载)

</script>