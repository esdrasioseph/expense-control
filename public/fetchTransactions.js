import { formatter } from "./formatter.js"
import { showTransaction } from "./showTransaction.js"

export async function fetchTransactions() {
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

    balanceValue.innerText = `${formatter.format(balance)}`
    balanceTitle.append(balanceValue)
}