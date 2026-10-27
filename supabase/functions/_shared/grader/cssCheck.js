// Pure CSS check, shared with the browser. Only depends on postcss.
import postcss from 'postcss'

const collapse = (s) => String(s).trim().replace(/\s+/g, ' ')
const norm = (s) => collapse(s).toLowerCase()

export function findCssDeclaration(cssText, { selector, property, value }) {
  let root
  try {
    root = postcss.parse(String(cssText ?? ''))
  } catch {
    return false
  }
  // Selectors are case-sensitive; property and value are not.
  const wantSelector = collapse(selector)
  const wantProperty = norm(property)
  const wantValue = norm(value)
  let found = false
  root.walkRules((rule) => {
    if (found) return false
    if (!rule.selectors.some((s) => collapse(s) === wantSelector)) return
    rule.walkDecls((decl) => {
      if (norm(decl.prop) === wantProperty && norm(decl.value) === wantValue) found = true
    })
  })
  return found
}
