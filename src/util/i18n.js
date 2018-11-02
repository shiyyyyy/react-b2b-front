const _i18n = {
    lang: 0,
    c: {
        //菜单
        'HOME': ['首页', 'Home'],
        'LOGOUT': ['退出', 'Logout'],
        'ACTION': ['操作', 'Action'],
        //通用
        'ERR_REQ': ['请求失败', 'Request Failed'],
        'ERR_SYS': ['系统错误', 'System Error'],
        'ERR_NW': ['网络连接失败', 'network connect failed'],
        'ERROR': ['错误', 'Error '],
        'PROMPT': ['系统提示', 'Prompt'],
        'OK': ['确定', 'OK'],
        'CANCEL': ['取消', 'cancel'],

        'SAVE': ['保存', 'Save'],
        'MORE': ['更多', 'More'],
    }
}

export const i18n = {

    get: (code) => {
        return _i18n.c[code][_i18n.lang];
    },

    pick: (str) => {
        let arr = str.split('$$');
        if (arr.length > 1) {
            return arr[_i18n.lang];
        }
        return str;
    }

}