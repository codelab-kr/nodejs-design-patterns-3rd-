import react from 'react'
import ReactDom from 'react-dom'
import htm from 'htm'

const html = htm.bind(react.createElement)

class Hello extends react.Component {
  render() {
    return html`<h1>hello ${this.props?.name || 'World'}</h1>`
  }
}
ReactDom.render(
  html`<${Hello} name="React" />`,
  document.getElementsByTagName('body')[0]
)
