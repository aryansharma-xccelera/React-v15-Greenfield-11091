import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'

export class NotFound extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas p-6">
        <div className="max-w-md text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">404</p>
          <h1 className="mt-3 text-4xl font-bold">Page not found</h1>
          <p className="mt-3 text-muted">The page you requested does not exist or has moved.</p>
          <button onClick={() => this.props.history.push('/dashboard')} className="mt-7 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white">Go home</button>
        </div>
      </div>
    )
  }
}

export default withRouter(NotFound)
