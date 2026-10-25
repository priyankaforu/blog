---
title: "Designing Data-Intensive Applications - Chapter 2: Part 2"
date: 2026-03-21
description: "My personal notes from the book"
tags: ["tech", "backend engineering", "fullstack development"]
---

My Personal Notes from the Book

> **Disclaimer:** These are my personal notes from reading *Designing Data-Intensive Applications* by Martin Kleppmann & Chris Riccomini. This should never be a spoiler for you. You always have to go through the book and learn from the author's perspective to think and understand the systems in depth.
>
> **Why am I doing this?**
>
> a) To commit to learning in public
>
> b) I have the practice of taking notes, so if it helps you just skim some topics you don't understand, you can use this as a guide
>
> *I'm keeping each chapter short and simple for any human brain to digest. That's why I'm splitting each chapter into two parts. These notes aren't only for me but for anyone out there trying to make sense of data systems.*

[We stopped at response times and performance in the last blog post, so continuing from there now...](/blog/ddia-chapter-2-part-1)

## Response Times and Queueing

Usually, there are many factors responsible for response times, and queueing delays make up a large part of those delays most of the time. We know that servers can't process huge numbers of requests simultaneously due to the limitation of CPU cores. In this kind of situation, if a slow or heavy request is at the front of the queue, all the subsequent requests, even small, fast ones, have to wait behind it. This is known as **head-of-line blocking**.

The key distinction: the server doesn't skip the large request. It processes it, and that's the problem: everything else is stuck waiting behind that one slow request at the "head of the line."

Think of it like a billing counter at DMart: one person with a cartful of 200 items is at the front, and you're standing behind them with just a packet of chips. You have to wait even though your transaction would take 5 seconds. That person at the head of the line is blocking you.

## Mean, Median, and Percentiles

When we were at school, we learned about mean and median in maths class. So let us revisit them here with our requests and responses.

When a request is made to any service, not all requests are going to take the same amount of time, even for the same responses. So it's really hard to define a certain response time that a request can take.

To clear the headaches and find the response times, people came up with different ideas:

![Mean,Median and Percentiles](/blog/ddia-chapter-2-part-2/1.png "Mean,Median and Percentiles")

1. **Mean time** is the average of all the response times. Say you made a request, user 1 made a request, and user N made a request, you sum all the response times for all these users and divide by the number of requests: (res1 + res2 + res3) / 3.
2. **Median time**: is this the same calculation that we studied in school? Yes, it is exactly the same. When we have different response times and we put them in ascending order, the one that is exactly in the center is called the median.

For example: we made 5 requests. The response times are 200ms, 500ms, 100ms, 300ms, and 400ms. Put them in order: 100ms, 200ms, 300ms, 400ms, 500ms. What is exactly in between? 300ms, so this is the median response time, which is also called the **50th percentile or p50**.

This way of calculating in percentiles is the best way of calibrating responses compared to the mean times because with the mean, we can't understand how many users experienced that delay, it just sums up to an average. But with the median, look at the difference: the response times below p50 are the ones taking less than 300ms. If they are **p95**, the response time is touching the 95th percentile at 1.5 seconds, that means 95 out of 100 requests take less than 1.5 sec and 5 out of 100 requests take more. You can say exactly how many requests are taking a specific amount of time, and that doesn't happen with the mean.

### Tail Latencies (p99.9)

The p99.9 represents **tail latencies**: only 1 in 1,000 requests have such long response times. Okay, it's fine to optimise the 99.9th percentile (1/1,000 requests), but it is not fine to optimise the 99.99th percentile (1/10,000 requests) because that can get expensive. UX is really important, taking care of the user's experience matters, but 1 in 10,000 is too much to chase.

**Tail latency amplification**: if the number of requests increases in the backend and the response times also increase drastically, this effect is called tail latency amplification.

> I highly suggest you do a bit more research on case studies where latency has affected the revenue of businesses.

## Reliability

When can you say a person is reliable? Only if you find them trustworthy, right, the person whom you can rely on. In the same way, you can rely on a system easily when it performs correctly even if something goes wrong.

A system may have some faults and sometimes it may fail suddenly. We call it a **fault** when a particular part of the entire system stops working. We call it a **failure** when the system stops working as a whole. For example, if your system has 10 hard drives and one fails among them, that's a fault. If your system itself is a single hard drive and it stops working, that's a failure.

