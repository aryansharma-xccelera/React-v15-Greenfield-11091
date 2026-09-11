import React from 'react'
import { Icon as CalendarDays } from './Icon'

export class TopBar extends React.Component {
  public render() {
    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    return (
      <header className="flex min-h-20 items-center justify-between border-b border-line bg-surface px-5 sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Personal finance</p>
          <p className="mt-1 text-sm text-muted">Keep your everyday spending clear.</p>
        </div>
        <div className="hidden items-center gap-2 text-sm text-muted sm:flex">
          <CalendarDays size={17} />
          {today}
        </div>
      </header>
    )
  }
}
