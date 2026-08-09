<template>
    <el-dialog
        v-model="visible"
        :title="title"
        width="60vw"
        :before-close="handleClose" 
        align-center>
        <div v-if="districtData.length > 0">
            <el-descriptions
                column="2"
                size="large"
                border >
                <el-descriptions-item>
                    <template #label>
                        行政区名称
                    </template>
                    {{ currentDistrictData.name ?? "未知" }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        行政区编码
                    </template>
                    {{ currentDistrictData.gb ?? "未知" }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        中心点坐标
                    </template>
                    纬度：{{ currentDistrictData.center?.lat ?? "未知" }} ；经度：{{ currentDistrictData.center?.lng ?? "未知" }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <el-tooltip 
                            placement="bottom"
                            effect="light">
                            <template #content>
                                <p style="margin: 0;">行政区划级别：</p>
                                <p style="margin: 0;">国家级：5</p>
                                <p style="margin: 0;">省级：4</p>   
                                <p style="margin: 0;">市级：3</p>  
                                <p style="margin: 0;">区县级：2</p>  
                            </template>
                            行政区划级别
                        </el-tooltip>
                    </template>
                    {{ currentDistrictData.level ?? "未知" }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        上级行政区编码
                    </template>
                    {{ currentDistrictData.pgb ?? "未知" }}
                </el-descriptions-item>
            </el-descriptions>
            <div>
                <p style="margin-bottom: 10px; margin-top: 20px;">下级行政区划信息：</p>
                <el-table 
                    :data="currentChildrenData" 
                    height="250" 
                    style="width: 100%" 
                    border 
                    max-height="50vh"
                    empty-text="无数据">
                    <el-table-column prop="name" label="行政区名称" />
                    <el-table-column prop="gb" label="行政区编码" />
                    <el-table-column label="中心点坐标">
                        <el-table-column prop="center.lat" label="纬度" />
                        <el-table-column prop="center.lng" label="经度" />
                    </el-table-column>
                    <el-table-column prop="level">
                        <template #header>
                            <el-tooltip 
                                placement="left"
                                effect="light">
                                <template #content>
                                    <p style="margin: 0;">行政区划级别：</p>
                                    <p style="margin: 0;">国家级：5</p>
                                    <p style="margin: 0;">省级：4</p>   
                                    <p style="margin: 0;">市级：3</p>  
                                    <p style="margin: 0;">区县级：2</p>  
                                </template>
                                行政区划级别
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div v-else>
            <el-result title="无查询结果"/>
            <template v-if="suggestionData.length > 0">
                    <p style="margin-bottom: 10px; margin-top: 20px;">建议搜索：</p>
                    <el-table 
                        :data="suggestionData" 
                        height="250" 
                        style="width: 100%" 
                        border 
                        max-height="50vh"
                        empty-text="无数据">
                        <el-table-column prop="name" label="行政区名称" />
                        <el-table-column prop="gb" label="行政区编码" />
                    </el-table>
            </template>
        </div>
        <template #footer>
            <el-row>
                <el-col :span="12">
                    <el-pagination 
                        background 
                        layout="prev, pager, next" 
                        :total="districtData.length" 
                        :page-size="1"
                        v-model:current-page="current_page" 
                        v-if="districtData.length > 0"/>
                </el-col>
                <el-col :span="12">
                    <el-button 
                        type="primary" 
                        v-if="districtData.length > 0" 
                        @click="downloadBoundary">
                        下载矢量轮廓数据 (txt)
                    </el-button>
                    <el-button type="primary" @click="handleClose">关闭</el-button>
                </el-col>
            </el-row>
        </template>
    </el-dialog>
</template>

<script setup>
// vue
import { ref, computed } from 'vue'

// 定义组件 Props
const props = defineProps({
    // 传入组件的数据对象
    data: {
        type: Object,
        default: () => ({})
    }
})

// 定义组件 Emits
const emit = defineEmits(["close"])

// 组件域状态存储
const visible = ref(true)
const data = ref(props.data)
const current_page = ref(1)

// 模态对话框关闭后发送 close 事件消息
const handleClose = () => {
    visible.value = false
    emit("close")
}

// 提取行政区搜索结果列表
const districtData = computed({
    get() {
        if (props.data["district"]) {
            return props.data["district"]
        } else {
            return []
        }
    }
})

// 提取当前页的行政区搜索结果
const currentDistrictData = computed({
    get() {
        if (districtData.value.length > 0) {
            return districtData.value[(current_page.value - 1)]
        } else {
            return {}
        }
    }
})

// 动态弹窗标题
const title = computed({
    get() {
        if (districtData.value.length > 0) {
            return ("行政区划服务查询结果" + `（${current_page.value}/${districtData.value.length}）`)
        } else {
            return ("行政区划服务查询结果" + "（无结果）")
        }
    }
})

// 提取当前页的行政区搜索结果的下级行政区信息
const currentChildrenData = computed({
    get() {
        if ((currentDistrictData.value != {}) && (currentDistrictData.value)) {
            return currentDistrictData.value["children"]
        } else {
            return []
        }
    }
})

// 提取行政区搜索建议列表
const suggestionData = computed({
    get() {
        if (props.data["suggestion"]) {
            return props.data["suggestion"]
        } else {
            return []
        }
    }
})

// 按钮点击事件: 下载当前页的行政区的轮廓数据（geojson）
function downloadBoundary() {
    if (currentDistrictData.value["boundary"]) {
        // 创建文件下载连接
        const blob = new Blob([currentDistrictData.value["boundary"]], {type: "application/json"})
        const url = URL.createObjectURL(blob)

        // 创建非显示链接 DOM 对象并触发点击事件
        const linkDom = document.createElement('a')
        linkDom.href = url
        linkDom.download = `${currentDistrictData.value["name"]}_轮廓.txt`
        linkDom.click()
        
        // 清理文件下载连接
        URL.revokeObjectURL(url)
    }
}

</script>