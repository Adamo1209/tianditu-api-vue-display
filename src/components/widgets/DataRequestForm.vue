<template>
    <el-form 
        ref="data-request-form"
        :model="props.requestForm" 
        :rules="rules"
        style="min-width: 270px; max-width: 300px;">
        <el-form-item label="要素分类" style="min-width: 270px; max-width: 300px;" prop="type">
            <el-select
                v-model="props.requestForm.type"
                placeholder="要素分类"
                size="large"
                clearable>
                <el-option 
                    v-for="item in dataOptions"
                    :label="item.label" 
                    :value="item.value" />
            </el-select>
        </el-form-item> 
        <el-form-item label="数据图层" style="min-width: 270px; max-width: 300px;" prop="layer">
            <el-select
                v-model="props.requestForm.layer"
                placeholder="数据图层"
                size="large"
                no-data-text="请先选择【要素分类】"
                clearable>
                <el-option 
                    v-for="item in (dataOptions.filter(i => i.value == props.requestForm.type)[0]?.layers)"
                    :label="item.label" 
                    :value="item.value" />
            </el-select>
        </el-form-item> 
        <el-form-item label="数据格式" style="min-width: 270px; max-width: 300px;" prop="format">
            <el-select
                v-model="props.requestForm.format"
                placeholder="数据格式"
                size="large"
                clearable>
                <el-option 
                    v-for="item in formatOptions"
                    :label="item.label" 
                    :value="item.value" />
            </el-select>
        </el-form-item> 
    </el-form>
</template>

<script setup>
// vue
import { useTemplateRef } from 'vue'

// 自定义组件 Props
const props = defineProps({
    // 传入组件的表单数据对象
    requestForm: {
        type: Object,
        default: () => ({
            type: "",
            layer: "",
            format: "",
        }),
    },
})

// 表单选择器的选项关系结构 (要素分类与数据图层)
const dataOptions = [
    {
        label: "地名及注记（A）",
        value: "A",
        layers: [
            {label: "自然地名点（AANP）", value: "TDTService:AANP"},
            {label: "居民地地名点（AGNP）", value: "TDTService:AGNP"},
        ],
    },
    {
        label: "境界与政区（B）",
        value: "B",
        layers: [
            {label: "行政境界面（BOUA）", value: "TDTService:BOUA"},
            {label: "行政境界线（BOUL）", value: "TDTService:BOUL"},
        ],
    },
    {
        label: "交通（L）",
        value: "L",
        layers: [
            {label: "公路线（LRDL）", value: "TDTService:LRDL"},
            {label: "铁路线（LRRL）", value: "TDTService:LRRL"},
        ],
    },
    {
        label: "居民地及设施（R）",
        value: "R",
        layers: [
            {label: "居民地面（RESA）", value: "TDTService:RESA"},
            {label: "居民地点（RESP）", value: "TDTService:RESP"},
        ],
    },
    {
        label: "水系（H）",
        value: "H",
        layers: [
            {label: "水系面（HYDA）", value: "TDTService:HYDA"},
            {label: "水系线（HYDL）", value: "TDTService:HYDL"},
        ],
    },
]

// 表单选择器的选项关系结构 (数据格式)
const formatOptions = [
    {label: "GML3", value:"GML3"},
    {label: "GML2", value:"GML2"},
    {label: "Google KML", value:"KML"},
    {label: "ESRI Shapefile", value:"SHAPE-ZIP"},
    {label: "GeoJSON", value:"json"},
    {label: "CSV属性表", value:"csv"},
]

// 前端表单验证规则
const rules = {
    type: [
        {required: true, message: "请选择【要素分类】", trigger: 'blur'},
    ],
    layer: [
        {required: true, message: "请选择【数据图层】", trigger: 'blur'},
    ],
    format: [
        {required: true, message: "请选择【数据格式】", trigger: 'blur'},
    ],
}

// 暴露表单子组件的验证方法给上级组件
const dataRequestForm = useTemplateRef("data-request-form")
defineExpose({
    validate: (callback) => dataRequestForm.value?.validate(callback),
    resetFields: () => dataRequestForm.value?.resetFields(),
})

</script>