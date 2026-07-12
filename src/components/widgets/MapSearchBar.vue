<template>
    <el-row gutter="10" style="width: 430px;">
        <el-col :span="8">
            <el-select v-model="select" placeholder="Select" size="large">
                <el-option label="<请选择>" value="select" />
                <el-option label="地理编码" value="geocode" />
                <el-option label="逆地理编码" value="reverse_geocode" />
            </el-select>
        </el-col>
        <el-col :span="16">
            <div v-if="select === 'geocode'">
                <el-input v-model="address_name" placeholder="输入地址名称" size="large">
                    <template #append>
                        <el-button type="primary" @click="geocode(address_name)">
                            查询
                        </el-button>
                    </template>
                </el-input>
            </div>
            <div v-if="select === 'reverse_geocode'">
                <el-form :inline="true" :model="latlng_info" size="large">
                    <el-form-item label="纬度">
                        <el-input v-model="latlng_info.lat" placeholder="lat" clearable style="width: 100px;"/>
                    </el-form-item>
                    <el-form-item label="经度">
                        <el-input v-model="latlng_info.lng" placeholder="lng" clearable style="width: 100px;"/>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="reverse_geocode(latlng_info)">
                            查询
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else>
                
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
// vue
import { ref, reactive, onMounted } from 'vue'

// self
import { geocode } from "../../utils/server/geocode.js"
import { reverse_geocode } from "../../utils/server/reverse_geocode.js"

let select = ref("select")
let address_name = ref("")
let latlng_info = reactive({lat: null, lng: null})

</script>

<style>
.geocode-ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0px 1px 4px rgba(0,0,0,0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    min-width: 280px;
}

.geocode-ol-popup h3 {
    margin-top: 5px;
}

.geocode-ol-popup p {
    margin-block: 5px;
}

.geocode-ol-popup #search {
    color: #0067C0;
    font-size: 13px;
    
}

.geocode-ol-popup:after, .geocode-ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
}
.geocode-ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}
.geocode-ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}
.geocode-ol-popup-closer {
    position: absolute;
    top: 5px;
    right: 10px;
}
.geocode-ol-popup-closer:after {
    content: "✖";
}
</style>