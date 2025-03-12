document.addEventListener('DOMContentLoaded', function() {
    // Select all cells with the 'hidden' class
    const hiddenCells = document.querySelectorAll('.cell.hidden');

    // Add a click event listener to each hidden cell
    hiddenCells.forEach(cell => {
        cell.addEventListener('click', function() {
            // Remove the 'hidden' class from the clicked cell
            cell.classList.remove('hidden');
            // Get all classes that start with 'word-'
            const wordClasses = Array.from(cell.classList).filter(cls => cls.startsWith('word-'));
            // Extract the word names from the classes
            const words = wordClasses.map(cls => cls.replace('word-', ''));
            // Check if all cells for each word are revealed
            words.forEach(word => checkWordCompletion(word));
        });
    });

    // Select all hint elements
    const hints = document.querySelectorAll('.hint');

    // Add a click event listener to each hint
    hints.forEach(hint => {
        hint.addEventListener('click', function() {
            // Get the word class of the clicked hint
            const wordClass = Array.from(hint.classList).find(cls => cls.startsWith('word-'));
            const word = wordClass.replace('word-', '');

            // Select all letter-cells with the corresponding word class
            const letterCells = document.querySelectorAll(`.letter-cell.${wordClass}`);

            // Remove the 'hidden' class from each matching letter-cell
            letterCells.forEach(cell => {
                cell.classList.remove('hidden');
            });

            // Add the 'line-t' class to the clicked hint
            hint.classList.add('line-t');

            // Add the 'bleeding' class to the hint and letter-cells
            hint.classList.add('bleeding');
            letterCells.forEach(cell => {
                cell.classList.add('bleeding');
            });

            // Remove the 'bleeding' class after 1 second
            setTimeout(() => {
                hint.classList.remove('bleeding');
                letterCells.forEach(cell => {
                    cell.classList.remove('bleeding');
                });
            }, 300);

            // Close all other details elements and add the 'none' class
            const allDetails = document.querySelectorAll('.crossword-answers details');
            allDetails.forEach(detail => {
                if (detail !== document.querySelector(`.crossword-answers details.word-${word}`)) {
                    detail.open = false;
                }
            });

            // Reveal the details element if it exists
            const details = document.querySelector(`.crossword-answers details.word-${word}`);
            if (details) {
                details.classList.remove('none');
                details.open = true;
            }
        });
    });

    // Function to check if all cells for a word are revealed
    function checkWordCompletion(word) {
        if (!word) return;
        const letterCells = document.querySelectorAll(`.letter-cell.word-${word}`);
        const allRevealed = Array.from(letterCells).every(cell => !cell.classList.contains('hidden'));
        if (allRevealed) {
            const hint = document.querySelector(`.hint.word-${word}`);
            if (hint) {
                hint.classList.add('line-t');

                // Add the 'bleeding' class to the hint and letter-cells
                hint.classList.add('bleeding');
                letterCells.forEach(cell => {
                    cell.classList.add('bleeding');
                });

                // Remove the 'bleeding' class after 1 second
                setTimeout(() => {
                    hint.classList.remove('bleeding');
                    letterCells.forEach(cell => {
                        cell.classList.remove('bleeding');
                    });
                }, 300);

                // Close all other details elements and add the 'none' class
                const allDetails = document.querySelectorAll('.crossword-answers details');
                allDetails.forEach(detail => {
                    if (detail !== document.querySelector(`.crossword-answers details.word-${word}`)) {
                        detail.open = false;
                    }
                });

                // Reveal the details element if it exists
                const details = document.querySelector(`.crossword-answers details.word-${word}`);
                if (details) {
                    details.classList.remove('none');
                    details.open = true;
                }
            }
        }
    }
});