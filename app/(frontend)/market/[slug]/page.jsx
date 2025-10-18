import React from 'react'

export default async function Market({params:{slug}}) {
    const market = await getData(`markets/${slug}`);
  return (
    <div>Market</div>
  )
}
