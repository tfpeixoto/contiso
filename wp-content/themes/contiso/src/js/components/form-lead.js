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