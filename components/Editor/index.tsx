import { FC, memo } from 'react'
import ReactQuill from 'react-quill'
import { FORMATS } from './modules'
import { EditorProps } from './types'

import 'react-quill/dist/quill.snow.css'

const Editor: FC<EditorProps> = ({ ...restOfProps }) => {
	return <ReactQuill {...restOfProps} formats={FORMATS} theme='snow' />
}

export default memo(Editor)
