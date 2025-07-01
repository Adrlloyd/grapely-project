import React from 'react'
import WineCard from './WineCard'

describe('<WineCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<WineCard />)
  })
})