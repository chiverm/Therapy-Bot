# DeepTalk

DeepTalk is an AI-powered conversational assistant designed to provide therapeutic support and guidance. The chatbot leverages a large language model (LLM) via an API to generate intelligent, empathetic, and context-aware responses.

Note: The underlying LLM technology is configurable and can be integrated with any supported API, allowing flexibility in choosing the conversational engine.


## Installation

1. **Clone the repository**

```bash
git clone https://github.com/chiverm/Therapy-Bot.git
cd Therapy-Bot
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add your API key(s) and other configuration variables. For example:

```env
# URL or key for your LLM API provider
LLM_API_KEY=your_api_key_here
LLM_API_URL=https://api.your-llm-provider.com/v1/chat
```

Make sure to replace the above with the actual API endpoint and key you will be using.

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Access the app**

Open your browser and navigate to `http://localhost:3000` to start interacting with the Therapy Bot.

---

### Notes on API Integration

- The project expects an API endpoint that receives user messages and returns AI-generated responses.
- You can customize the API integration in the `/api/chat` route (or wherever your backend logic handles requests).
- The environment variables allow you to easily switch between different LLM providers without changing the code.
