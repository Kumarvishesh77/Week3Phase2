/**
 * Skill-specific Question Pools for Randomized Assessments
 * Shuffling logic in the controller ensures a unique experience per attempt.
 */
const localQuestions = {
    "General": {
        "Beginner": [
            { "id": 1, "type": "mcq", "question": "What is the primary purpose of Git?", "options": ["Compile code", "Track changes and collaboration", "Design UI", "Database backup"], "answer": "Track changes and collaboration" },
            { "id": 2, "type": "mcq", "question": "What is a 'variable'?", "options": ["Constant value", "Named storage for data", "Syntax error", "Hardware component"], "answer": "Named storage for data" },
            { "id": 3, "type": "mcq", "question": "Fundamental data type for text?", "options": ["Integer", "Boolean", "String", "Float"], "answer": "String" },
            { "id": 4, "type": "mcq", "question": "What is 'HTML'?", "options": ["Markup Language", "Programming Language", "Database", "Operating System"], "answer": "Markup Language" },
            { "id": 5, "type": "mcq", "question": "Main function of an OS?", "options": ["Web browsing", "Manage hardware/software", "Write docs", "Play games"], "answer": "Manage hardware/software" },
            { "id": 6, "type": "mcq", "question": "Result of '10' + 5 in JS?", "options": ["15", "105", "Error", "NaN"], "answer": "105" },
            { "id": 7, "type": "mcq", "question": "HTTP method to retrieve data?", "options": ["POST", "PUT", "GET", "DELETE"], "answer": "GET" },
            { "id": 8, "type": "mcq", "question": "What is a 'database'?", "options": ["Monitor type", "Organized data collection", "Language", "Web server"], "answer": "Organized data collection" },
            { "id": 9, "type": "mcq", "question": "Purpose of a 'loop'?", "options": ["Exit program", "Execute code repeatedly", "Define variable", "Comment code"], "answer": "Execute code repeatedly" },
            { "id": 10, "type": "mcq", "question": "Used to style web pages?", "options": ["SQL", "Python", "CSS", "PHP"], "answer": "CSS" }
        ],
        "Intermediate": [
            { "id": 1, "type": "mcq", "question": "Difference between == and === in JS?", "options": ["No difference", "== checks value, === checks value and type", "== is faster", "=== is used for assignments"], "answer": "== checks value, === checks value and type" },
            { "id": 2, "type": "mcq", "question": "FIFO data structure?", "options": ["Stack", "Queue", "Tree", "Graph"], "answer": "Queue" },
            { "id": 3, "type": "mcq", "question": "What is 'Asynchronous Programming'?", "options": ["Sequential code", "Non-blocking execution", "Faster single-core run", "Local file writing"], "answer": "Non-blocking execution" },
            { "id": 4, "type": "mcq", "question": "SQL 'JOIN' purpose?", "options": ["Combine rows from tables", "Delete table", "Create DB", "Update record"], "answer": "Combine rows from tables" },
            { "id": 5, "type": "mcq", "question": "What is 'Dependency Injection'?", "options": ["Virus injection", "Object receives its dependencies", "Faster queries", "UI design tool"], "answer": "Object receives its dependencies" },
            { "id": 6, "type": "mcq", "question": "Example of NoSQL DB?", "options": ["MySQL", "Postgres", "MongoDB", "Oracle"], "answer": "MongoDB" },
            { "id": 7, "type": "mcq", "question": "Purpose of 'Docker'?", "options": ["Edit images", "Containerize applications", "Secure browsing", "Task management"], "answer": "Containerize applications" },
            { "id": 8, "type": "mcq", "question": "Python 'decorator'?", "options": ["Terminal style", "Add functionality to existing object", "Clean code tool", "Loop type"], "answer": "Add functionality to existing object" },
            { "id": 9, "type": "mcq", "question": "What is 'Unit Testing'?", "options": ["Full system test", "Testing individual components", "UI test only", "Manual test"], "answer": "Testing individual components" },
            { "id": 10, "type": "mcq", "question": "Which is a CSS framework?", "options": ["React", "Django", "Tailwind CSS", "Node.js"], "answer": "Tailwind CSS" }
        ],
        "Advanced": [
            { "id": 1, "type": "code", "question": "Debug this Python function for empty lists:", "code": "def get_avg(nums):\n  return sum(nums) / len(nums)", "options": ["sum(nums) // len(nums)", "sum(nums) / len(nums) if nums else 0", "sum(nums) / (len(nums) + 1)", "avg(nums)"], "answer": "sum(nums) / len(nums) if nums else 0" },
            { "id": 2, "type": "code", "question": "Identify the bug in this React useEffect loop:", "code": "useEffect(() => {\n  setCount(count + 1);\n}, [count]);", "options": ["Missing dependency", "Updating dependency inside useEffect", "Use prevCount", "Move to event handler"], "answer": "Updating dependency inside useEffect" },
            { "id": 3, "type": "code", "question": "Fix SQL query for year 2023:", "code": "SELECT COUNT(*) FROM users WHERE join_date = '2023'", "options": ["YEAR(join_date) = 2023", "join_date LIKE '2023%'", "Both A and B", "join_date == 2023"], "answer": "Both A and B" },
            { "id": 4, "type": "code", "question": "Debug Java NullPointerException prevention:", "code": "public void print(String s) {\n  if (s.equals(null)) System.out.println(s);\n}", "options": ["if (s == null)", "if (null.equals(s))", "if (s != null)", "if (s.isEmpty())"], "answer": "if (s != null)" },
            { "id": 5, "type": "code", "question": "Fix logic for JS deep clone:", "code": "function clone(obj) {\n  return Object.assign({}, obj);\n}", "options": ["JSON.parse(JSON.stringify(obj))", "{ ...obj }", "obj.clone()", "Object.create(obj)"], "answer": "JSON.parse(JSON.stringify(obj))" },
            { "id": 6, "type": "mcq", "question": "Which architectural pattern is best for a highly scalable, real-time application requiring low latency?", "options": ["Monolithic", "Event-Driven Microservices", "Serverless with direct DB access", "Traditional MVC with polling"], "answer": "Event-Driven Microservices" },
            { "id": 7, "type": "written", "question": "Explain the trade-offs between implementing optimistic vs. pessimistic locking in a distributed database system.", "answer": "Optimistic locking assumes conflicts are rare and uses versioning, offering higher performance but failing at commit time if a conflict occurs. Pessimistic locking prevents conflicts by locking resources, ensuring consistency but reducing concurrency and increasing the risk of deadlocks." },
            { "id": 8, "type": "mcq", "question": "In the context of Garbage Collection, what is the 'Stop-the-World' event?", "options": ["When all user threads are paused to perform GC", "When the server restarts", "When memory is full and the app crashes", "When a specific object is deleted"], "answer": "When all user threads are paused to perform GC" },
            { "id": 9, "type": "written", "question": "Describe how the 'Circuit Breaker' pattern prevents cascading failures in a microservices environment.", "answer": "The Circuit Breaker monitors for service failures. Once a threshold is reached, it 'trips,' immediately returning an error or fallback response for subsequent calls without hitting the failing service, thus allowing it to recover and preventing other services from exhausting resources." },
            { "id": 10, "type": "mcq", "question": "Which security principle suggests that an entity should only have access to the data and resources necessary for its legitimate purpose?", "options": ["Defense in Depth", "Least Privilege", "Separation of Duties", "Zero Trust"], "answer": "Least Privilege" }
        ]
    },
    "SQL": {
        "Beginner": [
            { "id": 1, "type": "mcq", "question": "What does SQL stand for?", "options": ["Structured Query Language", "Strong Question Logic", "Simple Query List", "System Query Language"], "answer": "Structured Query Language" },
            { "id": 2, "type": "mcq", "question": "Which command is used to fetch data from a table?", "options": ["GET", "FETCH", "SELECT", "SHOW"], "answer": "SELECT" },
            { "id": 3, "type": "mcq", "question": "Which clause is used to filter records?", "options": ["WHERE", "FILTER", "LIMIT", "SORT"], "answer": "WHERE" },
            { "id": 4, "type": "mcq", "question": "Which command is used to add new records to a table?", "options": ["ADD", "INSERT INTO", "PUT", "NEW"], "answer": "INSERT INTO" },
            { "id": 5, "type": "mcq", "question": "What does the 'PRIMARY KEY' constraint ensure?", "options": ["Data is encrypted", "Each row is uniquely identified", "The table is fast", "All columns have values"], "answer": "Each row is uniquely identified" }
        ],
        "Intermediate": [
            { "id": 1, "type": "mcq", "question": "What is the difference between INNER JOIN and LEFT JOIN?", "options": ["INNER returns only matches; LEFT returns all from left + matches", "INNER is faster", "LEFT returns only matches", "No difference"], "answer": "INNER returns only matches; LEFT returns all from left + matches" },
            { "id": 2, "type": "mcq", "question": "What is 'Normalization' in databases?", "options": ["Deleting old data", "Organizing data to minimize redundancy", "Speeding up backups", "Formatting strings"], "answer": "Organizing data to minimize redundancy" },
            { "id": 3, "type": "mcq", "question": "Which function is used to count the number of rows?", "options": ["TOTAL()", "SUM()", "COUNT()", "ROWS()"], "answer": "COUNT()" },
            { "id": 4, "type": "mcq", "question": "What is an 'Index' used for?", "options": ["To sort data only", "To speed up data retrieval", "To backup the database", "To create relationships"], "answer": "To speed up data retrieval" },
            { "id": 5, "type": "mcq", "question": "Which clause is used to group rows that have the same values?", "options": ["SORT BY", "GROUP BY", "ORDER BY", "COLLECT BY"], "answer": "GROUP BY" }
        ],
        "Advanced": [
            { "id": 1, "type": "code", "question": "Fix the logical error in this correlated subquery intended to find employees earning more than their department average:", "code": "SELECT * FROM emp e WHERE salary > (SELECT AVG(salary) FROM emp)", "options": ["WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept_id = e.dept_id)", "WHERE salary > AVG(salary)", "GROUP BY dept_id HAVING salary > AVG(salary)", "No fix needed"], "answer": "WHERE salary > (SELECT AVG(salary) FROM emp WHERE dept_id = e.dept_id)" },
            { "id": 2, "type": "code", "question": "Debug this transaction that fails to roll back on error in most default settings:", "code": "INSERT INTO t1 VALUES (1); INSERT INTO t2 VALUES ('wrong');", "options": ["Wrap in BEGIN TRANSACTION and COMMIT/ROLLBACK", "Use AUTO_COMMIT=0", "Both A and B", "SQL always rolls back"], "answer": "Both A and B" },
            { "id": 3, "type": "mcq", "question": "What is the primary trade-off when adding multiple indexes to a high-traffic table?", "options": ["Faster reads, Slower writes", "Slower reads, Faster writes", "More storage, Faster writes", "Less storage, Slower reads"], "answer": "Faster reads, Slower writes" },
            { "id": 4, "type": "written", "question": "Explain the concept of 'ACID' properties in the context of relational database transactions.", "answer": "ACID stands for Atomicity (all or nothing), Consistency (valid state transition), Isolation (concurrent execution results), and Durability (persistence after commit). These ensure reliable processing of database transactions." },
            { "id": 5, "type": "mcq", "question": "What is a 'Deadlock' in database management?", "options": ["When two or more transactions are waiting for each other to release locks", "When the database crashes", "When a query takes too long", "When data is corrupted"], "answer": "When two or more transactions are waiting for each other to release locks" }
        ]
    },
    "Cloud": {
        "Beginner": [
            { "id": 1, "type": "mcq", "question": "What is 'IaaS'?", "options": ["Infrastructure as a Service", "Internet as a System", "Interface as a Service", "Internal App Service"], "answer": "Infrastructure as a Service" },
            { "id": 2, "type": "mcq", "question": "Which of these is a public cloud provider?", "options": ["AWS", "Azure", "GCP", "All of the above"], "answer": "All of the above" },
            { "id": 3, "type": "mcq", "question": "What is 'Serverless' computing?", "options": ["Computing without servers", "Cloud provider manages server infrastructure dynamically", "Servers that are free of charge", "Running code offline"], "answer": "Cloud provider manages server infrastructure dynamically" }
        ],
        "Advanced": [
            { "id": 1, "type": "written", "question": "Describe the 'Shared Responsibility Model' in cloud security.", "answer": "The cloud provider is responsible for the security 'of' the cloud (infrastructure, hardware, etc.), while the customer is responsible for security 'in' the cloud (data, configuration, IAM, etc.)." },
            { "id": 2, "type": "mcq", "question": "What is 'Auto-scaling' designed to handle?", "options": ["Dynamic changes in demand/traffic", "Fixed server costs", "Manual backup scheduling", "Software updates"], "answer": "Dynamic changes in demand/traffic" }
        ]
    },
    "Python": {
        "Beginner": [
            { "id": 1, "type": "mcq", "question": "How do you start a comment in Python?", "options": ["//", "/*", "#", "--"], "answer": "#" },
            { "id": 2, "type": "mcq", "question": "Which data type is 'immutable' in Python?", "options": ["List", "Dictionary", "Tuple", "Set"], "answer": "Tuple" },
            { "id": 3, "type": "mcq", "question": "How do you define a function in Python?", "options": ["function myFunc():", "def myFunc():", "func myFunc():", "define myFunc():"], "answer": "def myFunc():" },
            { "id": 4, "type": "mcq", "question": "What is the correct file extension for Python files?", "options": [".pt", ".pyt", ".py", ".pyc"], "answer": ".py" },
            { "id": 5, "type": "mcq", "question": "Which of these is a Python keyword?", "options": ["switch", "unless", "lambda", "then"], "answer": "lambda" },
            { "id": 6, "type": "mcq", "question": "What is the result of 2 ** 3?", "options": ["6", "8", "9", "5"], "answer": "8" },
            { "id": 7, "type": "mcq", "question": "How do you create a list in Python?", "options": ["[]", "{}", "()", "<>"], "answer": "[]" },
            { "id": 8, "type": "mcq", "question": "Which function is used to get the length of a list?", "options": ["count()", "length()", "len()", "size()"], "answer": "len()" },
            { "id": 9, "type": "mcq", "question": "How do you print 'Hello' in Python?", "options": ["echo('Hello')", "print('Hello')", "printf('Hello')", "console.log('Hello')"], "answer": "print('Hello')" },
            { "id": 10, "type": "mcq", "question": "Which operator is used for floor division?", "options": ["/", "//", "%", "\\"], "answer": "//" }
        ],
        "Intermediate": [
            { "id": 1, "type": "mcq", "question": "What is a 'List Comprehension'?", "options": ["A way to explain lists", "A concise way to create lists", "A type of error", "A sorting algorithm"], "answer": "A concise way to create lists" },
            { "id": 2, "type": "mcq", "question": "What does the 'yield' keyword do?", "options": ["Returns a list", "Pauses function execution and returns a value to the caller", "Stop a loop", "Wait for user input"], "answer": "Pauses function execution and returns a value to the caller" },
            { "id": 3, "type": "mcq", "question": "Purpose of '__init__' method?", "options": ["Destroy object", "Initialize object attributes", "Print object", "Call private methods"], "answer": "Initialize object attributes" },
            { "id": 4, "type": "mcq", "question": "What are *args and **kwargs?", "options": ["Pointers", "Variable-length arguments", "Boolean flags", "Global constants"], "answer": "Variable-length arguments" },
            { "id": 5, "type": "mcq", "question": "Difference between 'append' and 'extend' in lists?", "options": ["None", "append adds single element, extend adds elements from iterable", "extend is faster", "append is for dictionaries"], "answer": "append adds single element, extend adds elements from iterable" },
            { "id": 6, "type": "mcq", "question": "What is 'PEP 8'?", "options": ["A math library", "Python Enhancement Proposal for coding style", "A version of Python", "A database connector"], "answer": "Python Enhancement Proposal for coding style" },
            { "id": 7, "type": "mcq", "question": "What does 'pip' stand for?", "options": ["Python Install Package", "Preferred Installer Program", "Package Interface Protocol", "Point in Point"], "answer": "Preferred Installer Program" },
            { "id": 8, "type": "mcq", "question": "Result of 'bool([])'?", "options": ["True", "False", "None", "Error"], "answer": "False" },
            { "id": 9, "type": "mcq", "question": "Purpose of 'with' statement?", "options": ["Create a class", "Simplify resource management (like file opening)", "Define a loop", "Import modules"], "answer": "Simplify resource management (like file opening)" },
            { "id": 10, "type": "mcq", "question": "How to handle exceptions in Python?", "options": ["try/catch", "try/except", "do/while", "catch/finally"], "answer": "try/except" }
        ],
        "Advanced": [
            { "id": 1, "type": "code", "question": "Fix the mutable default argument bug:", "code": "def add_item(item, items=[]):\n  items.append(item)\n  return items", "options": ["def add_item(item, items=None):\n  if items is None: items = []", "items = list(items)", "items = items.copy()", "No fix needed"], "answer": "def add_item(item, items=None):\n  if items is None: items = []" },
            { "id": 2, "type": "code", "question": "Debug this metaclass definition:", "code": "class MyMeta(type):\n  def __new__(cls, name, bases, attrs):\n    return super().__new__(cls, name, bases, attrs)", "options": ["Logic is correct", "Missing 'cls' in super call", "attrs must be a list", "bases must be a string"], "answer": "Logic is correct" },
            { "id": 3, "type": "code", "question": "Identify the issue in this GIL-impacted code:", "code": "threads = [Thread(target=cpu_bound_task) for _ in range(4)]\nfor t in threads: t.start()", "options": ["GIL prevents true parallel CPU execution", "Memory leak", "Deadlock", "Syntax error"], "answer": "GIL prevents true parallel CPU execution" },
            { "id": 4, "type": "code", "question": "Fix the recursion limit issue in this depth-first search:", "code": "def dfs(node):\n  for neighbor in node.neighbors:\n    dfs(neighbor)", "options": ["Use an explicit stack (iterative)", "sys.setrecursionlimit()", "Both A and B", "Use multi-threading"], "answer": "Both A and B" },
            { "id": 5, "type": "code", "question": "Debug this context manager:", "code": "class MyCtx:\n  def __enter__(self): return self\n  def __exit__(self): pass", "options": ["__exit__ must accept 4 arguments (self, exc_type, exc_val, exc_tb)", "Logic error in enter", "Missing return True", "Syntax error"], "answer": "__exit__ must accept 4 arguments (self, exc_type, exc_val, exc_tb)" },
            { "id": 6, "type": "mcq", "question": "Primary difference between Shallow and Deep Copy?", "options": ["Shallow copy creates new object but not nested ones", "Deep copy is for lists only", "No difference for objects", "Shallow is faster"], "answer": "Shallow copy creates new object but not nested ones" },
            { "id": 7, "type": "written", "question": "Describe how Python handles cyclic references in memory management.", "answer": "Python uses a cyclic garbage collector that periodically runs to detect and reclaim memory from objects that refer to each other but are no longer reachable from the program's root." },
            { "id": 8, "type": "mcq", "question": "Purpose of '__slots__'?", "options": ["Save memory by restricting attribute creation", "Speed up execution", "Define private variables", "Enable multiple inheritance"], "answer": "Save memory by restricting attribute creation" },
            { "id": 9, "type": "written", "question": "Explain the Global Interpreter Lock (GIL).", "answer": "The GIL is a mutex that protects access to Python objects, preventing multiple native threads from executing Python bytecodes at once. This simplifies memory management but limits CPU-bound task parallelism." },
            { "id": 10, "type": "mcq", "question": "Valid way to use 'asyncio' for concurrency?", "options": ["asyncio.gather(*tasks)", "asyncio.run_all(tasks)", "for t in tasks: t.run()", "await tasks"], "answer": "asyncio.gather(*tasks)" }
        ]
    },
    "JavaScript": {
        "Beginner": [
            { "id": 1, "type": "mcq", "question": "Which keyword defines a constant in JS?", "options": ["var", "let", "const", "fixed"], "answer": "const" },
            { "id": 2, "type": "mcq", "question": "How to select element by ID?", "options": ["getElementByName", "getElementById", "selectById", "querySelector('#')"], "answer": "getElementById" },
            { "id": 3, "type": "mcq", "question": "Event when user clicks element?", "options": ["onmouseclick", "onclick", "onpress", "onhit"], "answer": "onclick" },
            { "id": 4, "type": "mcq", "question": "Correct way to write JS array?", "options": ["(1,2,3)", "['red', 'blue']", "{1,2,3}", "'red', 'blue'"], "answer": "['red', 'blue']" },
            { "id": 5, "type": "mcq", "question": "How to add a comment in JS?", "options": ["# comment", "// comment", "/* comment", "<!-- comment -->"], "answer": "// comment" },
            { "id": 6, "type": "mcq", "question": "Round 7.25 to nearest integer?", "options": ["rnd(7.25)", "Math.round(7.25)", "round(7.25)", "Math.rnd(7.25)"], "answer": "Math.round(7.25)" },
            { "id": 7, "type": "mcq", "question": "Find highest value of x and y?", "options": ["Math.max(x, y)", "Math.ceil(x, y)", "top(x, y)", "ceil(x, y)"], "answer": "Math.max(x, y)" },
            { "id": 8, "type": "mcq", "question": "Assign a value to variable?", "options": ["*", "-", "=", "x"], "answer": "=" },
            { "id": 9, "type": "mcq", "question": "Result of '10' + 5?", "options": ["15", "105", "Error", "NaN"], "answer": "105" },
            { "id": 10, "type": "mcq", "question": "How to start a WHILE loop?", "options": ["while (i <= 10)", "while i <= 10", "loop while (i <= 10)", "do while (i <= 10)"], "answer": "while (i <= 10)" }
        ],
        "Intermediate": [
            { "id": 1, "type": "mcq", "question": "What is 'Hoisting'?", "options": ["Moving variables to top of scope", "Lifting DOM elements", "Event listener type", "Compiling code"], "answer": "Moving variables to top of scope" },
            { "id": 2, "type": "mcq", "question": "What is a 'Closure'?", "options": ["Closing a tab", "Function access to parent scope", "Ending a loop", "Private class"], "answer": "Function access to parent scope" },
            { "id": 3, "type": "mcq", "question": "Purpose of 'map()'?", "options": ["Create new array by performing function on each element", "Filter elements", "Find sum", "Sort array"], "answer": "Create new array by performing function on each element" },
            { "id": 4, "type": "mcq", "question": "What is 'NaN'?", "options": ["Not a Number", "New array Name", "Node and Network", "None and Null"], "answer": "Not a Number" },
            { "id": 5, "type": "mcq", "question": "Strict mode purpose?", "options": ["Faster execution", "Enforce better coding practices", "Disable features", "Hide warnings"], "answer": "Enforce better coding practices" },
            { "id": 6, "type": "mcq", "question": "Null vs Undefined?", "options": ["None", "Null is intentional absence, undefined means not assigned", "Undefined is faster", "Null is for objects only"], "answer": "Null is intentional absence, undefined means not assigned" },
            { "id": 7, "type": "mcq", "question": "Arrow Function purpose?", "options": ["Pointer function", "Shorthand syntax", "Boolean return", "Sorting method"], "answer": "Shorthand syntax" },
            { "id": 8, "type": "mcq", "question": "Promise.all() purpose?", "options": ["Resolves all promises in array", "Stops all promises", "Creates 10 promises", "Rejects all"], "answer": "Resolves all promises in array" },
            { "id": 9, "type": "mcq", "question": "Event Bubbling?", "options": ["Event goes up to parents", "Event goes down to children", "Event repeats", "Event cancels"], "answer": "Event goes up to parents" },
            { "id": 10, "type": "mcq", "question": "The 'this' keyword?", "options": ["Refers to current object", "Global scope only", "Variable name", "Loop counter"], "answer": "Refers to current object" }
        ],
        "Advanced": [
            { "id": 1, "type": "code", "question": "Fix this memory leak in a closure:", "code": "function leak() {\n  var bigData = new Array(1000).fill('x');\n  return function() { console.log('hi'); };\n}", "options": ["bigData = null before return", "Use 'let' instead of 'var'", "Don't use closures", "Logic is fine"], "answer": "bigData = null before return" },
            { "id": 2, "type": "code", "question": "Debug this Prototypal Inheritance:", "code": "Child.prototype = Parent.prototype;", "options": ["Should be Child.prototype = Object.create(Parent.prototype)", "Missing constructor assignment", "Both A and B", "Inheritance is correct"], "answer": "Both A and B" },
            { "id": 3, "type": "code", "question": "Identify the issue with this async/await in a loop:", "code": "items.forEach(async (i) => await process(i));", "options": ["Doesn't wait for all; use for...of or Promise.all", "Syntax error", "Missing try/catch", "forEach is not async"], "answer": "Doesn't wait for all; use for...of or Promise.all" },
            { "id": 4, "type": "code", "question": "Fix the 'this' context issue:", "code": "this.name = 'outer'; setTimeout(function() { console.log(this.name); }, 100);", "options": ["Use arrow function", "Use .bind(this)", "Both A and B", "Use var that = this"], "answer": "Both A and B" },
            { "id": 5, "type": "code", "question": "Debug this Proxy trap:", "code": "new Proxy(obj, { get: (t, p) => t[p] });", "options": ["Missing Receiver handling", "Syntax error", "Logic error", "Target not defined"], "answer": "Missing Receiver handling" },
            { "id": 6, "type": "mcq", "question": "Microtask vs Macrotask?", "options": ["Microtasks run before next Macrotask", "Macrotasks have higher priority", "Microtasks for UI only", "They are same"], "answer": "Microtasks run before next Macrotask" },
            { "id": 7, "type": "written", "question": "Explain V8 Hidden Classes optimization.", "answer": "V8 creates hidden classes for objects with the same structure. Adding properties in the same order allows objects to share a hidden class, enabling fast property lookups via inline caching." },
            { "id": 8, "type": "mcq", "question": "useMemo specifically optimizes what?", "options": ["Expensive re-calculations", "Children re-rendering", "Component mount speed", "Side effects"], "answer": "Expensive re-calculations" },
            { "id": 9, "type": "written", "question": "Describe Tree Shaking in JS bundlers.", "answer": "Tree shaking is dead-code elimination that uses static analysis of ES6 modules to remove unused exports from the final bundle, improving performance and reducing size." },
            { "id": 10, "type": "mcq", "question": "Correct way for private field in JS class?", "options": ["#field", "_field", "this.field", "@field"], "answer": "#field" }
        ]
    },
    "Java": {
        "Beginner": [
            { "id": 1, "type": "mcq", "question": "What is the entry point of a Java program?", "options": ["init()", "start()", "main()", "run()"], "answer": "main()" },
            { "id": 2, "type": "mcq", "question": "Which keyword is used to create an object?", "options": ["new", "create", "alloc", "make"], "answer": "new" },
            { "id": 3, "type": "mcq", "question": "Java file extension?", "options": [".jav", ".java", ".class", ".jv"], "answer": ".java" },
            { "id": 4, "type": "mcq", "question": "Which is a valid access modifier?", "options": ["public", "internal", "external", "shared"], "answer": "public" },
            { "id": 5, "type": "mcq", "question": "What is 'JRE'?", "options": ["Java Runtime Environment", "Java Real Edition", "Java Remote Engine", "Java Rapid Entry"], "answer": "Java Runtime Environment" },
            { "id": 6, "type": "mcq", "question": "Default value of an int?", "options": ["0", "null", "1", "-1"], "answer": "0" },
            { "id": 7, "type": "mcq", "question": "Which is NOT a primitive type?", "options": ["int", "boolean", "String", "char"], "answer": "String" },
            { "id": 8, "type": "mcq", "question": "How to define a class?", "options": ["class MyClass {}", "MyClass class {}", "define class MyClass", "new class MyClass"], "answer": "class MyClass {}" },
            { "id": 9, "type": "mcq", "question": "Keyword for inheritance?", "options": ["extends", "implements", "inherits", "using"], "answer": "extends" },
            { "id": 10, "type": "mcq", "question": "What is a 'Constructor'?", "options": ["Method to initialize object", "Static method", "Method to delete object", "Void method"], "answer": "Method to initialize object" }
        ],
        "Intermediate": [
            { "id": 1, "type": "mcq", "question": "What is 'Overloading'?", "options": ["Same method name, different parameters", "Same name, same parameters", "Method with too much code", "Method that returns null"], "answer": "Same method name, different parameters" },
            { "id": 2, "type": "mcq", "question": "What is an 'Interface'?", "options": ["Abstract type to specify behavior", "A concrete class", "A type of loop", "A database connection"], "answer": "Abstract type to specify behavior" },
            { "id": 3, "type": "mcq", "question": "The 'static' keyword?", "options": ["Belongs to class rather than instance", "Variable that changes", "Method that cannot be called", "Private variable"], "answer": "Belongs to class rather than instance" },
            { "id": 4, "type": "mcq", "question": "Purpose of 'final'?", "options": ["Prevents modification", "End of program", "Last method in class", "Deletes variable"], "answer": "Prevents modification" },
            { "id": 5, "type": "mcq", "question": "What is 'Garbage Collection'?", "options": ["Automatic memory management", "Deleting unused files", "Cleaning the keyboard", "Sorting data"], "answer": "Automatic memory management" },
            { "id": 6, "type": "mcq", "question": "Try-Catch purpose?", "options": ["Handle exceptions", "Speed up code", "Define variables", "Create loops"], "answer": "Handle exceptions" },
            { "id": 7, "type": "mcq", "question": "What is an 'ArrayList'?", "options": ["Resizable array", "Fixed size array", "Linked list", "Tree structure"], "answer": "Resizable array" },
            { "id": 8, "type": "mcq", "question": "Purpose of 'this'?", "options": ["Refers to current instance", "Refers to parent class", "Refers to static method", "Global variable"], "answer": "Refers to current instance" },
            { "id": 9, "type": "mcq", "question": "What is 'Polymorphism'?", "options": ["Ability of object to take many forms", "A type of loop", "A way to save data", "A security feature"], "answer": "Ability of object to take many forms" },
            { "id": 10, "type": "mcq", "question": "Abstract class vs Interface?", "options": ["Abstract class can have state/constructors, Interface only behavior", "No difference", "Interface is faster", "Abstract class is for small apps"], "answer": "Abstract class can have state/constructors, Interface only behavior" }
        ],
        "Advanced": [
            { "id": 1, "type": "code", "question": "Fix the race condition in this Java singleton:", "code": "public static getInstance() {\n  if (instance == null) instance = new Instance();\n  return instance;\n}", "options": ["Add synchronized to method", "Make instance final", "Use static block", "Singleton is fine"], "answer": "Add synchronized to method" },
            { "id": 2, "type": "code", "question": "Debug this off-by-one error in loop:", "code": "for (int i = 0; i <= arr.length; i++) {\n  print(arr[i]);\n}", "options": ["i < arr.length", "i <= arr.length - 1", "Both A and B", "i < arr.length + 1"], "answer": "Both A and B" },
            { "id": 3, "type": "code", "question": "Identify issue with 'Volatile' usage:", "code": "volatile int count = 0; void inc() { count++; }", "options": ["Volatile doesn't ensure atomicity for increments", "Count must be final", "Syntax error", "Volatile is correct here"], "answer": "Volatile doesn't ensure atomicity for increments" },
            { "id": 4, "type": "code", "question": "Fix memory leak in ThreadLocal usage:", "code": "ThreadLocal<MyObj> tl = new ThreadLocal<>(); tl.set(new MyObj());", "options": ["Must call tl.remove() after use", "Use WeakReference", "tl should be static", "ThreadLocal handles cleanup"], "answer": "Must call tl.remove() after use" },
            { "id": 5, "type": "code", "question": "Debug this Reflection access:", "code": "Method m = cls.getDeclaredMethod('myFunc'); m.invoke(obj);", "options": ["Must call m.setAccessible(true) if private", "Syntax error", "Target is missing", "No fix needed"], "answer": "Must call m.setAccessible(true) if private" },
            { "id": 6, "type": "mcq", "question": "What is the primary benefit of the Fork/Join framework?", "options": ["Efficiently uses multiple processors for recursive tasks", "Speeds up network calls", "Optimizes database connections", "Manages UI threads"], "answer": "Efficiently uses multiple processors for recursive tasks" },
            { "id": 7, "type": "written", "question": "Explain Java's 'Double-Checked Locking' for lazy initialization and its importance.", "answer": "Double-checked locking reduces overhead by checking for null twice, only locking the first time the object is created. It's important to use the 'volatile' keyword with the instance variable to ensure correct visibility across threads." },
            { "id": 8, "type": "mcq", "question": "In the context of the JVM, what is 'Escape Analysis'?", "options": ["Compiler optimization that determines if an object is accessible outside current method scope", "A way to escape infinite loops", "A security feature", "Memory cleanup strategy"], "answer": "Compiler optimization that determines if an object is accessible outside current method scope" },
            { "id": 9, "type": "written", "question": "Describe the 'PhantomReference' in Java and its common use case.", "answer": "A PhantomReference is the weakest reference type. It's used for advanced cleanup operations, like scheduling post-mortem cleanup tasks after an object has been finalized and reclaimed by GC, often as an alternative to finalization." },
            { "id": 10, "type": "mcq", "question": "Which of these is a benefit of using 'Optional' in Java 8+?", "options": ["Reduces NullPointerExceptions by providing a container for nullable values", "Makes code faster", "Deletes null objects", "Automates variable declaration"], "answer": "Reduces NullPointerExceptions by providing a container for nullable values" }
        ]
    },
    "Web Development": {
        "Beginner": [
            { "id": 1, "type": "mcq", "question": "What does CSS stand for?", "options": ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"], "answer": "Cascading Style Sheets" },
            { "id": 2, "type": "mcq", "question": "HTML tag for a hyperlink?", "options": ["<a>", "<link>", "<href>", "<i>"], "answer": "<a>" },
            { "id": 3, "type": "mcq", "question": "Which tag for largest heading?", "options": ["<h6>", "<head>", "<h1>", "<header>"], "answer": "<h1>" },
            { "id": 4, "type": "mcq", "question": "Purpose of 'alt' attribute for images?", "options": ["Alternative text for accessibility", "Image alignment", "Link to image", "Style for image"], "answer": "Alternative text for accessibility" },
            { "id": 5, "type": "mcq", "question": "Line break tag?", "options": ["<lb>", "<break>", "<br>", "<hr>"], "answer": "<br>" },
            { "id": 6, "type": "mcq", "question": "Correct HTML for checkbox?", "options": ["<check>", "<input type='checkbox'>", "<checkbox>", "<input type='check'>"], "answer": "<input type='checkbox'>" },
            { "id": 7, "type": "mcq", "question": "Background color in CSS?", "options": ["color:", "bg-color:", "background-color:", "bgcolor:"], "answer": "background-color:" },
            { "id": 8, "type": "mcq", "question": "Responsive Web Design goal?", "options": ["High speed only", "Adapt layout to screen size", "Use only HTML", "Add animations"], "answer": "Adapt layout to screen size" },
            { "id": 9, "type": "mcq", "question": "Default display for <div>?", "options": ["inline", "block", "none", "flex"], "answer": "block" },
            { "id": 10, "type": "mcq", "question": "Default display for <span>?", "options": ["inline", "block", "none", "flex"], "answer": "inline" }
        ],
        "Intermediate": [
            { "id": 1, "type": "mcq", "question": "What is 'Box Model'?", "options": ["Content, Padding, Border, Margin", "HTML, CSS, JS", "Header, Footer, Main", "None"], "answer": "Content, Padding, Border, Margin" },
            { "id": 2, "type": "mcq", "question": "CSS Flexbox purpose?", "options": ["Aligning items in container", "Connecting DB", "Writing JS", "Creating images"], "answer": "Aligning items in container" },
            { "id": 3, "type": "mcq", "question": "What is a 'Media Query'?", "options": ["Style based on screen size", "A database query", "A JS function", "A type of video"], "answer": "Style based on screen size" },
            { "id": 4, "type": "mcq", "question": "Purpose of 'z-index'?", "options": ["Stack order of elements", "Horizontal alignment", "Font size", "Zoom level"], "answer": "Stack order of elements" },
            { "id": 5, "type": "mcq", "question": "What is 'Bootstrap'?", "options": ["A framework for responsive frontend", "A backend language", "A database", "An OS"], "answer": "A framework for responsive frontend" },
            { "id": 6, "type": "mcq", "question": "Relative vs Absolute positioning?", "options": ["Relative is to self, Absolute is to parent", "No difference", "Relative is faster", "Absolute is for images only"], "answer": "Relative is to self, Absolute is to parent" },
            { "id": 7, "type": "mcq", "question": "CSS Grid vs Flexbox?", "options": ["Grid is 2D, Flexbox is 1D", "Flexbox is 2D", "No difference", "Grid is for fonts"], "answer": "Grid is 2D, Flexbox is 1D" },
            { "id": 8, "type": "mcq", "question": "HTTP vs HTTPS?", "options": ["S stands for Secure (Encryption)", "No difference", "HTTP is faster", "HTTPS is for payments only"], "answer": "S stands for Secure (Encryption)" },
            { "id": 9, "type": "mcq", "question": "Purpose of 'meta' tags?", "options": ["Provide metadata about HTML (SEO, viewport)", "Style the page", "Add scripts", "Link to other pages"], "answer": "Provide metadata about HTML (SEO, viewport)" },
            { "id": 10, "type": "mcq", "question": "Browser local storage?", "options": ["Stores data locally without expiration", "Temporary storage", "Server storage", "None"], "answer": "Stores data locally without expiration" }
        ],
        "Advanced": [
            { "id": 1, "type": "code", "question": "Fix the CSS specificity issue to ensure 'red' is applied:", "code": ".item { color: blue; } #unique.item { color: green; }", "options": ["Add !important to red", "Target #unique specifically", "Both A and B", "Change HTML order"], "answer": "Both A and B" },
            { "id": 2, "type": "code", "question": "Debug this Flexbox center alignment:", "code": ".container { display: flex; text-align: center; }", "options": ["justify-content: center; align-items: center;", "flex-direction: center", "margin: auto", "vertical-align: middle"], "answer": "justify-content: center; align-items: center;" },
            { "id": 3, "type": "code", "question": "Identify the performance issue:", "code": "img { width: 100%; height: auto; }", "options": ["Missing width/height attributes causing Layout Shift", "Syntax error", "Slow download", "Image format wrong"], "answer": "Missing width/height attributes causing Layout Shift" },
            { "id": 4, "type": "code", "question": "Fix the 'Content Security Policy' (CSP) violation:", "code": "Inline script <script>alert(1)</script> is blocked.", "options": ["Move script to external file", "Add nonce or hash", "Both A and B", "Disable CSP"], "answer": "Both A and B" },
            { "id": 5, "type": "code", "question": "Debug this semantic HTML for SEO:", "code": "<div>Company News</div> instead of <h1>", "options": ["Change div to h1", "Use main tag", "Add class='news'", "No change needed"], "answer": "Change div to h1" },
            { "id": 6, "type": "mcq", "question": "What is the primary benefit of 'Server-Side Rendering' (SSR)?", "options": ["Faster First Contentful Paint and better SEO", "Faster client-side routing", "Easier development", "Lower server load"], "answer": "Faster First Contentful Paint and better SEO" },
            { "id": 7, "type": "written", "question": "Explain the concept of 'Cross-Origin Resource Sharing' (CORS) and why it's a security feature.", "answer": "CORS is a browser security mechanism that uses HTTP headers to tell browsers whether to allow a web application running at one origin to access resources from a different origin. It prevents malicious scripts from making unauthorized requests to other servers on behalf of the user." },
            { "id": 8, "type": "mcq", "question": "In the context of PWA (Progressive Web Apps), what is a 'Service Worker'?", "options": ["A script that runs in the background to handle caching and offline features", "A UI component", "A database connector", "A type of server hardware"], "answer": "A script that runs in the background to handle caching and offline features" },
            { "id": 9, "type": "written", "question": "Describe the 'Critical Rendering Path' and how to optimize it for better web performance.", "answer": "The Critical Rendering Path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels on the screen. Optimization includes minifying assets, deferring non-critical JS, inlining critical CSS, and optimizing image delivery." },
            { "id": 10, "type": "mcq", "question": "Which of these is a valid way to reduce a website's 'Total Blocking Time' (TBT)?", "options": ["Breaking up long JS tasks into smaller chunks", "Downloading more images", "Adding more CSS animations", "Using only synchronous scripts"], "answer": "Breaking up long JS tasks into smaller chunks" }
        ]
    },
    "Testing": {
        "Beginner": [
            { "id": 1, "type": "mcq", "question": "What is the primary goal of Software Testing?", "options": ["Find defects", "Write code", "Design UI", "Sell product"], "answer": "Find defects" },
            { "id": 2, "type": "mcq", "question": "What is 'Black Box Testing'?", "options": ["Testing without code access", "Testing internal structure", "Hardware testing", "Unit testing"], "answer": "Testing without code access" },
            { "id": 3, "type": "mcq", "question": "What is 'Regression Testing'?", "options": ["Ensure new changes haven't broken old features", "Test new features only", "Test speed", "Test database"], "answer": "Ensure new changes haven't broken old features" },
            { "id": 4, "type": "mcq", "question": "Who performs Unit Testing?", "options": ["Developers", "Users", "Managers", "Customers"], "answer": "Developers" },
            { "id": 5, "type": "mcq", "question": "What is 'UAT'?", "options": ["User Acceptance Testing", "Unit Advanced Test", "Unified App Trial", "Under Access Test"], "answer": "User Acceptance Testing" },
            { "id": 6, "type": "mcq", "question": "What is a 'Bug'?", "options": ["Flaw in software causing incorrect result", "A fast feature", "A type of loop", "Database table"], "answer": "Flaw in software causing incorrect result" },
            { "id": 7, "type": "mcq", "question": "Purpose of a 'Test Plan'?", "options": ["Strategy and scope for testing", "Write code", "Deploy app", "Design graphics"], "answer": "Strategy and scope for testing" },
            { "id": 8, "type": "mcq", "question": "What is 'White Box Testing'?", "options": ["Testing internal code structure", "UI testing", "Manual test", "User feedback"], "answer": "Testing internal code structure" },
            { "id": 9, "type": "mcq", "question": "Priority vs Severity?", "options": ["Priority is urgency, Severity is impact", "They are same", "Priority is for bugs, Severity for code", "Severity is for speed"], "answer": "Priority is urgency, Severity is impact" },
            { "id": 10, "type": "mcq", "question": "Positive vs Negative testing?", "options": ["Positive uses valid data, Negative uses invalid", "Positive is for features", "Negative is faster", "No difference"], "answer": "Positive uses valid data, Negative uses invalid" }
        ],
        "Intermediate": [
            { "id": 1, "type": "mcq", "question": "What is 'Integration Testing'?", "options": ["Testing interaction between modules", "Testing single method", "Testing UI only", "Final user test"], "answer": "Testing interaction between modules" },
            { "id": 2, "type": "mcq", "question": "What is 'TDD'?", "options": ["Test Driven Development", "Total Data Design", "Team Device Deploy", "Task Detailed Doc"], "answer": "Test Driven Development" },
            { "id": 3, "type": "mcq", "question": "What is 'STLC'?", "options": ["Software Testing Life Cycle", "System Trial Logic Center", "Standard Task Level Control", "None"], "answer": "Software Testing Life Cycle" },
            { "id": 4, "type": "mcq", "question": "Purpose of 'Boundary Value Analysis'?", "options": ["Test at edges of input ranges", "Test random data", "Test UI speed", "Test database security"], "answer": "Test at edges of input ranges" },
            { "id": 5, "type": "mcq", "question": "What is a 'Test Case'?", "options": ["Specific inputs and expected results for a test", "A storage for code", "A bug report", "A project timeline"], "answer": "Specific inputs and expected results for a test" },
            { "id": 6, "type": "mcq", "question": "What is 'Equivalence Partitioning'?", "options": ["Dividing inputs into groups with similar behavior", "Repeating tests 10 times", "Testing only positive cases", "Sorting bugs"], "answer": "Dividing inputs into groups with similar behavior" },
            { "id": 7, "type": "mcq", "question": "What is 'Ad-hoc Testing'?", "options": ["Unplanned, informal testing", "Strict scheduled test", "Automated test", "Unit test"], "answer": "Unplanned, informal testing" },
            { "id": 8, "type": "mcq", "question": "Difference between Smoke and Sanity testing?", "options": ["Smoke tests critical path, Sanity tests specific bug fix", "No difference", "Sanity is faster", "Smoke is for databases"], "answer": "Smoke tests critical path, Sanity tests specific bug fix" },
            { "id": 9, "type": "mcq", "question": "Purpose of 'Exploratory Testing'?", "options": ["Simultaneous learning and test design", "Running old scripts", "Checking spelling", "Testing hardware"], "answer": "Simultaneous learning and test design" },
            { "id": 10, "type": "mcq", "question": "Test Automation benefit?", "options": ["Speed and repeatability", "Higher bug count always", "Replaces developers", "Cheaper for small tasks"], "answer": "Speed and repeatability" }
        ],
        "Advanced": [
            { "id": 1, "type": "code", "question": "Debug this Selenium test that fails intermittently:", "code": "driver.findElement(By.id('btn')).click();", "options": ["Add an explicit wait", "Increase timeout to 60s", "Use Thread.sleep(5000)", "ID is wrong"], "answer": "Add an explicit wait" },
            { "id": 2, "type": "code", "question": "Identify flaw in this Unit Test:", "code": "assertEquals(true, list.add('item'));", "options": ["Should verify side effects or list state, not just return value", "Syntax error", "Missing assert", "List is not defined"], "answer": "Should verify side effects or list state, not just return value" },
            { "id": 3, "type": "code", "question": "Fix logic in this API test assertion:", "code": "assert response.statusCode == 200; // Expected 201 for creation", "options": ["Change to 201", "Change to 404", "Assertion is correct", "Use statusText"], "answer": "Change to 201" },
            { "id": 4, "type": "code", "question": "Debug this JMeter thread group issue:", "code": "1000 users, 1s ramp-up causes server crash.", "options": ["Increase ramp-up time", "Reduce user count", "Both A and B", "Server is fine"], "answer": "Both A and B" },
            { "id": 5, "type": "code", "question": "Identify error in this Mockito mock:", "code": "when(service.getData()).thenReturn(null); // Method returns non-nullable", "options": ["Return a valid non-null object", "Mockito handles null", "Method is final", "Wrong service"], "answer": "Return a valid non-null object" },
            { "id": 6, "type": "mcq", "question": "What is 'Mutation Testing' used for?", "options": ["Evaluate quality of existing test cases", "Find new bugs", "Test database migration", "Check for viruses"], "answer": "Evaluate quality of existing test cases" },
            { "id": 7, "type": "written", "question": "Explain the difference between 'Load Testing', 'Stress Testing', and 'Endurance Testing'.", "answer": "Load testing checks performance under expected load. Stress testing pushes systems to the breaking point. Endurance testing (Soak testing) checks for resource leaks (like memory) over a long period of continuous use." },
            { "id": 8, "type": "mcq", "question": "In the context of CI/CD, what is the 'Shift Left' testing strategy?", "options": ["Performing testing earlier in the development lifecycle", "Focusing on UI only", "Moving tests to production", "Replacing manual testers with AI"], "answer": "Performing testing earlier in the development lifecycle" },
            { "id": 9, "type": "written", "question": "Describe how 'Performance Profiling' differs from 'Performance Testing'.", "answer": "Performance testing measures overall system behavior (speed, scale). Performance profiling is a deep-dive analysis into the code and resources to pinpoint specific bottlenecks like slow functions or high memory allocations." },
            { "id": 10, "type": "mcq", "question": "What does 'Orthogonal Array Testing' (OATS) help to optimize?", "options": ["Combinatorial testing of input parameters", "Database queries", "CSS rendering", "Network latency"], "answer": "Combinatorial testing of input parameters" }
        ]
    }
};

module.exports = localQuestions;
