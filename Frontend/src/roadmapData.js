const roadmapData = {
    "HTML": {
        "Beginner": {
            "Week 1": ["Semantic HTML", "Tags & Attributes", "Forms & Validations"],
            "Practice": "Build a static registration form using semantic tags."
        },
        "Intermediate": {
            "Week 1": ["HTML5 Canvas", "SVG Graphics", "Audio/Video elements"],
            "Week 2": ["Web Storage API", "Geolocation API", "Drag and Drop API"],
            "Practice": "Create a basic drawing app using Canvas API."
        },
        "Advanced": {
            "Week 1": ["Web Components", "Shadow DOM", "Template elements"],
            "Practice": "Develop a custom reusable UI component without frameworks."
        }
    },
    "JavaScript": {
        "Beginner": {
            "Week 1": ["Variables & Data Types", "Functions & Scope", "DOM Manipulation"],
            "Practice": "Create a Todo List application with interactive features."
        },
        "Intermediate": {
            "Week 1": ["ES6+ Features", "Asynchronous JS (Promises, Async/Await)", "API Fetching"],
            "Week 2": ["Error Handling", "Closures & Hoisting", "Higher Order Functions"],
            "Practice": "Build a Weather App that fetches data from an external API."
        },
        "Advanced": {
            "Week 1": ["Functional Programming", "Prototypal Inheritance", "Memory Management"],
            "Practice": "Implement a state management library from scratch."
        }
    },
    "Python": {
        "Beginner": {
            "Week 1": ["Basic Syntax", "Control Flows (Loops, Ifs)", "Data Structures (Lists, Dicts)"],
            "Practice": "Write a script to automate basic file sorting."
        },
        "Intermediate": {
            "Week 1": ["List Comprehensions", "Modules & Packages", "Decorators"],
            "Week 2": ["Context Managers", "Iterators & Generators", "Exception Handling"],
            "Practice": "Create a data processing script using Pandas library."
        },
        "Advanced": {
            "Week 1": ["Metaclasses", "Multithreading & Multiprocessing", "Flask/Django internals"],
            "Practice": "Build a high-performance concurrent web scraper."
        }
    },
    "CSS": {
        "Beginner": {
            "Week 1": ["Box Model", "Flexbox basics", "Selectors & Specificity"],
            "Practice": "Design a responsive landing page layout."
        },
        "Intermediate": {
            "Week 1": ["CSS Grid", "Animations & Keyframes", "Transitions"],
            "Week 2": ["Responsive Typography", "CSS Filters & Blending", "BEM Methodology"],
            "Practice": "Create a complex grid-based gallery with hover effects."
        },
        "Advanced": {
            "Week 1": ["CSS Variables", "SASS/SCSS internals", "Container Queries"],
            "Practice": "Implement a full design system using CSS variables."
        }
    },
    "Java": {
        "Beginner": {
            "Week 1": ["Java Syntax", "Data Types", "Operators", "Control Flow"],
            "Practice": "Write a calculator program in Java."
        },
        "Intermediate": {
            "Week 1": ["OOPs Concepts", "Collections Framework", "Exception Handling"],
            "Week 2": ["Generics", "Enums", "File I/O"],
            "Practice": "Build a simple library management system."
        },
        "Advanced": {
            "Week 1": ["Multithreading", "Streams API", "Lambda Expressions"],
            "Practice": "Develop a high-performance concurrent application."
        }
    },
    "SQL": {
        "Beginner": {
            "Week 1": ["SELECT", "FROM", "WHERE", "ORDER BY"],
            "Practice": "Query a sample database to find specific records."
        },
        "Intermediate": {
            "Week 1": ["JOINS", "GROUP BY", "Aggregate Functions"],
            "Week 2": ["Subqueries", "Indexes", "Views"],
            "Practice": "Create complex queries involving multiple tables."
        },
        "Advanced": {
            "Week 1": ["Stored Procedures", "Triggers", "Query Optimization"],
            "Practice": "Optimize a slow-running SQL query using indexes and profiling."
        }
    },
    "Spring Boot": {
        "Beginner": {
            "Week 1": ["Dependency Injection", "Spring Boot Project Setup", "REST Controllers"],
            "Practice": "Create a simple 'Hello World' REST API."
        },
        "Intermediate": {
            "Week 1": ["Spring Data JPA", "H2 Database", "Service Layer"],
            "Week 2": ["Error Handling", "Validations", "Unit Testing (JUnit)"],
            "Practice": "Build a CRUD API for a Task Manager."
        },
        "Advanced": {
            "Week 1": ["Security (JWT)", "Microservices", "API Gateway"],
            "Practice": "Implement a secure microservices-based application."
        }
    },
    "Machine Learning": {
        "Beginner": {
            "Week 1": ["Linear Regression", "Decision Trees", "K-Means Clustering"],
            "Practice": "Train a simple model on a small dataset."
        },
        "Intermediate": {
            "Week 1": ["Random Forests", "SVM", "Neural Networks Basics"],
            "Week 2": ["Model Evaluation", "Hyperparameter Tuning", "Data Preprocessing"],
            "Practice": "Build a predictive model and evaluate its performance."
        },
        "Advanced": {
            "Week 1": ["Deep Learning", "NLP", "Computer Vision"],
            "Practice": "Implement a sentiment analysis model using LSTM."
        }
    },
    "Microsoft 365": {
        "Beginner": {
            "Week 1": ["Tenant Setup", "User Management", "License Assignment"],
            "Practice": "Create a M365 Developer Tenant and set up 5 users with different license types."
        },
        "Intermediate": {
            "Week 1": ["Exchange Online Management", "Teams Governance", "SharePoint Administration"],
            "Week 2": ["OneDrive Sync", "M365 Groups vs Security Groups", "Admin Center Navigation"],
            "Practice": "Configure a shared mailbox and set up a Teams meeting policy."
        },
        "Advanced": {
            "Week 1": ["Entra ID Connect (Hybrid)", "PowerShell Automation (MS Graph)", "Enterprise Apps & SSO"],
            "Practice": "Write a PowerShell script to automate the onboarding of 50 users from a CSV file."
        }
    },
    "Networking": {
        "Beginner": {
            "Week 1": ["DNS Basics (A, CNAME, MX)", "IPv4 vs IPv6", "Common Ports (80, 443)"],
            "Practice": "Use nslookup to verify the DNS records of your favorite websites."
        },
        "Intermediate": {
            "Week 1": ["M365 Network Requirements", "Firewall Rules & Proxy Settings", "VPN & ExpressRoute"],
            "Week 2": ["Network Connectivity Analyzer", "Latentcy & Jitter troubleshooting", "TLS/SSL Certificates"],
            "Practice": "Run the O365 Network Onboarding tool and analyze the results."
        },
        "Advanced": {
            "Week 1": ["SD-WAN Integration", "Global Load Balancing", "Zero Trust Network Access"],
            "Practice": "Design a high-availability network architecture for a global M365 deployment."
        }
    },
    "Security": {
        "Beginner": {
            "Week 1": ["MFA Fundamentals", "Basic Password Policies", "Microsoft Authenticator"],
            "Practice": "Enable MFA for all users in your developer tenant."
        },
        "Intermediate": {
            "Week 1": ["Conditional Access Policies", "Data Loss Prevention (DLP)", "Sensitivity Labels"],
            "Week 2": ["Azure Identity Protection", "OAuth2 & OpenID Connect", "M365 Secure Score"],
            "Practice": "Create a DLP policy to block sharing of Social Security numbers outside the organization."
        },
        "Advanced": {
            "Week 1": ["eDiscovery & Advanced Audit", "Customer Lockbox", "Insider Risk Management"],
            "Practice": "Perform a simulated security audit and implement 5 remediation actions from Secure Score."
        }
    }
};
