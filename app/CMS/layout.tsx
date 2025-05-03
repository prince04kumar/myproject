import React from 'react'
import Providers from "./providers";

const CMS = (
    {children,

}:Readonly<{
    children : React.ReactNode;
}>) => {
  return (
    <div>
        <Providers>
        {children}
        </Providers>
     
    </div>
  )
}

export default CMS
