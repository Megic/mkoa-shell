//参数配置
module.exports = {
    externals: {//一些全局引用
        "avalon": "avalon",
        "zepto":"Zepto",
        "$":"jQuery",
        "webuploader":"WebUploader",
        "seadragon":"OpenSeadragon",
        "swiper":"Swiper",
        "jspdf":"jsPDF",
        "html2canvas":"html2canvas",
        "iscroll":"IScroll",
        //  影像插件相关
        'cornerstone':'cornerstone',
        'cornerstoneTools':'cornerstoneTools',
        'cornerstoneWADOImageLoader':'cornerstoneWADOImageLoader',
        'dicomParser':'dicomParser',
        'cornerstoneMath':'cornerstoneMath',
        'hammer':'Hammer'
    },alias: {
        '$msg':'msg/index'
        ,'$V':'$V'
        ,'$router':'router/mmRouter'
        ,'$upload':'upload/index'
        ,'layer': 'layer/layer'
        ,'$date':'date/jquery.cxcalendar'
        ,'$tree':'tree/jquery.ztree.core.min'
        ,'$treeCheck':'tree/jquery.ztree.excheck.min'
        ,'$viewer':'viewer/viewer.min'
        ,'$F':'$F'
        ,'$pager':'pager/mkoaPager'
    }
};
