import type { AST } from "svelte-eslint-parser"
import { createRule } from "../utils"
import {
  getNodeName,
  isCustomComponent,
  isVoidHtmlElement,
} from "../utils/template-utils"

enum TypeMessages {
  normal = "HTML elements",
  void = "HTML void elements",
  component = "Svelte custom components",
  unknown = "unknown elements",
}

export default createRule("html-self-closing", {
  meta: {
    docs: {
      description: "Enforce self-closing style",
      category: "Stylistic Issues",
      recommended: false,
      conflictWithPrettier: true,
    },
    type: "layout",
    fixable: "code",
    messages: {
      requireClosing: "Require self-closing on {{type}}",
      disallowClosing: "Disallow self-closing on {{type}}",
    },
    schema: [
      {
        type: "object",
        properties: {
          html: {
            type: "object",
            properties: {
              normal: {
                enum: ["never", "always"],
              },
              component: {
                enum: ["never", "always"],
              },
            },
            additionalProperties: false,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(ctx) {
    const options: { [key: string]: "never" | "always" } = {
      normal: ctx.options?.[0]?.html?.normal ?? "always",
      component: ctx.options?.[0]?.html?.component ?? "always",
    }

    /**
     *
     */
    function getElementType(
      node: AST.SvelteElement,
    ): "component" | "void" | "normal" {
      if (isCustomComponent(node)) return "component"
      if (isVoidHtmlElement(node)) return "void"
      return "normal"
    }

    /**
     *
     */
    function elementTypeMessages(
      type: "component" | "void" | "normal",
    ): TypeMessages {
      switch (type) {
        case "component":
          return TypeMessages.component
        case "normal":
          return TypeMessages.normal
        case "void":
          return TypeMessages.void
        default:
          return TypeMessages.unknown
      }
    }

    /**
     *
     */
    function report(node: AST.SvelteElement, close: boolean) {
      const elementType = getElementType(node)

      ctx.report({
        node,
        messageId: close ? "requireClosing" : "disallowClosing",
        data: {
          type: elementTypeMessages(elementType),
        },
        *fix(fixer) {
          if (close) {
            yield fixer.insertTextBeforeRange(
              [node.startTag.range[1] - 1, node.startTag.range[1]],
              "/",
            )

            if (node.endTag) yield fixer.removeRange(node.endTag.range)
          } else {
            yield fixer.removeRange([
              node.startTag.range[1] - 2,
              node.startTag.range[1] - 1,
            ])

            yield fixer.insertTextAfter(node, `</${getNodeName(node)}>`)
          }
        },
      })
    }

    return {
      SvelteElement(node: AST.SvelteElement) {
        if (node.children.length > 0) return

        const elementType = getElementType(node)

        if (elementType === "void") return
        const shouldBeClosed = options[elementType] === "always"
        // const hasEndTag = Boolean(node.endTag)

        if (shouldBeClosed && !node.startTag.selfClosing) {
          report(node, true)
        } else if (!shouldBeClosed && node.startTag.selfClosing) {
          report(node, false)
        }
      },
    }
  },
})
