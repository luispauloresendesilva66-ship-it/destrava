import { describe, it, expect } from 'vitest'
import { fetchAllRows } from './fetchAllRows.js'

const table = Array.from({ length: 2500 }, (_, i) => ({ id: i }))

describe('fetchAllRows', () => {
  it('junta todas as páginas (2500 linhas)', async () => {
    const calls = []
    const rows = await fetchAllRows(async (from, to) => {
      calls.push([from, to])
      return { data: table.slice(from, to + 1), error: null }
    })
    expect(rows).toHaveLength(2500)
    expect(rows[2499].id).toBe(2499)
    expect(calls).toEqual([
      [0, 999],
      [1000, 1999],
      [2000, 2999],
    ])
  })

  it('lida com total múltiplo do tamanho da página', async () => {
    const two = table.slice(0, 2000)
    const rows = await fetchAllRows(async (from, to) => ({
      data: two.slice(from, to + 1),
      error: null,
    }))
    expect(rows).toHaveLength(2000)
  })

  it('lança o erro da consulta', async () => {
    const err = new Error('falhou')
    await expect(fetchAllRows(async () => ({ data: null, error: err }))).rejects.toBe(err)
  })
})
