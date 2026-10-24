---
layout: page
title: Projects
order: 3
permalink: /projects/
description: Selected work in deployed perception, visual representations, annotation systems, and agentic applications.
---
My work connects computer vision and learned representations with the systems needed to use them. These selections span deployed engineering work and independent applications.

## Robot perception

**DELIVERS.AI · Semantic segmentation · Edge deployment**

I deployed PIDNet semantic segmentation on NVIDIA Jetson Xavier across a fleet of 20+ autonomous delivery robots. Optimizing CPU and GPU processing brought the segmentation pipeline to **8 FPS on Jetson Xavier**. My work also covered detection and tracking, annotation pipelines, and MLOps workflows.

In my earlier robotics role at DELIVERS.AI, I integrated segmentation outputs into the navigation stack for the same fleet and built ROS and Gazebo simulation environments.

## Auto-labeling

**DELIVERS.AI · System design · Human-in-the-loop vision**

I designed the full system and workflow for an internal annotation tool combining automatic bounding boxes and segmentation masks with human review and correction. I collaborated with the team on training the annotation models. The system was actively used for **two years**.

## Multimodal products

**Image–text fusion · DINOv2 · Classification · Clustering**

I combined Turkish-text and DINOv2 image embeddings and compared fusion strategies for product categorization. AutoGluon models predicted the most specific category in a product taxonomy, achieving **73.44% validation accuracy**.

I used HDBSCAN to identify five thematic product clusters and nearest-neighbor thresholds to assign products to concepts. Embeddings were cached in ChromaDB for reuse across experiments.

## Text-to-SQL

**Agent decomposition · FastAPI · React · SQLite**

I built a full-stack application that turns natural-language questions into SQL queries and conversational answers, with separate agents for question decomposition, SQL generation, and result synthesis.

The application used Llama and XiYanSQL-QwenCoder models, with M-Schema table and column metadata supplying SQL context. A FastAPI backend executed SQLite queries, while a React interface supported conversation history, CSV uploads, and configurable model settings.

## Public repositories

### Computer vision & generative AI pipelines

Configurable Python integrations for image understanding, segmentation, generation, and inpainting. I integrated Florence-2, SAM 2, and Stable Diffusion through reusable components built with Diffusers and Transformers, supporting custom checkpoints and CUDA execution.

[View the repository →](https://github.com/doguscank/gen-ai)

### Paper Organizer

A desktop application for organizing and retrieving research papers with categorization, summaries, and semantic search. It combines SciBERT embeddings, FAISS search, and Llama 3.2 through Groq for summarization and concept extraction.

[View the repository →](https://github.com/doguscank/paper-organizer)

## Current research

Alongside these projects, I research feature-space domain adaptation for semantic segmentation at ITU's Visual Perception Research Group. My ongoing work explores synthetic-to-real transfer from GTA V imagery to Cityscapes scenes and visual foundation-model feature alignment.

[Research and background →](/about/#education)
