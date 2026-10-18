# Project Memory and Important Decisions

## Why Do We Have This Document?
This document serves as the "memory" of the Rank-Holder project. When building a complex website, it is easy to forget why certain choices were made weeks or months ago. This file records the important decisions we've made so far, how the project is currently set up, and what challenges we might need to fix in the future. Anyone joining the project can read this to quickly get up to speed.

## How Things Are Set Up Right Now
Currently, the main engine for our website is up and running smoothly on our local development computers. All user information is being saved locally in a secure database file called `rankholder.db`. When it comes to handling money, the website is successfully communicating with Razorpay to accept payments.

## Why We Did It This Way
- **Our Database Choice:** We chose to use a very simple, single-file database for now. We did this because it is extremely easy to set up and move around while we are still building the website. We don't have to worry about complicated database servers just yet.
- **Our Website Design Choice:** We decided to build the visible parts of the website using basic, standard coding languages instead of using heavy, complicated frameworks. This gives us complete control over every single detail and keeps the website fast and lightweight.

## Things We Need to Keep an Eye On
- **Backing Up Data:** Because our database is just a single file sitting on our server, we must remember to create a system that automatically backs up this file regularly. If that file gets lost or deleted right now, we would lose all our user data.
- **Organizing Our Code:** The main file that controls the entire website has grown very large (over 2,700 lines of code!). As the website gets bigger, this will become very hard to read and fix. In the future, we need to take some time to split this giant file into smaller, more organized pieces so it is easier to manage.
