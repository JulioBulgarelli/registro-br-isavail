class BaseResult {
	code: number;
	description: string;

	constructor(code: number, description: string) {
		this.code = code;
		this.description = description;
	}
}

export class Available extends BaseResult {
	constructor() {
		super(0, 'Disponível');
	}
}

export class AvailableWithTickets extends BaseResult {
	tickets: string[] = [];

	constructor(tickets: string[]) {
		super(1, 'Disponível com Tickets');
		this.tickets = tickets;
	}
}

export class Registered extends BaseResult {
	expires: Date;
	alternatives: string[] = [];

	constructor(expires: Date, alternatives: string[]) {
		super(2, 'Registrado');
		this.expires = expires;
		alternatives.forEach((a) => this.alternatives.push(`.${a}.br`));
	}
}

export class Unavailable extends BaseResult {
	reason: string;
	alternatives: string[] = [];

	constructor(reason: string, alternatives: string[]) {
		super(3, 'Indisponível');
		this.reason = reason;
		alternatives.forEach((a) => this.alternatives.push(`.${a}.br`));
	}
}

export class InvalidQuery extends BaseResult {
	reason: string;

	constructor(reason: string) {
		super(4, 'Consulta Inválida');
		this.reason = reason;
	}
}

export class AwaitingClearanceProcess extends BaseResult {
	constructor() {
		super(5, 'Aguardando Processo de Liberação');
	}
}

export class ClearanceProcess extends BaseResult {
	beginDate: Date;
	endDate: Date;
	
	constructor(beginDate:Date, endDate: Date) {
		super(6, 'Em Processo de Liberação');
		this.beginDate = beginDate;
		this.endDate = endDate;
	}
}

export class ClearanceProcessWithTickets extends BaseResult {
	beginDate: Date;
	endDate: Date;
	tickets: string[] = [];
	
	constructor(beginDate:Date, endDate: Date, tickets: string[]) {
		super(7, 'Em Processo de Liberação com Tickets');
		this.beginDate = beginDate;
		this.endDate = endDate;
		tickets.forEach((t) => this.tickets.push(t));
	}
}

export class Error extends BaseResult {
	message: string;

	constructor(message: string) {
		super(8, 'Erro Desconhecido');
		this.message = message;
	}
}

export class CompetitiveClearanceProcess extends BaseResult {
	beginDate: Date;
	endDate: Date;
	acceptingUntil: Date;
	tickets: string[] = [];

	constructor(beginDate: Date, endDate: Date, acceptingUntil: Date, tickets: string[]) {
		super(9, 'Em Processo de Liberação Competitivo');
		this.beginDate = beginDate;
		this.endDate = endDate;
		this.acceptingUntil = acceptingUntil;
		tickets.forEach((t) => this.tickets.push(t));
	}
}


export interface Result {
	domain: string;
	status:
		| Available
		| AvailableWithTickets
		| Registered
		| InvalidQuery
		| Unavailable
		| AwaitingClearanceProcess
		| ClearanceProcess
		| ClearanceProcessWithTickets
		| Error
		| CompetitiveClearanceProcess;
}
