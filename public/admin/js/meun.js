layui.define(['table', "jquery",], function (exports){
    var table = layui.table, form = layui.form, $ = layui.jquery;

    table.render({
        elem: '#test'
        , url: './getmeun'
        , toolbar: '#toolbarDemo'
        , method:"post"
        , title: '用户数据表'
        , cols: [[
            { type: 'checkbox', fixed: 'left' }
            , { field: 'm_id', title: 'ID', width: 80, fixed: 'left', unresize: true, sort: true }
            , { field: 'm_name', title: '菜单名称', width: 120, edit: 'text' }
            , { field: 'm_number', title: '菜单编号', width: 120, edit: 'text', sort: true }
            , { field: 'm_link', title: '菜单路径', edit: 'text',width: 120 }
            , { field: 'm_status', title: '菜单状态', width: 120, templet: '#checkboxTpl', unresize: true}
            , { field: 'm_parent', title: '父级菜单', edit: 'text', width: 120, sort: true }
            , { field: 'm_icon', title: '菜单图标', edit: 'text',width: 210 }
            , { field: 'm_orderby', title: '菜单序号', edit: 'text', width: 120 }
            , { fixed: 'right', title: '操作', toolbar: '#barDemo', width: 150 }
        ]]
        , page: true
    });

    //头工具栏事件
    table.on('toolbar(test)', function (obj) {
        var checkStatus = table.checkStatus(obj.config.id);
        switch (obj.event) {
            case 'getCheckData':
                var data = checkStatus.data;
                // layer.alert(JSON.stringify(data));
                layer.open({
                    type: 2,
                    title: '菜单添加',
                    shadeClose: true,
                    shade: 0.8,
                    area: ['500px', '90%'],
                    content: "./addMeun" //iframe的url
                }); 
                break;
            
        };
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) {
        var data = obj.data;

        if (obj.event === 'del') {
            layer.confirm('是否确认删除', function (index) {

               $.ajax({
                   url:"./deleteByMeunId",
                   data: { mId: obj.data.m_id},
                   type:"post",
                   dataType:"json"
               }).then(function(res){
                     if(res.status==1){
                         obj.del();
                         layer.close(index);
                     }
               })
                
            });
        } 
    });

    

    //监听单元格编辑
    table.on('edit(test)', function (obj) {
        //obj.value  得到修改后的值
        //obj.data 得到所在行所有键值
        //obj.field 得到字段
        
      
        console.log(obj.data)
        $.ajax({
            url: "./editByMeun",
            data: obj.data,
            type: "post",
            dataType: "json"
        }).then(function (res) {
            if(res.status==1){
                layer.msg(res.msg)
            }else{
                layer.msg(res.msg)
              
                
            }
        })

        // var value = obj.value //得到修改后的值
        //     , data = obj.data //得到所在行所有键值
        //     , field = obj.field; //得到字段
        // layer.msg('[ID: ' + data.m_id + '] ' + field + ' 字段更改为：' + value);
      
    });

    //监听锁定操作
    form.on('checkbox(lockDemo)', function (obj) {
        $.ajax({
            url: "./editBysStatus",
            data: { mId: this.value, status: Number(obj.elem.checked) },
            type: "post",
            dataType: "json"
        }).then(function (res) {
            if (res.status == 1) {
                layer.msg(res.msg)
            } else {
                layer.msg(res.msg)


            }
        })
        
    });

    exports('meun', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})