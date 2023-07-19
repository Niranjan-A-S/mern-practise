import { memo } from "react"

export const Spinner = memo(() => {
    return (
        <div className='loadingSpinnerContainer'>
            <div className='loadingSpinner'></div>
        </div>
    )
})
