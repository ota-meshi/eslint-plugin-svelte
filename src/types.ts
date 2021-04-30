import type { JSONSchema4 } from "json-schema"
import type { Linter, Rule, Scope, SourceCode } from "eslint"
import type { AST } from "svelte-eslint-parser"
import type * as ESTree from "estree"

type ASTNode = AST.SvelteNode | (ESTree.Node & { parent: ASTNode })
type ASTNodeListenerMap<T extends ASTNode = ASTNode> = {
  [key in ASTNode["type"]]: T extends { type: key } ? T : never
}

type ASTNodeListener = {
  [T in keyof ASTNodeListenerMap]?: (node: ASTNodeListenerMap[T]) => void
}
export interface RuleListener extends ASTNodeListener {
  onCodePathStart?(codePath: Rule.CodePath, node: never): void

  onCodePathEnd?(codePath: Rule.CodePath, node: never): void

  onCodePathSegmentStart?(segment: Rule.CodePathSegment, node: never): void

  onCodePathSegmentEnd?(segment: Rule.CodePathSegment, node: never): void

  onCodePathSegmentLoop?(
    fromSegment: Rule.CodePathSegment,
    toSegment: Rule.CodePathSegment,
    node: never,
  ): void
  [key: string]:
    | ((codePath: Rule.CodePath, node: never) => void)
    | ((segment: Rule.CodePathSegment, node: never) => void)
    | ((
        fromSegment: Rule.CodePathSegment,
        toSegment: Rule.CodePathSegment,
        node: never,
      ) => void)
    | ASTNodeListener[keyof ASTNodeListener]
    | undefined
}

export interface RuleModule {
  meta: RuleMetaData
  create(context: Rule.RuleContext): RuleListener
}

export interface RuleMetaData {
  docs: {
    description: string
    recommended: boolean
    extensionRule?: string
    url: string
    ruleId: string
    ruleName: string
    replacedBy?: string[]
    default?: "error" | "warn"
  }
  messages: { [messageId: string]: string }
  fixable?: "code" | "whitespace"
  schema: JSONSchema4 | JSONSchema4[]
  deprecated?: boolean
  type: "problem" | "suggestion" | "layout"
}

export interface PartialRuleModule {
  meta: PartialRuleMetaData
  create: (context: RuleContext) => RuleListener
}

export interface PartialRuleMetaData {
  docs: {
    description: string
    recommended: boolean
    extensionRule?: string
    replacedBy?: string[]
    default?: "error" | "warn"
  }
  messages: { [messageId: string]: string }
  fixable?: "code" | "whitespace"
  schema: JSONSchema4 | JSONSchema4[]
  deprecated?: boolean
  type: "problem" | "suggestion" | "layout"
}

type RuleContext = {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
  options: any[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ignore
  settings: { [name: string]: any }
  parserPath: string
  parserOptions: Linter.ParserOptions
  parserServices: SourceCode.ParserServices

  getAncestors(): ESTree.Node[]

  getDeclaredVariables(node: ESTree.Node): Scope.Variable[]

  getFilename(): string

  getScope(): Scope.Scope

  getSourceCode(): SourceCode

  markVariableAsUsed(name: string): boolean

  report(descriptor: ReportDescriptor): void
}

interface ReportDescriptorOptionsBase {
  data?: { [key: string]: string }

  fix?:
    | null
    | ((
        fixer: Rule.RuleFixer,
      ) => null | Rule.Fix | IterableIterator<Rule.Fix> | Rule.Fix[])
}

type SuggestionDescriptorMessage = { desc: string } | { messageId: string }
type SuggestionReportDescriptor = SuggestionDescriptorMessage &
  ReportDescriptorOptionsBase

interface ReportDescriptorOptions extends ReportDescriptorOptionsBase {
  suggest?: SuggestionReportDescriptor[] | null
}

type ReportDescriptor = ReportDescriptorMessage &
  ReportDescriptorLocation &
  ReportDescriptorOptions
type ReportDescriptorMessage = { message: string } | { messageId: string }
type ReportDescriptorLocation =
  | { node: { type: string; loc?: AST.SourceLocation } }
  | { loc: AST.SourceLocation | { line: number; column: number } }