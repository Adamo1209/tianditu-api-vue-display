<template>
    <el-dialog
        v-model="visible"
        title="数据下载"
        width="60vw"
        :before-close="handleClose"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        align-center >
            <div>
                <el-text size="large">数据下载已启动，如果浏览器未自动启动下载任务，请手动点击
                    <a 
                        target="_blank"
                        rel="noreferrer"
                        :href="props.downloadLink" >
                        <el-text type="primary" size="large">链接</el-text>
                    </a>
                </el-text>
            </div>
            <p>
                <el-text size="large">当前下载数据：{{ props.requestForm.layer }}</el-text>
                <el-text size="large">（下载格式：{{ props.requestForm.format }}）</el-text>
            </p>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleClose">关闭</el-button>
                </div>
            </template>
    </el-dialog>
</template>

<script setup>
// vue
import { ref, onMounted } from 'vue'

// 定义组件 Props
const props = defineProps({
    // 传入组件的数据对象
    requestForm: {
        type: Object,
        default: () => ({})
    },
    downloadLink: {
        type: String,
        default: ""
    },
})

// 定义组件 Emits
const emit = defineEmits(["close"])

// 组件域状态存储
const visible = ref(true)

// 模态对话框关闭后发送 close 事件消息
const handleClose = () => {
    visible.value = false
    emit("close")
}

// 当模态窗开启后
onMounted(() => {
    const a = document.createElement('a')
    a.href = props.downloadLink
    a.target = "_blank"
    a.rel = "noreferrer"
    a.click()
})

</script>