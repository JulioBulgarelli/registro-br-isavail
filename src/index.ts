import dgram from "dgram";

import {
	Result,
	Available,
	AvailableWithTickets,
	Registered,
	Unavailable,
	InvalidQuery,
	AwaitingClearanceProcess,
	ClearanceProcess,
	ClearanceProcessWithTickets,
	Error,
	CompetitiveClearanceProcess
} from "./result";

const checkDomain = (
	domain: string,
	listener: CallableFunction,
	debug: boolean = false
) => {
	if (debug) console.log("Criando Socket\n-------");
	const client = dgram.createSocket("udp4");

	if (debug) console.log("Criando Objeto Result\n-------");
	const result = {domain: domain} as Result;

	if (debug) console.log("Inicializando Contexto de Execução\n-------");
	let cookie = "00000000000000000000",
		min = 1000000000,
		max = 9999999999,
		token = Math.round(Math.random() * (max - min) + min);

	const parseNewCookie = (newCookieLine: string) => {
		if (debug) console.log("Interpretando Novo Cookie: " + newCookieLine + "\n-------");
		cookie = newCookieLine.split(" ")[1];
		sendMessage();
	};

	const sendMessage = () => {
		const finalMessage = `2 ${cookie} 1 ${token} ${domain} 1 ('200.160.2.3', 43)`;

		if (debug) console.log("Enviando Mensagem: " + finalMessage + "\n-------");
		client.send(finalMessage, 43, "whois.registro.br");
	};

	const handleMessage = (message: Buffer) => {
		if (debug) console.log("Tratando Mensagem:\n" + message + "\n-------");
		const lines = message.toString().split("\r\n");
		const status = lines[1].split(" ")[1];
		switch (status) {
			case "0":
				result.status = new Available();
				break;
			case "1":
				result.status = new AvailableWithTickets(lines[2].split("|"));
				break;
			case "2":
				result.status = new Registered(
					new Date(lines[3].split("|")[0]),
					lines[4].split("|")
				);
				break;
			case "3":
				result.status = new Unavailable(lines[3], lines[4].split("|"));
				break;
			case "4":
				result.status = new InvalidQuery(lines[3]);
				break;
			case "5":
				result.status = new AwaitingClearanceProcess();
				break;
			case "6":
				result.status = new ClearanceProcess(
					new Date(lines[3].split("|")[0]),
					new Date(lines[3].split("|")[1])
				);
				break;
			case "7":
				result.status = new ClearanceProcessWithTickets(
					new Date(lines[3].split("|")[0]),
					new Date(lines[3].split("|")[1]),
					lines[4].split("|")
				);
				break;
			case "8":
				result.status = new Error(lines[0]);
				break;
			case "9":
				result.status = new CompetitiveClearanceProcess(
					new Date(lines[3].split("|")[0]),
					new Date(lines[3].split("|")[1]),
					new Date(lines[3].split("|")[2]),
					lines[4].split("|")
				);
				break;
			default:
				result.status = new Error("Resposta Inválida:\n" + message);
				break;
		}

		if (debug) console.log("Chamando listener\n-------");
		listener(result);

		if (debug) console.log("Fechando Socket\n-------");
		client.close();
	};

	client.on("message", function(message) {
		if (debug) console.log("Recebendo Mensagem:\n" + message + "\n-------");
		if (message.toString().startsWith("CK")) parseNewCookie(message.toString());
		else handleMessage(message);
	});

	sendMessage();
};

export {Result, checkDomain};
