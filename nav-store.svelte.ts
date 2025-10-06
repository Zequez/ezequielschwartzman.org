import createContextedStore from '@/center/contexted-store'

export default createContextedStore('nav-store', () => {
  const cmd = {}
  return { cmd }
})
