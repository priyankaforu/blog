---
title: "Designing Data-Intensive Applications - Chapter 1.2: Tradeoffs in Data Systems"
date: 2026-03-05
description: "My Personal Notes from the Book DDIA, where everyweek I learn something related to software engineering and draft an clear article that even a 10 year old can understand the systems and architecture"
tags: ["tech", "software", "backend"]
---

### My Personal Notes from the Book

> **Disclaimer:** These are my personal notes from reading *Designing Data-Intensive Applications* by Martin Kleppmann & Chris Riccomini. This should never be a spoiler for you. You always have to go through the book and learn from the author's perspective to think and understand the systems in depth.
>
> **Why am I doing this?**\
> a) To commit to learning in public\
> b) I have the practice of taking notes - so if it helps you just skim some topics you don't understand, you can use this as a guide
>
> I'm keeping each chapter short and simple for any human brain to digest. That's why I'm splitting each chapter into two parts. These notes aren't only for me but for anyone out there trying to make sense of data systems.

## Quick Recap from Part 1

In Part 1 we covered what data-intensive means, OLTP vs OLAP, data warehouses, data lakes, and lakehouses. Now let's continue with the remaining concepts from Chapter 1.

## Reverse ETL

In Part 1 we discussed ETL: pulling data from operational systems into analytical systems. Reverse ETL is the opposite. When insights from the analytics side are pushed back into the operational systems, that's Reverse ETL.

For example, your analytics team discovers that students who apply to 3+ universities have a higher conversion rate. That insight gets pushed back into the app so it can nudge users: "You've applied to 2 universities. Adding one more increases your chances!"

## System of Record vs Derived Data

**System of Record (Source of Truth):** This is the original data that comes directly from the user. If there's ever a disagreement between two systems about what the correct value is, the system of record wins. It's the one true copy.

**Derived Data:** Any data that's been created by transforming or copying data from somewhere else. If you lose derived data, you can always recreate it from the source of truth. Caches are derived data. Search indexes are derived data. Your analytics dashboard is derived data.

Simple rule: always know where your truth lives. Everything else should be traceable back to it and rebuildable.

## Cloud vs Self-Hosting

![Cloud vs Self Hosting](/blog/designing-data-intensive-applications-chapter-1-2/1.png "Cloud vs Self Hosting")

*`Please learn the differences between various methods of hosting from the image above`*

It's simply the question of whether you want to rent a space or build your own house.

If your workload is predictable and won't fluctuate much, building your own machines can be cost-effective. But if you're unsure about demand, choosing a cloud service is the smarter move. You don't think about operating systems, deployments, or operations. The cloud handles peak loads, scales down when quiet, and you only pay for what you use.

But cloud has real downsides:

- Can't customize beyond what the provider offers. Need something extra? Request it and wait.
- When the service goes down, you wait until it comes back. You have no control.
- No access to internals means you can't diagnose bugs yourself.
- You become dependent on the provider. If they change rules or pricing, you're stuck.

This actually happened: Heroku removed their free tier in 2022. Thousands of developers suddenly had to either pay or migrate everything. Many scrambled to move to Railway, Render, or Fly.io.

This problem is called **vendor lock-in.** If the migration APIs aren't compatible with other platforms, you're stuck. Some services avoid this: S3 has become a standard API that Cloudflare R2, MinIO, and DigitalOcean Spaces all support. Switch providers by just changing the URL. But if a service uses a proprietary API nobody else copies, moving means rewriting everything.

**The simple rule: before choosing any service, ask yourself "how hard would it be to leave?" If the answer is "extremely hard," think carefully before committing.**

### Some things must stay off the cloud

The best example: **high-frequency trading.** Firms like Zerodha need trades to execute in microseconds. If your trade goes through a cloud provider's network, that adds latency you can't control. So these firms buy their own servers and place them physically next to the stock exchange. They need full control over the hardware, the network cables, everything. No cloud provider can guarantee that level of speed.

In practice, most real companies use a **hybrid approach**: some services on the cloud, some self-hosted, depending on the specific need.

## Cloud-Native Architecture

Cloud-native means the software was designed from the ground up to take advantage of cloud services, not just old software hosted on cloud machines.

Almost any self-hosted software can run on the cloud as a managed service. But systems built specifically for the cloud have clear advantages: better performance, faster failure recovery, automatic scaling, and support for larger datasets.

**Self-hosted systems:** OLTP: MySQL, PostgreSQL, MongoDB OLAP: Teradata, ClickHouse, Spark

**Cloud-native systems:** OLTP: AWS Aurora, Azure SQL Hyperscale, Google Cloud Spanner OLAP: Snowflake, Google BigQuery

### The real difference: PostgreSQL on AWS vs Aurora

Say your app gets 10x traffic because you went viral on X.

**PostgreSQL on AWS (self-hosted on cloud):** Your database runs on one EC2 machine with 8GB RAM. Traffic spikes, database chokes. You go to the AWS console, stop the database, resize to 32GB, wait for restart. App is down for 5-10 minutes. If the hard drive fails, the database goes down entirely. You pick storage size upfront: if you chose 100GB and data grows to 101GB, it crashes. You manually resize.

