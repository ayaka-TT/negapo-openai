import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.negative),
    temperature: 0.9,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(negative) {
  const capitalizedWord =
    negative[0].toUpperCase() + negative.slice(1).toLowerCase();
  return `translate the following personalities into positive.

  negative: Picky
  translation: You have high standard and always look for the best.
  negative: Stingy
  translation: You are frugal and good at saving money.
  negative: Lazy
  translation: You are saving your energy for the emergency.

  negative: 
 ${capitalizedWord}
translation:
 `;

}
