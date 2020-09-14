/** @jsx jsx */
import { jsx } from '@emotion/core'
import css from '@styled-system/css'

export default function Logo() {
    return (
        <div className="logo" css={css({ width: 120, height: 30, bg: 'rgba(255, 255, 255, 0.2)', my: 16, mr: 24, float: 'left' })}></div>
    )
}