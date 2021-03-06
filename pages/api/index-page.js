import agility from '@agility/content-fetch'
import algoliasearch from 'algoliasearch'

export default async (req, res) => {

//TODO: handle deletes

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

		item.objectID = item.contentID


		index.saveObject(item, {


			// any other requestOptions
		  })



	}

	res.status(200).send("OK")
}