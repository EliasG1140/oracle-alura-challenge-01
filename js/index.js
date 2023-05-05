import { createElement, createFragment } from "./util/createElements.js"
import { generateRegex, swap } from "./util/object.js"

/* -------------------------------- Selector -------------------------------- */
const [
  txtArea,
  contentOutput,
  btnEncrypt,
  btnDecrypt
] = [
  '#message',
  '.content-output',
  '#btnEncrypt',
  '#btnDecrypt'
].map(select => document.querySelector(select))

/* --------------------------------- Styles --------------------------------- */
txtArea.addEventListener('input', _ => {
  if(txtArea.scrollHeight > 290){
    txtArea.style.height = `auto`
    txtArea.style.height = `${txtArea.scrollHeight}px`
  }
})

/* ------------------------------ Output Empty ------------------------------ */
const outputEmpty = createFragment([
  createElement('img', {src: './../../assets/avatar-search.svg', class: 'avatar'}),
  createElement('h1', null, ['Ningún mensaje fue encontrado']),
  createElement('p', null, ['Ingresa el texto que desees encriptar o desencriptar.'])
])

contentOutput.appendChild(outputEmpty)

/* --------------------------------- Output --------------------------------- */
const response = createElement('p', {class: 'p-response'})
const btnCopy = createElement('button', {class: 'btn btn-secondary'}, ['Copiar'])
const outputResponse = createFragment([response, btnCopy])

btnEncrypt.addEventListener('click', ()=> {
  const text = txtArea.value.toLowerCase()
  const textEncrypt = replace(text)
  renderOutput(textEncrypt)
})

btnDecrypt.addEventListener('click', ()=> {
  const text = txtArea.value.toLowerCase()
  const textDecrypt = replace(text, "D")
  renderOutput(textDecrypt)
})

btnCopy.addEventListener('click', async ()=> {
  await navigator.clipboard.writeText(response.textContent)
})

/* -------------------------------- Function -------------------------------- */
const dictionary = Object.freeze({
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat"
})
/**
 * 
 * @param {string} string 
 * @param {"E" | "D"} action Encrypt "E" or Decrypt "D", default Encrypt
 */
function replace(string = '', action = "E"){
  const reverse = swap(dictionary)
  const dictSelect = action == 'E' ? dictionary : reverse
  const regex = generateRegex(dictSelect)
  return string.replace(regex, key => dictSelect[key])
}

function renderOutput(string = ''){
  const childs = contentOutput.childNodes.length
  response.textContent = string.toLowerCase()
  if(childs == 4){
    contentOutput.className = 'content-output flex-space-between'
    contentOutput.innerHTML = null
  }
  contentOutput.appendChild(outputResponse)
}