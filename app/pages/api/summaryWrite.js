import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const writeAction = async (req, res) => {
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Parse this webpage and generate a detailed summary for it (based on cornell notes approach).\nWebpage url: ${req.body.reasonInput}. The summary should be detailed based on the original webpage link. Make sure there are no line breaks i.e. /n in the output.`,
    temperature: 0.7,
    max_tokens: 504,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
}

export default writeAction;
