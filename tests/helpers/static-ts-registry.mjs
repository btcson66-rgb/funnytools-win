import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

export const REPO_ROOT = fileURLToPath(new URL('../../', import.meta.url));

export function repoPath(relPath) {
  return path.resolve(REPO_ROOT, ...String(relPath).split('/'));
}

export function readRepoText(relPath) {
  return readFileSync(repoPath(relPath), 'utf8');
}

function parseTs(source, fileName = 'fixture.ts') {
  return ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
}

function unwrapExpression(node) {
  let current = node;

  while (
    ts.isAsExpression(current)
    || ts.isSatisfiesExpression(current)
    || ts.isParenthesizedExpression(current)
    || ts.isTypeAssertionExpression(current)
  ) {
    current = current.expression;
  }

  return current;
}

function findVariableInitializer(sourceFile, variableName) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;

    for (const declaration of statement.declarationList.declarations) {
      if (
        !ts.isIdentifier(declaration.name)
        || declaration.name.text !== variableName
      ) {
        continue;
      }

      if (!declaration.initializer) {
        throw new Error(`${variableName} has no initializer`);
      }

      return unwrapExpression(declaration.initializer);
    }
  }

  throw new Error(`Could not find variable ${variableName}`);
}

function staticPropertyName(name) {
  if (
    ts.isIdentifier(name)
    || ts.isStringLiteral(name)
    || ts.isNumericLiteral(name)
  ) {
    return name.text;
  }

  throw new Error(
    `Unsupported computed/static property name: ${name.getText()}`,
  );
}

function literalString(node) {
  const value = unwrapExpression(node);

  if (
    ts.isStringLiteral(value)
    || ts.isNoSubstitutionTemplateLiteral(value)
  ) {
    return value.text;
  }

  return undefined;
}

function propertyAssignments(objectLiteral) {
  const result = new Map();

  for (const property of objectLiteral.properties) {
    if (ts.isPropertyAssignment(property)) {
      result.set(
        staticPropertyName(property.name),
        unwrapExpression(property.initializer),
      );
    } else if (ts.isShorthandPropertyAssignment(property)) {
      result.set(property.name.text, property.name);
    }
  }

  return result;
}

export function extractArrayObjectFieldsFromSource(
  source,
  variableName,
  fields,
  fileName = 'fixture.ts',
) {
  const sourceFile = parseTs(source, fileName);
  const initializer = findVariableInitializer(sourceFile, variableName);

  if (!ts.isArrayLiteralExpression(initializer)) {
    throw new Error(`${variableName} is not an array literal`);
  }

  return initializer.elements.map((element, index) => {
    const object = unwrapExpression(element);

    if (!ts.isObjectLiteralExpression(object)) {
      throw new Error(
        `${variableName}[${index}] is not an object literal`,
      );
    }

    const properties = propertyAssignments(object);
    const row = {};

    for (const field of fields) {
      const value = properties.get(field);
      row[field] = value ? literalString(value) : undefined;
    }

    return row;
  });
}

export function extractArrayObjectFieldsFromFile(
  relPath,
  variableName,
  fields,
) {
  return extractArrayObjectFieldsFromSource(
    readRepoText(relPath),
    variableName,
    fields,
    relPath,
  );
}

export function extractObjectIdentifierMapFromSource(
  source,
  variableName,
  fileName = 'fixture.ts',
) {
  const sourceFile = parseTs(source, fileName);
  const initializer = findVariableInitializer(sourceFile, variableName);

  if (!ts.isObjectLiteralExpression(initializer)) {
    throw new Error(`${variableName} is not an object literal`);
  }

  const result = {};

  for (const property of initializer.properties) {
    if (
      !ts.isPropertyAssignment(property)
      && !ts.isShorthandPropertyAssignment(property)
    ) {
      continue;
    }

    const key = ts.isShorthandPropertyAssignment(property)
      ? property.name.text
      : staticPropertyName(property.name);

    const value = ts.isShorthandPropertyAssignment(property)
      ? property.name
      : unwrapExpression(property.initializer);

    if (!ts.isIdentifier(value)) {
      throw new Error(
        `${variableName}.${key} must reference an imported/local identifier`,
      );
    }

    result[key] = value.text;
  }

  return result;
}

export function extractObjectIdentifierMapFromFile(
  relPath,
  variableName,
) {
  return extractObjectIdentifierMapFromSource(
    readRepoText(relPath),
    variableName,
    relPath,
  );
}

export function extractDefaultImportsFromSource(
  source,
  fileName = 'fixture.ts',
) {
  const sourceFile = parseTs(source, fileName);
  const result = {};

  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    if (!statement.importClause?.name) continue;
    if (!ts.isStringLiteral(statement.moduleSpecifier)) continue;

    result[statement.importClause.name.text]
      = statement.moduleSpecifier.text;
  }

  return result;
}

export function extractDefaultImportsFromFile(relPath) {
  return extractDefaultImportsFromSource(
    readRepoText(relPath),
    relPath,
  );
}

export function resolveRelativeImport(fromRelPath, specifier) {
  if (!specifier.startsWith('.')) return null;

  return path.resolve(
    path.dirname(repoPath(fromRelPath)),
    ...specifier.split('/'),
  );
}
