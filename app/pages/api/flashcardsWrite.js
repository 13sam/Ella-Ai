import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const writeAction = async (req, res) => {
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Parse this webpage and generate 8 short flashcards for it.\nWebpage url: ${req.body.reasonInput}. Include line breaks after every flashcard`,
    temperature: 0.7,
    max_tokens: 504,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
}

export default writeAction;
