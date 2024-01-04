function f1() { 
    document.getElementById("textarea1").style.fontWeight = "bold"; 
} 

function f2() { 
    document.getElementById("textarea1").style.fontStyle = "italic"; 
} 

function f3() { 
    document.getElementById("textarea1").style.textAlign = "left"; 
} 

function f4() { 
    document.getElementById("textarea1").style.textAlign = "center"; 
} 

function f5() { 
    document.getElementById("textarea1").style.textAlign = "right"; 
} 

function f6() { 
    document.getElementById("textarea1").style.textTransform = "uppercase"; 
} 

function f7() { 
    document.getElementById("textarea1").style.textTransform = "lowercase"; 
} 

function f8() { 
    document.getElementById("textarea1").style.textTransform = "capitalize"; 
} 

function f9() { 
    document.getElementById("textarea1").style.fontWeight = "normal"; 
    document.getElementById("textarea1").style.textAlign = "left"; 
    document.getElementById("textarea1").style.fontStyle = "normal"; 
    document.getElementById("textarea1").style.textTransform = "capitalize"; 
    document.getElementById("textarea1").value = " "; 
}

const textarea = document.getElementById("textarea1");
const suggestionDropdown = document.getElementById("suggestionDropdown");

// Function to replace text at the cursor position
function replaceTextAtCursor(newText) {
    const cursorPos = textarea.selectionStart;
    const textBefore = textarea.value.substring(0, cursorPos);
    const textAfter = textarea.value.substring(textarea.selectionEnd);
    textarea.value = textBefore + newText + textAfter;
    textarea.focus();
    textarea.setSelectionRange(cursorPos + newText.length, cursorPos + newText.length);
}

textarea.addEventListener("input", function (e) {
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = textarea.value.substring(0, cursorPos);
    const lastSlashIndex = textBeforeCursor.lastIndexOf("/");

    if (lastSlashIndex !== -1) {
        const textAfterSlash = textBeforeCursor.substring(lastSlashIndex + 1).toLowerCase();
        const storedHeadings = JSON.parse(localStorage.getItem("headings")) || [];

        // Filter suggestions based on textAfterSlash
        const suggestions = storedHeadings.filter(heading =>
            heading.toLowerCase().startsWith(textAfterSlash)
        );

        // Include functions f1() through f9() in suggestions
        const functions = [f1, f2, f3, f4, f5, f6, f7, f8, f9];
        suggestions.push(...functions.map(func => func.name));

        // Display suggestions in a dropdown or suggestion list
        suggestionDropdown.innerHTML = ""; // Clear previous suggestions

        if (suggestions.length > 0) {
            const suggestionList = document.createElement("ul");

            suggestions.forEach(suggestion => {
                const listItem = document.createElement("li");
                listItem.textContent = suggestion;
                suggestionList.appendChild(listItem);
            });

            // Position the suggestion dropdown near the cursor
            const textareaCoords = textarea.getBoundingClientRect();
            suggestionDropdown.style.top = `${textareaCoords.bottom}px`;
            suggestionDropdown.style.left = `${textareaCoords.left}px`;

            suggestionDropdown.appendChild(suggestionList);
            suggestionDropdown.style.display = "block"; // Show the dropdown
        } else {
            suggestionDropdown.style.display = "none"; // Hide the dropdown if no suggestions
        }
    } else {
        suggestionDropdown.style.display = "none"; // Hide the dropdown if no "/"
    }
});

// Event listener to handle selecting a suggestion from the dropdown
suggestionDropdown.addEventListener("click", function (e) {
    const selectedSuggestion = e.target.textContent;
    if (selectedSuggestion) {
        const selectedFunction = window[selectedSuggestion];
        if (typeof selectedFunction === "function") {
            selectedFunction();
        }
        suggestionDropdown.style.display = "none"; // Hide the dropdown after selection
    }
});
