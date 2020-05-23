// 时间格式过滤器
let dateFilter = (input, format = "yyyy-MM-dd hh:mm:ss") => {
    if(!input){
        return false
    }
    if (typeof input === 'number' || typeof input === 'string') {
        input = new Date(input)
    }
    let o  = {
        "M+": input.getMonth() + 1, // 月份
        "d+": input.getDate(), // 日
        "h+": input.getHours(), // 小时
        "m+": input.getMinutes(), // 分
        "s+": input.getSeconds(), // 秒
        "q+": Math.floor((input.getMonth() + 3) / 3), // 季度
        'S': input.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (input.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    }
    // 不够2位的前面补0
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
            );
        }
    }
    return format;
};
export {
    dateFilter
}