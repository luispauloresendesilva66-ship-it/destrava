// "12:00 de 27/10" no horário de Brasília, a partir de um instante ISO.
export function formatRetry(iso) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hourCycle: 'h23',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
    })
      .formatToParts(new Date(iso))
      .map((p) => [p.type, p.value]),
  )
  return `Você poderá tentar de novo às ${parts.hour}:${parts.minute} de ${parts.day}/${parts.month}.`
}
