<template>
    <el-row>
        <el-form :inline="true" :model="props.requestForm" size="large" :rules="rules" ref="static-map-request-form">
            <el-form-item label="图片宽度" style="min-width: 160px; max-width: 240px;" prop="width">
                <el-input v-model="props.requestForm.width" placeholder="400" clearable />
            </el-form-item>
            <el-form-item label="图片高度" style="min-width: 160px; max-width: 240px;" prop="height">
                <el-input v-model="props.requestForm.height" placeholder="300" clearable />
            </el-form-item>
            <el-form-item label="中心纬度" style="min-width: 160px; max-width: 240px;" prop="centerLat">
                <el-input v-model="props.requestForm.centerLat" placeholder="39.90712" clearable />
            </el-form-item>
            <el-form-item label="中心经度" style="min-width: 160px; max-width: 240px;" prop="centerLon">
                <el-input v-model="props.requestForm.centerLon" placeholder="116.39127" clearable />
            </el-form-item>
            <el-form-item label="地图级别" style="min-width: 160px; max-width: 240px;">
                <el-slider v-model="props.requestForm.zoom" :max="18" :min="3" placement="bottom" style="width: 240px;"/>
            </el-form-item>
            <el-form-item label="地图图层" style="width: 240px;">
                <el-row :gutter="0" style="width: 100%;">
                    <el-col :span="18">
                        <el-select
                            v-model="props.requestForm.layer"
                            placeholder="地图图层"
                            size="large"
                            style="width: 100%;">
                            <el-option label="矢量图层" value="vec" />
                            <el-option label="影像图层" value="img" />
                            <el-option label="地形图层" value="ter" />
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-tooltip content="注记开关" placement="bottom" effect="light">
                             <el-switch v-model="props.requestForm.note" size="large" style="margin-inline: 20px;"/>
                        </el-tooltip>
                    </el-col>
                </el-row>
            </el-form-item> 
        </el-form>
    </el-row>
    <el-row>
        <el-image :src="imageUrl" fit="scale-down" style="width: 100%; height: 320px; margin-top: 20px; border: 1px solid grey; padding: 10px;">
            <template #error>
                <el-result title="图片加载失败" style="width: 100%; height: 100%;">
                    <template #icon>
                        <el-icon style="font-size: 36px;"><icon-picture /></el-icon>
                    </template>
                </el-result>
            </template>
            <template #placeholder>
                <el-result title="图片正在加载..." style="width: 100%; height: 100%;">
                    <template #icon>
                        <el-icon style="font-size: 36px;"><Loading /></el-icon>
                    </template>
                </el-result>
            </template>
        </el-image>
    </el-row>
</template>

<script setup>
// vue
import { computed, useTemplateRef } from 'vue'

// element-plus
import { Picture as IconPicture, Loading } from '@element-plus/icons-vue'

// self
import { tianditu_key } from "@/utils/init.js"

// 自定义组件 Props
const props = defineProps({
    // 传入组件的表单数据对象
    requestForm: {
        type: Object,
        default: () => ({
            width: "400",
            height: "300",
            centerLon: "116.39127",
            centerLat: "39.90712",
            zoom: 10,
            layer: "vec",
            note: true,
        }),
    },
})

// 计算属性: 静态地图图片获取URL
const imageUrl = computed({
    get() {
        let templateUrl = `http://api.tianditu.gov.cn/staticimage?center=${props.requestForm.centerLon ?? "116.39127"},${props.requestForm.centerLat ?? "39.90712"}&width=${props.requestForm.width ?? "400"}&height=${props.requestForm.height ?? "300"}&zoom=${props.requestForm.zoom}&layers=${layer.value}&tk=${tianditu_key}`
        return templateUrl
    }
})

// 计算属性: 根据表单计算最终地图图层的标识符
const layer = computed({
    get() {
        if (props.requestForm.note) {
            switch (props.requestForm.layer) {
                case "vec":
                    return "vec_c,cva_c"
                    break;
                case "img":
                    return "img_c,cva_c"
                    break
                case "ter":
                    return "ter_c,cta_c"
                    break
                default:
                    return ""
            }
        } else {
            switch (props.requestForm.layer) {
                case "vec":
                    return "vec_c"
                    break;
                case "img":
                    return "img_c"
                    break
                case "ter":
                    return "ter_c"
                    break
                default:
                    return ""
            }
        }
    }
})

// 前端表单验证检查
const rules = {
    width: [
        {validator: validatePictureSize, message: "取值范围: [1, 1024]", trigger: 'change'},
    ],
    height: [
        {validator: validatePictureSize, message: "取值范围: [1, 1024]", trigger: 'change'},
    ],
    centerLon: [
        {validator: validateLontitude, message: "经度取值范围: [-180, 180]", trigger: 'change'},
    ],
    centerLat: [
        {validator: validateLatitude, message: "纬度取值范围: [-90, 90]", trigger: 'change'},
    ],
}

// 图片宽度值与高度值验证函数
function validatePictureSize(rule, value, callback) {
    if (value !== "") {
        let strNumberValue = String(Number(value))
        if (strNumberValue === "NaN") {
            return callback(new Error(rule.message))
        } else if (strNumberValue.includes(".") || strNumberValue.includes("-")) {
            return callback(new Error(rule.message))
        } else {
            if (!((Number(value) >= 1) && (Number(value) <= 1024))) {
                return callback(new Error(rule.message))
            }
        }
    }
}

// 经度验证函数
function validateLontitude(rule, value, callback) {
    if (value !== "") {
        let strNumberValue = String(Number(value))
        if (strNumberValue === "NaN") {
            return callback(new Error(rule.message))
        } else {
            if (!((Number(value) >= -180) && (Number(value) <= 180))) {
                return callback(new Error(rule.message))
            }
        }
    }
}

// 纬度验证函数
function validateLatitude(rule, value, callback) {
    if (value !== "") {
        let strNumberValue = String(Number(value))
        if (strNumberValue === "NaN") {
            return callback(new Error(rule.message))
        } else {
            if (!((Number(value) >= -90) && (Number(value) <= 90))) {
                return callback(new Error(rule.message))
            }
        }
    }
}

// 暴露表单子组件的验证方法给上级组件
const form = useTemplateRef("static-map-request-form")
defineExpose({
    resetFields: () => form.value?.resetFields(),
    staticMapLink: imageUrl.value,
})

</script>