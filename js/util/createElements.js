/**
 * 
 * @param {String} tag 
 * @param {Object} attr 
 * @param {Node|String|Array.<Node|String>} children 
 */
export const createElement = (tag, attr = {}, children = []) => {
  const element = document.createElement(tag)
  for(const key in attr){
    element.setAttribute(key, attr[key])
  }
  for(let child of children){
    if(typeof child == 'string'){
      child = document.createTextNode(child)
    }
    element.appendChild(child)
  }
  return element
}

/**
 * 
 * @param {Node|String|Array.<Node|String>} children 
 */
export const createFragment = (children = []) => {
  const fragment = document.createDocumentFragment()
  for(let child of children){
    fragment.appendChild(child)
  }
  return fragment
}