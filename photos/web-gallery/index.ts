const picturesSrc = import.meta.glob('./*.{png,jpg}', {
  query: { format: 'webp', width: '100;250;500', picture: '' },
  import: 'default',
  eager: true,
})

const picturesMeta = import.meta.glob('./*.{png,jpg}', {
  query: { format: 'webp', as: 'meta:height;width', picture: '' },
  import: 'default',
  eager: true,
})

export type ImgData = {
  src: [string, string, string]
  meta: { width: number; height: number }
}

// type Imgs = {
//   [key: string]: ImgData
// }

let pictures: { [key: string]: ImgData } = {}
for (let srcs in picturesSrc) {
  const name = srcs.replace('./', '').replace('.png', '').replace('.jpg', '')
  const src = picturesSrc[srcs]
  const meta = picturesMeta[srcs]
  pictures[name] = {
    src: src as [string, string, string],
    meta: meta as { width: number; height: number },
  }
}

type ProjectBuilt = {
  name: string
  imgs: ImgData[]
  narrative: string
  archive?: string
  hue: number
}

const IM = (...imgs: string[]): ImgData[] => {
  return imgs.map((img) => {
    return pictures[img]
  })
}

let hue = 0
let step = 30
function hueGen() {
  hue += step
  return hue
}

const PROJECTS: { [key: string]: ProjectBuilt } = {
  'web-environment': {
    name: 'Web Environment',
    narrative: ``,
    imgs: IM('web-environment-1'),
    hue: hueGen(),
  },
  websiteV7: {
    name: 'Personal Website Nº7',
    narrative: `Infinite canvas website. This was already running on the Web Environment system.
      The canvas system itself is a work of art. The performance superb.
      The navigation, as a creative environment was OK, but as a public-facing-website it wasn't delightful to use.
      This one was superseded by the one you are looking at right now. I intend to recyle the Substrate for something else.`,
    imgs: IM('websiteV7-1', 'websiteV7-2'),
    hue: hueGen(),
  },
  substrate: {
    name: 'Substrate',
    narrative: ``,
    imgs: IM('substrate-1', 'substrate-2'),
    hue: hueGen(),
  },
  gamez: {
    name: 'Gamez',
    narrative: '',
    imgs: IM('gamez-1', 'gamez-2', 'gamez-3', 'gamez-4', 'gamez-5'),
    hue: hueGen(),
  },
  hoja: {
    name: 'Hoja',
    narrative: `Hoja was an attempt to make an accessible collaborative
        web building system and Gameworld all in one. Ancestor of the Web Environment.`,
    imgs: IM('hoja-0', 'hoja-1', 'hoja-2', 'hoja-3'),
    hue: hueGen(),
  },
  'coral-sandbox': {
    name: 'Coral Sandbox',
    narrative:
      'A space where I create curated digital experiences for my toddler son, Coral.',
    imgs: IM(
      'coral-sandbox-1',
      'coral-sandbox-2',
      'coral-sandbox-3',
      'coral-sandbox-4',
      'coral-sandbox-5',
      'coral-sandbox-6',
      'coral-sandbox-7',
    ),
    hue: hueGen(),
  },
  spaceport: {
    name: 'Startover.xyz Spaceport Rework',
    narrative: '',
    imgs: IM('spaceport-1', 'spaceport-2'),
    hue: hueGen(),
  },
  websiteV6: {
    name: 'Personal Website Nº6',
    narrative:
      'I made a lot of effort on the portfolio and engineering section. Came out OK, looked good to recluiters.',
    imgs: IM('websiteV6-1', 'websiteV6-2', 'websiteV6-3'),
    hue: hueGen(),
  },
  'components-editor': {
    name: 'Components Editor',
    narrative: 'First experimenting with structured code editing.',
    imgs: IM('components-editor'),
    hue: hueGen(),
  },
  'email-signatures': {
    name: 'Emails Signatures Generator',
    narrative: `Someone asked me to build this. You can create
      templates and generate custom copyable email signatures you can then paste on email apps.`,
    imgs: IM('email-signatures'),
    hue: hueGen(),
  },
  'before-after-player': {
    name: 'Before/After Audio Player',
    narrative: `Found a client on Upwork that commissioned me this for his own website. Then we agreed
      to build a general-purpose SASS-like app afterwards together. Long story short, communication
      breakdown; didn't work; context war.`,
    imgs: IM(
      'before-after-player-1',
      'before-after-player-2',
      'before-after-player-3',
    ),
    hue: hueGen(),
  },
  'wavy-svg': {
    name: 'Wavy SVG Generator',
    narrative: ``,
    imgs: IM('wavy-svg'),
    hue: hueGen(),
  },
  websiteV5: {
    name: 'Personal Website Nº5',
    narrative: '...',
    imgs: IM('websiteV5-1', 'websiteV5-2', 'websiteV5-3'),
    hue: hueGen(),
  },
  'archy-collab': {
    name: 'Archiarchy Collab',
    narrative: `Earliest seed of the Web Environment Project. First experiments with self-editing websites
        and collaborative web Substrating.`,
    imgs: IM('archy-collab-1'),
    hue: hueGen(),
  },
  websiteV4: {
    name: 'Personal Website Nº4',
    narrative: '...',
    imgs: IM('websiteV4-1', 'websiteV4-2'),
    hue: hueGen(),
  },
  websiteV3: {
    name: 'Personal Website Nº3',
    narrative:
      'My rainbow zequez.space phase. I loved the generative SVG-based background art.',
    archive: 'https://web.archive.org/web/20230312073926/https://zequez.space/',
    imgs: IM('websiteV3-1', 'websiteV3-2'),
    hue: hueGen(),
  },

  'mandelbrot-sandbox': {
    name: 'Mandelbrot Sandbox',
    narrative: ``,
    imgs: IM('mandelbrot-sandbox-1', 'mandelbrot-sandbox-2'),
    hue: hueGen(),
  },
  ggfilter: {
    name: 'GGFilter',
    narrative: ``,
    imgs: IM('ggfilter-0', 'ggfilter-1'),
    hue: hueGen(),
  },
  'prismata-subreddit-extension': {
    name: 'Prismata Subreddit Extension',
    imgs: IM('prismata-subreddit-extension'),
    narrative: `
        Prismata was, and still is, a symmetric cards game that I enjoyed for a while. The subreddit
        was very active, and people would quote cards constantly. So I made a Chrome extension that
        would detect cards mentions and cross-link them to the Prismata Wiki and allow you to see
        the card image on hover.
      `,
    hue: hueGen(),
  },
  'reddit-placebot': {
    name: 'Reddit Placebot',
    narrative: ``,
    imgs: IM('reddit-placebot'),
    hue: hueGen(),
  },
  'factorio-mods-portal': {
    name: 'Factorio Mods Portal',
    narrative: ``,
    imgs: IM('factorio-mods-portal'),
    hue: hueGen(),
  },
  'playtime-for-the-buck': {
    name: 'Playtime For The Buck',
    imgs: IM('playtime-for-the-buck'),
    narrative: `
        I noticed that the games I most liked were the ones I most played. So instead of relying on
        reviews for finding games, what if we could see the collective average hours that people spent
        playing games? Well, this information was somewhat available on Steam game reviews sections, where the
        amount of time played was featured along with the review. With this project I learned about web scraping,
        and about leveraging the free Github Pages infrastructure for publishing websites for free. The whole thing
        was generated regularly in my computer and then pushed to Github with a cronjob. I scraped information about
        thousands of Steam games using this.
      `,
    hue: hueGen(),
  },
  websiteV2: {
    name: 'Personal Website Nº2',
    narrative: `Shifted my focus to portfolioing rather than blogging.
        Was the first time I actually went through all my earlier projects to make a comprehensive list.
        This was at zequez.com`,
    imgs: IM('websiteV2'),
    hue: hueGen(),
  },

  'mapa-de-transporte': {
    name: 'Mapa de Transporte',
    imgs: IM('mapa-de-transporte-1', 'mapa-de-transporte-2'),
    narrative: `
        I was furious that there was no clear way to visualize all the bus routes of my hometown. The
        bus organizion only had a printed document with the list of streets the bus turned on. I decided
        to make this by myself. This was my first incursion into using the Google Maps API, and I learned Ruby on Rails tech stack,
        which opened many doors for me years down the line. There was a crowd-sourcing functionality, where people
        were able to send information about places where you could recharge the bus card.
      `,
    hue: hueGen(),
  },
  websiteV1: {
    name: 'Personal Website Nº1',
    narrative: `First customly designed personal website; the previous one was a Wordpress blog.
        And I shifted the language to English. At zequez.com.`,
    archive: 'https://web.archive.org/web/20150502020652/http://zequez.com/',
    imgs: IM('websiteV1'),
    hue: hueGen(),
  },
  'target-shooter': {
    name: 'Target Shooter',
    imgs: IM('target-shooter'),
    archive:
      'https://web.archive.org/web/20131129030948/http://zequez.com/sandbox/blindmice/',
    narrative: `
        A web based game. I experimented with real-time canvas and was really proud of
        the circles-breaking-into-pieces effect. I submitted the piece to the Chrome Experiments and
        it got accepted; that was really proud of this one. It saddens me that the original code was
        lost, and I'm only left with the mangled minimized one; this was before Github.
      `,
    hue: hueGen(),
  },
  comicsen: {
    name: 'Comicsen',
    narrative: `
        One of my first ambitious works.
        I was really into webcomics, and wanted to translate them to Spanish.
        Made a whole canvas-based drawing tool that allowed me to paint and write over the comics.`,
    imgs: IM('comicsen'),
    hue: hueGen(),
  },
}

export default PROJECTS
