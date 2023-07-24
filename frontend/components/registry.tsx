'use client'

import React from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import {extractStyles} from "evergreen-ui";


export default function StyledComponentsRegistry({
                                                   children,
                                                 }: {
  children: React.ReactNode
}) {

  useServerInsertedHTML(() => {
    const { css, hydrationScript } = extractStyles();
    return <>
      <style dangerouslySetInnerHTML={{ __html: css }}/>
      {hydrationScript}
    </>
  })


  return (<>
    {children}
  </>);
}