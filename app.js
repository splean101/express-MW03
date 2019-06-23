/*Создайте сервер с маршрутом, который содержит три параметра:
1.	Первое число (по умолчанию: 0);
2.	Операция (по умолчанию: add);
3.	Второе число (по умолчанию: 0).
В итоге, сервер в ответе, возвращает результат операции. Сервер должен понимать минимум две операции: сложение (add) и вычитание (sub).
Если будет задано меньше трех параметров, используются значения по умолчанию.
Если первый и/или третий параметр невозможно привести к типу Number – сервер должен вернуть статусный код 400.
Если вторым параметром задается неизвестная операция – сервер должен вернуть статусный код 400.*/
const express = require('express');

const app = express();
app.use('/:n1?/:op?/:n2', (req, res) => {
    if(isNaN(Number(req.params.n1)) || isNaN(Number(req.params.n2))) {
        res.status(400).end();    
    };
let n1 = Number(req.params.n1) || 0;
let n2 = Number(req.params.n2) || 0;
let operation = req.params.op || 'add';
let r = 0;
switch (operation) {
    case 'add':
        r = n1 + n2;
        operation = '+';
        break;
    case 'sub':
        r = n1 - n2;
        operation = '-';
        break;
    case 'mul':
        r = n1 * n2;
        operation = '*';
       break;
    case 'div':
        r = n1 / n2;
        operation = '/';
        break;
    default:
        res.status(400);
};
res.send(`${n1} ${operation} ${n2} = ${r}`)
}).listen(3000)