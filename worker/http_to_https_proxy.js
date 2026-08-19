// Cloudflare Worker 边缘网络计算 Serverless 函数
// 此 Serverless 函数功能：
// 实现 http 远程内容转变为 https 代理内容，
// 以应对网站中存在的远程 http 内容，无法在 https 部署下访问（内容混合安全问题）

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url)
        const pathname = url.pathname
        const search = url.search
        const method = request.method 

        // 约定的代理路由映射表
        const proxyRoutes = {
            "/proxy/lbs.tianditu.gov.cn/images/vec_c.png": "http://lbs.tianditu.gov.cn/images/vec_c.png",
            "/proxy/lbs.tianditu.gov.cn/images/img_c.png": "http://lbs.tianditu.gov.cn/images/img_c.png",
            "/proxy/lbs.tianditu.gov.cn/images/ter_c.png": "http://lbs.tianditu.gov.cn/images/ter_c.png",
            "/proxy/lbs.tianditu.gov.cn/images/ele_c.jpg": "http://lbs.tianditu.gov.cn/images/ele_c.jpg",
            "/proxy/gisserver.tianditu.gov.cn/TDTService/wfs": "http://gisserver.tianditu.gov.cn/TDTService/wfs",
            "/proxy/api.tianditu.gov.cn/v2/administrative": "http://api.tianditu.gov.cn/v2/administrative",
            "/proxy/api.tianditu.gov.cn/geocoder": "http://api.tianditu.gov.cn/geocoder",
        }

        // 匹配的路由
        const matchRoute = proxyRoutes[pathname] || null

        // 响应消息
        switch (method) {
            case "OPTIONS":
                return new Request(null, {
                    status: 204,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                        'Access-Control-Max-Age': '86400',
                    },
                })
                break
            case "GET":
                if (matchRoute) {
                    try {
                        // 发起代理请求消息头
                        const requestHeader = new Headers(request.headers)
                        requestHeader.set("Host", new URL(matchRoute).host)

                        // 发起代理请求
                        const response = await fetch(
                            matchRoute + search,
                            {
                                method: "GET",
                                headers: requestHeader,
                            }
                        )

                        // 响应消息头
                        const responseHeaders = new Headers(response.headers)
                        responseHeaders.set('Access-Control-Allow-Origin', '*')
                        responseHeaders.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
                        responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
                        
                        // 返回响应消息
                        return new Response(
                            response.body,
                            {
                                status: response.status,
                                statusText: response.statusText,
                                headers: responseHeaders,
                            }
                        )
                    } catch (error) {
                        return new Response(
                            "Proxy Error!", 
                            {
                                status: 502,
                                headers: {
                                    "Content-Type": "text/plain",
                                    "Access-Control-Allow-Origin": "*",
                                },
                            }
                        )
                    }
                } else {
                    return new Response(
                        "Not such proxy mapping!", 
                        {
                            status: 404,
                            headers: {
                                "Content-Type": "text/plain",
                                "Access-Control-Allow-Origin": "*",
                            },
                        }
                    )
                }
                break
            default:
                return new Response(
                    "Forbidden Request Method! Accept: GET, OPTIONS", 
                    {
                        status: 404,
                        headers: {
                            "Content-Type": "text/plain",
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                )
                break
        }
    }
}