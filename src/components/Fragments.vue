<template>
    <KeepAlive>
        <component :is="tab" style="height: 100%; overflow: auto;"/>
    </KeepAlive>
</template>

<script setup>
// self
import BaseMapTab from '@/components/fragments/BaseMapTab.vue'
import ServiceTab from '@/components/fragments/ServiceTab.vue'
import AboutTab from '@/components/fragments/AboutTab.vue'

// 自定义组件 Props
defineProps(['tab'])

</script>