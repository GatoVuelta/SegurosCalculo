import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { DateTime } from 'luxon'

document.querySelector('#app').innerHTML = `
  <div>
    <h3>Calculadora</h3>
  </div>
`

//create a html date picker
const date = document.createElement('input')
date.type = 'date'
date.id = 'date'
date.value = new Date().toISOString().slice(0, 10)

const date_label = document.createElement('label')
date_label.for = 'date'
date_label.textContent = 'Fecha de compra:'
date_label.style.marginRight = '10px'

const date_div = document.createElement('div')
date_div.style.display = 'flex'
date_div.style.justifyContent = 'center'
date_div.style.alignItems = 'center'
date_div.style.marginTop = '10px'
date_div.appendChild(date_label)
date_div.appendChild(date)

document.querySelector('#app').appendChild(date_div)

//create a html input
const kilometrajeinput = document.createElement('input')
kilometrajeinput.type = 'number'
kilometrajeinput.id = 'kilometraje'
kilometrajeinput.value = 0

const kilometraje_label = document.createElement('label')
kilometraje_label.for = 'kilometraje'
kilometraje_label.textContent = 'Kilometraje:'
kilometraje_label.style.marginRight = '10px'

const kilometraje_div = document.createElement('div')
kilometraje_div.style.display = 'flex'
kilometraje_div.style.justifyContent = 'center'
kilometraje_div.style.alignItems = 'center'
kilometraje_div.style.marginTop = '10px'
kilometraje_div.appendChild(kilometraje_label)
kilometraje_div.appendChild(kilometrajeinput)

document.querySelector('#app').appendChild(kilometraje_div)

//create a button
const button = document.createElement('button')
button.textContent = 'Calcular'
button.style.marginTop = '10px'
button.style.marginBottom = '10px'
button.style.marginLeft = '10px'
button.style.marginRight = '10px'
button.style.padding = '10px'
button.style.borderRadius = '5px'
button.style.backgroundColor = '#4CAF50'
button.style.color = 'white'
button.style.border = 'none'
button.style.cursor = 'pointer'
button.style.width = '100%'
button.style.fontSize = '16px'

document.querySelector('#app').appendChild(button)

//create a html output
const output = document.createElement('output')
output.id = 'output'
output.textContent = ''


const output_div = document.createElement('div')
output_div.style.display = 'flex'
output_div.style.justifyContent = 'center'
output_div.style.alignItems = 'center'
output_div.style.marginTop = '10px'
output_div.appendChild(output)

document.querySelector('#app').appendChild(output_div)

//Calculate number of months between today and input date
function calculateMonths(date) {
  const today = new Date()
  const inputDate = new Date(date)
  const months = DateTime.fromJSDate(today).diff(DateTime.fromJSDate(inputDate), 'months').months
  return months
}

//Calculate price based on number of months and kilometraje
function calculatePrice(months, kilometraje) {
  return kilometraje / months * 12;
}

//Add event listener to button
button.addEventListener('click', () => {
  const months = eval(calculateMonths(date.value).toFixed(0))
  const price = calculatePrice(months, kilometrajeinput.value)
  if (isNaN(price)) {
    output.innerHTML = `<p>Por favor ingrese un valor válido</p>`
    return
  }

  output.innerHTML = `<p>Por ${months} meses, el valor a pagar es de <b>$${price.toFixed(2)}</b></p>`
})
