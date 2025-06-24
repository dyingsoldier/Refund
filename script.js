// Selecionando os elementos do projeto
const form = document.querySelector("form")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const amount = document.getElementById("amount")

const ul = document.querySelector("ul")

// capturando eventos do amount
amount.addEventListener("input", function () {
  let value = amount.value.replace(/\D/g, "")
  value = Number(value) / 100
  amount.value = formatCurrencyBRL(value)
  console.log(value)
})

// formatando o valor para real
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  return value
}

// pegando o evento quando o botao acionado
form.addEventListener("submit", function (e) {
  e.preventDefault()

  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date().toLocaleString("pt-Br"),
  }

  // console.log(newExpense)
  addExpense(newExpense)
})

function addExpense(newExpense) {
  try {
    const templateExpense = `
                <li class="expense">
              <img src="./img/${newExpense.category_id}.svg" alt="${newExpense.category_name}" />

              <div class="expense-info">
                <strong>${newExpense.expense}</strong>
                <span>${newExpense.category_name}</span>
              </div>

              <span class="expense-amount"><small>R$</small>${newExpense.amount}</span>

              <img src="./img/remove.svg" alt="remover" class="remove-icon" />
            </li>
            `
    // const expenseList = document.createElement("li")
    // expenseList.classList.add("expense")

    // const expenseIcon = document.createElement("img")
    // // expenseIcon.setAttribute("src", `./img/${newExpense.category_name}.svg`)
    // expenseIcon.src = `img/${newExpense.category_id}.svg`
    // expenseIcon.alt = newExpense.category_name

    // const expenseTittle = document.createElement("div")
    // expenseTittle.classList.add("expense-info")

    // const strong = document.createElement("strong")
    // strong.textContent = newExpense.expense
    // const span = document.createElement("span")
    // span.textContent = newExpense.category_name

    // expenseTittle.append(strong)
    // expenseTittle.append(span)

    // expenseList.append(expenseIcon)
    // expenseList.append(expenseTittle)

    ul.innerHTML += templateExpense
  } catch (error) {
    // console.log(error)
    alert("não foi possivel por " + error)
  }
}
