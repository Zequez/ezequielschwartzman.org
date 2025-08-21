import GithubIcon from '~icons/fa6-brands/github?raw'
import MediumIcon from '~icons/fa6-brands/medium?raw'
import YouTubeIcon from '~icons/fa6-brands/youtube?raw'
import InstagramIcon from '~icons/fa6-brands/instagram?raw'
import SubstackIcon from '~icons/fa6-solid/bookmark?raw'

export default function PresenceLink(props: {
  href: string
  text: string
  icon: 'github' | 'medium' | 'youtube' | 'instagram' | 'substack'
  color: string
}) {
  const icon = {
    github: GithubIcon,
    medium: MediumIcon,
    youtube: YouTubeIcon,
    instagram: InstagramIcon,
    substack: SubstackIcon,
  }[props.icon] as any as string
  return (
    <a
      href={props.href}
      target="_blank"
      class={`flexcc group relative text-white! rounded-md py2 no-underline! b b-white/20 b-b-2 active:(top-1px b-b-transparent) b-b-black/20 text-shadow-[0_1px_0_#0004] ${props.color}`}
    >
      <span class="absolute block inset-0.3px rounded-[4px] group-hover:(bg-white/20 transition-duration-0) transition-duration-500 transition-colors"></span>
      <span dangerouslySetInnerHTML={{ __html: icon }} class="mr2"></span>
      {props.text}
    </a>
  )
}
