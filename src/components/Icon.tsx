import React from 'react'

interface IconProps {
  size?: number
  className?: string
}

export class Icon extends React.Component<IconProps> {
  public render() {
    const size = this.props.size || 18
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={this.props.className}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M8 12h8M12 8v8" />
      </svg>
    )
  }
}
