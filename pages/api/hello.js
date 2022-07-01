export default function helloApi(req, res) {
  //res.status(200).json({ text: 'Hello Javascript API from next.js' });
  if (req.query.name)
    res.send({ message: `Hello ${req.query.name}!`});
  else 
    res.send({ message: 'Hello API from next.js SSR'});
}