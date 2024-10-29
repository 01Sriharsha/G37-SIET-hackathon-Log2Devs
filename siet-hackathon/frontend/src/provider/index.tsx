import React, { Fragment, PropsWithChildren } from 'react'

export default function AppProvider({children}:PropsWithChildren) {
  return (
    <Fragment>
      {children}
    </Fragment>
  )
}
