// Функція для генерації масиву цілих чисел
function generateArray() {
    let rows = parseInt(document.getElementById("rows").value); // parseInt - Converts a string to an integer
    let cols = parseInt(document.getElementById("cols").value);

    let array = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let randomNumber = Math.floor(Math.random() * 10); // Випадкове число від 0 до 9
            // floor - Returns the greatest integer less than or equal to its numeric argument 
            // random - Returns a pseudorandom number between 0 and 1
            // Math - An intrinsic object that provides basic mathematics functionality and constants
            row.push(randomNumber); // push - Appends new elements to the end of an array, and returns the new length of the array
        }
        array.push(row);
    }

    // Вивід згенерованого масиву на сторінку
    let arrayOutput = document.getElementById("arrayOutput");
    arrayOutput.innerText = "Згенерований масив: \n";
    array.forEach(function(row) { // forEach - Performs the specified action for each element in an array
        arrayOutput.innerText += row.join(" ") + "\n"; // join - Adds all the elements of an array into a string, separated by the specified separator string
    });
}

// Функція, яка знаходить найчастіше число в масиві
function findMostCommonNumber() {
    let arrayOutput = document.getElementById("arrayOutput");
    let arrayText = arrayOutput.innerText;
    if (!arrayText.includes("Згенерований масив")) { // includes - Returns true if searchString appears as a substring of the result of converting this object to a String, at one or more positions that are greater than or equal to position; otherwise, returns false
        arrayOutput.innerText = "Спочатку згенеруйте масив!";
        return;
    }

    // Отримання масиву з тексту
    let rows = arrayText.trim().split("\n").map(row => row.split(" ").map(Number));
    // trim - Removes the leading and trailing white space and line terminator characters from a string
    // split - Split a string into substrings using the specified separator and return them as an array
    // map - Calls a defined callback function on each element of an array, and returns an array that contains the results

    // Об'єкт для зберігання кількості появ кожного числа
    let counts = {};

    // Підрахунок кількості появ кожного числа в масив
    rows.forEach(function(row) { // forEach - Performs the specified action for each element in an array
        row.forEach(function(number) {
            counts[number] = (counts[number] || 0) + 1;
        });
    });

    // Знаходження максимальної кількості появ числа в масив
    let maxCount = Math.max(...Object.values(counts));
    // max - Returns the larger of a set of supplied numeric expressions
    // values - Returns an array of values of the enumerable properties of an object

    // Фільтрування чисел, що мають максимальну кількість появ
    let mostCommonNumbers = Object.keys(counts).filter(key => counts[key] === maxCount);
    // keys - Returns the names of the enumerable string properties and methods of an object
    // filter - Returns the elements of an array that meet the condition specified in a callback function

    // Вивід результату на сторінку
    let resultElement = document.getElementById("result_1");
    if (mostCommonNumbers.length === 1) {
        resultElement.innerText = "Найчастіше число: " + mostCommonNumbers[0] + ", Кількість появ: " + maxCount;
    } else {
        let result = "Найчастіші числа:";
        mostCommonNumbers.forEach(function(number) {
            result += "\nЧисло: " + number + ", Кількість появ: " + counts[number];
        });
        resultElement.innerText = result;
    }
}


// Завдання 2

// Функція для підрахунку кількості слів у кожному реченні
function countWordsInSentences() {
    // Отримуємо введений користувачем текст
    let text = document.getElementById("textInput").value.trim();
    // Розділяємо текст на речення за допомогою регулярного виразу, який визначає кінець речення
    let sentences = text.match(/[^.!?]+[.!?]+/g);
    /*
    Це регулярний вираз, який шукає підрядок тексту, який має наступну структуру:
    [^.!?]+: Це шаблон, який шукає будь-який набір символів, що не є крапкою, знаком оклику або знаком питання. [^...] у квадратних дужках вказує на "все, окрім", а + означає, що цей набір може зустрітися один або більше разів.
    [.!?]+: Це шаблон, який шукає будь-яку послідовність крапки, знаку оклику або знаку питання один або більше разів.
    /g в кінці регулярного виразу означає, що пошук буде глобальним, тобто він буде шукати всі входження патерну, а не зупинятися після першого збігу.
    */
    
    // Якщо не знайдено жодного речення, виводимо повідомлення
    if (!sentences) {
        document.getElementById("result_2").innerText = "Немає речень для обробки.";
        return;
    }
    // Очищаємо результат перед виведенням нових даних
    document.getElementById("result_2").innerHTML = "";
    // Для кожного речення обчислюємо кількість слів і виводимо результат
    sentences.forEach(function(sentence, index) {
        let wordCount = sentence.split(/\s+/).filter(function(word) {
            return word.trim() !== "";
        }).length;
        document.getElementById("result_2").innerHTML += "Речення " + (index + 1) + ": " + wordCount + " слів.<br>";
    });
}


// Завдання 3

/*
Числа Фібоначчі - це послідовність чисел, де кожне число (крім перших двох) дорівнює сумі двох попередніх чисел у послідовності. Послідовність зазвичай починається з 0 і 1: 0, 1, 1, 2, 3, 5, 8, 13, 21 і так далі.
*/

// Функція для обчислення n-го числа Фібоначчі
function calculateFibonacci() {
    // Отримання введеного значення n з поля вводу
    let n = parseInt(document.getElementById("fibInput").value);
    // parseInt - Converts a string to an integer
    // getElementById - Returns a reference to the first object with the specified value of the ID attribute

    // Перевірка на коректність введеного значення
    if (isNaN(n) || n < 0) {
        // Виведення повідомлення про некоректне введення
        document.getElementById("result_3").innerText = "Введіть додатне ціле число!";
        return;
    }

    // Ініціалізація змінних для чисел Фібоначчі
    let fib1 = 0;
    let fib2 = 1;
    let fib = 0;

    // Обчислення n-го числа Фібоначчі
    for (let i = 2; i <= n; i++) {
        fib = fib1 + fib2;
        fib1 = fib2;
        fib2 = fib;
    }

    // Виведення результату на сторінку
    document.getElementById("result_3").innerText = "n-те число Фібоначчі: " + fib;
}