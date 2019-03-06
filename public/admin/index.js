//layui模块的定义
layui.define(["jquery", "element","layer"], function (exports) {

    var $ = layui.jquery;
    var element = layui.element;

    //触发事件
    var active = {
        tabAdd: function () {
            //新增一个Tab项
            element.tabAdd('demo', {
                title: '新选项' + (Math.random() * 1000 | 0) //用于演示
                , content: '内容' + (Math.random() * 1000 | 0)
                , id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
            })
        }
        , tabDelete: function (othis) {
            //删除指定Tab项
            element.tabDelete('demo', '44'); //删除：“商品管理”


            othis.addClass('layui-btn-disabled');
        }
        , tabChange: function () {
            //切换到指定Tab项
            element.tabChange('demo', '22'); //切换到：用户管理
        }
    };

    $('.site-demo-active').on('click', function () {
        var othis = $(this), type = othis.data('type');
        active[type] ? active[type].call(this, othis) : '';
    });

    //Hash地址的定位
    var layid = location.hash.replace(/^#test=/, '');
    element.tabChange('test', layid);

    element.on('tab(test)', function (elem) {
        location.hash = 'test=' + $(this).attr('lay-id');
    });

    //获取中间内容高度
    let mainHeight = $(document).height()  - $(".layui-header").height() - $(".layui-footer").height() - $(".layui-tab-title").height()-10
   

    $(".layui-nav-item dd").on("click","a",function(){
        var dataObj = JSON.parse($(this).attr("data_obj")) 
        if ($(".layui-tab-title li[lay-id="+ dataObj.meunId+"]").length>0){
            element.tabChange('demo', dataObj.meunId); 
        }else{
            element.tabAdd('demo', {
                title: dataObj.title//用于演示
                , content: '<iframe id="mainIframe" height="'+mainHeight+'px" width="100%" name="mainIframe" src="'+dataObj.url+'" frameborder="0" scrolling="no" ></iframe>'
                , id: dataObj.meunId //实际使用一般是规定好的id，这里以时间戳模拟下
            })
            element.tabChange('demo', dataObj.meunId); 
        }
    })

   //监听窗口大小变化，避免出现滚动条
    $(window).on("resize",function(){
        let mainHeight = $(document).height()  - $(".layui-header").height() - $(".layui-footer").height() - $(".layui-tab-title").height()-10
        $("iframe").height(mainHeight)
    })

   


    exports('index', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
}); 