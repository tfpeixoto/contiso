function closeForm() {
  const btnClose = document.querySelector('.form-lead__close')
  const formLead = document.querySelector('.form-lead')

  if (formLead) {
    btnClose.addEventListener('click', () => {
      formLead.style.display = 'none'
    })
  }
}
closeForm()

$(document).ready(function () {
  var behavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
    options = {
      onKeyPress: function (val, e, field, options) {
        field.mask(behavior.apply({}, arguments), options);
      }
    };

  $('#whatsapp').mask(behavior, options)
})
