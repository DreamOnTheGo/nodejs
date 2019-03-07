layui.define(['form', 'layedit', 'laydate', "jquery"], function (exports){

    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , $ = layui.jquery


    //监听指定开关
    var tem_m_status=0
    form.on('switch(switchTest)', function (data) {
        this.value=Number(this.checked)
        tem_m_status = this.value

    });

    //监听提交
    form.on('submit(demo2)', function (data) {
        
        data.field.m_status = tem_m_status
        
        $.ajax({
            url: "./addMeun",
            data: data.field,
            type: "post",
            dataType: "json"
        }).then(function (res) {
            if (res.status == 1) {
                layer.msg(res.msg,function(){
                    var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                    parent.layer.close(index);
                })
               
            } else {
                layer.msg(res.msg)


            }
        })

        return false;
    });

    //自定义验证规则
    form.verify({
        m_name: function (value) {
            if (value.length <= 0) {
                return '内容不能为空';
            }
        },
        m_number: function (value) {
            if (value.length <= 0) {
                return '内容不能为空';
            }
        },
        m_orderby: function (value) {
            if (value.length <= 0) {
                return '内容不能为空';
            }
        }
       
    });


    exports('addMeun', {});
})