**AWS Aurora (cloud-native):** Same traffic spike. You do nothing. Aurora automatically adds more read replicas. Storage grows from 10GB to 128TB on its own. If a machine dies, it switches to another in under 30 seconds. Your users notice nothing.

Both speak SQL. Both look the same to your app code. But under the hood, completely different architecture.

Think of it like email vs WhatsApp. Email was designed in the 1970s for sending letters between computers. We bolted on attachments, HTML, and mobile apps. WhatsApp was built from scratch for instant mobile messaging. PostgreSQL on AWS is email with modern features. Aurora is WhatsApp: built for the modern use case from day one.

## Separation of Storage and Compute

In traditional computing, storage and processing live on the same machine. Your hard drive and processor share the same box. If the machine dies, you lose both.

Cloud-native systems keep them separate. Your data lives in one place, processing happens somewhere else, connected over the network. Why? Because cloud VMs can die, restart, or get replaced anytime. If your VM moves to different hardware, anything on the old machine's local disk is gone.

### Three ways to store data in the cloud

**Local disk (ephemeral):** The hard drive physically attached to your VM. Fastest option, but if the VM dies or moves, this disk is gone forever. Only use for temporary processing.

**Virtual disk (EBS/managed disks):** A separate disk that connects to your VM over the network. If your VM crashes, detach this disk and attach it to a new VM. Data survives, but only one machine can use it at a time. Examples: Amazon EBS, Azure managed disks, Google persistent disks.

**Object storage (S3):** Fully independent from any machine. Data is replicated across multiple data centers automatically. Your VM can crash, the entire data center can go down, your files are still safe. Multiple machines can read the same file simultaneously. Examples: Amazon S3, Azure Blob Storage, Cloudflare R2.

Each level trades speed for safety:

- Local disk = writing notes on a whiteboard. Fast, but someone can erase it anytime.
- EBS = writing notes in a notebook you carry. Safe as long as you don't lose it. Only you can read it at a time.
- S3 = writing notes in Google Docs. Saved in the cloud, accessible from anywhere, multiple people can read simultaneously. Even if your laptop dies, notes are safe.

## Multitenancy

Cloud-native systems are often multitenant: multiple customers share the same hardware. Two different apps might have their databases running on the same physical machine.

Why? Better hardware utilization and easier scaling. Instead of one machine per customer sitting half idle, the provider packs multiple customers efficiently on shared hardware.

The tradeoff: the provider must ensure one customer's heavy query doesn't slow down another, and nobody can access another customer's data.

Think of it like an apartment building vs individual houses. Apartments are cheaper and more efficient, but you need good soundproofing (performance isolation) and strong locks (security isolation) so neighbors don't affect each other.

## Operations in the Cloud Era

Traditionally, dedicated people managed servers: DBAs managed databases, sysadmins managed infrastructure. Their job was very hands-on: checking disk space, adding storage, moving services between machines, installing security patches.

Then the industry merged both roles. Instead of separate "developers who write code" and "ops people who manage servers," companies created shared teams. This philosophy is called **DevOps.** Google's version is called **SRE (Site Reliability Engineering):** the people who build the system are also responsible for keeping it running.

Cloud doesn't make operations disappear. It shifts from "managing machines" to "managing services." You still monitor, configure, and troubleshoot. But instead of SSH-ing into a server to check disk space, you're looking at dashboards and setting up alerts.

- Self-hosted ops = owning a car. You check oil, rotate tires, handle breakdowns.
- Cloud ops = using Uber. You don't maintain the car, but you still plan routes, track rides, and deal with issues when something goes wrong.

## Distributed vs Single-Node Systems

A system running on several machines communicating over a network is a distributed system. Each machine is called a node. A single-node system is just one machine doing everything.

Why distribute across multiple machines?

**1. Inherently distributed:** If two users on two phones are chatting on WhatsApp, the system is unavoidably distributed. The message must travel over the network.

**2. Requests between cloud services:** If data is stored in Supabase but processed in a Vercel function, data travels over the network. Multiple services means distributed system.

**3. Fault tolerance:** If your app must stay online when a machine crashes, you need multiple machines with copies. When one fails, another takes over.

**4. Scalability:** When traffic outgrows one machine, you spread the load. Flipkart during Big Billion Days needs millions of queries per second. No single machine can handle that.

**5. Latency:** A single server in Mumbai means slow loading for users in Germany. Distribute across Mumbai, Frankfurt, Virginia, and each user talks to the nearest server.

**6. Elasticity:** Distributed cloud systems scale up during spikes and down when quiet. You pay only for what you use instead of buying a machine sized for peak traffic that sits idle most of the time.

**7. Specialized hardware:** Different parts need different machines. Storage services need many hard drives. ML systems need GPUs. A distributed system lets each part run on hardware that fits its workload.

