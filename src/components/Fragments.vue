<template>
    <KeepAlive>
        <component :is="tab"/>
    </KeepAlive>
    
</template>

<script setup>
// self
import BaseMapTab from './fragments/BaseMapTab.vue'
import ServiceTab from './fragments/ServiceTab.vue'
import AboutTab from './fragments/AboutTab.vue'

// 自定义组件 Props
defineProps(['tab'])

</script>