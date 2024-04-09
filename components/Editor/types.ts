import { ReactQuillProps } from 'react-quill'

export interface EditorProps extends ReactQuillProps {
	toolbarId?: number
	topToolbarIsOpen?: boolean
}
