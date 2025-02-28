document.addEventListener('DOMContentLoaded', function() {
    // Select all cells with the 'hidden' class
    const hiddenCells = document.querySelectorAll('.cell.hidden');

    // Add a click event listener to each hidden cell
    hiddenCells.forEach(cell => {
        cell.addEventListener('click', function() {
            // Remove the 'hidden' class from the clicked cell
            cell.classList.remove('hidden');
            // Check if all cells for the word are revealed
            checkWordCompletion(cell.getAttribute('data-word'));
        });
    });

    // Select all hint elements
    const hints = document.querySelectorAll('.hint');

    // Add a click event listener to each hint
    hints.forEach(hint => {
        hint.addEventListener('click', function() {
            // Get the data-word attribute of the clicked hint
            const word = hint.getAttribute('data-word');

            // Select all letter-cells with the same data-word attribute
            const letterCells = document.querySelectorAll(`.letter-cell[data-word="${word}"]`);

            // Remove the 'hidden' class from each matching letter-cell
            letterCells.forEach(cell => {
                cell.classList.remove('hidden');
            });

            // Add the 'line-t' class to the clicked hint
            hint.classList.add('line-t');
        });
    });

    // Function to check if all cells for a word are revealed
    function checkWordCompletion(word) {
        if (!word) return;
        const letterCells = document.querySelectorAll(`.letter-cell[data-word="${word}"]`);
        const allRevealed = Array.from(letterCells).every(cell => !cell.classList.contains('hidden'));
        if (allRevealed) {
            const hint = document.querySelector(`.hint[data-word="${word}"]`);
            if (hint) {
                hint.classList.add('line-t');
            }
        }
    }
});