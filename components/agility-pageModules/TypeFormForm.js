
import { useEffect } from 'react'
//
import { Widget, PopupButton } from '@typeform/embed-react'



const TypeFormForm = ({ module: {fields} }) => {


	const isBrowser = () => {

		return (typeof window !== 'undefined')
	}
	const typeFormStr = fields.typeForm
	if (! typeFormStr || typeFormStr === "") return null

	const typeFormObj = JSON.parse(typeFormStr)
	const formID = typeFormObj.id

	const height = parseInt(fields.embeddedFormHeight) || 500
	const formType= fields.formType || "embed"
	const buttonText = fields.buttonText || "Start"


	if (formType === "embed" && 1 === 2) {
		return <Widget id={formID} style={{ width: '100%', height: height }} className="" />
	} else {
		return (

			<div className="relative px-8">
			<div>
					<PopupButton id={formID} className="inline-block mt-8 md:mt-8 px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-500 hover:bg-primary-700 focus:outline-none focus:border-primary-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150" >{buttonText}</PopupButton>
				</div>
			</div>
		)
	}

}


export default TypeFormForm