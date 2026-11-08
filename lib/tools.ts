import type {IconName} from '@/components/icon-set';

export type ToolEntry = {
  label: string;
  /** Brand mark key from `lib/tool-icons.ts`. */
  brand?: string;
  /** Line glyph used when no brand exists (methods and practices). */
  glyph?: IconName;
  /** Official product, standard or body page. */
  href?: string;
};

/**
 * One entry per exact label used in `lib/roles.ts`, for all three locales.
 * Branded tools link to the vendor site; standards link to the body that owns
 * them; generic practices keep a glyph and no outbound link.
 */
const entries: Record<string, Omit<ToolEntry, 'label'>> = {
  // Branded tools
  Jira: {brand: 'jira', href: 'https://www.atlassian.com/software/jira'},
  Figma: {brand: 'figma', href: 'https://www.figma.com/'},
  Postman: {brand: 'postman', href: 'https://www.postman.com/'},
  Playwright: {brand: 'playwright', href: 'https://playwright.dev/'},
  React: {brand: 'react', href: 'https://react.dev/'},
  'Next.js': {brand: 'nextdotjs', href: 'https://nextjs.org/'},
  TypeScript: {brand: 'typescript', href: 'https://www.typescriptlang.org/'},
  'Node.js': {brand: 'nodedotjs', href: 'https://nodejs.org/'},
  PostgreSQL: {brand: 'postgresql', href: 'https://www.postgresql.org/'},
  MongoDB: {brand: 'mongodb', href: 'https://www.mongodb.com/'},
  Azure: {brand: 'microsoftazure', href: 'https://azure.microsoft.com/'},
  Render: {brand: 'render', href: 'https://render.com/'},
  'GitHub Actions': {brand: 'githubactions', href: 'https://github.com/features/actions'},
  Git: {brand: 'git', href: 'https://git-scm.com/'},
  Docker: {brand: 'docker', href: 'https://www.docker.com/'},
  'Microsoft Office': {brand: 'microsoftoffice', href: 'https://www.microsoft.com/microsoft-365'},
  'Google Workspace': {brand: 'google', href: 'https://workspace.google.com/'},
  'Google Cloud (GCP)': {glyph: 'cloud', href: 'https://cloud.google.com/'},
  'Oracle Cloud': {glyph: 'cloud', href: 'https://www.oracle.com/cloud/'},
  Firebase: {glyph: 'cloud', href: 'https://firebase.google.com/'},
  NestJS: {glyph: 'layers', href: 'https://nestjs.com/'},
  Python: {glyph: 'code', href: 'https://www.python.org/'},
  Notion: {glyph: 'file', href: 'https://www.notion.so/'},
  Confluence: {glyph: 'file', href: 'https://www.atlassian.com/software/confluence'},
  GraphQL: {brand: 'graphql', href: 'https://graphql.org/'},

  // Methods, standards and practices
  'Agile/Scrum': {glyph: 'repeat', href: 'https://scrumguides.org/'},
  'RACI concepts': {glyph: 'users'},
  RACI: {glyph: 'users'},
  'Action logs': {glyph: 'list'},
  'Suivi d’actions': {glyph: 'list'},
  'سجل الإجراءات': {glyph: 'list'},
  'Risk tracking': {glyph: 'alert'},
  'Gestion des risques': {glyph: 'alert'},
  'المخاطر': {glyph: 'alert'},
  'BRD / FRD / SRS': {glyph: 'file', href: 'https://www.iiba.org/'},
  'User Stories': {glyph: 'file', href: 'https://www.agilealliance.org/glossary/user-stories/'},
  'User stories': {glyph: 'file', href: 'https://www.agilealliance.org/glossary/user-stories/'},
  'قصص المستخدم': {glyph: 'file', href: 'https://www.agilealliance.org/glossary/user-stories/'},
  BPMN: {glyph: 'network', href: 'https://www.omg.org/spec/BPMN/'},
  UML: {glyph: 'layers', href: 'https://www.omg.org/spec/UML/'},
  'Acceptance criteria': {glyph: 'target', href: 'https://www.agilealliance.org/glossary/acceptance/'},
  'Critères d’acceptation': {glyph: 'target', href: 'https://www.agilealliance.org/glossary/acceptance/'},
  'معايير القبول': {glyph: 'target', href: 'https://www.agilealliance.org/glossary/acceptance/'},
  REST: {glyph: 'cloud'},
  SQL: {glyph: 'database', href: 'https://www.iso.org/standard/76583.html'},
  'System diagrams': {glyph: 'network'},
  Diagrammes: {glyph: 'network'},
  'المخططات': {glyph: 'network'},
  'OAuth / RBAC': {glyph: 'lock', href: 'https://oauth.net/2/'},
  'Test cases': {glyph: 'list'},
  'Cas de test': {glyph: 'list'},
  'حالات الاختبار': {glyph: 'list'},
  'CI checks': {glyph: 'activity'},
  CI: {glyph: 'activity'},
  'CI/CD': {glyph: 'activity'},
  'Regression / UAT': {glyph: 'shield'},
  'Régression / UAT': {glyph: 'shield'},
  UAT: {glyph: 'shield'},
  'Ticket tracking': {glyph: 'file'},
  Ticketing: {glyph: 'file'},
  'سجل البلاغات': {glyph: 'file'},
  'Application logs': {glyph: 'monitor'},
  Logs: {glyph: 'monitor'},
  'السجلات': {glyph: 'monitor'},
  'User support': {glyph: 'users'},
  'Support utilisateurs': {glyph: 'users'},
  'دعم المستخدم': {glyph: 'users'},
  Documentation: {glyph: 'file'},
  'التوثيق': {glyph: 'file'},
  Coordination: {glyph: 'network'},
  'التنسيق': {glyph: 'network'},
  'Client communication': {glyph: 'users'},
  'Communication client': {glyph: 'users'},
  'تواصل العملاء': {glyph: 'users'},
};

/** Fallback so an unmapped label still renders as a proper chip. */
const fallback: Omit<ToolEntry, 'label'> = {glyph: 'layers'};

/**
 * Resolve a role method label into one or more chips.
 * Combined labels such as `PostgreSQL / MongoDB` split only when every part is
 * a known tool, so `BRD / FRD / SRS` and `OAuth / RBAC` stay whole.
 */
export function resolveMethods(label: string): ToolEntry[] {
  const trimmed = label.trim();
  if (entries[trimmed]) return [{label: trimmed, ...entries[trimmed]}];
  const parts = trimmed.split(' / ');
  if (parts.length > 1 && parts.every(part => entries[part])) {
    return parts.map(part => ({label: part, ...entries[part]}));
  }
  return [{label: trimmed, ...fallback}];
}