Sometimes, one fault in the system can escalate to other parts and cause a system failure. That fault is known as a **SPOF, Single Point of Failure**.

How can we make a system fault tolerant? One of the best ways is to provide the service by making another part of the system take up the job of the failed component. So now another machine should become the hero after the first hero dies in Season 1!

Sometimes we can inject those faults ourselves to test the maximum number of faults that can be tolerated by the system, so that we can test the bugs and error handling, which helps us fix things when faults happen naturally.

### Hardware Faults

We underestimate hardware faults a lot, but there are countless reasons and cases where systems have crashed due to wrong computations of CPUs, SSDs, and more. The worst case is a crash and the best case is wrong computation results, but hardware faults are easier to isolate to keep the service running compared to software faults.

**Solution: RAID Configuration**: We make systems redundant by adding individual hardware components within a single system, which is called a **Redundant Array of Independent Disks (RAID)** configuration. RAID spreads data across multiple physical disks so that if one disk dies, the data isn't lost. There are different levels: RAID 1 mirrors data, RAID 5 uses parity striping, RAID 6 tolerates two disk failures, but the core idea is the same: redundant components within a single machine.

**Cloud Providers and Availability Zones**: Instead of making one machine super reliable, cloud providers like AWS, GCP, and Azure design systems that *expect* machines to fail. An availability zone (AZ) is essentially a separate data centre (or cluster of data centres) within a region, with independent power, cooling, and networking. A single AWS region like ap-south-1 (Mumbai) might have 3 AZs.

The idea: if you replicate your database across AZ-a, AZ-b, and AZ-c, even if an entire data centre loses power, your system stays up. This is the "software fault tolerance using commodity hardware" philosophy: it's cheaper to run many unreliable machines across AZs and handle failures in software (replication, failover) than to buy ultra-reliable hardware.

### Software Faults

Hardware faults can somehow be separated by redundant disks, but software faults cause bugs across all the nodes since they run on the same software, and one bug is the same everywhere and can fail all the nodes at the same time. There is no single solution that can fix these software faults because there can be many reasons, like cascading failures from one component to another. Avoiding feedback loops that cause retry storms can help the system so that we don't need to crash and restart the system.

**Keep in mind: you can never compromise on reliability. Sometimes you might need to think about the development cost as well, so then be careful about where and what you are cutting corners on.**

## Scalability

Imagine that we made our app completely reliable by implementing all those reliability principles we mentioned. But here's the thing: after a certain number of users, like after 10k users, the system's performance starts dropping. So then we need to think in a different direction... what's that?

**Scalability**, which means: how can we keep the performance of the app as it is for the same load? Do we need to increase the resources like CPU, memory, network bandwidth, etc.? Because our goal is to keep the performance of the system undisturbed and unchanged, or improve it, but not let it downgrade!

### Scaling Approaches

![the ways to scale the systems](/blog/ddia-chapter-2-part-2/2.png "the ways to scale the systems")

**Linear Scaling**: Adding more lanes to a highway. If 1 lane handles 1,000 cars/hour, 2 lanes handle 2,000, 3 lanes handle 3,000, perfectly proportional. Every unit of resource you add gives you exactly that much more throughput. This is the ideal every system aims for, but the reality? You increase the resources to serve the performance, but you add double the machines and only get 1.6x the throughput.

**Vertical Scaling**: Replacing your scooter with a bigger bike, then a car, then a truck. You're not adding more vehicles, you're swapping the whole thing for a more powerful single unit. More RAM, faster CPU, bigger SSD. Simple (one machine, no distributed complexity), but there's a ceiling and costs increase easily.

**Shared Memory**: Multiple chefs sharing one giant kitchen. They all have access to the same fridge, same stove, same counter space. Adding more chefs helps, but eventually they're bumping into each other, fighting over the same stove burner. In practice: multiple CPUs/cores accessing the same memory pool. The bottleneck is *contention*: all processors compete for the same memory bus. It doesn't scale well beyond a point, and it's still a single machine, so it's still a single point of failure.

