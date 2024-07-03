import React, { CSSProperties } from 'react'

import './LoadingIndicator.css'

const LoadingIndicator: React.FC<{ style?: CSSProperties }> = props => (
	<div className="loading-indicator" {...props} />
)
export default LoadingIndicator
