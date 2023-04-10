import './style.css'
import { DateTime } from 'luxon'

const date = document.querySelector('#date')
date.value = new Date().toISOString().slice(0, 10)
const kilometrajeinput = document.querySelector('#kilometraje')
const button = document.querySelector('#btn')
const output = document.querySelector('#output')

//Calculate number of months between today and input date
function calculateMonths(date) {
  const today = DateTime.local()
  const inputDate = DateTime.fromISO(date)
  const months = today.diff(inputDate, 'months').months
  console.log(months)
  return months
}

//Calculate price based on number of months and kilometraje
function calculatePrice(months, kilometraje) {
  return ( kilometraje / months ) * 12;
}

//Add event listener to button
button.addEventListener('click', () => {
  const months = eval(calculateMonths(date.value).toFixed(0))
  const price = calculatePrice(months, kilometrajeinput.value)
  if (isNaN(price) || price == -Infinity || price == Infinity) {
    output.classList.add('error')
    output.classList.remove('info')
    output.innerHTML = `<p>Por favor ingrese un valor válido</p>`
    return
  }

  output.classList.remove('error')
  output.classList.add('info')
  output.innerHTML = `<p>Por ${months} ${months == 1 ? "mes" : "meses"}, el valor a pagar es de <b>$${price.toFixed(2)}</b></p>`
})

// If enter key is pressed, trigger click event
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    button.click()
  }
})
