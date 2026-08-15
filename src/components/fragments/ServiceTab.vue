<template>
    <div style="width: 100%; height: 100%; padding-inline: 20px;">
        <el-row :gutter="20" style="height: 100%;">
            <el-col :span="12" style="padding-block: 20px;">
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
            <el-col :span="12" style="padding-block: 20px;">
                <el-card style="height: 100%;">
                    <template #header>
                        <p style="margin: 0;">天地图静态地图下载</p>
                    </template>
                    <el-empty description="开发中..." style="width: 100%; height: 100%;"/>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
// vue
import { ref, useTemplateRef } from "vue"

// element-plus
import { ElMessage } from 'element-plus'

// self components
import DataRequestForm from "@/components/widgets/DataRequestForm.vue"

// self
import { showDataDownloadDialog } from "@/utils/service/data_download.js"

// 请求表单数据结构
const requestForm = ref({
    type: "",
    layer: "",
    format: "",
})

// "清空" 按钮点击事件
function clearRequestForm() {
    requestForm.value["type"] = ""
    requestForm.value["layer"] = ""
    requestForm.value["format"] = ""
} 

// "下载"按钮点击事件
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

</script>