**8. Legal compliance:** Some countries require citizen data to stay within their borders. GDPR may require European data to stay in Europe. If you serve multiple countries, you need servers in each region.

## Problems with Distributed Systems

Distributed systems solve big problems but create new ones.

**Network failures:** Every request between machines can fail. When it does, you don't know if the other service received it. Retrying blindly might cause the same action twice, like charging a customer twice.

**Slowness:** Network calls add milliseconds that compound when you make thousands of them.

**Data transfer costs:** Moving large data between machines is slow. Sometimes it's faster to run computation where the data already lives.

**More machines isn't always faster:** Coordinating between machines adds overhead. Sometimes a simple program on one good machine outperforms a 100-machine cluster.

**Debugging is harder:** With 50 services talking to each other, finding the bottleneck is like finding a needle in a haystack. That's where tools like **OpenTelemetry** come in: they trace each request's journey through every service, so you can see exactly where delays happen. Think of it as a GPS tracker for every request in your app.

## Single-Node Databases: DuckDB and SQLite

Not every problem needs a distributed system. Single-node databases are not servers at all. They're just files on your computer.

**SQLite:** Your app opens a file called "mydata.db" on disk, reads and writes directly. No network, no server, no connection string. WhatsApp stores your messages this way. Every Android and iPhone app that stores data locally probably uses SQLite.

**DuckDB:** Same idea but designed for analytics. You have a 2GB CSV file? Open it with DuckDB on your laptop and run SQL queries directly. No server, no cloud, no cost.

DuckDB can be 100x to 1000x faster than PostgreSQL for analytical queries because it was designed specifically for scanning large amounts of data. The book's point: don't distribute unless you actually need to.

## Microservices, Kafka, and Kubernetes

### What is a monolith?

Before microservices, apps were one big program. Login, orders, payments, notifications: all in one codebase, deployed as one unit. Works great when small. But as the app grows, one developer's change to payments accidentally breaks login. Deploying a tiny fix means redeploying everything.

### What are microservices?

Instead of one big app, you break it into small, independent services. Each does one thing well with its own team.

Think of Zomato: User Service handles profiles. Order Service handles orders. Payment Service processes payments. Notification Service sends alerts. Each runs independently, deploys independently, scales independently.

**Why better?** If the notification service crashes, orders and payments keep working. During a traffic spike on New Year's Eve, you scale the order service without wasting money scaling everything else.

**Where Kafka fits:** The conveyor belt between services. When a user places an order, the order service puts a message on Kafka: "new order placed." Each service picks it up at its own pace. If the notification service is down, the message waits in Kafka until it recovers. Nothing is lost.

**Where Kubernetes fits:** When you have 20 microservices running 100+ containers, Kubernetes manages them automatically. Think of it as the HR department for your services: it decides which machines run which services, restarts crashed services, spins up more copies during spikes, and removes extras when traffic drops.

**Serverless:** Instead of managing microservices yourself, the cloud handles everything. You just write function code. Great for simple tasks like sending notifications or processing webhooks. Less control, but zero infrastructure management.

## Cloud Computing vs Supercomputing

Two completely different philosophies. Think of them as two types of kitchens.

**Supercomputer = wedding catering kitchen.** One massive kitchen cooking one giant order for 2000 guests. If an oven breaks, the entire kitchen stops, they fix it, restart from the last checkpoint. Nobody is waiting at a counter. Used for: weather prediction, climate modeling, protein folding.

**Cloud computing = busy restaurant.** Hundreds of tables, each customer ordering different things. If one station breaks, you route orders to working stations. You can never shut down because customers are still eating. Used for: serving apps, processing payments, handling user requests. Must be available 24/7.

The book is saying: we're not talking about supercomputers here. This book is about systems that serve users reliably, where you can't just stop everything when something breaks.

## Data Systems, Law, and Society

Building data systems is not just a technical problem. It's a human and legal one too.

**GDPR (EU):** If you collect data about EU residents, you must get consent, let them delete their data, and let them download a copy. Fines: up to 20 million euros or 4% of global revenue.

**CCPA (California):** Similar idea. People can ask what data you collect and request deletion.

**EU AI Act:** Restricts how personal data can be used to train AI models and make automated decisions.

Beyond the law: even when something is legal, it doesn't mean it's harmless. Social media algorithms designed for engagement end up pushing extreme content because outrage gets more clicks. Automated systems deciding who gets loans or jobs can amplify biases at scale: a biased human might reject 10 applications unfairly, a biased algorithm rejects 10,000.

The author's message: as a data systems engineer, your responsibility doesn't end at "the system works and it's fast." You also need to think about what data you're collecting, who it affects, and whether your system treats people fairly. A civil engineer doesn't just make sure a bridge holds weight. They make sure it's safe for the public and doesn't harm the environment. Data engineers carry the same responsibility.

*This wraps up Chapter 1. Chapter 2 notes are coming next. Stay tuned.*

*If you found these notes helpful, follow along as I document my journey through one of the most important books in backend engineering and Software Development*
