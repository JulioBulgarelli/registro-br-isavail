# Implementação do Protocolo de Disponibilidade de Domí­nios ISAVAIL
## Versão 2 [Registro.br](https://registro.br/tecnologia/Protocolo-ISAVAILv2.txt)
Exemplo de utilização:

* Instale a dependência: `npm i -S @bulgamart/registro-br-isavail` ou `yarn add @bulgamart/registro-br-isavail`

* Importe a biblioteca:
```js
	const checkDomain = require("@bulgamart/registro-br-isavail").checkDomain;

	checkDomain("bulgamart.com.br", (r) => console.log(r)); // Sem DEBUG
	checkDomain("bulgamart.com.br", (r) => console.log(r), true); // Com DEBUG
```

* Respostas:
```json
	{
		"domain": "bulgamart.com.br",
		"status": {
			"code": 2,
			"description": "Registrado",
			"alternatives": [
				".agr.br", ".art.br",
				".blog.br", ".eco.br",
				".esp.br", ".etc.br",
				".far.br", ".flog.br",
				".imb.br", ".ind.br",
				".inf.br", ".net.br",
				".ong.br", ".rec.br",
				".srv.br", ".tmp.br",
				".tur.br", ".tv.br",
				".vlog.br", ".wiki.br"
			],
			"expires": "2020-03-31T00:00:00.000Z"
		}
	}
```

## Notas de Esclarecimento
A necessidade atual, razão pela qual essa biblioteca foi feita, é bem simples, e por isso foram omitidas algumas informações do Registro.br.
A utilização/extensão dessa biblioteca é livre.

## Licença MIT
Copyright 2019 Julio Bulgarelli @ BulgaMart

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
