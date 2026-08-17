// self
import { tianditu_key } from "@/utils/init.js"
import { map_instance } from "@/utils/map/map_instance.js"
import { useServiceController } from "@/controller.js"

// ol
import { Overlay } from "ol"
import { transform } from 'ol/proj'

export function reverse_geocode(latlng_info) {
    let lat = latlng_info["lat"]
    let lng = latlng_info["lng"]
    let url = `${useServiceController("tianditu_api_geocode")}?postStr={'lon':${lng},'lat':${lat},'ver':1}&type=geocode&tk=${tianditu_key}`
    if (lat && lng) {
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let status = String(data["status"])
            // 状态值判断
            if (status === "0") {
                // 提取逆地理编码结果数据
                let result = data["result"]
                // 提取格式化地址
                let formatted_address = String(result["formatted_address"])
                // 提取地址构成部件
                let addressComponent = result["addressComponent"]

                // 新建视觉弹窗元素对象
                let popup_element = document.createElement("div")
                popup_element.className = "geocode-ol-popup"

                // 新建叠层对象
                const popup = new Overlay({
                    position: transform([lng, lat], "EPSG:4326", "EPSG:900913"),
                    element: popup_element
                });
                
                // 弹窗关闭按钮
                let popup_close_element = document.createElement("a")
                popup_close_element.className = "geocode-ol-popup-closer"
                popup_close_element.addEventListener("click", function () {
                    popup.setPosition(undefined);
                    return false;
                })
                popup_element.append(popup_close_element)

                // 弹窗内容部分
                let geocode_content = document.createElement("div")
                geocode_content.innerHTML = `
                    <h3 style="text-align:center">逆地理编码结果</h3>
                    <p>详细地址：${formatted_address}</p>
                    <p>纬度：${lat}</p>
                    <p>经度：${lng}</p>
                    <p>更多信息：</p>
                    <p>国家：${addressComponent["nation"]}</p>
                    <p>省份：${addressComponent["province"]}（${addressComponent["province_code"]}）</p>
                    <p>地级市：${addressComponent["city"] || "空"}（${addressComponent["city_code"] || "空"}）</p>
                    <p>县区：${addressComponent["county"]}（${addressComponent["county_code"]}）</p>
                    <p>镇/街道：${addressComponent["town"]}（${addressComponent["town_code"]}）</p>
                    <p>最近地点信息：${addressComponent["address"]}（位于${addressComponent["address_position"]}, 距离${addressComponent["address_distance"]}米）</p>
                    <p>最近兴趣点信息：${addressComponent["poi"]}（位于${addressComponent["poi_position"]}, 距离${addressComponent["poi_distance"]}米）</p>
                    <p>最近道路信息：${addressComponent["road"]}（距离${addressComponent["road_distance"]}米）</p>
                `
                popup_element.append(geocode_content)

                // 把弹窗添加到地图中，以叠层的形式
                map_instance.get().addOverlay(popup);
            } else {
                let msg = data["msg"]
                alert(`错误: ${msg}`)
            }
        })
    } else {
        alert("请填写完整的经纬度坐标！")
    }
}