import React from 'react'
import Results from './Results'

describe('<Results />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Results />)
  })
})