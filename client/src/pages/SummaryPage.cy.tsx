import React from 'react'
import SummaryPage from './SummaryPage'

describe('<SummaryPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SummaryPage />)
  })
})