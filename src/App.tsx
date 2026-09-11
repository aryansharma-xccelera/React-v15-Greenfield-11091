import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { TopBar } from './components/TopBar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import TransactionForm from './pages/TransactionForm'
import { Categories } from './pages/Categories'
import MonthlySummary from './pages/MonthlySummary'
import { NotFound } from './pages/NotFound'

class ApplicationLayout extends React.Component {
  public render() {
    return (
      <div className="min-h-screen bg-canvas lg:flex">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopBar />
          <main className="p-5 sm:p-8">
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/transactions/new" component={TransactionForm} />
              <Route exact path="/transactions/:id/edit" component={TransactionForm} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/monthly-summary" component={MonthlySummary} />
            </Switch>
          </main>
        </div>
      </div>
    )
  }
}

export default class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <Route path={['/dashboard', '/transactions', '/categories', '/monthly-summary']} component={ApplicationLayout} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    )
  }
}
