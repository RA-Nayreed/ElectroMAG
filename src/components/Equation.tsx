import katex from 'katex'

interface EquationProps {
  children: string
  display?: boolean
}

export function Equation({ children, display = false }: EquationProps) {
  const html = katex.renderToString(children, {
    displayMode: display,
    output: 'html',
    strict: 'warn',
    throwOnError: false
  })

  return (
    <span
      className={display ? 'equation equation--display' : 'equation'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
