<template>
    <el-result style="width: 100%; height: 100%;">
        <template #icon>
            <el-image 
            :src="tiandituLogo" 
            style="width: 200px; height: 150px; margin-inline: 20px;" 
            :fit="fit"/>
            <el-image 
            :src="vue" 
            style="width: 150px; height: 150px; margin-inline: 20px;" 
            :fit="fit"/>
        </template>
        <template #title>
            <el-text tag="b" style="color: black; font-size: 28px;">
                基于<span style="color: #41b883; padding-inline: 10px;">Vue</span>框架的<span style="color: #e99415; padding-inline: 10px;">天地图</span>开发资源应用实践网站
            </el-text>
        </template>
        <template #sub-title>
            <el-link href="https://github.com/adamo1209" target="_blank" underline="never" style="font-size: 18px;">
                作者：Adamo1209
            </el-link>
        </template>
    </el-result>
</template>

<script setup>
// 导入天地图Logo矢量图 
import tiandituLogo from "@/assets/tianditu.svg"
// 导入Vue Logo
import vue from "@/assets/vue.png"

</script>