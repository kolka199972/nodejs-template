document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id
    remove(id).then(() => {
      event.target.closest('li').remove()
    })
  } else if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id
    edit(id).then((text) => {
      console.log(event.target.closest('li').querySelector('p'))
      console.log(text)
      event.target.closest('li').querySelector('p').textContent = text
    })
  }
})

async function remove(id) {
  await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id) {
  const text = prompt('Введите новое название')
  if (text) {
    await fetch(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify({text}),
      headers: {'Content-Type': 'application/json'}
    })
  }
  return text
}
