const domainQuizData = {
    "Cloud & Enterprise IT": {
        "Beginner": [
            { "question": "What is the primary function of Microsoft Intune?", "options": ["Device and App management", "Graphic design", "Video editing", "Personal storage"], "answer": "Device and App management" },
            { "question": "Which tool in M365 is used for enterprise search and file management?", "options": ["SharePoint", "Teams", "PowerPoint", "Word"], "answer": "SharePoint" },
            { "question": "In Microsoft 365, what is the role of an 'Exchange' server?", "options": ["Email and Calendar management", "Hosting websites", "Database storage", "Cloud computing"], "answer": "Email and Calendar management" },
            { "question": "What is the purpose of a 'Compliance Policy' in Intune?", "options": ["To ensure devices meet security standards", "To change the desktop wallpaper", "To install games", "To increase device speed"], "answer": "To ensure devices meet security standards" },
            { "question": "What is Azure AD (now Microsoft Entra ID) used for?", "options": ["Identity and access management", "Hosting virtual machines", "Data backup", "Network routing"], "answer": "Identity and access management" },
            { "question": "What is a 'Global Administrator' in M365?", "options": ["The highest level of administrative access", "A type of user account", "A network engineer", "A customer support role"], "answer": "The highest level of administrative access" },
            { "question": "Which M365 service allows for real-time collaboration on documents?", "options": ["OneDrive/SharePoint", "Outlook", "Excel Mobile", "Publisher"], "answer": "OneDrive/SharePoint" },
            { "question": "What is 'Conditional Access'?", "options": ["Access control based on specific signals/rules", "Unlimited access to all apps", "A type of firewall", "A password reset tool"], "answer": "Access control based on specific signals/rules" },
            { "question": "What is the purpose of 'Windows Autopilot'?", "options": ["Automated deployment of Windows devices", "A tool for fixing hardware", "A web browser", "A game mode"], "answer": "Automated deployment of Windows devices" },
            { "question": "In Intune, what is an 'App Protection Policy'?", "options": ["Rules to secure corporate data within mobile apps", "A tool to delete apps", "A way to download free apps", "A screen time limit"], "answer": "Rules to secure corporate data within mobile apps" },
            { "question": "What is 'OneDrive for Business'?", "options": ["Cloud storage for individual employees", "A public file sharing site", "A local hard drive", "A social media platform"], "answer": "Cloud storage for individual employees" },
            { "question": "What does 'MFA' stand for in security?", "options": ["Multi-Factor Authentication", "Microsoft File Access", "Main Frame Application", "Multi Filter Analysis"], "answer": "Multi-Factor Authentication" },
            { "question": "Which service manages Microsoft 365 groups and memberships?", "options": ["Azure AD / Entra ID", "PowerPoint", "OneNote", "Outlook Desktop"], "answer": "Azure AD / Entra ID" },
            { "question": "What is the 'Office Customization Tool' used for?", "options": ["Configuring M365 app deployments", "Designing icons", "Editing photos", "Changing OS settings"], "answer": "Configuring M365 app deployments" },
            { "question": "What is a 'Mobile Application Management' (MAM) policy?", "options": ["Managing corporate data at the app level without full device enrollment", "A way to block all apps", "A type of mobile operating system", "A mobile phone store"], "answer": "Managing corporate data at the app level without full device enrollment" },
            { "question": "What is 'Microsoft Teams'?", "options": ["A hub for teamwork and communication", "A standalone email client", "A drawing application", "A database engine"], "answer": "A hub for teamwork and communication" },
            { "question": "What is the 'Admin Center' in Microsoft 365?", "options": ["A portal for managing services and users", "A tool for end-users to change settings", "A support chat", "A list of help documents"], "answer": "A portal for managing services and users" },
            { "question": "What is 'Data Loss Prevention' (DLP)?", "options": ["Policies to prevent sharing of sensitive data", "A way to backup files", "A tool to recover deleted emails", "A speed optimization tool"], "answer": "Policies to prevent sharing of sensitive data" },
            { "question": "What is 'Self-Service Password Reset' (SSPR)?", "options": ["Feature allowing users to reset their own passwords", "A tool for admins only", "A physical hardware token", "A way to bypass logins"], "answer": "Feature allowing users to reset their own passwords" },
            { "question": "Which protocol is primarily used by Outlook to connect to Exchange Online?", "options": ["MAPI over HTTP", "FTP", "SSH", "Telnet"], "answer": "MAPI over HTTP" }
        ],
        "Intermediate": [
             { "question": "How does Intune differ from SCCM?", "options": ["Intune is cloud-based, SCCM is primarily on-premises", "Intune is only for Mac, SCCM for Windows", "There is no difference", "Intune is for servers, SCCM for mobile"], "answer": "Intune is cloud-based, SCCM is primarily on-premises" },
             { "question": "What is a 'Configuration Profile' in Intune?", "options": ["A set of settings applied to devices", "A user's profile picture", "A list of installed hardware", "A type of user account"], "answer": "A set of settings applied to devices" }
             // (Add 18 more relevant intermediate questions)
        ],
        "Advanced": []
    },
    "Programming": {
        "Beginner": [
            { "question": "What is the primary characteristic of a 'variable'?", "options": ["It holds a value that can change during execution", "It is a fixed hardware component", "It is a type of syntax error", "It is a comment in the code"], "answer": "It holds a value that can change during execution" },
            { "question": "Which of these is a common primitive data type?", "options": ["Boolean", "Array", "Class", "Object"], "answer": "Boolean" },
            { "question": "What is an 'Array'?", "options": ["A collection of items stored at contiguous memory locations", "A single integer value", "A type of conditional statement", "A loop that never ends"], "answer": "A collection of items stored at contiguous memory locations" },
            { "question": "What does a 'return' statement do in a function?", "options": ["Sends a value back to the caller", "Stops the entire program", "Starts a new loop", "Prints to the console"], "answer": "Sends a value back to the caller" },
            { "question": "What is a 'String' in programming?", "options": ["A sequence of characters", "A numerical value", "A logic gate", "A type of hardware"], "answer": "A sequence of characters" },
            { "question": "What is the purpose of an 'if' statement?", "options": ["Conditional execution of code", "Repeating code multiple times", "Declaring a new class", "Importing a library"], "answer": "Conditional execution of code" },
            { "question": "What is an 'Algorithm'?", "options": ["A step-by-step procedure for solving a problem", "A type of computer screen", "A programming language", "A data storage unit"], "answer": "A step-by-step procedure for solving a problem" },
            { "question": "What is 'Source Code'?", "options": ["The readable version of a program written by a developer", "The binary data read by the CPU", "A list of computer hardware", "A type of software license"], "answer": "The readable version of a program written by a developer" },
            { "question": "What is a 'syntax error'?", "options": ["A mistake in the rules of the programming language", "A logic mistake that gives wrong results", "A hardware failure", "An internet connection issue"], "answer": "A mistake in the rules of the programming language" },
            { "question": "What is a 'Loop' used for?", "options": ["Repeating a block of code multiple times", "Ending a function early", "Changing a variable's name", "Displaying an image"], "answer": "Repeating a block of code multiple times" },
            { "question": "What is 'Debugging'?", "options": ["The process of finding and fixing errors in code", "Writing the initial draft of code", "Designing the user interface", "Deploying to a server"], "answer": "The process of finding and fixing errors in code" },
            { "question": "Which of these is NOT a high-level programming language?", "options": ["Assembly", "Java", "Python", "Ruby"], "answer": "Assembly" },
            { "question": "What is a 'Comment' in code?", "options": ["Notes for developers that are ignored by the compiler", "Code that executes only on weekends", "A way to increase program speed", "A popup message for users"], "answer": "Notes for developers that are ignored by the compiler" },
            { "question": "What is a 'Constant'?", "options": ["A value that cannot be changed during execution", "A variable that changes every second", "A type of function", "A hardware port"], "answer": "A value that cannot be changed during execution" },
            { "question": "What is the result of 'concatenating' two strings?", "options": ["Joining them together end-to-end", "Adding their numerical values", "Deleting both strings", "Converting them to uppercase"], "answer": "Joining them together end-to-end" },
            { "question": "What is an 'Integrated Development Environment' (IDE)?", "options": ["A software suite for writing and testing code", "A hardware component for graphics", "A type of internet browser", "A database server"], "answer": "A software suite for writing and testing code" },
            { "question": "What is 'Pseudo-code'?", "options": ["An informal high-level description of an algorithm", "Real code that doesn't run", "A programming language used in AI", "A type of computer virus"], "answer": "An informal high-level description of an algorithm" },
            { "question": "What is a 'Function' or 'Method'?", "options": ["A reusable block of code designed to perform a task", "A type of monitor", "A single line of text", "A way to save a file"], "answer": "A reusable block of code designed to perform a task" },
            { "question": "Which operator is typically used for 'equality' comparison?", "options": ["==", "=", "++", "--"], "answer": "==" },
            { "question": "What is 'Scope' in programming?", "options": ["The region of a program where a variable is accessible", "The speed of the program", "The size of the screen", "The weight of the source file"], "answer": "The region of a program where a variable is accessible" }
        ],
        "Intermediate": [],
        "Advanced": []
    },
    "Web Development": {
        "Beginner": [
            { "question": "What does HTML stand for?", "options": ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlink Text Management Language", "Hyper Tech Modern Language"], "answer": "Hyper Text Markup Language" },
            { "question": "Which tag is used to create a link to another web page?", "options": ["<a>", "<li>", "<link>", "<href>"], "answer": "<a>" },
            { "question": "Which property is used to change the background color in CSS?", "options": ["background-color", "color", "bg-color", "style-bg"], "answer": "background-color" },
            { "question": "What is the correct tag for the largest heading?", "options": ["<h1>", "<h6>", "<head>", "<header>"], "answer": "<h1>" },
            { "question": "Which attribute is used to provide an image source?", "options": ["src", "href", "alt", "link"], "answer": "src" },
            { "question": "What is the purpose of the <head> section in HTML?", "options": ["Contains metadata and links to styles/scripts", "Displays the main content", "Creates a footer", "Defines the navigation bar"], "answer": "Contains metadata and links to styles/scripts" },
            { "question": "How do you apply a class named 'active' in CSS?", "options": [".active { }", "#active { }", "active { }", "*active { }"], "answer": ".active { }" },
            { "question": "What does 'Responsive Design' mean?", "options": ["Layout that adapts to different screen sizes", "A website that loads fast", "A site that responds to voice", "A site with many animations"], "answer": "Layout that adapts to different screen sizes" },
            { "question": "Which tag is used for an unordered list?", "options": ["<ul>", "<ol>", "<li>", "<list>"], "answer": "<ul>" },
            { "question": "What is 'JavaScript' primarily used for in web development?", "options": ["Adding interactivity to web pages", "Creating the page structure", "Styling the layout", "Managing database hardware"], "answer": "Adding interactivity to web pages" },
            { "question": "What is the 'DOM'?", "options": ["Document Object Model", "Data Online Management", "Display Optimized Media", "Digital Object Method"], "answer": "Document Object Model" },
            { "question": "Which CSS property controls text size?", "options": ["font-size", "text-size", "font-style", "size-text"], "answer": "font-size" },
            { "question": "What is an 'id' selector in CSS?", "options": ["A unique identifier for one element", "A style for multiple elements", "A way to name a file", "A type of animation"], "answer": "A unique identifier for one element" },
            { "question": "What is the purpose of the 'alt' attribute in an image tag?", "options": ["Alternative text if the image fails to load", "Alignment of the image", "Image title for hover", "Link to a larger image"], "answer": "Alternative text if the image fails to load" },
            { "question": "Which HTML tag is used for a line break?", "options": ["<br>", "<lb>", "<break>", "<hr>"], "answer": "<br>" },
            { "question": "What is 'CSS'?", "options": ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheets", "Colorful Style Sheets"], "answer": "Cascading Style Sheets" },
            { "question": "Which tag defines a table row?", "options": ["<tr>", "<td>", "<th>", "<table>"], "answer": "<tr>" },
            { "question": "How do you center text in CSS?", "options": ["text-align: center;", "align: center;", "margin: center;", "vertical-align: middle;"], "answer": "text-align: center;" },
            { "question": "What is the purpose of the <footer> tag?", "options": ["Defines a footer for a document or section", "Creates a header", "Adds a background image", "Defines the main content"], "answer": "Defines a footer for a document or section" },
            { "question": "Which protocol is used to fetch web pages from a server?", "options": ["HTTP / HTTPS", "FTP", "SSH", "SMTP"], "answer": "HTTP / HTTPS" }
        ],
        "Intermediate": [],
        "Advanced": []
    },
    "Infrastructure": {
        "Beginner": [
            { "question": "What is an IP address?", "options": ["A unique numerical label for each device on a network", "A home address", "A hardware serial number", "A website password"], "answer": "A unique numerical label for each device on a network" },
            { "question": "What is the purpose of a Router?", "options": ["To forward data packets between computer networks", "To store files permanently", "To display images", "To type documents"], "answer": "To forward data packets between computer networks" },
            { "question": "What does 'DNS' stand for?", "options": ["Domain Name System", "Data Network System", "Digital Node Service", "Distributed Name Server"], "answer": "Domain Name System" },
            { "question": "What is a 'Firewall'?", "options": ["Network security system that monitors/controls traffic", "A fire protection device", "A type of fast CPU", "A cooling fan for servers"], "answer": "Network security system that monitors/controls traffic" },
            { "question": "What is 'Bandwidth' in networking?", "options": ["Maximum rate of data transfer across a path", "The size of a network cable", "The number of users on a network", "The weight of a router"], "answer": "Maximum rate of data transfer across a path" },
            { "question": "What is a 'Local Area Network' (LAN)?", "options": ["Network that covers a small geographic area like a home", "The entire internet", "A type of server", "A long-distance cable"], "answer": "Network that covers a small geographic area like a home" },
            { "question": "What is 'Wi-Fi'?", "options": ["Wireless local area networking technology", "A type of internet cable", "A fast computer", "A digital radio signal"], "answer": "Wireless local area networking technology" },
            { "question": "What does 'ping' do?", "options": ["Tests the reachability of a host on a network", "Sends an email", "Restarts the computer", "Deletes a file"], "answer": "Tests the reachability of a host on a network" },
            { "question": "What is a 'Switch' in a network?", "options": ["Device that connects devices within a network and uses packet switching", "A tool to turn off the PC", "A type of light bulb", "A software program"], "answer": "Device that connects devices within a network and uses packet switching" },
            { "question": "What is 'Cloud Computing'?", "options": ["On-demand availability of computer system resources over the internet", "Weather forecasting software", "A type of local hard drive", "A wireless mouse technology"], "answer": "On-demand availability of computer system resources over the internet" },
            { "question": "What is an 'Operating System' (OS)?", "options": ["Software that manages computer hardware and software resources", "A type of web browser", "A hardware device", "A list of files"], "answer": "Software that manages computer hardware and software resources" },
            { "question": "What is 'RAM'?", "options": ["Volatile memory for temporary data storage", "Permanent storage for files", "The main processor", "A network cable"], "answer": "Volatile memory for temporary data storage" },
            { "question": "What is a 'Server'?", "options": ["A computer that provides data to other computers", "A person who fixes computers", "A type of monitor", "A computer game"], "answer": "A computer that provides data to other computers" },
            { "question": "What does 'URL' stand for?", "options": ["Uniform Resource Locator", "Universal Resource Link", "United Resource List", "Uniform Reference Locator"], "answer": "Uniform Resource Locator" },
            { "question": "What is the purpose of an 'Ethernet' cable?", "options": ["To connect devices in a wired network", "To charge a laptop", "To connect a monitor", "To transmit audio signals"], "answer": "To connect devices in a wired network" },
            { "question": "What is 'Latency'?", "options": ["Delay in data communication over a network", "The speed of the internet", "The size of a data packet", "The number of servers"], "answer": "Delay in data communication over a network" },
            { "question": "What is a 'Gateway' in networking?", "options": ["A node that acts as an entrance to another network", "A physical gate in a data center", "A type of network cable", "A software license"], "answer": "A node that acts as an entrance to another network" },
            { "question": "What is 'DHCP'?", "options": ["Dynamic Host Configuration Protocol for assigning IP addresses", "A data backup method", "A type of encryption", "A hardware standard"], "answer": "Dynamic Host Configuration Protocol for assigning IP addresses" },
            { "question": "What is 'Virtualization'?", "options": ["Creating a virtual version of hardware or OS", "Playing video games", "Designing 3D models", "A type of network speed"], "answer": "Creating a virtual version of hardware or OS" },
            { "question": "What is 'Cyber Security'?", "options": ["Protection of computer systems from theft or damage", "Securing a physical building", "A type of firewall hardware", "Writing clean code"], "answer": "Protection of computer systems from theft or damage" }
        ],
        "Intermediate": [],
        "Advanced": []
    }
};
