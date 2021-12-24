---
pageClass: "rule-details"
sidebarDepth: 0
title: "@ota-meshi/svelte/no-unused-svelte-ignore"
description: "disallow unused svelte-ignore comments"
---

# @ota-meshi/svelte/no-unused-svelte-ignore

> disallow unused svelte-ignore comments

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>
- :gear: This rule is included in `"plugin:@ota-meshi/svelte/recommended"`.

## :book: Rule Details

This rule warns unnecessary `svelte-ignore` comments.

<ESLintCodeBlock>

<!--eslint-skip-->

```svelte
<script>
  /* eslint @ota-meshi/svelte/no-unused-svelte-ignore: "error" */
</script>

<!-- ✓ GOOD -->
<!-- svelte-ignore a11y-autofocus a11y-missing-attribute -->
<img src="https://example.com/img.png" autofocus />

<!-- ✗ BAD -->
<!-- svelte-ignore a11y-autofocus a11y-missing-attribute -->
<img src="https://example.com/img.png" alt="Foo" />
```

</ESLintCodeBlock>

## :wrench: Options

Nothing.

## :books: Further Reading

- [Svelte - Docs > Comments](https://svelte.dev/docs#template-syntax-comments)

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-svelte/blob/main/src/rules/no-unused-svelte-ignore.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-svelte/blob/main/tests/src/rules/no-unused-svelte-ignore.ts)
