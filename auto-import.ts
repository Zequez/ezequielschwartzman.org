import { $path } from '@/center/utils/system'
import AutoImport from 'unplugin-auto-import/vite'

export default AutoImport({
  include: [/\.ts$/, /\.svelte$/],
  imports: [
    {
      '../components/DocPage.svelte': [['default', 'DocPage']],
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