**Shared Disk**: Multiple chefs in separate kitchens, but they all share one central fridge. Each chef has their own stove and counter, but every time they need ingredients, they walk to the same fridge. That fridge becomes the bottleneck. In practice: multiple machines with independent CPUs and RAM, but reading/writing to a shared storage system (like a SAN or NAS). The disk I/O and locking overhead becomes the limiting factor.

**Shared Nothing / Horizontal Scaling**: Opening multiple independent restaurant branches across the city. Each branch has its own kitchen, its own fridge, its own staff. If one branch burns down, the others keep serving. You can keep opening new branches almost indefinitely. Each node has its own CPU, memory, and disk. Nodes communicate over the network. This is what cloud providers do with commodity hardware across availability zones. It scales almost linearly, and it's fault tolerant, but now you deal with the complexity of keeping data in sync across branches (which is basically the rest of the book: replication, partitioning, consistency).

The progression: shared memory and shared disk are ways to stretch vertical scaling further, and shared nothing/horizontal is where you end up when vertical hits its limits.

### Principles for Scalability

1. **No magic scaling sauce exists.** Every application's scaling architecture is specific to its workload. A system handling 100K small requests/sec looks completely different from one handling 3 large requests/min, even at identical throughput.
2. **Rethink architecture at every 10x growth.** What works at your current load will likely break at 10x. Don't over-engineer for the distant future. Plan one order of magnitude ahead, not more.
3. **Break systems into independent components.** This is the shared principle behind microservices, sharding, stream processing, and shared-nothing architectures. Smaller independent pieces scale better than one monolithic system.
4. **The hard part is knowing where to draw boundaries.** Deciding what should be together vs. apart is the real design challenge, not the scaling itself.
5. **Don't complicate things unnecessarily.** If a single-machine database handles your load, use it. A distributed system adds complexity that's only worth paying for when you actually need it.

## Maintainability

Imagine you just built your dream house. You spent months designing it, picking the materials, getting everything perfect. The day you move in feels amazing. But here's what nobody tells you: **building the house was the easy part**. The real cost starts now. The plumbing will leak. The roof needs fixing after monsoon season. The walls need repainting. A new family member arrives and suddenly you need an extra room. This is **Maintainability**, the reality that keeping a system alive costs far more than building it in the first place.

Now, how do you make sure this house doesn't become a nightmare to maintain? Kleppmann gives us three principles.

### Operability

Think of this as hiring a good watchman for your house. He does his regular rounds, checks the locks, monitors the water tank level, switches on the generator when power goes out, all the routine stuff, automatically handled. But here's the thing: you wouldn't want a fully robotic watchman who can't think for himself. Because when something truly unusual happens, say a pipe bursts inside the wall — you need a skilled human who can diagnose the weird stuff. Automation handles the daily chores. Humans handle the surprises. The sweet spot is somewhere in between.

### Simplicity

Imagine your house has been renovated fifteen times over twenty years. Every owner added rooms, rewired things, patched walls without removing old wiring. Now nobody knows which switch controls which light. Touching one wire trips the whole house. This is what Kleppmann calls the **"big ball of mud."** The antidote? **Good abstractions.** Think of it like this: when you flip a light switch, you don't think about the wiring, the transformer, or the power grid. The switch is an abstraction that hides all that complexity. SQL does the same thing for databases. Design your systems so that the people who come after you only need to flip switches, not trace wires through walls.

### Evolvability

Your family grows. Your needs change. Maybe you need to convert that study room into a bedroom, or add a balcony. If your house was built with load-bearing walls everywhere and concrete poured into every corner, even a small change means breaking half the structure. But if it was built with modular walls and flexible layouts, change is easy. The key insight Kleppmann offers: **minimize irreversibility**. If you can remove a wall and put it back easily, you'll experiment freely. If removing a wall means the ceiling might collapse, every decision becomes terrifying and slow.

The thread connecting all three? A well-maintained house is one that's easy to monitor, simple to understand, and flexible enough to change. That's exactly the kind of software system the rest of this book teaches us to build.

*If you're following along with my DDIA series, you can find all the parts on my Medium. I'm documenting this entire journey of understanding data systems chapter by chapter.*

Follow me on Medium for the full blog series: [Medium](https://medium.com/@priyankapudi4u)

Follow me on X for build-in-public updates: [X/Twitter](https://x.com/priyankapudi)
