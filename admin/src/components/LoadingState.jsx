import React from "react"

const cardItems = Array.from({ length: 6 })
const listItems = Array.from({ length: 4 })
const tableItems = Array.from({ length: 5 })

const LoadingState = ({
    title = "Loading",
    message = "Preparing the latest information for you.",
    variant = "cards",
    className = "",
}) => {
    return (
        <div className={`loading-state ${className}`}>
            <div className="loading-state__hero">
                <div className="loading-state__pulse" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="loading-state__copy">
                    <p className="loading-state__eyebrow">Prescripto Panel</p>
                    <h2>{title}</h2>
                    <p>{message}</p>
                </div>
            </div>

            {variant === "cards" && (
                <div className="loading-grid loading-grid--cards" aria-hidden="true">
                    {cardItems.map((_, index) => (
                        <div className="loading-card" key={index}>
                            <div className="loading-shimmer loading-card__media"></div>
                            <div className="loading-card__body">
                                <div className="loading-chip loading-shimmer"></div>
                                <div className="loading-line loading-line--lg loading-shimmer"></div>
                                <div className="loading-line loading-line--sm loading-shimmer"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {variant === "list" && (
                <div className="loading-list" aria-hidden="true">
                    {listItems.map((_, index) => (
                        <div className="loading-list__item" key={index}>
                            <div className="loading-shimmer loading-list__avatar"></div>
                            <div className="loading-list__content">
                                <div className="loading-line loading-line--lg loading-shimmer"></div>
                                <div className="loading-line loading-line--sm loading-shimmer"></div>
                            </div>
                            <div className="loading-pill loading-shimmer"></div>
                        </div>
                    ))}
                </div>
            )}

            {variant === "table" && (
                <div className="loading-table" aria-hidden="true">
                    {tableItems.map((_, index) => (
                        <div className="loading-table__row" key={index}>
                            <div className="loading-line loading-line--xs loading-shimmer"></div>
                            <div className="loading-line loading-line--md loading-shimmer"></div>
                            <div className="loading-line loading-line--sm loading-shimmer"></div>
                            <div className="loading-line loading-line--md loading-shimmer"></div>
                        </div>
                    ))}
                </div>
            )}

            {variant === "profile" && (
                <div className="loading-profile" aria-hidden="true">
                    <div className="loading-shimmer loading-profile__image"></div>
                    <div className="loading-profile__content">
                        <div className="loading-line loading-line--xl loading-shimmer"></div>
                        <div className="loading-line loading-line--md loading-shimmer"></div>
                        <div className="loading-line loading-line--lg loading-shimmer"></div>
                        <div className="loading-line loading-line--lg loading-shimmer"></div>
                        <div className="loading-line loading-line--sm loading-shimmer"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoadingState
