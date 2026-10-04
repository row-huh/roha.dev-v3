// Small dependency-free syntax highlighter for blog code blocks.
// Takes raw code and returns HTML with <span class="tok-*"> wrappers.

interface Language {
  comment: string
  string: string
  keywords: Set<string>
  constants: Set<string>
  caseInsensitive?: boolean
}

const words = (list: string) => new Set(list.split(" "))

const DOUBLE = String.raw`"(?:\\.|[^"\\\n])*"`
const SINGLE = String.raw`'(?:\\.|[^'\\\n])*'`
const C_COMMENT = String.raw`\/\/[^\n]*|\/\*[\s\S]*?\*\/`

const python: Language = {
  comment: String.raw`#[^\n]*`,
  string: String.raw`[rbfuRBFU]{0,2}(?:"""[\s\S]*?"""|'''[\s\S]*?'''|${DOUBLE}|${SINGLE})`,
  keywords: words(
    "and as assert async await break class continue def del elif else except finally for from global if import in is lambda nonlocal not or pass raise return try while with yield match case",
  ),
  constants: words("True False None self cls"),
}

const javascript: Language = {
  comment: C_COMMENT,
  string: String.raw`${DOUBLE}|${SINGLE}|` + "`(?:\\\\.|[^`\\\\])*`",
  keywords: words(
    "as async await break case catch class const continue debugger default delete do else enum export extends finally for from function get if implements import in instanceof interface let new of private protected public readonly return set static super switch throw try type typeof var void while yield",
  ),
  constants: words("true false null undefined NaN Infinity this"),
}

const cLike: Language = {
  comment: C_COMMENT,
  string: `${DOUBLE}|${SINGLE}`,
  keywords: words(
    "abstract auto bool break case catch char class const continue default defer do double else enum extern final float fn for func go goto if impl import int interface let long match mod mut namespace new package private protected pub public return short signed sizeof static struct switch template throw trait try type typedef union unsigned use using var virtual void volatile while",
  ),
  constants: words("true false null nullptr nil NULL this self"),
}

const bash: Language = {
  comment: String.raw`#[^\n]*`,
  string: `${DOUBLE}|'[^']*'`,
  keywords: words(
    "if then else elif fi for while until do done case esac in function return export local readonly echo cd sudo source exit set unset",
  ),
  constants: words("true false"),
}

const sql: Language = {
  comment: String.raw`--[^\n]*|\/\*[\s\S]*?\*\/`,
  string: `${SINGLE}|${DOUBLE}`,
  keywords: words(
    "select from where insert into values update set delete create table alter drop index join inner left right outer full on as and or not in is like between group by order having limit offset union all distinct primary key foreign references default constraint case when then else end exists view with",
  ),
  constants: words("null true false"),
  caseInsensitive: true,
}

const data: Language = {
  comment: String.raw`#[^\n]*`,
  string: `${DOUBLE}|${SINGLE}`,
  keywords: new Set(),
  constants: words("true false null yes no"),
}

const LANGUAGES: Record<string, Language> = {
  python,
  py: python,
  javascript,
  js: javascript,
  jsx: javascript,
  typescript: javascript,
  ts: javascript,
  tsx: javascript,
  c: cLike,
  cpp: cLike,
  "c++": cLike,
  csharp: cLike,
  java: cLike,
  go: cLike,
  rust: cLike,
  bash,
  sh: bash,
  shell: bash,
  zsh: bash,
  sql,
  json: data,
  yaml: data,
  yml: data,
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function span(kind: string, text: string): string {
  return `<span class="tok-${kind}">${escapeHtml(text)}</span>`
}

// Returns null when the language is unknown, so the caller can leave the block untouched.
export function highlight(code: string, languageName: string): string | null {
  const language = LANGUAGES[languageName.toLowerCase()]
  if (!language) return null

  const tokenPattern = new RegExp(
    [
      `(?<comment>${language.comment})`,
      `(?<string>${language.string})`,
      String.raw`(?<decorator>^[ \t]*@[\w.]+)`,
      String.raw`(?<number>\b(?:0[xX][\da-fA-F_]+|\d[\d_]*(?:\.\d+)?(?:[eE][+-]?\d+)?)\b)`,
      String.raw`(?<word>[A-Za-z_$][\w$]*)`,
    ].join("|"),
    "gm",
  )

  let html = ""
  let position = 0
  for (const match of code.matchAll(tokenPattern)) {
    const start = match.index ?? 0
    const text = match[0]
    const groups = match.groups ?? {}
    html += escapeHtml(code.slice(position, start))
    position = start + text.length
    const rest = code.slice(position)

    if (groups.comment) html += span("comment", text)
    else if (groups.string) {
      // In JSON and YAML, a quoted string followed by a colon is a key.
      html += span(language === data && /^\s*:/.test(rest) ? "property" : "string", text)
    } else if (groups.decorator) html += span("decorator", text)
    else if (groups.number) html += span("number", text)
    else {
      const word = language.caseInsensitive ? text.toLowerCase() : text
      if (language.keywords.has(word)) html += span("keyword", text)
      else if (language.constants.has(word)) html += span("constant", text)
      else if (language === data && /^\s*:(\s|$)/.test(rest)) html += span("property", text)
      else if (/^\s*\(/.test(rest)) html += span("function", text)
      else if (/^[A-Z][a-z]/.test(text)) html += span("type", text)
      else html += escapeHtml(text)
    }
  }
  return html + escapeHtml(code.slice(position))
}
