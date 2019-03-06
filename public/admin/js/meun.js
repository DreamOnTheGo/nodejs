layui.define(['table'], function (exports){
    var table = layui.table;
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
            , { field: 'm_link', title: '菜单路径', width: 120 }
            , { field: 'm_status', title: '菜单状态', width: 120, templet: '#switchTpl', unresize: true}
            , { field: 'm_parent', title: '父级菜单', width: 120, sort: true }
            , { field: 'm_icon', title: '菜单图标', width: 210 }
            , { field: 'm_orderby', title: '菜单序号', width: 120 }
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
                layer.alert(JSON.stringify(data));
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：' + data.length + ' 个');
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选' : '未全选');
                break;
        };
    });

    //监听行工具事件
    table.on('tool(test)', function (obj) {
        var data = obj.data;
        //console.log(obj)
        if (obj.event === 'del') {
            layer.confirm('是否确认删除', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            layer.prompt({
                formType: 2
                , value: data.email
            }, function (value, index) {
                obj.update({
                    email: value
                });
                layer.close(index);
            });
        }
    });

    //监听性别操作
    form.on('switch(sexDemo)', function (obj) {
        layer.tips(this.value + ' ' + this.name + '：' + obj.elem.checked, obj.othis);
    });

    exports('meun', {}); //注意，这里是模块输出的核心，模块名必须和use时的模块名一致
})