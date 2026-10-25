---
title: "Nobody Knows What to Learn For An AI Job. Here's the Map..."
date: 2026-07-18
description: "Every AI company fits into 3 layers. Once you know your layer, you know exactly what to learn and what to cut from your list."
tags: ["AI", "Tech Career", "AI engineer", "tech"]
cover: /blog/ai-industry-3-layers/cover.jpg
---

![The three layers of the AI industry](/blog/ai-industry-3-layers/cover.jpg)

The AI space is noisy. Nobody has a clear picture of it. Every week there is a new model, a new framework, a new "learn this or you're cooked" post on X. For a long time I felt like I had to learn everything at once. Build apps, understand GPUs, train models, read papers. That is not a learning plan. That is just stress.

Then I listened to an episode of [The Pragmatic Engineer podcast](https://youtu.be/3E_jDJST69s?si=R9NsdJTy0vfr9NsO) by Gergely Orosz. His guest was Janvi Kalra, an AI engineer at OpenAI. Before OpenAI she interviewed at 46 AI companies. Yes, 46. And after all that she came out with one simple idea. Every AI company falls into one of three buckets: Product companies, Infrastructure companies, or Model companies.

That one idea cleared so much for me. I took the framework, sat with Claude, did some research, asked a bunch of questions, and mapped out what skills each layer actually needs. For the first time I got clarity not just on what to learn, but on what to leave. Sharing the full breakdown here.

## Layer 1: Product companies

These build apps on top of AI models. Think Cursor, Harvey, Perplexity. They don't train models. They take existing models and build useful products with them.

If you are already a full-stack dev, this layer is home ground. You are building normal software, the model is just one very powerful piece inside it.

Skills you need here:

- Strong full-stack basics. Python or TypeScript, APIs, streaming responses to the UI.
- RAG. Fancy word, simple idea. You make the AI answer from your own documents instead of only its training data. The work is in splitting documents into chunks, searching them properly, and giving the model the right pieces.
- Agent workflows. Connecting the model to tools so it can actually do things, like calling an API or updating a database, instead of only chatting.
- Prompt and context engineering. Writing clear instructions and being careful about what info you feed the model.
- Evals. Testing whether the AI's output is actually good. This is the most underrated skill in the industry right now. Anyone can make a demo work once. Very few people can prove their AI feature works reliably. If you learn one thing deeply, learn this.

## Layer 2: Infrastructure companies

These build the plumbing everyone else runs on. No end-user apps, no model training. Three sub-types here:

**1. Inference providers** like Together and Fireworks. They run models on servers and make them fast and cheap. Skills: GPU and CUDA basics, vLLM, quantization (making models smaller and faster), batching, Kubernetes, distributed systems.

**2. Vector databases** like Pinecone and Chroma. Databases built for searching by meaning instead of exact keywords. Skills: database internals, indexing algorithms like HNSW, embeddings, search at scale. If you have read DDIA, this is that book in real life.

**3. Evals and observability tools** like LangSmith and Braintrust. They build the tooling that shows teams what their AI is doing. Skills: tracing, data pipelines, metric design, dev tooling.

Common thread in this whole layer: deep systems knowledge. This one is for people who enjoy performance, scale, and how things work under the hood.

## Layer 3: Model companies

OpenAI, Anthropic, Google, Meta. The companies that actually train the models.

Skills here:

- Deep PyTorch, writing training loops from scratch
- Transformer internals
- Distributed training across hundreds of machines (FSDP, parallelism)
- Post-training methods like SFT, RLHF, DPO
- Reproducing research papers on your own

This is the closest layer to research. Smallest number of jobs, highest bar.

## How hiring works at each layer

This part was the biggest unlock for me. Each layer wants different proof from you.

- Layer 1 hires on shipped projects. A deployed app beats a certificate every single time.
- Layer 2 hires on systems depth. Databases, networking, performance, distributed systems.
- Layer 3 hires on research artifacts and open source. Reproduced papers, training runs, real contributions to ML libraries.

And the common base for all three is boring: Python, Linux, Git, and the ability to ship.

## What You Can changing after this

Honest part. The best thing this framework gave me is not a list of things to learn. It told me what to drop.

Most AI engineering jobs today are in Layer 1. And if you are already a full-stack dev, it is the easiest entry point. You already have most of the base, and the AI-specific parts (RAG, agents, evals, prompting) can be learned in months, not years.

Stop over-engineering your learning list. Most of us keep adding things to it because some influencer said so, or because it sounds serious, or because everyone else seems to be doing it. Nobody sits down and asks, does this even belong to my layer? Following things blindly is how you stay busy for a year and still feel like you have made no progress. Once you know your layer, go through your list and cut everything that belongs to a layer you are not playing in.

That is the real point of this framework. It is not about what to learn. It is about being okay with what you leave behind.

## Pick your layer

If you are feeling lost in AI right now:

1. Look at the three layers and pick the kind of work that actually excites you. Building products, building infrastructure, or training models.
2. Check what that layer hires on, and build that kind of proof.
3. Ignore the rest. Without guilt.

The noise will not go away. But once you know your layer, it stops being your problem.

*Full credit to [The Pragmatic Engineer podcast, "From Software Engineer to AI Engineer" with Janvi Kalra](https://youtu.be/3E_jDJST69s?si=R9NsdJTy0vfr9NsO), hosted by Gergely Orosz. The three-bucket idea of product, infrastructure, and model companies comes from Janvi. I just mapped the skills and made my own calls with it. Go listen to the full episode, it is worth your time.*
