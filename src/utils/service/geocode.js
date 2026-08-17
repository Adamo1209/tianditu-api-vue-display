// self
import { tianditu_key } from "@/utils/init.js"
import { map_instance } from "@/utils/map/map_instance.js"
import { useServiceController } from "@/controller.js"

// ol
import { Overlay } from "ol"
import { transform } from 'ol/proj'

export function geocode(address_name) {
    let url = `${useServiceController("tianditu_api_geocode")}?ds={"keyWord":"${encodeURIComponent(address_name)}"}&tk=${tianditu_key}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let status = String(data["status"])
            // 状态值判断
            if (status === "0") {
                // 提取经纬度和关键字数据
                let lat = Number(data["location"]["lat"])
                let lon = Number(data["location"]["lon"])
                let keyWord = String(data["location"]["keyWord"])
                let level = String(data["location"]["level"])
                let score = String(data["location"]["score"])

                // 新建视觉弹窗元素对象
                let popup_element = document.createElement("div")
                popup_element.className = "geocode-ol-popup"

                // 新建叠层对象
                const popup = new Overlay({
                    position: transform([lon, lat], "EPSG:4326", "EPSG:900913"),
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
                    <h3 style="text-align:center">地理编码结果</h3>
                    <p>位置关键字：${keyWord}</p>
                    <p>纬度：${lat}</p>
                    <p>经度：${lon}</p>
                    <p>类别名称：${level || "空"}</p>
                    <p>准确率：${score || "空"}%</p>
                    <a id="search" href="https://bing.com/search?q=${encodeURIComponent(keyWord)}" target="_ blank">在必应上搜索${keyWord}</a>
                `
                popup_element.append(geocode_content)

                // 把弹窗添加到地图中，以叠层的形式
                map_instance.get().addOverlay(popup);
            } else if (status === "101") {
                alert(`查询结果为空`)
            } else {
                let msg = data["msg"]
                alert(`错误: ${msg}`)
            }
        })
}
