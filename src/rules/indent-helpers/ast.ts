import type { AST } from "svelte-eslint-parser"
import type * as ESTree from "estree"
type AnyToken = AST.Token | AST.Comment
/**
 * Check whether the given token is a whitespace.
 */
export function isWhitespace(
  token: AnyToken | ESTree.Comment | null | undefined,
): boolean {
  return token != null && token.type === "HTMLText" && !token.value.trim()
}

/**
 * Check whether the given token is a not whitespace.
 */
export function isNotWhitespace(
  token: AnyToken | ESTree.Comment | null | undefined,
): boolean {
  return (
    token != null && (token.type !== "HTMLText" || Boolean(token.value.trim()))
  )
}