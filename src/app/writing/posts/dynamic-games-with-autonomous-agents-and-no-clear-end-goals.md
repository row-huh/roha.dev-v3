---
title: Dynamic Games with Autonomous Agents and No Clear End Goals
description: >-
  I think dynamic agents in video games are still an under-explored topic, and
  the only published work I could find on the idea is this Stanford paper:
  https://hai.stanford.edu/news/computational-agents-exhibit-believable-humanlike-behavior
date: 'June 2, 2026'
image: ''
category: dev-notes
---

I think dynamic agents in video games are still an under-explored topic, and the only published work I could find on the idea is this Stanford paper: https://hai.stanford.edu/news/computational-agents-exhibit-believable-humanlike-behavior

Recently, me and Usaib Ahmed tried implementing this as a quick experiment and honestly it does not seem too hard to get something working. The main constraint is cost, but the upside is that it has huge potential for scalability.

Imagine each agent (NPC) is a fully autonomous entity with its own tools through which it can interact with and modify the game state. Each game session would have its own instances of these agents, and each one would need a backing LLM to operate. That quickly becomes multiple concurrent requests from a single user running the game.

By limiting response length, we made it so that whenever an agent speaks to another NPC or the user, it produces only a very short sentence to control costs. The agents didn’t have tools or a way to interact with the game yet, but we had already decided on an end goal, which you had to reach by interacting with the following agents.:

 - Mira, The Citizen Representative
 - Sir Alaric, The Army Commander
 - Bishop Cyril, The Bishop
 - Father Edran, The Priest

Your goal in the game is to make all these agents carry out a coup against the current king. Naturally there is also an agent (Bishop Cyril) who works against you and whose goal is to gather proof against you before you can convince everyone else to carry out the mutiny.

The loop is simple: you talk to each agent, play politics, and manipulate relationships to reach the win condition (mutiny against the king) using whatever tactics necessary. You can find this game that we decided to call Court Of Whispers in this repository:

https://github.com/row-huh/court-of-whispers-godot

This was purely textual, but extending it further, letting agents hold items, run shops, or manage weapon upgrades with full autonomy feels like a very natural next step. Everyone is currently focused on “agents in development,” but the part that feels most interesting is actually letting people role-play inside these systems. That is way more compelling, and also something non-technical players could actually enjoy.

More broadly, I was thinking about a fully open sandbox with no fixed win condition or final boss, just a living world.
To entertain a hypothetical situation where I have unlimited budget with insane game dev skills and I am to make something like this , I would pick a specific aesthetic to anchor it. There are already plenty of medieval, cyberpunk, and fantasy settings, but solarpunk is still relatively underused.

My main inspiration for picking this comes from Dami Lee, who points out that one of the most widely used references for solarpunk is actually an advertisement:
https://youtu.be/UVlBmdvIC6s?si=5pzbIwwgKYNb-ZYP

Given that a unique aesthetic is used, the game would immediately have a very distinct visual and tonal identity.

The setting would be a solarpunk world. Think of a city that looks like someone let a forest slowly reclaim a university campus over a few decades and eventually stopped trying to control it. Vertical gardens, cooperative workshops, solar panels that have been there long enough to get covered in murals. It is not a utopia. Things still break, people still disagree, and resources still run short. It just looks unusually alive while all of that happens.

NPCs would have actual lives and roles in the community. There could be a water engineer who has been quietly hoarding repair knowledge and is starting to create resentment, an urban farming collective that just had a bad harvest and cannot agree on how to respond, or a teenager who keeps replacing official council notices with her own counter-proposals. There are no clear villains, just people with conflicting needs, which is often harder to resolve than a simple antagonist.

The conflict comes from real community tension. Do they expand into the wetland or not? Do they accept outside investment that solves a power shortage but comes with conditions? These are the kinds of decisions that split real communities, and with agents that have memory, opinions, and relationships, those splits would feel messy and organic rather than like a quest marker appeared.

Your role as a player is completely open. You might be a newcomer trying to earn trust to get a seat at council meetings. You might be a repair technician moving between settlements and observing how different communities handle the same problems. The world is not broken and waiting for you to fix it. It is already running, imperfectly, and you are just part of it.

The core system behind all of this is each NPC being a standalone agent with a system prompt, memory, and tool access. When a session starts, the game instantiates agent objects for every named NPC in the current area. Each agent is initialized from a structured record that defines identity, goals, personality traits, relationships, and current emotional state.

Each agent is built in three layers. The first is identity, which is static: name, role in society, personality traits, and long-term goals. The second is episodic memory, which is a rolling summary of recent interactions that gets periodically compressed to stay within context limits. The third is world state, which is a live snapshot of relevant facts injected at inference time, such as resource levels, ongoing disputes, and relationship scores with other agents and the player.

Memory compression is a key part of making this workable. You cannot store full conversation histories forever, so every N interactions you run a summarization step and replace raw dialogue with a condensed version. Agents do not remember everything word for word, they remember the gist plus anything flagged as important, which ends up being closer to how memory actually works anyway.

The biggest constraint is still cost. Running multiple active agents at once gets expensive quickly, and it depends heavily on model choice. Using the most capable reasoning models for every NPC is not practical. A better approach is tiered inference. Background NPCs run on lightweight simulation most of the time, with limited or no LLM calls. Named or nearby NPCs get upgraded to full reasoning mode when they become relevant.

You can also control activity using attention budgets. For example, distant NPCs might only get a fixed number of reasoning calls per in-game hour, while nearby or interacted-with NPCs get more frequent updates. In one version we experimented with, each NPC effectively had a daily token or interaction budget, and once it was exhausted they would downgrade until the next cycle. When the player moves away, agents are serialized and pushed back into low activity mode.

Short responses are not just a cost trick, they also improve the experience. Real conversations are not constant exposition dumps. A line like “I heard you were at the wetland meeting. Didn’t expect that.” often feels more natural than a full paragraph of explanation. The constraint forces cleaner writing and more subtext.

One important design choice is how much direct control agents should have over the world. Letting them freely mutate game state creates chaos quickly. A more stable approach is to let agents propose actions and influence outcomes, while actual state changes happen through structured systems like votes, markets, or delayed simulation ticks. That gives the player time to react while still preserving the sense that the world is not static.

If this works at scale, it changes what a game even is. It becomes closer to a persistent social simulation than a crafted experience, where meaning is not delivered through scripted events but produced continuously through the interactions of autonomous agents sharing the same constrained world.
