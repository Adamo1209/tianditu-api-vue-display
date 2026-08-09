<!-- TODO: 实现国际化，或者实现 web 前端资源化开发范式 -->

<template>
<el-menu
    :default-active="default_active"
    :collapse="true"
    @select="on_menu_item_select"
    style="height: 100vh;"
>
    <el-menu-item index="BaseMapTab">
        <el-icon><MapLocation /></el-icon>
        <template #title>地图</template>
    </el-menu-item>
    <el-menu-item index="ServiceTab">
        <el-icon><IconMenu /></el-icon>
        <template #title>服务</template>
    </el-menu-item>
    <el-menu-item index="AboutTab">
        <el-icon><Warning /></el-icon>
        <template #title>关于</template>
    </el-menu-item>
</el-menu>
</template>

<script setup>
// vue
import { ref } from 'vue'

// Element-plus UI Icon
import { Menu as IconMenu, MapLocation, Warning } from '@element-plus/icons-vue'

// self
import { fragment_tab } from "@/utils/init.js"

// 自定义组件 Props
defineProps(['default_active'])

// 菜单项选择事件
const on_menu_item_select = (index) => {
    console.log("index: " + index);
    fragment_tab.value = index
}

</script>
