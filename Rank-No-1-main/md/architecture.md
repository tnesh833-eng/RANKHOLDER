# System Architecture

## How Everything Connects
This document explains how the Rank-Holder platform is built behind the scenes. Just like a house has a foundation, walls, and a roof, our software has different layers that work together to create a smooth experience for the user.

## The Public Face (Frontend)
This is the part of the website that users actually see on their screens. We built this using basic web building blocks: HTML (for the structure of the page), CSS (for making it look pretty), and JavaScript (to make buttons and forms interactive). We kept it simple and straightforward so it loads fast and is easy to maintain.

## The Brain of the Operation (Backend)
Behind the scenes, there is a powerful engine running on a technology called Node.js. Whenever a user clicks a button to log in or asks the AI a question, this engine receives the request, figures out what to do, and sends the right information back to the user's screen. It also has built-in security guards to make sure no one tries to guess passwords too many times or overload the website.

## The Safe Storage (Database)
We need a place to safely store all our user's accounts, passwords, and preferences. For this, we use a simple, file-based storage system. It acts like a secure digital filing cabinet. To make sure no one can peek at sensitive information, we lock (or encrypt) the data before putting it in the cabinet. 

## Taking Payments
When a user decides to buy a premium subscription, our engine talks securely to a financial service called Razorpay. Razorpay handles all the credit card and bank details safely, and then tells our engine that the payment was successful so we can unlock the premium features for that user.
