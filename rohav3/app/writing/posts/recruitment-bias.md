---
title: "Exploring Bias in Recruitment, An Attempt to Solve it - And Why it was the Worst Idea Ever"
description: "A practical guide for developers to understand the core concepts behind Large Language Models, from architecture to application."
date: "February 26, 2025"
image: "/placeholder.svg?height=400&width=800&text=LLMs+Demystified+Blog"
category: "highlights"
---

Employers—like everyone else—can have biases, whether they realize it or not. Subconscious bias sneaks into hiring decisions, influencing choices based on factors like age, gender, race, or culture. The problem? It moves hiring further away from being objective, increasing the chances of selecting a less qualified candidate simply due to bias. Over time, this doesn’t just affect individual job seekers—it shapes entire workplaces, limiting diversity, fresh perspectives, and overall team performance.

Now, with so many problems in the world, why should this one be a priority? Well, tackling hiring bias directly contributes to solving **SDG 5 (Gender Equality), SDG 8 (Decent Work and Economic Growth), and SDG 10 (Reduced Inequalities).** And even if you don’t care about the UN’s Sustainable Development Goals, you definitely care about your business. Your success is directly tied to the people you hire—the better the talent, the better the results. So, eliminating bias isn’t just an ethical choice; it’s a strategic one.

# Our *genius* idea:

Me and my two buds had five hours in an inter-university hackathon, so we did what any logical, time-pressed students would do: threw together an AI-powered bias detector using Gemini. Was it groundbreaking? Nope. But did it work? Kind of.

**How It Worked:**

1. Recruiters write down why they accepted/rejected a candidate.
2. They upload this accepted/rejected document along with the resume of the candidate
3. Gemini goes through the resume to break it down into input for the ML
4. ML model (trained on a dataset we got from Kaggle) flags bias based on past hiring decisions, we also used LIME here to show the model's reasoning.
5. Gemini now has the ML's decision and the document so it just provides a analysis based on the information given to it - as in justifying the ML's decision

Sounded pretty good to us and it happened to work really well with 2 candidates, out of which; one was obviously a better choice. We thought we did a really decent job, the judges thought so too so we were able to get 6th place out of 57 teams but _real talk_—this solution had some serious flaws. And now that I think about it, this whole thing was a _terrible_ idea

# Why the Solution Sucked

Our goal was to build an ML model that detects bias, trained on a dataset from Kaggle that categorized hiring decisions as biased or unbiased. But here’s the problem—bias isn’t something you can simply label. Context matters.

A hiring decision doesn’t happen in isolation; it’s influenced by factors beyond just a resume. What if a candidate excels in all measurable areas but has a poorly written resume? In reality, resumes are just the first step—they help with initial screening, but the rest of the process, including interviews, behavioral assessments, and cultural fit, is evaluated by humans. And wherever humans are involved, both subconscious and conscious biases can creep in.

This raises a fundamental issue: we set out to detect bias, but if our primary data source (resumes) isn’t enough to capture the full decision-making process, then how reliable can our model really be? If we can’t properly define or measure bias within the broader hiring context, the entire premise of the system starts to fall apart.

Many companies already use AI screening tools to sift through large volumes of resumes, allowing human reviewers to evaluate only those that closely match the job description. Our bias detector functioned similarly, but with two key differences: it considered an additional document alongside the resume, and it was designed for the later stages of hiring rather than just the initial screening.

To truly eliminate bias, we’d need a bias-free parser and a way to ensure human bias doesn’t seep into the decision-making process at any stage. Initially, I considered incorporating more context—like interview performance, organizational values, and company mission—before allowing AI to assist in hiring decisions. But bias is a deeply complex issue. It’s not something that can be “solved” easily; at best, it can only be minimized.

Think about it—using a resume parser might seem like an efficient way to hire, but resumes alone don’t fully capture a candidate’s abilities. Even if they did, the parser itself—like any AI system—can carry its own biases. And once you move past that stage to human reviewers, another layer of potential bias enters the picture. So, no matter where you look, bias is always lurking in the background, making truly objective hiring a much tougher challenge than it seems.
