import {checkDomain, Result} from "./index";

test("bulgamart123.com.br is available", () => {
	checkDomain(
		"bulgamart123.com.br",
		(r: Result) => {
			expect(r.status.code).toBe(0);
		},
		false
	);
});

test("exemplo.com.br is unavailable", () => {
	checkDomain(
		"exemplo.com.br",
		(r: Result) => {
			expect(r.status.code).toBe(3);
		},
		false
	);
});

test("bulgamart.com.br is registered", () => {
	checkDomain(
		"bulgamart.com.br",
		(r: Result) => {
			expect(r.status.code).toBe(2);
		},
		false
	);
});

test("bulgamart.com.br.br.br.br is invalid query", () => {
	checkDomain(
		"bulgamart.com.br.br.br.br",
		(r: Result) => {
			expect(r.status.code).toBe(4);
		},
		false
	);
});
