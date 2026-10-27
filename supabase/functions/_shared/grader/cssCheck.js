// Pure CSS check, shared with the browser. Only depends on postcss.
import postcss from 'postcss'

const norm = (s) => String(s).trim().replace(/\s+/g, ' ').toLowerCase()

export function findCssDeclaration(cssText, { selector, property, value }) {
  let root
  try {
    root = postcss.parse(String(cssText ?? ''))
  } catch {
    return false
  }
  const wantSelector = norm(selector)
  const wantProperty = norm(property)
  const wantValue = norm(value)
  let found = false
  root.walkRules((rule) => {
    if (found) return false
    const matches = rule.selectors.some((s) => norm(s) === wantSelector)
    if (!matches) return
    rule.walkDecls((decl) => {
      if (norm(decl.prop) === wantProperty && norm(decl.value) === wantValue) found = true
    })
  })
  return found
}
