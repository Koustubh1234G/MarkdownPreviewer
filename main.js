// Define Markdown help content
const markdownHelp = {
    "textEditing": [
        { "command": "Bold", "description": "**Text** or __Text__" },
        { "command": "Italic", "description": "*Text* or _Text_" },
        { "command": "Headers", "description": "# Header 1\n## Header 2\n### Header 3" },
        { "command": "Lists", "description": "- Item 1\n- Item 2\n  - Subitem" },
        { "command": "Links", "description": "[Link Text](http://example.com)" },
        { "command": "Image", "description": "![alt text](image.jpg)" },
        { "command": "Hroizontal rule", "description": "---" },
        // Add more Markdown commands as needed
    ]
};

// Define MathJax help content
const mathJaxHelp = {
    "commands": [
        { "command": "Superscript", "description": "x^{y}" },
        { "command": "Subscript", "description": "x_{y}" },
        { "command": "Square Root", "description": "\\sqrt{x}" },
        { "command": "Fraction", "description": "\\frac{numerator}{denominator}" },
        // Add more MathJax commands as needed
    ]
};

// Function to display help content for the selected option
function showHelp(option) {
    const helpContent = document.getElementById('help-content');
    helpContent.innerHTML = ` <div class="button" id="markdown-help">Markdown</div>
                <div class="button" id="mathjax-help">Math</div>
                <div class="button" id="back-button">Back</div>`;    
    document.getElementById('markdown-help').style.display = 'none';
    document.getElementById('mathjax-help').style.display = 'none';

    let content;
    if (option === 'markdown') {
        content = markdownHelp.textEditing;
    } else if (option === 'mathjax') {
        content = mathJaxHelp.commands;
    } else {
        return; // Invalid option
    }

    // Generate HTML for help content

    const contentDiv = document.createElement('div');
    content.forEach(item => {
        const commandDiv = document.createElement('div');
        commandDiv.classList.add('command');

        const commandName = document.createElement('span');
        commandName.textContent = item.command;
        commandName.classList.add('command-name');

        const commandDescription = document.createElement('span');
        commandDescription.textContent = item.description;
        commandDescription.classList.add('command-description');

        commandDiv.appendChild(commandName);
        commandDiv.appendChild(commandDescription);

        contentDiv.appendChild(commandDiv);
    });
    backButton.style.display = "block";
    contentDiv.appendChild(backButton);
    helpContent.appendChild(contentDiv);
    
    backButton.addEventListener('click', function() {
        showTab('help');
        contentDiv.innerHTML = '';
        document.getElementById("markdown-help").style.display = 'block';
        document.getElementById("mathjax-help").style.display = 'block';
    });
}

// Add event listeners to the tabs
document.getElementById('editor').addEventListener('click', function() {
    showTab('editor');
});

document.getElementById('preview').addEventListener('click', function() {
    showTab('preview');
});

document.getElementById('help').addEventListener('click', function() {
    showTab('help');
});

// Function to show the selected tab
function showTab(tabName) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tabContent => {
        tabContent.style.display = 'none';
    });

    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show the selected tab content
    document.getElementById(tabName + '-content').style.display = 'block';

    // Add active class to the selected tab
    document.getElementById(tabName).classList.add('active');

    // If preview tab is selected, update the preview
    if (tabName === 'preview') {
        updatePreview();
    }
}

// Function to update the preview with Markdown content
function updatePreview() {
    const editorText = document.getElementById('editor-text').value;
    const previewContent = document.getElementById('preview-content');

    // Convert Markdown to HTML
    const html = marked(editorText);

    // Render the HTML content in the preview
    previewContent.innerHTML = html;

    // Render MathJax in the preview content
    MathJax.typeset([previewContent]);
}

// Show editor tab by default
showTab('editor');

// Check and apply the last color mode preference from local storage
document.addEventListener('DOMContentLoaded', function() {
    const colorMode = localStorage.getItem('colorMode');
    if (colorMode === 'dark') {
        toggleDarkMode();
    }
});

// change color mode
// funciton to toggle dark mode
const toggleDarkMode = () => {
    darkModeToggle.innerHTML = Cookies.get('theme') || "🌙";
    document.body.classList.toggle('dark-mode');
    // if darkmode show sun other wise show moon
    if (darkModeToggle.innerHTML === "🌞") {
        darkModeToggle.innerHTML = "🌙";
        Cookies.set('theme', "🌙");
    } else if (darkModeToggle.innerHTML === "🌙") {
        darkModeToggle.innerHTML = "🌞";
        Cookies.set('theme', "🌞");
    }
};

const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener('click', toggleDarkMode);

// function to save markdown content to a file
const editorText = document.getElementById("editor-text");
const saveMarkdown = () => {
    const markdownContent = editorText.value;
    const blob = new Blob([markdownContent], {type: 'text/markdown'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

const saveButton = document.getElementById("save-button");
saveButton.addEventListener('click', saveMarkdown);

// function to hancle opening a file
const openButton = document.getElementById("open-button");
openButton.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.md';

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const markdownContent = reader.result;
            editorText.value = markdownContent;
            updatePreview(); // update preview after loading file
        };

        reader.readAsText(file);
    });

    fileInput.click();
});

// Add event listener to help options
document.getElementById('markdown-help').addEventListener('click', function() {
    showHelp('markdown');
});

document.getElementById('mathjax-help').addEventListener('click', function() {
    showHelp('mathjax');
});

// functionalities of back button in help tab

function showMainHelpOptions() {
    helpContent.innerHTML = '';
    document.getElementById("markdown-help").style.display = 'block';
    document.getElementById("mathjax-help").style.display = 'block';
    document.getElementById("specific-help-content").style.display = 'none';
    backButton.style.display = 'none';
}

function showSpecificHelpContent() {
    document.getElementById("markdown-help").style.display = "none";
    document.getElementById("mathjax-help").style.display = "none";
    document.getElementById("specific-help-content").style.display = "block";
    // backButton.style.display = "block"; // showing backbutton
}
const backButton = document.getElementById("back-button");
backButton.style.display = 'none';
// alert("Cookies");
// set cookie
Cookies.set('theme', darkModeToggle.value);