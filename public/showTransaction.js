import { formatter } from "./formatter.js"

export function showTransaction(transactionData) {
    const article = document.createElement('article')
    article.classList.add('transactions')
    article.id = `article-${transactionData.id}`

    const name = document.createElement('h4')
    name.classList.add('transactions-name')
    name.innerText = transactionData.name


    const value = document.createElement('p')
    if (transactionData.type === "gasto") {
        value.classList.add('expenses')
        value.textContent = `- ${formatter.format(transactionData.value)}`
    } else {
        value.classList.add('transaction-value')
        value.textContent = `+ ${formatter.format(transactionData.value)}`
    }

    const pencilButton = document.createElement('button')
    pencilButton.classList.add('pencil-button')

    const pencil = document.createElement('i')
    pencil.classList.add('fa-solid', 'fa-pencil')

    const xmarkButton = document.createElement('button')
    xmarkButton.classList.add('xmark-button')

    const xMark = document.createElement('i')
    xMark.classList.add('fa-regular', 'fa-circle-xmark')

    article.append(name, value)
    name.append(pencilButton, xmarkButton)
    pencilButton.append(pencil)
    xmarkButton.append(xMark)
    document.getElementById('transactions').append(article)

    pencilButton.addEventListener('click', () => {

        const modal = document.getElementById('myModal')

        const changeForm = document.getElementById('changeForm')
        changeForm.dataset.id = transactionData.id

        const changeName = document.getElementById('changeName')
        changeName.value = transactionData.name

        const changeValue = document.getElementById('changeValue')
        changeValue.value = transactionData.value

        modal.showModal()
    })

    xmarkButton.addEventListener('click', async () => {
    const response = await fetch(`http://localhost:3000/transactions/${transactionData.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    console.log(response)
    location.reload()
})
}