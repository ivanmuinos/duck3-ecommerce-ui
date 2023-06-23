import { home } from 'react-storefront-connector'

export default async function(req, res) {
  const response = await home(req, res)
  console.log(response.appData)
  res.json(response)
}
