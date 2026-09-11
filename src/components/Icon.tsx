import React from 'react'

export type IconName = 'arrow-down-right' | 'arrow-left' | 'arrow-up-right' | 'calendar-days' | 'chart' | 'edit-3' | 'layout-dashboard' | 'plus' | 'receipt-text' | 'save' | 'search' | 'tags' | 'trash-2' | 'wallet'

export interface IconProps {
  size?: number
  className?: string
  name?: IconName
}

export class Icon extends React.Component<IconProps> {
  private paths(name: IconName) {
    switch (name) {
      case 'arrow-down-right': return <path d="M7 7l10 10M7 17h10V7" />
      case 'arrow-left': return <path d="M19 12H5M12 19l-7-7 7-7" />
      case 'arrow-up-right': return <path d="M7 17L17 7M7 7h10v10" />
      case 'calendar-days': return <g><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18M8 15h.01M12 15h.01M16 15h.01" /></g>
      case 'chart': return <g><path d="M3 3v18h18" /><path d="M7 16l4-5 3 3 5-7" /></g>
      case 'edit-3': return <g><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" /></g>
      case 'layout-dashboard': return <g><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></g>
      case 'plus': return <path d="M12 5v14M5 12h14" />
      case 'receipt-text': return <g><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1V2l-2 1-2-1-2 1-2-1-2 1-2-1z" /><path d="M8 8h8M8 12h8M8 16h5" /></g>
      case 'save': return <g><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" /></g>
      case 'search': return <g><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></g>
      case 'tags': return <g><path d="M20.59 13.41 11 3.83V3H4v7h.83l9.58 9.59a2 2 0 0 0 2.83 0l3.35-3.35a2 2 0 0 0 0-2.83z" /><circle cx="7.5" cy="7.5" r=".5" fill="currentColor" stroke="none" /></g>
      case 'trash-2': return <g><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v5M14 11v5" /></g>
      case 'wallet': return <g><path d="M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6" /><path d="M16 13h.01" /></g>
      default: return <path d="M12 5v14M5 12h14" />
    }
  }

  public render() {
    const size = this.props.size || 18
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={this.props.className} aria-hidden="true">{this.paths(this.props.name || 'plus')}</svg>
  }
}

function namedIcon(name: IconName) {
  return class extends React.Component<IconProps> {
    public render() { return <Icon {...this.props} name={name} /> }
  }
}

export const ArrowDownRight = namedIcon('arrow-down-right')
export const ArrowLeft = namedIcon('arrow-left')
export const ArrowUpRight = namedIcon('arrow-up-right')
export const CalendarDays = namedIcon('calendar-days')
export const Chart = namedIcon('chart')
export const Edit3 = namedIcon('edit-3')
export const LayoutDashboard = namedIcon('layout-dashboard')
export const Plus = namedIcon('plus')
export const ReceiptText = namedIcon('receipt-text')
export const Save = namedIcon('save')
export const Search = namedIcon('search')
export const Tags = namedIcon('tags')
export const Trash2 = namedIcon('trash-2')
export const Wallet = namedIcon('wallet')
