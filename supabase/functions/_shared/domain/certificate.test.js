import { describe, it, expect } from 'vitest';
import { computeWorkloadHours, CODE_ALPHABET, generateCertificateCode } from './certificate.js';

describe('computeWorkloadHours', () => {
  it('soma aulas, exercicios e prova em horas', () => {
    expect(computeWorkloadHours({
      lessonDurationsSeconds: Array(12).fill(1500), exerciseMinutes: 240, examMinutes: 60,
    })).toBe(10);
  });
  it('aplica o minimo de 1 hora', () => {
    expect(computeWorkloadHours({
      lessonDurationsSeconds: [1200, 1200], exerciseMinutes: 0, examMinutes: 0,
    })).toBe(1);
  });
  it('arredonda 1,5 para cima', () => {
    expect(computeWorkloadHours({
      lessonDurationsSeconds: [1800, 1800, 1800], exerciseMinutes: 0, examMinutes: 0,
    })).toBe(2);
  });
});

describe('generateCertificateCode', () => {
  const re = /^DTV-[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{4}-[ABCDEFGHJKMNPQRSTUVWXYZ23456789]{4}$/;
  it('usa o alfabeto sem caracteres ambiguos', () => {
    expect(CODE_ALPHABET).toBe('ABCDEFGHJKMNPQRSTUVWXYZ23456789');
  });
  it('gera codigo no formato esperado com o default', () => {
    expect(generateCertificateCode()).toMatch(re);
  });
  it('e deterministico com randomBytes fixo', () => {
    const fixed = (n) => Uint8Array.from({ length: n }, (_, i) => i);
    const code = generateCertificateCode(fixed);
    expect(code).toBe('DTV-ABCD-EFGH');
    expect(code).toMatch(re);
  });
  it('aplica modulo no byte (255 % 31 = 7 = H)', () => {
    expect(generateCertificateCode((n) => new Uint8Array(n).fill(255))).toBe('DTV-HHHH-HHHH');
  });
});
