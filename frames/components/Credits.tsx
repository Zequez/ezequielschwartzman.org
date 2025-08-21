import { useEffect } from 'preact/hooks'

export default function Credits({ cvsFile }: { cvsFile: string }) {
  useEffect(() => {
    // ;(async () => {
    //   const response = await fetch(cvsFile)
    //   console.log(await response.text())
    // })()
  })

  return <div>Hey</div>
}
