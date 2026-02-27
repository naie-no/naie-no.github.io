*February 11, 2026  – Wessel Braakman*
> No LLM/GenAI was used to write this blog 🙂

## Introduction

In the previous blog posts in this series, we introduced the idea of building a kind of **Norwegian AI Bias Indicator**, where we translate **Bias Benchmark for Question Answering (BBQ)** to Norwegian context and language, and shared our first, preliminary results. The goal has been the same from the start: to understand how bias in large language models is influenced by language and cultural context, and to find a transparent and reproducible way to measure this bias in Norway.

The project changed significantly since part 2. What started as a small experiment has become more structured and more data-driven. We have expanded the dataset (still manually), tested more models, developed validation methods, and started collaboration with both international researchers and Norwegian institutions.

At the same time, the project has gained a more solid grounding. The work
is now carried out under the umbrella of **Norsk AI-Etikkforening (NAIE), a non-profit organization focused on responsible and ethical use of AI in Norway**.

Being part of NAIE means something. It gives the work a clearer foundation and stronger independence. This is not a commercial benchmark or a product comparison, but research-driven work governed by a shared goal of improving transparency, fairness and accountability in AI systems used in a Norwegian context.

## From 40 to 400+ prompts

In the very first phase, we worked with only 10 prompts in four
categories, which resulted in **40 translated and adapted questions**. That was enough to get started and uncover some interesting patterns, but it was also very limiting. With so few prompts, it is difficult to say anything about nuances, variation or consistency.

Over the last months, we have manually expanded the dataset to around 100 prompts within these four categories, which gives us **more than 400 prompts in total**.

![Progress](/blog/maling-av-fordommer-i-ai-systemer-del-3/1-progress.png)

This increase has made it possible to explore the dimension of prejudice within categories such as gender, age and nationality, through a much broader range of phrasing, tone and context.

Norwegian is not an easy language to test. Two written standards, strong dialect variations and many implicit cultural references mean that small changes in wording can have a big impact. By expanding the dataset, we have begun to capture more of this complexity. This gives us a much better basis for comparing models and for understanding where and how bias arises. For now, we focus only on Bokmål, but we will test AI systems against Nynorsk when we have completed our first full iteration.

This expansion is also a step on the way to the next goal: a comprehensive dataset of around 3,000 prompts for each of the four original categories, before we eventually build a complete dataset of around 3000 prompts for each of the total 11 categories. The last expansions will be carried out using templates and scripts, in the same way the original BBQ researchers generated their datasets.

## Testing more models

In part 2, we mainly focused on process: how to go from context and question to a finished prompt, how to submit them, and how to evaluate the answers. As in part 2, we ran the expanded dataset against **ChatGPT**, **Gemini** and **Perplexity**, three models with different backgrounds, training data and design choices.

