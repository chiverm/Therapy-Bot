# DeepTalk

DeepTalk is an AI-powered conversational assistant designed to provide therapeutic support and guidance. The chatbot leverages a large language model (LLM) via an API to generate intelligent, empathetic, and context-aware responses.

Note: The underlying LLM technology is configurable and can be integrated with any supported API, allowing flexibility in choosing the conversational engine.

# Installation
Clone the repository

bash
Copy
Edit
git clone https://github.com/chiverm/Therapy-Bot.git
cd Therapy-Bot
Install dependencies

bash
Copy
Edit
npm install
# or
yarn install
Set up environment variables

Create a .env file in the root directory and add your API key(s) and other configuration variables. For example:

env
Copy
Edit
# URL or key for your LLM API provider
LLM_API_KEY=your_api_key_here
LLM_API_URL=https://api.your-llm-provider.com/v1/chat
Make sure to replace the above with the actual API endpoint and key you will be using.

Run the development server

bash
Copy
Edit
npm run dev
# or
yarn dev
Access the app

Open your browser and navigate to http://localhost:3000 to start interacting with the Therapy Bot.

