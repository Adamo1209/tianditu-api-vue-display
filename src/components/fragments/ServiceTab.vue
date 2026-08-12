<template>
    <div style="width: 100%; height: 100%; padding-inline: 20px;">
        <el-row :gutter="20" style="height: 100%;">
            <el-col :span="12" style="padding-block: 20px;">
                <el-card style="height: 100%;">
                    <template #header>
                        <p style="margin: 0;">天地图数据请求表单</p>
                    </template>
                    <DataRequestForm :request-form="requestForm"/>
                    <template #footer>
                        <el-button type="primary">提交</el-button>
                        <el-button type="danger" @click="clearRequestForm">清空</el-button>
                    </template>
                </el-card>
            </el-col>
            <el-col :span="12" style="padding-block: 20px;">
                <el-card style="height: 100%;">
                    <template #header>
                        <p style="margin: 0;">【说明】天地图数据请求表单</p>
                    </template>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
// vue
import { ref } from "vue"

// self components
import DataRequestForm from "@/components/widgets/DataRequestForm.vue"

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

</script>