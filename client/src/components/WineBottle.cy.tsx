import React from 'react'
import WineBottle from './WineBottle'

describe('<WineBottle />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WineBottle />)
  })
})