![LLM](/blog/maling-av-fordommer-i-ai-systemer-del-3/2-llm.png

Some models often fell back on very cautious answers like “it cannot be determined,” while others were more definite and at times clearly less neutral. We also noticed that Norwegian questions did not always yield equally clear answers, especially when the prompt was based on subtle social or cultural signals rather than explicit information.

The original BBQ research was conducted at a much earlier stage in the development of LLMs. That meant that **the prompts that were submitted were not open questions, but included three answer options**. The models then had to choose one of these three. In our case, we asked **open questions**, which led to a model occasionally answering **“both 1 and 2,”** or even coming up with an alternative **“4”** where we expected one of three. This created more complexity, but also means that we do not feed the system ready-made answer options that can influence or steer the response.

## Scoring: automation with human control

After collecting the model responses, the next challenge was to evaluate them, i.e., to determine whether an answer matched the neutral or expected label.

We used a hybrid approach:

-   **Automated scoring**, where scripts map the answers to predefined options, ans0, ans1, ans2.
-   **Manual scoring** for answers that were ambiguous, indirect or strongly context-dependent.

![Scoring](/blog/maling-av-fordommer-i-ai-systemer-del-3/3-scoring.png)
![Scoring](/blog/maling-av-fordommer-i-ai-systemer-del-3/4-scoring.png)

**The automation** made it possible to **handle the scope of the dataset**, while **manual review** ensured that **linguistic nuances and Norwegian particularities were not smoothed out or misinterpreted**. The combination gave us a clearer picture of overall trends, for example when models systematically lean toward neutrality or consistently link certain demographic traits to certain outcomes.

## Collaboration and academic grounding

Along the way, we have had ongoing conversations with researchers and organizations working with bias and AI ethics.

We have benefited greatly from discussions with **Alicia Parrish**, one of the creators of the original BBQ dataset and the research behind it. Her feedback both confirmed and challenged parts of our Norwegian adaptation.
We have also discussed our approach with **Kathinka Vik** (now a board member in the association) from the Norwegian Equality and Anti-Discrimination Ombud (LDO), which has helped us connect the technical findings to real societal questions about discrimination and fairness.
In addition, we have shared thoughts and experiences with **Mascha Kurpicz-Briki** and her colleagues in **The Bias Project**.

These exchanges are important to us. They help ensure the work is both methodologically solid and socially relevant. Through NAIE, the goal is not only to measure bias, but to use the insights to support a more responsible and transparent use of AI in Norway.

## Preliminary results

![Graph](/blog/maling-av-fordommer-i-ai-systemer-del-3/5-graph.png)
\% Bias deviation per category per LLM\
Source: NoBBQ method, population ≅ 100 prompts, 2025-09-07

The figure above shows preliminary deviations in bias per category and model, based on approximately 100 prompts per category using the NoBBQ method. **Even though the dataset is still limited in size, we already see clear differences between the models within categories such as gender identity, age, nationality and religion.**

We observe that some models consistently show higher deviation in specific categories, while others more often fall back on neutral or indeterminate answers. The patterns suggest that bias does not manifest the same way everywhere, but varies both between models and between different social categories.

The results should be read as **exploratory** rather than **conclusive**. They provide an **early signal of how Norwegian language and context affect model behavior**, and they help us **identify where there is the greatest need for deeper analyses and further expansion of the dataset**. A more detailed explanation of methodology, evaluation process and limitations is available on the results page.

## What happens next: scaling and automation

With a larger dataset, more models and a more robust evaluation process in place, we are ready for the next phase.

Our main priorities are:

-   To **expand the dataset** further toward around 3,000 prompts for each of our four original bias categories, to better reflect the breadth of situations AI systems encounter.\
-   To **automate more of the process**, from generating prompts based on templates, to handling prompts, model requests and evaluation, so that NoBBQ becomes repeatable and sustainable over time.

![Plan](/blog/maling-av-fordommer-i-ai-systemer-del-3/6-plan.png)

The goal is to **move away from one-off evaluations** and toward **continuous monitoring**. This will enable us to track changes across model versions, compare systems over time and see whether new versions actually improve or worsen bias-related behavior.

We also explore closer collaboration with Norwegian academic environments and European initiatives, including the BIAS project at NTNU, to place our work in a broader research landscape.

## Reflections: to inform and to inspire

From the start, the project has had two ambitions:

First, to **inform**, by making bias in AI systems visible and measurable.
Second, to **inspire**, by showing that serious and ethical AI research can be carried out locally, in Norwegian and for Norwegian contexts.

What started as a small experiment has grown into long-term work with fairness in AI at its core. One of the clearest lessons so far is that fairness cannot be taken for granted. It must be tested, reassessed and continuously improved.

As we continue working to complete the NoBBQ research, the core mission is unchanged: to help ensure that AI systems used in Norway reflect the values of equality, diversity and fairness that our society is built on.

## Thanks

We would like to extend a big thank you to **Alicia Parrish, Kathinka Theodore Aakenes Vik, Mascha Kurpicz-Briki, The BIAS Project** and everyone else who has contributed through discussions, feedback and collaboration.

**NoBBQ** is now ongoing research work within **Norsk AI-Etikkforening (NAIE)**, where we continue to develop tools, insights and frameworks for responsible AI in Norway.

If you are interested in following the work or contributing in upcoming phases, we would love to hear from you. Contact information can be found on our website: **https://www.naie.no/**

Together we can help shape a more fair and transparent AI landscape in Norway.
