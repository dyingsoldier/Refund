// Selecionando os elementos do projeto
const form = document.querySelector("form")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const amount = document.getElementById("amount")

const expenseList = document.querySelector("ul")
const expenseTotal = document.querySelector("aside header h2")
const expenseQuantity = document.querySelector("aside header p span")

// capturando eventos do amount
amount.addEventListener("input", function () {
  let value = amount.value.replace(/\D/g, "")
  value = Number(value) / 100
  amount.value = formatCurrencyBRL(value)
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

  addExpense(newExpense)
})

// criando os elementos apos preencher as informacoes
function addExpense(newExpense) {
  try {
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute = ("alt", newExpense.category_name)

    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    const expenseValue = document.createElement("span")
    expenseValue.classList.add("expense-amount")
    expenseValue.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")
      .trim()}`

    const deleteButton = document.createElement("img")
    deleteButton.classList.add("remove-icon")
    deleteButton.setAttribute("src", "img/remove.svg")
    deleteButton.setAttribute("alt", "remove")

    // adicionando o Strong e o Span dentro da div
    expenseInfo.append(expenseName, expenseCategory)

    // adicionando os icones e valores na li criada
    expenseItem.append(expenseIcon, expenseInfo, expenseValue, deleteButton)

    // adicionando a li criada dentro da ul
    expenseList.append(expenseItem)

    clearForm()
    updateValues()
    // form.reset()
  } catch (error) {
    // console.log(error)
    alert("não foi possivel por " + error)
  }
}

function updateValues() {
  try {
    // pegando a ul e vendo quantas unidades tem dentro
    const items = expenseList.children
    // pegando a span e alterando a palavra caso despesa seja maior que 1
    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? "Despesas" : "Despesa"
    }`

    // total de itens dentro da lista
    let total = 0

    // criando um item que sera adicionado a cada li adicionado na ul
    for (let item = 0; item < items.length; item++) {
      // selecionando o span com a class expense-amount
      const itemAmount = items[item].querySelector(".expense-amount")

      // remover caracteres não numericos
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".")

      value = parseFloat(value)

      if (isNaN(value)) {
        return alert("o valor não é um numero")
      }

      total += Number(value)
    }

    // criando o small
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    // pegando o total e usando a conversão para reais e retirando o R$ que ja vem na formatação
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "").trim()

    // esvaziando o h2
    expenseTotal.innerHTML = ""

    // inserindo o small com R$ + total formatado sem o R$
    expenseTotal.append(symbolBRL, total)
  } catch (error) {
    console.log(error)
    // alert(error)
  }
}

expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-icon")) {
    const item = event.target.closest(".expense")
    item.remove()
  }
  updateValues()
})

function clearForm() {
  expense.value = ""
  amount.value = ""
  category.value = ""

  expense.focus()
}
