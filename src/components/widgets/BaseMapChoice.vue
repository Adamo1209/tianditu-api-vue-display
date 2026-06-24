<template>
    <el-card style="max-width: 500px" 
             class="basemap-card" 
             :class="{ 'is-selected': modelValue === 'tianditu_vector' }" 
             @click="handleSelect('tianditu_vector')">
        <el-row :gutter="25" justify="center">
            <el-col :span="10">
                <img
                    src="http://lbs.tianditu.gov.cn/images/vec_c.png"
                    style="width: 100%; height: 100%;"/>
            </el-col>
            <el-col :span="14">
                <el-row>
                    <p><b>天地图矢量底图</b></p>
                </el-row>
                <el-row>
                    <el-checkbox 
                        label="注记图层" 
                        size="large" 
                        v-model="tianditu_vector_a"
                        @click.stop/>
                </el-row>
                <el-row>
                    <el-checkbox 
                        label="全球境界" 
                        size="large" 
                        v-model="tianditu_vector_g"
                        @click.stop/>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
    <el-card style="max-width: 500px" 
             class="basemap-card" 
             :class="{ 'is-selected': modelValue === 'tianditu_image' }" 
             @click="handleSelect('tianditu_image')">
        <el-row :gutter="25" justify="center">
            <el-col :span="10">
                <img
                    src="http://lbs.tianditu.gov.cn/images/img_c.png"
                    style="width: 100%; height: 100%;"/>
            </el-col>
            <el-col :span="14">
                <el-row>
                    <p><b>天地图影像底图</b></p>
                </el-row>
                <el-row>
                    <el-checkbox 
                        label="注记图层" 
                        size="large" 
                        v-model="tianditu_image_a"
                        @click.stop/>
                </el-row>
                <el-row>
                    <el-checkbox 
                        label="全球境界" 
                        size="large" 
                        v-model="tianditu_image_g"
                        @click.stop/>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
    <el-card style="max-width: 500px" 
             class="basemap-card" 
             :class="{ 'is-selected': modelValue === 'tianditu_terrian' }" 
             @click="handleSelect('tianditu_terrian')">
        <el-row :gutter="25" justify="center">
            <el-col :span="10">
                <img
                    src="http://lbs.tianditu.gov.cn/images/ter_c.png"
                    style="width: 100%; height: 100%;"/>
            </el-col>
            <el-col :span="14">
                <el-row>
                    <p><b>天地图地形底图</b></p>
                </el-row>
                <el-row>
                    <el-checkbox 
                        label="注记图层" 
                        size="large" 
                        v-model="tianditu_terrian_a" 
                        @click.stop/>
                </el-row>
                <el-row>
                    <el-checkbox 
                        label="全球境界" 
                        size="large" 
                        v-model="tianditu_terrian_g" 
                        @click.stop/>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
    <el-card style="max-width: 500px" 
             class="basemap-card" 
             :class="{ 'is-selected': modelValue === 'tianditu_3d' }" 
             @click="handleSelect('tianditu_3d')">
        <el-row :gutter="25" justify="center">
            <el-col :span="10">
                <img
                    src="http://lbs.tianditu.gov.cn/images/ele_c.jpg"
                    style="width: 100%; height: 100%;"/>
            </el-col>
            <el-col :span="14">
                <el-row>
                    <p><b>天地图三维地形<br>（未实现）</b></p>
                </el-row>
                <el-row>
                    <el-checkbox 
                        label="注记图层" 
                        size="large" 
                        v-model="tianditu_3d_a" 
                        @click.stop/>
                </el-row>
                <el-row>
                    <el-checkbox 
                        label="全球境界" 
                        size="large" 
                        v-model="tianditu_3d_g" 
                        @click.stop/>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script setup>
// vue
import { ref, watch } from "vue"
import { switch_annotation_global_visual } from "../../utils/map/basemap_layer.js"

// 自定义 Props
defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

// update:modelValue 更新事件
const emit = defineEmits(['update:modelValue'])
const handleSelect = (value) => {
    emit('update:modelValue', value)
}

// 各底图的 checkbox
const tianditu_vector_a = ref(true)
const tianditu_vector_g = ref(false)
const tianditu_image_a = ref(true)
const tianditu_image_g = ref(false)
const tianditu_terrian_a = ref(true)
const tianditu_terrian_g = ref(false)
const tianditu_3d_a = ref(true)
const tianditu_3d_g = ref(false)

// 控制 注记图层、全球境界 切换显示
watch([tianditu_vector_a, tianditu_vector_g], ([newAnno, newGlobal]) => {
    switch_annotation_global_visual("tianditu_vector", newAnno, newGlobal)
})
watch([tianditu_image_a, tianditu_image_g], ([newAnno, newGlobal]) => {
    switch_annotation_global_visual("tianditu_image", newAnno, newGlobal)
})
watch([tianditu_terrian_a, tianditu_terrian_g], ([newAnno, newGlobal]) => {
    switch_annotation_global_visual("tianditu_terrian", newAnno, newGlobal)
})
watch([tianditu_3d_a, tianditu_3d_g], ([newAnno, newGlobal]) => {
    switch_annotation_global_visual("tianditu_3d", newAnno, newGlobal)
})

</script>

<style>
.basemap-card {
    margin-bottom: 12px;
}

.basemap-card:hover {
    border-color: rgb(115, 118, 122);
    border-width: 3px;
}

.is-selected {
  border-color: rgb(121, 187, 255);
  background-color: rgb(236, 245, 255);
}

img {
    border: black 1px solid;
}

</style>