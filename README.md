# ЛР 2. Calculator. JavaScript

**Студент:** Верзаков Н.В.
**Группа:** ИУ5-44Б

**Тема:** Уведомления электронных услуг

**Цель** данной лабораторной работы - знакомство с инструментами построения пользовательских интерфейсов web-сайтов: HTML, CSS, JavaScript. В ходе выполнения работы, вам предстоит продолжить реализовывать простой калькулятор, и затем выполнить задания по варианту.

## План

1. Программирование логики с помощью JavaScript
2. Доступ к HTML-элементам из JavaScript
3. Программирование кнопок калькулятора
4. Запуск калькулятора с помощью LiveServer
5. Задание

## Дополнительное задание
**Условие:** сделать проверку чисел на Infinity

**Решение:** (добавил проверки isFinite())
```javascript
function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if (!Number.isFinite(Number(value))) {
            leftNumber = '';
        }
        if ((digit !== '.') || (digit === '.' && !leftNumber.includes(digit))) {
            leftNumber += digit;
        }
        outputElement.innerHTML = leftNumber;
    }
    else {
        if (!Number.isFinite(Number(value))) {
            rightNumber = '';
        }
        if ((digit !== '.') || (digit === '.' && !rightNumber.includes(digit))) {
            rightNumber += digit;
            outputElement.innerHTML = rightNumber;
        }
    }
}
