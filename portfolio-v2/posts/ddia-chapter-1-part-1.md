---
title: "Designing Data-Intensive Applications - Chapter 1.1: Tradeoffs in Data Systems"
date: 2026-02-26
description: "My notes from reading Designing Data-Intensive Applications — breaking down OLTP, OLAP, data warehouses, data lakes, and ETL pipelines with real-world analogies. Part 1 of my learning-in-public series on backend systems."
tags: ["programming", "backend engineering", "systems architecture", "tech"]
cover: /blog/ddia-chapter-1-part-1/cover.png
---

![An image that describes the data flow from operational to analytical systems](/blog/ddia-chapter-1-part-1/cover.png "The Data from the operational to analytical systems")

> **Disclaimer:** These are my personal notes from reading *Designing Data-Intensive Applications* by Martin Kleppmann & Chris Riccomini. This should never be a spoiler for you. You always have to go through the book and learn from the author's perspective to think and understand the systems in depth.\
> **Why am I doing this?**\
> a) To commit to learning in public\
> b) I have the practice of taking notes, so if it helps you just skim some topics you don't understand, you can use this as a guide\
> I'm keeping each chapter short and simple for any human brain to digest. That's why I'm splitting each chapter into two parts. These notes aren't only for me but for anyone out there trying to make sense of data systems.

## Data-Intensive - So What Do You Mean by This?

When the application data size becomes bigger and bigger, and it becomes unmanageable in a single system, that's when we call it **data-intensive**.

And such big apps perform all these operations:

**1. Database:** A collection of data, which acts like the directory of what your application has stored in it.

**2. Cache:** It's like a memory that stores the result of an expensive operation. Imagine asking "247 × 38?" and your friend calculates it once: 9,386. Next time you ask, they don't recalculate, they just remember the answer. Your browser does this with websites so it doesn't download them again.

**3. Stream Processing:** Think WhatsApp notifications. The moment someone sends you a message, you get a notification instantly. You don't check every 5 minutes; the system pushes it to you the second it happens. Zomato tracking your delivery in real-time, stock prices updating live on Zerodha, that's stream processing. React to events as they happen.

**4. Batch Processing:** Think WhatsApp data or media backup. Your phone doesn't backup each message instantly. It waits until 2am, takes ALL the messages and media accumulated since the last backup, and processes them together in one big job. Flipkart calculating "top selling products this quarter" by scanning millions of orders overnight, that's batch processing. Collect everything, process later in bulk.

## The Two Teams and Their Different Goals

So if we are handling all these tasks alone by connecting everything, the challenges arise, and we have to make certain tradeoffs with different approaches.

The same data that we store can be handled in different ways by different teams when you work in a company. We have to think about the problems and solutions from both ends, because they serve different goals.

To keep things simple, assume there are two teams in an organisation:

**1. The Operational Team:** These are the people who do the reading, writing, updating, and deleting of data. They keep the app running for users.

**2. The Analytical Team:** These people analyse the data to get business insights, like which products or orders from the company are performing well and which are not. Or maybe data scientists who want to find new insights and do ML. These people can only **read** data but can never modify it, and for this purpose they use only derived datasets.

So the author wants us to see the systems from two different perspectives: **operational systems** and **analytical systems**. Keep this in mind, it's going to be useful for the next chapters.

## OLTP - Online Transaction Processing

The pattern of updating, deleting, or modifying data based on the user's input is called **OLTP**.

Why is it called so?

- **Online:** You know why, obviously
- **Transaction:** The reads and writes to the data, like how we exchange a tool for money in offline and online, the same concept
- **Processing:** This entire process of exchanges happening between the user and the data in the app

## OLAP - Online Analytical Processing

As we discussed, there are two types of people: the one who operates (does OLTP) and the one who analyses the data (does OLAP).

If we send a query (an instruction to the database) that should analyse the data, it does many operations like adding, multiplying, and so on to provide the data to us based on the instructions we sent.

So the business analyst can make reports based on this data, and this process of getting analytical data is known as **Online Analytical Processing (OLAP)**.

## Why Two Separate Database Systems?

Earlier, both the systems, analytical and operational, were together. But now, thanks to SQL, we are able to maintain two separate systems.

But why do we need two separate databases?

Because the operational people and the analytical people have **different goals** towards querying the data. Serving both purposes at the same time on the same dataset is really difficult, and this leads to **data silos** (if you don't know what this is, you can look it up, it's a very interesting topic to discuss).

Sometimes the OLTP systems restrict queries due to privacy concerns. But OLAP has no such problem. Why? They don't do anything except reading the data and exploring new insights. They have the freedom to write any query, unlike OLTP systems which run modifications on the same live system.

## The Data Warehouse

So in order to separate both systems and let the analysts have the freedom to query whatever they want, we use a separate database called a **Data Warehouse**.

This data warehouse has a **copy** of the OLTP data, transformed in a way that becomes analysis-friendly. This process is known as **ETL: Extract, Transform, Load**.

## ETL from External Services

In any app, we use many services: for receiving payments, for sending marketing emails, and sometimes we use other products' APIs. In that case, it is very difficult to make the ETL directly.

That's when we can pull all the external services' data (payments from Razorpay, the emails data from Mailchimp, etc.) into one place using external data connectors like **Airbyte**, **Fivetran**, etc.

We can also use **HTAP (Hybrid Transactional/Analytical Processing)**, which simply lets you avoid building two separate systems and provides both as a single system. That's all.

## From Data Warehouse to Data Lake

But these data warehouses are not that friendly for data scientists. Since the data is in the form of structured tables, it is not easy for them to train machine learning models.

When data scientists need to work with raw unstructured data like images, text files, or documents, tables don't help. So instead, the raw data from ETL pipelines is stored in something called a **Data Lake**, which keeps everything in its original form: files, images, documents, CSVs, directly from the users.

## The Data Lakehouse

When you **add a SQL query engine on top of the data lake** so that both analysts AND data scientists can use the same storage, that architecture is called a **Data Lakehouse**.

One system. Both use cases. Everyone's happy.

*Chapter 1, Part 2 is coming next. Stay tuned.*

*If you found these notes helpful, follow along as I document my journey through one of the most important books in backend engineering.*
