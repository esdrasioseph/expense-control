function showTransaction(transactionData) {
    const article = document.createElement('article')
    article.classList.add('transactions')
    article.id = `article-${transactionData.id}`

    const name = document.createElement('h4')
    name.classList.add('transactions-name')
    name.innerText = transactionData.name


    const value = document.createElement('p')
    if (transactionData.type === "gasto") {
        value.classList.add('expenses')
        value.textContent = `- R$${transactionData.value}`
    } else {
        value.classList.add('transaction-value')
        value.textContent = `+ R$${transactionData.value}`
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

async function fetchTransactions() {
    const transactions = await fetch('http://localhost:3000/transactions').then(res => res.json())
    transactions.forEach(transaction => showTransaction(transaction))

    
    const balance = transactions.reduce((accum, transaction) => {
        if (transaction.type === 'gasto'){
            const expenseValue = parseFloat(transaction.value)
            return accum + ((-1) * expenseValue)
        } else if(transaction.type === 'entrada'){
            const entryValue = parseFloat(transaction.value)
            return accum + entryValue
        }
    }, 0)

    console.log(balance.toFixed(2))

    const balanceTitle= document.getElementById('total-balance')

    const balanceValue = document.createElement('h3')
    if (balance >= 0) {
        balanceValue.classList.add('balance-value')
    } else {
        balanceValue.classList.add('debt')
    }

    balanceValue.innerText = `R$ ${balance.toFixed(2)}`
    balanceTitle.append(balanceValue)
}

document.addEventListener('DOMContentLoaded', () => fetchTransactions())


const form = document.getElementById('myForm')

form.addEventListener('submit', async (ev) => {
    ev.preventDefault()

    const transactionData = {
        name: document.getElementById('transaction-name').value,
        value: document.getElementById('transaction-value').value,
        type: document.getElementById('transaction-type').value
    }

    const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionData)
    })

    const savedTransaction = await response.json()

    form.reset()
    location.reload()
    showTransaction(savedTransaction)
})


const changeForm = document.getElementById('changeForm')

changeForm.addEventListener('submit', async (ev) => {
    ev.preventDefault()

    const transactionChange = {
        type: document.getElementById('change-type').value,
        value: document.getElementById('changeValue').value,
        name: document.getElementById('changeName').value
    }

    const response = await fetch(`http://localhost:3000/transactions/${changeForm.dataset.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(transactionChange)
    })

    const changedTransaction = await response.json()

    console.log(changedTransaction)
    location.reload()
})







