import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';

const locales = ['en', 'fr', 'ar'];

function readObject(file, name) {
  const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true);
  let initializer;
  function findDeclaration(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(source) === name) {
      initializer = node.initializer;
    }
    ts.forEachChild(node, findDeclaration);
  }
  findDeclaration(source);
  assert(initializer, `Missing ${name} in ${file}`);
  while (ts.isAsExpression(initializer) || ts.isSatisfiesExpression(initializer) || ts.isParenthesizedExpression(initializer)) {
    initializer = initializer.expression;
  }
  assert(ts.isObjectLiteralExpression(initializer), `Expected ${name} to be an object in ${file}`);
  return {source, object: initializer};
}

function properties(node, source, path) {
  assert(ts.isObjectLiteralExpression(node), `Expected object at ${path}`);
  const entries = new Map();
  for (const property of node.properties) {
    assert(ts.isPropertyAssignment(property), `Unsupported property form at ${path}`);
    entries.set(property.name.getText(source).replace(/^['"]|['"]$/g, ''), property.initializer);
  }
  return entries;
}

function compareShape(base, translated, source, path) {
  if (ts.isObjectLiteralExpression(base)) {
    const expected = properties(base, source, path);
    const actual = properties(translated, source, path);
    assert.deepEqual([...actual.keys()].sort(), [...expected.keys()].sort(), `Translation keys differ at ${path}`);
    for (const [key, value] of expected) compareShape(value, actual.get(key), source, `${path}.${key}`);
    return;
  }
  if (ts.isArrayLiteralExpression(base)) {
    assert(ts.isArrayLiteralExpression(translated), `Expected translated array at ${path}`);
    assert.equal(translated.elements.length, base.elements.length, `Translation array length differs at ${path}`);
    for (let i = 0; i < base.elements.length; i++) {
      compareShape(base.elements[i], translated.elements[i], source, `${path}[${i}]`);
    }
    return;
  }
  assert(ts.isStringLiteralLike(base) && ts.isStringLiteralLike(translated), `Expected translated text at ${path}`);
  assert(translated.text.trim().length > 0, `Empty translation at ${path}`);
}

function checkLocales(file, name) {
  const {source, object} = readObject(file, name);
  const root = properties(object, source, name);
  for (const locale of locales) assert(root.has(locale), `Missing ${locale} in ${name}`);
  for (const locale of locales.slice(1)) {
    compareShape(root.get('en'), root.get(locale), source, `${name}.${locale}`);
  }
  return {
    source,
    locales: Object.fromEntries(locales.map(locale => [
      locale,
      ts.isObjectLiteralExpression(root.get(locale))
        ? properties(root.get(locale), source, `${name}.${locale}`)
        : new Map()
    ]))
  };
}

function checkNestedLocales(file, name) {
  const {source, object} = readObject(file, name);
  for (const [key, value] of properties(object, source, name)) {
    const translations = properties(value, source, `${name}.${key}`);
    for (const locale of locales) assert(translations.has(locale), `Missing ${locale} in ${name}.${key}`);
    for (const locale of locales.slice(1)) {
      compareShape(translations.get('en'), translations.get(locale), source, `${name}.${key}.${locale}`);
    }
  }
}

const dictionary = checkLocales('lib/dictionary.ts', 'dictionary');
const expectedHero = {
  en: ['Business goals.', 'Clear plans.', 'Reliable software.', 'I help business teams and engineers agree on what to build, turn needs into clear requirements, and deliver software that works.'],
  fr: ['Objectifs métier.', 'Plans clairs.', 'Logiciel fiable.', 'J’aide les équipes métier et les ingénieurs à définir quoi construire, à préciser les besoins et à livrer un logiciel fiable.'],
  ar: ['أهداف العمل.', 'خطط واضحة.', 'برمجيات موثوقة.', 'أساعد فرق الأعمال والمهندسين على تحديد ما يجب بناؤه، وتحويل الاحتياجات إلى متطلبات واضحة، وتسليم برمجيات موثوقة.']
};
for (const locale of locales) {
  for (const [index, key] of ['heroA', 'heroB', 'heroC', 'heroDesc'].entries()) {
    const value = dictionary.locales[locale].get(key);
    assert(ts.isStringLiteralLike(value), `Missing ${locale} homepage text: ${key}`);
    assert.equal(value.text, expectedHero[locale][index], `Unexpected ${locale} homepage text: ${key}`);
  }
}

checkLocales('lib/ui-copy.ts', 'uiCopy');
checkLocales('lib/projects.ts', 'projectCopy');
checkLocales('lib/projects.ts', 'projectGroups');
checkLocales('app/[locale]/experience/page.tsx', 'jobs');
checkLocales('components/VisualHighlights.tsx', 'visualCopy');
checkNestedLocales('components/WorkflowArtwork.tsx', 'localizedShape');
checkLocales('components/WorkflowArtwork.tsx', 'copy');
checkLocales('components/Visuals.tsx', 'typeLabels');
checkLocales('components/Visuals.tsx', 'kindLabels');
checkLocales('components/Visuals.tsx', 'shortLabels');
checkLocales('components/Visuals.tsx', 'datasets');
checkLocales('components/MotionKit.tsx', 'heroWords');

const {source: roleSource, object: roleObject} = readObject('lib/roles.ts', 'details');
for (const [slug, role] of properties(roleObject, roleSource, 'details')) {
  const translations = properties(role, roleSource, `details.${slug}`);
  for (const locale of locales) assert(translations.has(locale), `Missing ${locale} role: ${slug}`);
  for (const locale of locales.slice(1)) {
    compareShape(translations.get('en'), translations.get(locale), roleSource, `details.${slug}.${locale}`);
  }
}

console.log('PASS: English, French and Arabic copy; matching translation keys and text arrays across pages, project data, experience, diagrams, workflows, and shared UI.');
