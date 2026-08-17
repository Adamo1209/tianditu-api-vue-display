<template>
    <el-container>
        <el-aside width="auto">
            <CollapseSidePanel :default_active="default_active"/>
        </el-aside>
        <el-container style="scroll-behavior: auto;">
            <Fragments :tab="fragment_tab"/>
        </el-container>
    </el-container>
</template>

<script setup>
// self
import { default_active, fragment_tab } from "@/utils/init.js"

</script>