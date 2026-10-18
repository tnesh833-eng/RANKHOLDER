const fs = require('fs');

let serverStr = fs.readFileSync('server.js', 'utf8');

// Find the insertion point before the catch-all route app.get("*")
const fallbackIdx = serverStr.lastIndexOf('app.get("*",');

if (fallbackIdx === -1) {
    console.error("Could not find fallback route in server.js");
    process.exit(1);
}

const lldRoutes = `
/* ─── LLD CODE ARENA ROUTES ────────────────────────────────────── */
app.get("/api/lld-questions", (req, res) => {
    // 10 real-time modeled questions derived from the Awesome LLD guide concepts
    const questions = [
        {
            id: 1,
            title: "Design a Parking Lot",
            tags: ["Google", "Amazon"],
            difficulty: "Medium",
            concept: "Object-Oriented Design, SOLID Principles",
            description: "Design a parking lot with multiple floors, spot types (compact, large, handicapped), and pricing strategies. How would you handle concurrent vehicle entry/exit?"
        },
        {
            id: 2,
            title: "Design an LRU Cache",
            tags: ["Amazon", "Microsoft"],
            difficulty: "Medium",
            concept: "Data Structures, Concurrency",
            description: "Design a Least Recently Used (LRU) Cache that supports get and put operations in O(1) time. How do you handle multi-threading?"
        },
        {
            id: 3,
            title: "Design a Vending Machine",
            tags: ["Zoho", "TCS"],
            difficulty: "Easy",
            concept: "State Design Pattern",
            description: "Design a Vending Machine that transitions between states (NoCoin, HasCoin, Dispensing, SoldOut) based on user actions."
        },
        {
            id: 4,
            title: "Design a Rate Limiter",
            tags: ["Meta", "Uber"],
            difficulty: "Hard",
            concept: "Concurrency, Algorithms (Token Bucket/Sliding Window)",
            description: "Design a distributed API rate limiter. Which algorithm would you use and how do you store the counters?"
        },
        {
            id: 5,
            title: "Design Tic-Tac-Toe",
            tags: ["Oracle", "Apple"],
            difficulty: "Easy",
            concept: "Class Relationships, Arrays",
            description: "Design a scalable Tic-Tac-Toe game that can support an NxN board and M players."
        },
        {
            id: 6,
            title: "Design a Task Management System (Jira)",
            tags: ["Atlassian", "IBM"],
            difficulty: "Medium",
            concept: "Observer Pattern, UML",
            description: "Design a task tracker where users can create, assign, and transition tasks. Subscribers should be notified of status changes."
        },
        {
            id: 7,
            title: "Design an Elevator System",
            tags: ["Google", "Cisco"],
            difficulty: "Hard",
            concept: "Strategy Pattern, State Machine",
            description: "Design a system for M elevators serving N floors. Explain your dispatching strategy (e.g., SCAN algorithm)."
        },
        {
            id: 8,
            title: "Design Amazon (Online Shopping)",
            tags: ["Amazon"],
            difficulty: "Hard",
            concept: "Microservices, Database Design",
            description: "Design the checkout and inventory reservation system for an e-commerce platform avoiding overselling."
        },
        {
            id: 9,
            title: "Design a Logger Framework",
            tags: ["Microsoft", "TCS"],
            difficulty: "Medium",
            concept: "Chain of Responsibility Pattern, Singleton",
            description: "Design a logging framework (like Log4j) supporting multiple log levels (INFO, DEBUG, ERROR) and multiple sinks (Console, File)."
        },
        {
            id: 10,
            title: "Design a Pub-Sub System (Kafka)",
            tags: ["AWS", "Meta"],
            difficulty: "Hard",
            concept: "Concurrency, Observer Pattern",
            description: "Design a Publish-Subscribe message broker. How do you handle topic partitions and consumer offsets?"
        }
    ];
    res.json({ success: true, data: questions });
});

app.post("/api/lld-evaluate", async (req, res) => {
    const { questionId, answer } = req.body;
    
    // Simple mocked evaluation for now, using a structured format
    // Ideally this calls Gemini for deep analysis.
    let status = "Needs Improvement";
    let isCorrect = false;
    
    if (answer && answer.length > 50) {
        status = "Good Approach";
        isCorrect = true;
    }
    
    const feedback = {
        isCorrect,
        status: isCorrect ? "Correct" : "Needs Review",
        reason: isCorrect 
            ? "Your answer addresses the core entities and applies basic object-oriented principles effectively. Good job covering the edge cases."
            : "The answer is too brief. Ensure you clarify requirements, define core entities, and explicitly mention which design patterns (like Strategy or Observer) you're using.",
        conceptApplied: "SOLID, Design Patterns",
        correctAnswer: "A complete solution should include: 1. Core Interfaces (Strategy/Observer). 2. Entity models with private fields. 3. Thread-safe data structures like ConcurrentHashMap. 4. Handling edge cases.",
        rating: isCorrect ? 4.5 : 2.5
    };

    res.json({ success: true, evaluation: feedback });
});

`;

serverStr = serverStr.substring(0, fallbackIdx) + lldRoutes + serverStr.substring(fallbackIdx);
fs.writeFileSync('server.js', serverStr);
console.log("Successfully patched server.js with LLD routes.");
