---
title: "Designing Data-Intensive Applications - Chapter 2: Part 1"
date: 2026-03-17
description: "My personal notes from the book"
tags: ["tech", "backend engineering", "Data base"]
---

> **Disclaimer:** These are my personal notes from reading *Designing Data-Intensive Applications* by Martin Kleppmann & Chris Riccomini. This should never be a spoiler for you. You always have to go through the book and learn from the author's perspective to think and understand the systems in depth.
>
> **Why am I doing this?**
>
> a) To commit to learning in public
>
> b) I have the practice of taking notes — so if it helps you just skim some topics you don't understand, you can use this as a guide
>
> I'm keeping each chapter short and simple for any human brain to digest. That's why I'm splitting each chapter into two parts. These notes aren't only for me but for anyone out there trying to make sense of data systems.

*Internet is never error-free — this is my funny take from the Author's note :)*

## Case Study: Social Media Home Timelines

![social media app relational database model view](/blog/ddia-chapter-2-part-1/1.png "social media app relational database model view")

Let us consider a simple case study of a social media app like X/Twitter where users follow each other and share posts on their timelines.

Imagine as if you are the one who is building such an app, and look at it from a higher level view.

First, your app has n number of users and they follow each other. For example, you are following Elon Musk and of course Elon Musk is not following you, so:

- **Elon** is the followee here
- **You** are the follower

Elon posts something and you see it immediately when you open the app. How is this happening? But let us deal with the data storage part first.

### How the Data is Stored?

We have a **posts table**, where the post\_id, sender\_id (if Elon Musk posted, his sender\_id), along with the post content and timestamp is stored in one table.

The post is stored in this profile timeline — so when you or me visits his timeline, we can see his last post and also the series of his posts. We store them in the **users table**.

If you are wondering what relational databases are — think of it as tables referring to each other. The user\_id can now pull the follows table data as well.

When you want "show me the names of everyone Priyanka follows," the database joins the two tables — it matches the Followee\_Id from the follows table to the User\_Id in the users table and pulls the name.

### The Real Question

![the pictorial representation of the requests and responses](/blog/ddia-chapter-2-part-1/2.png "the pictorial representation of the requests and responses")

You may be following 200 people and you may have 10k followers — that is not the question.

The question is: X may have occasionally **1,50,000 posts/sec** and how do you see them instantly from the people you follow? And how do your followers see instantly what you have posted?

**How do we build this social media app?**

### Approach 1: Polling (Fan-out on Read)

If you follow Elon Musk and want to see what he posted when he posted (maybe within 5 sec delay at max), what can we do? Probably query his posts for every 5 seconds, right?

Elon has 236M followers now. Imagine those 236M followers querying or checking what he has posted every 5 seconds. This process is known as **polling**.

`(236,000,000 × 1 request) / 5 sec = 47.2 Million requests per second`

This is polling only for Elon. And imagine if you are following 200 people — querying every sender is going to be expensive and it becomes difficult to make that fast.

### Approach 2: Materialisation (Fan-out on Write)

So how can we make this better?

What if instead of polling, our server actively pushes the posts to followers online and pre-computes the query results so the user requests can be served from cache?

That means we already have all those posts from the "followed users" and when the user logs in, they can see those posts from the cache. This process of pre-computation of all the results before even the user requests it is called **materialization**.

Now every time a user posts something, there is a lot more work being done than before, because the home timelines are derived data types that need to be updated every time.

But this is highly advantageous in some cases. Why?

Imagine Elon has posted something. As we discussed, he has 236M followers and all of them should have the pre-computed results on their timeline when they log in. So each user logging in can see the post already on the timeline.

This concept is called **Fan-out (write)** — means Elon writing to all those 236M timelines. He writes just once but it is read by many people who follow him.

When there is any peak load on home timelines of the users, we can enqueue them, but due to the cache it still loads faster.

### The Hybrid Approach

So you see here, Elon Musk is the celebrity and there are many celebrities like him on X, so we follow the fan-out on write approach for them.

But I am just a common user, who is still struggling to grow on X and I just have 1600 followers so far at this moment of writing the blog. For me, if we follow the same approach as mentioned above, it is going to be highly tedious for both me and my machines.

So what do we do?

Instead of loading all the pre-computed results with fan-out (write), we do the other way around — every time I post, there won't be any pre-compute happening. Instead, when my followers sign in, they query the latest post from my account. This is called **fan-out (read)**, because I am not writing in their home timeline — they are reading it from the profile timeline.

**X uses a hybrid approach: fan-out on write for celebrities and fan-out on read for regular users.**

### What is Performance?

We should consider two terms to measure performance:

**Throughput:** requests/sec. If the home timeline in the above example is making 5000 req/sec, then the throughput is 5000.

**Response Time:** How long does the request take to load the posts on the user's home timeline? The time from when the user sends the request to the time they see the response on the UI.

Most of the times, response time is also called latency.

There are many factors that can increase this latency. One is **queueing delays**, where the CPU already has many incoming requests and the new request has to wait until the previous ones have been processed. All this sums up to the latency or increased response times — what users don't love to see.

Throughput shows its impact as well depending on the hardware capacity, but this is not the direct factor which is considered by users in terms of measuring performance.

### The Metastable State Problem

For example, if there are many requests and response time has increased drastically and the wait times became more and more — the system is overloaded.

Somehow the load is reduced, but still the system remains in the overloaded state until it is rebooted. This is known as the **metastable state**. This is a serious problem when it comes to production.

So the question is: how can you prevent this from happening?

**This is your homework.** Now you have to Google it or use AI to respond back. I will check every reply and answer you.

This wraps up Part 1 of Chapter 2. Part 2 is coming next. Stay tuned.

If you found these notes helpful, follow along as I document my journey through one of the most important books in backend and software engineering.

[Follow me on Medium](https://medium.com/@priyankapudi4u) to get my tech writings delivered straight to your email.
