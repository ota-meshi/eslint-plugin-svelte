---
pageClass: "rule-details"
sidebarDepth: 0
title: "@ota-meshi/svelte/button-has-type"
description: "disallow usage of button without an explicit type attribute"
---

# @ota-meshi/svelte/button-has-type

> disallow usage of button without an explicit type attribute

- :exclamation: <badge text="This rule has not been released yet." vertical="middle" type="error"> **_This rule has not been released yet._** </badge>

## :book: Rule Details

This rule aims to warn if no type or an invalid type is used on a button type attribute.

<eslint-code-block>

<!--eslint-skip-->

```html
<script>
  /* eslint @ota-meshi/svelte/button-has-type: "error" */
</script>

<!-- ✓ GOOD -->
<button type="button">Hello World</button>
<button type="submit">Hello World</button>
<button type="reset">Hello World</button>

<!-- ✗ BAD -->
<button>Hello World</button>
<button type="">Hello World</button>
<button type="foo">Hello World</button>
```

</eslint-code-block>

## :wrench: Options

```json
{
  "@ota-meshi/svelte/button-has-type": [
    "error",
    {
      "button": true,
      "submit": true,
      "reset": true
    }
  ]
}
```

- `button` ... `<button type="button"></button>`
  - `true` (default) ... allow value `button`.
  - `false` ... disallow value `button`.
- `submit` ... `<button type="submit"></button>`
  - `true` (default) ... allow value `submit`.
  - `false` ... disallow value `submit`.
- `reset` ... `<button type="reset"></button>`
  - `true` (default) ... allow value `reset`.
  - `false` ... disallow value `reset`.

## :mag: Implementation

- [Rule source](https://github.com/ota-meshi/eslint-plugin-svelte/blob/main/src/rules/button-has-type.ts)
- [Test source](https://github.com/ota-meshi/eslint-plugin-svelte/blob/main/tests/src/rules/button-has-type.ts)
