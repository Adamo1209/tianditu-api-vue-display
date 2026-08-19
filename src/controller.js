const proxyHttpToHttps = import.meta.env.VITE_HTTP_TO_HTTPS_PROXY || ""

const serviceController = {
    "vec_c.png": {
        "https": `${proxyHttpToHttps}/proxy/lbs.tianditu.gov.cn/images/vec_c.png`,
        "http": "http://lbs.tianditu.gov.cn/images/vec_c.png"
    },
    "img_c.png": {
        "https": `${proxyHttpToHttps}/proxy/lbs.tianditu.gov.cn/images/img_c.png`,
        "http": "http://lbs.tianditu.gov.cn/images/img_c.png"
    },
    "ter_c.png": {
        "https": `${proxyHttpToHttps}/proxy/lbs.tianditu.gov.cn/images/ter_c.png`,
        "http": "http://lbs.tianditu.gov.cn/images/ter_c.png"
    },
    "ele_c.jpg": {
        "https": `${proxyHttpToHttps}/proxy/lbs.tianditu.gov.cn/images/ele_c.jpg`,
        "http": "http://lbs.tianditu.gov.cn/images/ele_c.jpg"
    },
    "data_download": {
        "https": `${proxyHttpToHttps}/proxy/gisserver.tianditu.gov.cn/TDTService/wfs`,
        "http": "http://gisserver.tianditu.gov.cn/TDTService/wfs"
    },
    "tianditu_api_district_service": {
        "https": `${proxyHttpToHttps}/proxy/api.tianditu.gov.cn/v2/administrative`,
        "http": "http://api.tianditu.gov.cn/v2/administrative"
    },
    "tianditu_api_geocode": {
        "https": `${proxyHttpToHttps}/proxy/api.tianditu.gov.cn/geocoder`,
        "http": "http://api.tianditu.gov.cn/geocoder"
    },
}

export function useServiceController(serviceName) {
    if (location?.protocol === "https:") {
        return serviceController[serviceName]["https"]
    } else {
        return serviceController[serviceName]["http"]
    }
}