---
pageClass: "rule-details"
sidebarDepth: 0
title: "@ota-meshi/svelte/prefer-style-directive"
description: "require style directives instead of style attribute"
---

# @ota-meshi/svelte/prefer-style-directive

> require style directives instead of style attribute

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>
- :wrench: The `--fix` option on the [command line](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems) can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule aims to replace a style attribute with the style directive.

Style directive were added in Svelte v3.46.

<ESLintCodeBlock fix>

<!--eslint-skip-->

```svelte
<script>
  /* eslint @ota-meshi/svelte/prefer-style-directive: "error" */
  let color = "red"
</script>

<!-- ✓ GOOD -->
<div style:color={color}>...</div>

<!-- ✗ BAD -->
<div style="color: {color};">...</div>
```

</ESLintCodeBlock>

You cannot enforce this style by using [prettier-plugin-svelte]. That is, this rule does not conflict with [prettier-plugin-svelte] and can be used with [prettier-plugin-svelte].

[prettier-plugin-svelte]: https://github.com/sveltejs/prettier-plugin-svelte

## :wrench: Options

Nothing.

## :couple: Related Rules

- [@ota-meshi/svelte/prefer-class-directive]

[@ota-meshi/svelte/prefer-class-directive]: ./prefer-class-directive.md

## :books: Further Reading

- [Svelte - Docs > style:property](https://svelte.dev/docs#template-syntax-element-directives-style-property)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-svelte/blob/main/src/rules/prefer-style-directive.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-svelte/blob/main/tests/src/rules/prefer-style-directive.ts)
