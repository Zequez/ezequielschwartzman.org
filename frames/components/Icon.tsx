export default function Icon({ icon, ...other }: { icon: string }) {
  return <span dangerouslySetInnerHTML={{ __html: icon }} {...other}></span>
}
