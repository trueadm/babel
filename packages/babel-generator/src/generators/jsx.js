export function JSXAttribute(node: Object) {
  this.print(node.name, node);
  if (node.value) {
    this.token("=");
    this.print(node.value, node);
  }
}

export function JSXIdentifier(node: Object) {
  this.word(node.name);
}

export function JSXNamespacedName(node: Object) {
  this.print(node.namespace, node);
  this.token(":");
  this.print(node.name, node);
}

export function JSXMemberExpression(node: Object) {
  this.print(node.object, node);
  this.token(".");
  this.print(node.property, node);
}

export function JSXSpreadAttribute(node: Object) {
  this.token("{");
  this.token("...");
  this.print(node.argument, node);
  this.token("}");
}

export function JSXExpressionContainer(node: Object) {
  this.token("{");
  this.print(node.expression, node);
  this.token("}");
}

export function JSXIfControlFlowBlock(node) {
  this.token("{#if");
  this.space();
  this.print(node.test, node);
  this.token("}");
  this.print(node.consequent, node);
  this.token("{/if}");
  // This was what the React transform should do...
  // we need to output the original code here
  // this.print(node.test, node);
  // this.space();
  // this.token("?");
  // this.space();

  // if (node.consequent === null) {
  //   this.word("null");
  // } else if (Array.isArray(node.consequent)) {
  //   this.ArrayExpression({
  //     elements: node.consequent,
  //   });
  // } else {
  //   this.print(node.consequent, node);
  // }

  // this.space();
  // this.token(":");
  // this.space();

  // if (node.alternate === null) {
  //   this.word("null");
  // } else if (Array.isArray(node.alternate)) {
  //   this.ArrayExpression({
  //     elements: node.alternate,
  //   });
  // } else {
  //   this.print(node.alternate, node);
  // }
}

export function JSXSpreadChild(node: Object) {
  this.token("{");
  this.token("...");
  this.print(node.expression, node);
  this.token("}");
}

export function JSXText(node: Object) {
  const raw = this.getPossibleRaw(node);

  if (raw != null) {
    this.token(raw);
  } else {
    this.token(node.value);
  }
}

export function JSXElement(node: Object) {
  const open = node.openingElement;
  this.print(open, node);
  if (open.selfClosing) return;

  this.indent();
  for (const child of (node.children: Array<Object>)) {
    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingElement, node);
}

function spaceSeparator() {
  this.space();
}

export function JSXOpeningElement(node: Object) {
  this.token("<");
  this.print(node.name, node);
  this.print(node.typeParameters, node); // TS
  if (node.attributes.length > 0) {
    this.space();
    this.printJoin(node.attributes, node, { separator: spaceSeparator });
  }
  if (node.selfClosing) {
    this.space();
    this.token("/>");
  } else {
    this.token(">");
  }
}

export function JSXClosingElement(node: Object) {
  this.token("</");
  this.print(node.name, node);
  this.token(">");
}

export function JSXEmptyExpression(node: Object) {
  this.printInnerComments(node);
}

export function JSXFragment(node: Object) {
  this.print(node.openingFragment, node);

  this.indent();
  for (const child of (node.children: Array<Object>)) {
    this.print(child, node);
  }
  this.dedent();

  this.print(node.closingFragment, node);
}

export function JSXOpeningFragment() {
  this.token("<");
  this.token(">");
}

export function JSXClosingFragment() {
  this.token("</");
  this.token(">");
}
