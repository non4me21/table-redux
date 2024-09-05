import React from "react"
import styles from './Section.module.scss'
import classNames from "classnames"

const Section = ({ children, centered, padding }: { children: React.ReactNode, centered?: boolean, padding?: boolean}) => {
  return (
    <div 
    className={classNames(styles.Section,
      centered ? styles.centered : undefined,
      padding ? styles.padding : undefined,
      )}
    >
      {children}
    </div>
  )

}

export default Section
