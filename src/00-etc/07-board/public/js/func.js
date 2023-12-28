function modifyPost(id) {
  const form = document.getElementById('boradForm')
  form.action = `/modify/${id}`
  form.submit()
}

