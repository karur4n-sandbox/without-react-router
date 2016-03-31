import React from 'react'
import MicroContainer from 'react-micro-container'

import Home from '../views/home'
import About from '../views/about'
import Counter from '../views/counter'

export default class RootContainer extends MicroContainer {
  constructor(props) {
    super(props)
    this.state = {
      route: '/',
      count: 0
    }
  }

  componentDidMount() {
    this.subscribe({
      increment: this.handleIncrement,
      decrement: this.handleDecrement
    })
  }
  handleIncrement(count) {
    this.setState({ count: this.state.count + count })
  }
  handleDecrement(count) {
    this.setState({ count: this.state.count - count })
  }
  _onClickAboutLink = (event) => {
    this.setState({ route: '/about' })
  }
  _onClickCounterLink = (event) => {
    this.setState({ route: '/counter' })
  }
  render() {
    let Child
    switch (this.state.route) {
      case '/about': Child = About; break
      case '/counter': Child = Counter; break
      default: Child = Home
    }
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li onClick={this._onClickAbout}>/About</li>
          <li onClick={this._onClickCounter}>/Counter</li>
        </ul>
        <Child dispatch={this.dispatch} {...this.state} />
      </div>
    )
  }
}
