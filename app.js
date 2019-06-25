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
app.use('/:n1?/:op?/:n2?', (req, res) => {
    let n1 = Number(req.params.n1) || 0;
    let n2 = Number(req.params.n2) || 0;
    console.log(req.params);
    let operation = req.params.op || 'add';
    let r, op;
    switch (operation) {
        case 'add':
            r = n1 + n2;
            op = '+';
            break;
        case 'sub':
            r = n1 - n2;
            op = '-';
            break;
        case 'mul':
            r = n1 * n2;
            op = '*';
            break;
        case 'div':
            r = n1 / n2;
            op = '/';
            break;
        default:
            op = 'fault';
    };
    if (req.params.n1 && n1 === 0 || req.params.n2 && n2 === 0 || op === 'fault') {
        res.status(400).end('status 400 sent');
    } else {
        res.send(`${n1} ${op} ${n2} = ${r}`);
    };
}).listen(3000);
//http://localhost:3000/7//8
//http://localhost:3000//div/8
