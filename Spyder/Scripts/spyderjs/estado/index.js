
$(function () {
    var localData = [
{ 'id': 1, 'sigla': 'SP', 'descricao': 'São Paulo' },
{ 'id': 2, 'sigla': 'RJ', 'descricao': 'Rio de Janeiro' },
{ 'id': 3, 'sigla': 'PB', 'descricao': 'Paraiba' },
{ 'id': 4, 'sigla': 'PE', 'descricao': 'Pernambudo' },
{ 'id': 5, 'sigla': 'AM', 'descricao': 'Amazonas' },
{ 'id': 6, 'sigla': 'MA', 'descricao': 'Maranhão' },
{ 'id': 7, 'sigla': 'CE', 'descricao': 'Ceará' },
{ 'id': 8, 'sigla': 'RS', 'descricao': 'Rio Grande do Sul' },
{ 'id': 9, 'sigla': 'RN', 'descricao': 'Rio Grande do Norte' },
{ 'id': 10, 'sigla': 'PA', 'descricao': 'Pará' },
{ 'id': 11, 'sigla': 'PR', 'descricao': 'Paraná' },
{ 'id': 12, 'sigla': 'SC', 'descricao': 'Santa Catarina' },
{ 'id': 13, 'sigla': 'PI', 'descricao': 'Piauí' },
{ 'id': 14, 'sigla': 'AL', 'descricao': 'Alagoas' },
{ 'id': 15, 'sigla': 'MG', 'descricao': 'Minas Gerais' }
    ];

    $('#messages').puimessages();

    addMessage = function (severity, msg) {
        $('#messages').puimessages('show', severity, msg);
    };

    $('#default').puipanel();

    $('#npttext').puiinputtext();
    $('#nptid').puiinputtext();
    $('#nptsigla').puiinputtext();
    $('#nptdescricao').puiinputtext();

    $('#btnincluir').puibutton({
        icon: 'fa-plus'
    });
    $('#btneditar').puibutton({
        icon: 'fa-pencil'
    });
    $('#btnexcluir').puibutton({
        icon: 'fa-trash'
    }).click(function () {
        addMessage('error', {summary: 'Excluir Estado : ', detail: 'Não implementado'}) });
    $('#tblestados').puidatatable({
        caption: 'Estados',
        paginator: {
            rows: 10
        },
        columns: [
            { field: 'sigla', headerText: 'Sigla', sortable: true, headerStyle: "width:20%" },
            { field: 'descricao', headerText: 'Descrição', sortable: true }
        ],
        datasource: localData,
        selectionMode: 'single',
        keepSelectionInLazyMode: true,
        rowSelect: function (event, data) {
            //$('#messages').puimessages('show', 'info', { summary: 'Estado Selecionado', detail: (data.sigla) });
            addMessage('info', { summary: 'Estado Selecionado', detail: (data.sigla) });
        }
    });


    $('#bt_edit').puibutton({
        icon: 'fa-pencil'
    }).click(function () {
        var selections = $('#tblestados').puidatatable('getSelection');
        if (selections.length === 1) {
            if (selections[0]) {
                $("input[name='id']").val(selections[0].id);
                $("input[name='sigla']").val(selections[0].sigla);
                $("input[name='descricao']").val(selections[0].descricao);

                $('#edit_dialog_label').text("Editar Estado (UF) : " + selections[0].sigla);
                $('#edit_dialog').puidialog('show');
            }
        } else {
            addMessage('warn', { summary: 'Edição de Estado', detail: 'Por favor, selecione um Estado!' });
            //$('#messages').puimessages('show', 'warn', {summary: 'Edição de Estado', detail: 'Por favor, selecione um Estado!' });

        }
    });
    $('#edit_dialog').puidialog({
        resizable: false,
        showEffect: 'fade',
        hideEffect: 'fade',
        minimizable: false,
        maximizable: false,
        modal: true,
        width: 350
    });
    /* SAVE BUTTON ACTION */
    $('#edit_dialog #bt_save').puibutton({ // Fire the submit event of the dialog form 
        icon: 'ui-icon-disk'
    });

    $('#edit_dialog #bt_cancel').puibutton({
        icon: 'ui-icon-close'
    }).click(function () {
        $('#edit_dialog').puidialog('hide');
    });

    /********* Remove item Dialog **********/
    $('#remove_dialog').puidialog({
        resizable: false,
        showEffect: 'fade',
        hideEffect: 'fade',
        minimizable: false,
        maximizable: false,
        modal: true,
        width: 335
    });
    /* YES BUTTON ACTION */
    $('#remove_dialog #bt_remove_yes').puibutton({
        icon: 'fa-check'
    }).click(function () {
        var selections = $('#tbllocal').puidatatable('getSelection');
        var product = new Object();
        product.product_id = selections[0].vin;
        $.ajax({
            type: "POST",
            url: 'services/remove_data.php',
            data: product,
            dataType: "json",
            context: this,
            success: function (response) {
                if (response.success) {
                    $('#tbllocal').puidatatable('refresh', -1);
                    addMessage( 'info', {summary: 'Remover Estado', detail: response.msg });

                    $('#remove_dialog').puidialog('hide');
                } else {
                    addMessage('warn', { summary: 'Remover Estado', detail: response.msg });
                }
            },
            error: function (response) {
                addMessage('error', { summary: 'Remover Estado', detail: 'Ups! Impossível remover o produto selecionado.' });
            }
        });
    });
    /* NO BUTTON ACTION */
    $('#remove_dialog #bt_remove_no').puibutton({
        icon: 'fa-close'
    }).click(function () {
        $('#remove_dialog').puidialog('hide');
    });

    $('#product_form').submit(function (event) {
        var result = $("#product_form")[0].checkValidity();
        if (result) {
            var product = $('#product_form').serializeArray();
            $.ajax({
                type: "POST",
                url: "services/save_data.php",
                data: product,
                dataType: "json",
                context: this,
                success: function (response) {
                    if (response.success) {
                        addMessage('info', { summary: 'Salvar Estado', detail: response.msg });
                        $('#edit_dialog').puidialog('hide');
                        if (response.action === 'new') {
                            $('#tbllocal').puidatatable('refresh', +1);
                        } else {
                            $('#tbllocal').puidatatable('paginate');
                        }
                    } else {

                        addMessage('warn', { summary: 'Salvar Estado', detail: response.msg });
                    }
                },
                error: function (response) {
                    addMessage('error', { summary: 'Salvar Estado', detail: 'Ups! Impossível salvar os dados.' });
                }
            });
        }
        event.preventDefault();
    });

});


