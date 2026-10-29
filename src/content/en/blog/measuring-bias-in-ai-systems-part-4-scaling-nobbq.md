*August 18, 2026 -- Wessel Braakman*

> No LLM/GenAI was used to write this blog 🙂

## Introduction

It has been a while since we wrote part 3 about NoBBQ. We definitely
haven't been sitting still since then.

In the previous parts we wrote about how we started small, initially
testing only 10 questions in four different bias categories. We later
expanded this to around 100 questions per category, while also testing
different ways of asking the questions and analysing the responses.

Since then, things have grown quite a bit.

We have now completed the localisation of the first four categories and
run the full sets against four different AI systems: **ChatGPT-4o,
Gemini 2.5, Mistral Large and Borealis 27b**. This has resulted in
**48,803 responses** that we have collected and analysed.

That's quite a difference from where we started.

![Current NoBBQ results: % bias deviation per category per LLM](IMAGE-1-RESULTS-GRAPH.png)
*Current NoBBQ results based on 48,803 responses. Replace `IMAGE-1-RESULTS-GRAPH.png` with the final image path.*

The graph also looks quite different from the preliminary results we
shared in part 3. With almost 49,000 responses, the values have started
to settle compared with our early pilot runs.

There are still clear differences between both models and categories.
In this dataset, ChatGPT-4o shows the lowest bias deviation for gender,
age and nationality, while the results for religion are much closer
together. Age stands out as a category with relatively high deviation
for three of the four systems. Borealis 27b also shows considerably
higher deviation for gender and nationality than ChatGPT-4o in this
dataset.

These results don't mean that one model is simply "more biased" or
"less biased" than another in general. They show how these four systems
respond to the questions in the four NoBBQ categories we have completed
so far.

And the numbers turned out to be only part of the story.

It also doesn't mean that NoBBQ is finished. Our goal for a proper first
version of NoBBQ is to cover 11 categories. We currently have four
completed, which means another seven still need to be translated and,
more importantly, adapted to Norwegian language and context.

## Sometimes the models just make things up

NoBBQ is intended to measure bias. Hallucinations weren't really
something we were looking for.

We found them anyway.

One example involved a question about an elderly woman and a student. In
the information provided to the AI systems, there was no basis for
assigning additional responsibility to either person. Yet two of the
four systems did exactly that. They added reasoning about who was
responsible that simply wasn't present in the context we had given them.

![Example showing the original prompt and the hallucinated reasoning from two AI systems](IMAGE-2-HALLUCINATION-EXAMPLE.png)
*Example from the dataset. Replace `IMAGE-2-HALLUCINATION-EXAMPLE.png` with the final image path.*

This creates an interesting problem for us.

The benchmark primarily looks at the answer the system eventually
chooses. If the model selects one of the expected answers, we can
compare that against the expected result and calculate a score.

But what if the model selects an answer based on something it invented?

Then the final answer only tells part of the story.

This wasn't something we had specifically set out to measure, but with
tens of thousands of responses these kinds of patterns become much
easier to find.

## A correct answer isn't always a good answer

We also started seeing cases where the final answer looked perfectly
fine, but the reasoning behind it was less fine.

A model can reach the answer we expect while introducing assumptions
about the people in the question along the way. It can assign
motivations that weren't mentioned, make assumptions based on someone's
background, or add details to make its own interpretation of the
situation work.

If we only record the final answer, that response gets marked as
correct.

From a benchmark perspective, that makes sense. From an AI ethics
perspective, we're not sure that's enough.

This is one of the reasons why collecting more data has been useful.
We're not only getting more confidence in the numbers. We're also
finding behaviours that the numbers themselves don't necessarily show.

## Bias isn't always as simple as biased or not biased

Something else that became increasingly obvious is that it isn't always
useful to think of a response as simply biased or unbiased.

For example, a model might correctly avoid choosing the stereotypical
answer, but still introduce a stereotype while explaining why it made
that choice.

Another model might be extremely cautious and refuse to make assumptions
at all. That can be good when the context is ambiguous, because that's
exactly what we want it to do. But the same behaviour becomes a problem
if it also refuses to answer when the context actually contains enough
information.

So a low bias score doesn't automatically mean that a system is behaving
exactly as we would want it to.

What we ideally want is fairly simple: use the information that is
actually provided, and don't fill in the gaps using unsupported
assumptions.

Getting AI systems to consistently do that seems to be a little less
simple.

## 50,000 responses, but only four categories

The number of responses sounds like NoBBQ must be getting close to
finished.

We're not there yet.

So far we have completed four full categories. Seven more still need to
be localised before we have what we consider a proper V1 of the
benchmark.

![NoBBQ V1 progress: 4 of 11 categories localised](IMAGE-3-NOBBQ-PROGRESS.png)
*NoBBQ V1 progress. Replace `IMAGE-3-NOBBQ-PROGRESS.png` with the final image path.*

We deliberately call this localisation rather than just translation.

The original BBQ benchmark was created for an American, English-speaking
context. A question can be translated perfectly into Norwegian and still
make very little sense as a Norwegian bias test.

Occupations can have different associations here. Names can carry
different connotations. Institutions work differently. Stereotypes that
are well known in the US might be uncommon in Norway, while stereotypes
that exist here might not be represented in the original benchmark at
all.

We've already encountered questions where changing a few words is
enough, but also questions that need to be rewritten much more
substantially.

For the remaining seven categories we therefore don't want to simply
translate everything as quickly as possible so that we can say we're
done.

We want the questions to actually make sense in Norway.

That takes time.

## So, what's next?

First of all, seven more categories.

That will keep us busy for a while.

At the same time, we want to continue digging into the 48,803 responses we already have. There is a lot more in there than a
single bias score, and some of the unexpected behaviour we've found has
already made us rethink parts of how we analyse the results.

We've also started experimenting with newer AI models. That has created
some entirely different problems with our methodology, but that probably
deserves its own blog post.

For now, the goal is still the same as when we started: build a bias
benchmark that actually works for Norwegian language and Norwegian
context, and use it to better understand how the AI systems we
increasingly use behave here.

We're four categories in.

Seven to go.
