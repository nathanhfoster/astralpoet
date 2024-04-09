import { Quill } from 'react-quill'
import { HEADER_OPTIONS, SIZE_OPTIONS } from './constants'

const Size = Quill.import('attributors/style/size')

Size.whitelist = HEADER_OPTIONS.concat(SIZE_OPTIONS as any)

export default Size
