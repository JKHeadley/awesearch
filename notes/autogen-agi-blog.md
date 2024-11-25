From AutoGPT to AGI: The Evolutionary Journey of AutoGen
Justin Headley
Level Up Coding
Justin Headley

·
Follow

Published in
Level Up Coding

·
7 min read
·
Dec 14, 2023
1.4K





The AI community is abuzz with discussions of Artificial General Intelligence (AGI), fueled by intriguing but ultimately limited projects like AutoGPT and BabyAGI. Their initial promise was overshadowed by practical limitations in task execution and memory retention, revealing the complexity of creating truly autonomous AI agents. The advent of AutoGen stirred renewed excitement, offering developers a framework to build upon these earlier attempts. But in my own journey as I have delved into AutoGen, I’ve faced similar challenges: limited agent awareness, a lack of team dynamics, and insufficient tools for knowledge discovery and complex task handling. While there have been many contributions to the AutoGen project that have made strides towards addressing some of these issues, I wanted to see if I could tackle them all in a single effort and to strive to push the performance of agent teams to the next level.

<image>
ai image of baby robot
<image_caption>
From First Steps to Giant Leaps: AutoGPT, BabyAGI, and AutoGen — Charting the Evolutionary Journey from AI Infancy to AGI Aspiration
</image_caption>
</image>

The Journey
Embarking on my journey with AutoGen, I quickly realized that despite its promise, it shared some of AutoGPT and BabyAGI’s fundamental issues. Agents were isolated, each operating in a silo without awareness of their counterparts. This lack of team dynamics was a critical gap, especially for complex tasks requiring collaborative effort an planning. Moreover, while the agents could pass messages to each other, by default they assumed any message received was from the user and so they lacked the nuance of agent-to-agent interaction. Another major hurdle was the absence of effective tools for knowledge discovery, crucial for accessing information beyond their training data. Finally, the method for choosing which agent was to speak/act next, while simple and elegant, lacked robustness. Recognizing these gaps, I was determined to develop a comprehensive solution to elevate AutoGen’s capabilities.

Brief Aside:
When working with large language models, everything is about context, context, context…the context window that is. Every time you prompt a model for a response, any information that is not already in its training data (such as the history of your conversation) MUST be included in the context window, which represents how much text you can send to the model at a single time. For example, in recent months this was around 4k tokens (~3k words) for GPT-3.5 and 32k tokens (~24k words) for GPT-4. Most open source models that can run on a laptop have significantly smaller windows. This means you generally have to be very picky about what you choose to include in your messages to the model, including the “system prompt” where you guide a model to perform a certain way (ex: “You are a helpful assistant…”).

Around the same time I started my journey into extending AutoGen, OpenAI announced the release of GPT-4 Turbo with a context window of 128k tokens (~100k words). This was BIG news, and meant we could now include a lot more contextual information (both system prompt and conversation history).

<image>
screenshot of memgpt flowchart
<image_caption>
Advanced strategics like MemGPT have been proposed to mitigate the context window challenge.
</image_caption>
</image>

Tackling the Challenges
Motivated by the gaps in AutoGen, my first step was redefining agent interactions. I recognized that in order for agents to be aware of each other from the start, they must have some knowledge of each other embedded in their context window. To accomplish this, I updated the chat initialization code to inject the prompt of every agent into every other agent while making it clear what the role of the current agent was. In addition, every message sent by an agent would have the agent’s name injected as a header, so it was clear which agent the message came from. This fostered a more dynamic team environment and alone dramatically improved the coordination and efficiency of task execution.

To tackle the knowledge discovery limitation I had to account for two primary pitfalls:

1) Making sure agents were aware of their own knowledge limitations
2) Giving agents a method of augmenting their knowledge.

Agents (or LLMs) often have a bad habit of assuming they know things they don’t, otherwise known as “hallucinations”. This is usually combated by simply prompting the agent to say “I don’t know” when appropriate. In addition to doing this, I included a specialized “AgentAwarenessExpert” agent whose purpose is to understand the nature and limitations of agents including concepts such as “latent space activation” (recently popularized by David Shapiro). This allows the team as a whole to more accurately recognize their own nature including how they operate and their strengths and limitations.

Once the agents have the ability to admit their lack of knowledge, they then need a method to fill those gaps. This is commonly accomplished through Retrieval Augmented Generation (RAG) which essentially allows an agent to query a database for specific knowledge that is then inserted into their context window. For example, if an agent is asked to write some code using a specific Python module, they could use RAG to get the information they need about the module to write accurate and functioning code.

RAG itself comes with it’s own challenges. Retrieving the right information from a knowledge base is critical and the RAG process needs to be very robust. To account for this I integrated advanced methods such as RAG-fusion and LLM re-ranking which greatly improves the relevance of the data retrieved.

Of course to query a database, you first need to have data! The data discovery process is arguably one of the most vast and complex challenges to solve when attempting to empower agents to be independent from user intervention. Essentially we must find a way to identify what knowledge base (GitHub, Arxiv, Wikipedia, etc.) is relevant to a particular task or query and then integrate a subsection of that knowledge into our own database.

To chisel away at this monolithic challenge I started by enabling the agents to search GitHub repositories when they recognize a codebase they don’t have knowledge of. They then attempt to identify the most relevant repository and clone it into their own knowledge base. This entire research and discovery process is wrapped up into a “consult_archive_agent” function call that the agent team can summon as needed.

One of the most exciting and intriguing improvements was reworking the agent selection method. The default method used by AutoGen passed the list of agents with their descriptions along with the conversation history to a “selector” LLM which was then prompted to choose which agent should be next to speak. While this seems reasonable, in practice it can be seen that the task of selecting the next agent can be complex, critical, and non-obvious.

To improve this, I updated the “selector” to leverage a technique known as “multi-persona prompting”. This intriguing approach instructs the LLM to summon multiple personas and have them work together to solve a task, all within a single inference call. Using this technique, the selector invokes the “Agent Council”: a team of personas representing the agent team along with any additional personas the council deems necessary. The council’s sole purpose is to review and discuss the which agent should act next based on the initial task and the agent team’s actions so far. In addition, the council’s discussion is injected into the conversation history, providing a seamless transition from agent to agent. This not only optimized task allocation but also laid the groundwork for more complex, multi-agent strategies.

<image>
screenshot image of agent council discussion
<image_caption>
An example “Agent Council” discussion
</image_caption>
</image>
With these advancements an agent team can perform much more complex tasks such as even writing code to execute their own team of agents!

The Result

<image>
autogen-agi logo
<image_caption>
AutoGen AGI
</image_caption>
</image>

I’m proud to say I’ve officially launched the open source project: AutoGen AGI. While I feel these advancements take genuine strides towards the dream of realizing AGI, there are still many improvements to be made. My hope is by sharing this project and the journey that inspired it others will be inspired to discuss, collaborate, and feel empowered to dive into their own passions and dreams.

As my journey with AutoGen AGI continues, I find myself at the frontier of a new era in AI development. The enhancements made to AutoGen not only address its initial shortcomings but also pave the way for future innovations in AGI. This project has become a testament to the power of iterative development and the relentless pursuit of technological advancement. Looking ahead, I envision a landscape where AI agents operate not just as tools, but as intelligent, collaborative entities that push the boundaries of what we currently deem possible in artificial intelligence or even reality itself. The road to AGI is long and winding, but with each breakthrough and contribution, we inch closer to that elusive goal. Join me in this exciting journey as we explore the uncharted territories of AI and AGI together.

Clap this up if you enjoyed the article. Feedback is always greatly appreciated. Don’t forget you can clap up to 50 times! ❤