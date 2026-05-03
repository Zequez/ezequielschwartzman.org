import { $path } from '@/center/utils/system'
import AutoImport from 'unplugin-auto-import/vite'

export default AutoImport({
  include: [/\.ts$/, /\.svelte$/, /\.svx$/],
  imports: [
    {
      '../components/DocPage.svelte': [['default', 'DocPage']],
      '@@@/cv/components/GithubLink.svelte': [['default', 'GithubLink']],
      '@@@/cv/components/Photo.svelte': [['default', 'Photo']],
      '@@@/cv/components/YouTube.svelte': [['default', 'YouTube']],
      '@@@/cv/components/Code.svelte': [['default', 'Code']],
      '@@@/cv/components/Todo.svelte': [['default', 'Todo']],
      '@@@/cv/components/Website.svelte': [['default', 'Website']],
    },
    // {
    //   '../utils/enes.svelte': ['enes'],
    // },
  ],
  // dirsScanOptions: {
  //   filePatterns: ['*.svelte'], // Glob patterns for matching files
  //   fileFilter: file => file.endsWith('.ts'), // Filter files
  //   types: true // Enable auto import the types under the directories
  // },

  defaultExportByFilename: true,
  dirs: [],
  dts: false,
})
