import agility from '@agility/content-fetch'
import algoliasearch from 'algoliasearch'

export default async (req, res) => {


	const hookItem = req.body

	if (hookItem && hookItem.referenceName && hookItem.referenceName === "posts") {


		const api = agility.getApi({
			guid: process.env.AGILITY_GUID,
			apiKey: process.env.AGILITY_API_FETCH_KEY
		  });


		 const item = await api.getContentItem({
			contentID: hookItem.contentID,
			languageCode: hookItem.languageCode
		})


		const client = algoliasearch('NAAQKH78HP', 'fd212c07de49a06abe5921fd53a205e9');
		const index = client.initIndex('agility-forms-acount');

		index.saveObject(item, {
			autoGenerateObjectIDIfNotExist: true
			// any other requestOptions
		  })

		console.log(item)


		console.log(hookItem)


	}

	res.status(200).send("OK")
}