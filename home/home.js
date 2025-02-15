let BASE_URL = 'https://raw.githubusercontent.com/studyGOgratis/lijsten/refs/heads/main/';

(async () => {
    try {
        const container = document.getElementById('tree-container');
        const [data] = await Promise.all([
            fetchData(),
            waitForDOM()
        ]);
        if (!data) {
            return
        }
        container.innerHTML = '';
        createTree(data, container, '');
        const root = container.querySelector('.node');
        if (root) root.click();
    } catch (error) {
        showError("Error loading data: " + error.message);
    }
})();

async function fetchData() {
    let response
    try {
        response = await fetch(BASE_URL + 'index.json');
    } catch (error) {
        console.log("DEV modus")
        BASE_URL = ""
        showError("je hebt geen internet maar een test lijst is geladen")
        handleFileClick('testlijst', false)
        return
    }
    if (!response.ok) {
        console.log("DEV modus")
        BASE_URL = ""
        showError("er is iets fout gegaan maar een test lijst is geladen")
        handleFileClick('testlijst', false)
        return
    };
    return response.json();
}

function createTree(node, parentElement, currentPath) {
    const container = document.createElement('div');
    const nodeElement = document.createElement('div');

    // Skip the "lijsten" directory in the path
    const fullPath = node.name === 'lijsten'
        ? currentPath
        : `${currentPath}${node.name}`;

    nodeElement.className = `node ${node.type === 'file' ? 'node-file' : ''}`;
    nodeElement.innerHTML = `
        <span class="toggle-icon">${node.type === 'directory' ? '📁' : '📄'}</span>
        <span>${node.name}</span>
    `;

    if (node.type === 'file') {
        nodeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            handleFileClick(fullPath, true);
        });
    }

    container.appendChild(nodeElement);

    if (node.type === 'directory' && node.children) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children hidden';

        // Filter out root directory files
        const childrenToShow = node.name === 'lijsten'
            ? node.children.filter(child => child.type === 'directory')
            : node.children;

        childrenToShow.forEach(child => {
            // Add slash only if we're not at the root
            const newPath = node.name === 'lijsten'
                ? fullPath
                : `${fullPath}/`;
            createTree(child, childrenContainer, newPath);
        });

        nodeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const icon = nodeElement.querySelector('.toggle-icon');
            childrenContainer.classList.toggle('hidden');
            icon.textContent = icon.textContent === '📁' ? '📂' : '📁';
        });

        container.appendChild(childrenContainer);
    }

    parentElement.appendChild(container);
}

function handleFileClick(filePath, alert) {
    const fileUrl = `${BASE_URL}${filePath}`;
    console.log('File URL:', fileUrl);

    // Example action: Fetch and display file content
    fetch(fileUrl)
        .then(response => response.text())
        .then(content => {
            // code on click
            importlijsten_fromstr(content);
            if (alert) {
                alert(`Content of ${filePath}:\n\n${content.slice(0, 200)}...`);
            }
        })
        .catch(error => {
            console.error('Error fetching file:', error);
            alert(`Error loading file: ${error.message}`);
        });
}

function waitForDOM() {
    return new Promise(resolve => {
        document.readyState === 'complete' || document.readyState === 'interactive'
            ? resolve()
            : document.addEventListener('DOMContentLoaded', resolve);
    });
}

function showError(error) {
    const container = document.getElementById('tree-container');
    container.innerHTML = `
        <div style="color: #dc3545; padding: 20px; border: 1px solid #f5c6cb; border-radius: 4px; background: #f8d7da;">
            ${error}
        </div>
    `;
}