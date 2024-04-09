import { Quill } from 'react-quill'

const BaseImage = Quill.import('formats/image')

const ATTRIBUTES = ['alt', 'height', 'width', 'style']

const WHITE_STYLE = ['margin', 'display', 'float']

class Image extends BaseImage {
	constructor(props: any) {
		super(props)
	}
	static formats(domNode: any) {
		return ATTRIBUTES.reduce(function (
			formats: { [key: string]: string },
			attribute,
		) {
			if (domNode.hasAttribute(attribute)) {
				formats[attribute] = domNode.getAttribute(attribute)
			}

			return formats
		}, {})
	}

	format(name: string, value: string): void {
		if (ATTRIBUTES.indexOf(name) > -1) {
			if (value) {
				if (name === 'style') {
					value = this.sanitize_style(value)
				}
				this.domNode.setAttribute(name, value)
			} else {
				this.domNode.removeAttribute(name)
			}
		} else {
			super.format(name, value)
		}
	}

	sanitize_style(style: string): string {
		const style_arr: string[] = style.split(';')
		let allow_style: string = ''

		style_arr.forEach((v: string, _i: number) => {
			if (WHITE_STYLE.indexOf(v.trim().split(':')[0]) !== -1) {
				allow_style += v + ';'
			}
		})

		return allow_style
	}
}

export default Image
