<template>
    <el-container style="height: 100vh; width:100vw; overflow: hidden;">
        <el-aside width="auto">
            <CollapseSidePanel :default_active="default_active"/>
        </el-aside>
        <el-container>
            <Fragments :tab="fragment_tab"/>
        </el-container>
    </el-container>
</template>

<script setup>
// self
import { default_active, fragment_tab } from "@/utils/init.js"

</script>