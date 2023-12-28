import React from 'react'
import ReactDom from 'react-dom'

const h = React.createElement

class Hello extends React.Component {
  render() {
    return h('h1', null, ['hello', ' ', this.props?.name || 'World'])
  }
}
ReactDom.render(
  h(Hello, { name: 'React' }),
  document.getElementsByTagName('body')[0]
)
