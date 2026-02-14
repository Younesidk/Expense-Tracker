let TotalBalance = 0;
let TotalIncome = 0;
let TotalExpense = 0;

const TotalBalanceHTML = document.getElementById("total-balance");
const TotalIncomeHTML = document.getElementById("total-income");
const TotalExpenseHTML = document.getElementById("total-expense");

async function GetAllTransactions()
{
    const rawData = await fetch("https://localhost:7284/Transaction", { method: 'GET' });
    const transactions = await rawData.json();
    transactions.forEach(T => {
        BuildTransaction(T.title, T.amount, T.type, T.date, T.id);

        if (T.type.toLowerCase() === "expense")
            TotalExpense += T.amount;
        else
            TotalIncome += T.amount;
    })

    TotalBalance = TotalIncome - TotalExpense;
    TotalBalanceHTML.textContent = `$ ${TotalBalance}`;
    TotalExpenseHTML.textContent = `$ ${TotalExpense}`;
    TotalIncomeHTML.textContent = `$ ${TotalIncome}`;
    

}

GetAllTransactions();

async function AddTransaction()
{
    const URL = "https://localhost:7284/Transaction";
    const title = document.getElementById("title");
    const amount = document.getElementById("amount");
    const type = document.getElementById("type");
    const nowDate = new Date();
    
    if (title == "" || amount == 0)
        return;
    
    
    const NewTransaction = 
    {
        "title": title.value,
        "amount": amount.value,
        "type": type.value,
        "date": nowDate.toISOString().split('T')[0]
    }


    
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(NewTransaction)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json();
    });

    if (NewTransaction.type.toLowerCase() === "expense")
        TotalExpense += parseFloat(NewTransaction.amount);
    else
        TotalIncome += parseFloat(NewTransaction.amount);

    TotalBalance = TotalIncome - TotalExpense;
    TotalBalanceHTML.textContent = `$ ${TotalBalance}`;
    TotalExpenseHTML.textContent = `$ ${TotalExpense}`;
    TotalIncomeHTML.textContent = `$ ${TotalIncome}`;
    
    
    BuildTransaction(title.value, amount.value, type.value, nowDate.toISOString().split('T')[0], response.id);
    
    title.value = "";
    amount.value = "";
    type.value = "";
}

async function DeleteTransaction(Id)
{
    const URL = `https://localhost:7284/Transaction/${Id}`;

    await fetch(URL, { method: 'DELETE' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
        }
    );
}

const AddTransactionButton = document.getElementById("submitButton");
const TransactionTable = document.getElementById("transaction-table"); 



AddTransactionButton.addEventListener("click", AddTransaction);

function BuildTransaction(Title, Amount, Type, Date, Id)
{
    const container = document.createElement("tr");

    const title = document.createElement("td");
    title.textContent = Title;

    const amount = document.createElement("td");
    amount.textContent = Amount;

    const type = document.createElement("td");
    type.textContent = Type;

    const date = document.createElement("td");
    if (Date == null)
    {
        const NowDate = new Date();
        date.textContent = NowDate.toISOString().split('T')[0];
    }
    else
    {
        date.textContent = Date;
    }

    const DeleteButtonTD = document.createElement("td");
    const DeleteButton = document.createElement("button");
    DeleteButton.id = `delete-btn-${Id}`;
    DeleteButton.textContent = "❌";
    DeleteButtonTD.appendChild(DeleteButton);

    container.appendChild(title);
    container.appendChild(amount);
    container.appendChild(type);
    container.appendChild(date);
    container.appendChild(DeleteButtonTD);

    TransactionTable.appendChild(container);

    DeleteButton.addEventListener("click", function () {
        DeleteTransaction(Id);
        container.remove();
    });
}

