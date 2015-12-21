$('#edit_dialog').puidialog({
    resizable: false,
    showEffect: 'fade',
    hideEffect: 'fade',
    minimizable: false,
    maximizable: false,
    modal: true,
    width: 350
});

$('#bt_edit').puibutton({
    icon: 'fa-pencil'
}).click(function () {
    var selections = $('#tbllocal').puidatatable('getSelection');
    if (selections.length === 1) {
        if (selections[0]) {
            $("input[name='sigla']").val(selections[0].sigla);
            $("input[name='descricao']").val(selections[0].descricao);
           $('#edit_dialog_label').text("Editar produto " + selections[0].id);
            $('#edit_dialog').puidialog('show');
        }
    } else {
        $('#messages').puigrowl('show', [{ severity: 'error', summary: 'Edição de Estado', detail: 'Por favor, selecione um Estado!' }]);

        $('#btn-error').puibutton().click(function () {
            addMessage('error', { summary: 'Edição de Estado', detail: 'Message Detail here.' });
        });

    }
});

$('#edit_dialog #bt_save').puibutton({ // Fire the submit event of the dialog form 
    icon: 'ui-icon-disk'
});

$('#edit_dialog #bt_cancel').puibutton({
    icon: 'ui-icon-close'
}).click(function () {
    $('#edit_dialog').puidialog('hide');
});
