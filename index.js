import { fetchTransactions } from "./fetchTransactions.js"

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

    form.reset()
    location.reload()
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







