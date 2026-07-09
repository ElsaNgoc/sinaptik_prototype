import { programs, type Field, type Mentor, type Program } from '../data/sinaptikCatalog'
import type { ChatConversation, LearnerModule } from '../types'
import { catalogId } from './catalogLocale'
import { chatId } from './chatLocale'
import { contentId } from './contentLocale'
import type { Locale } from './translations'

const titleToModuleId = new Map<string, string>()
const titleToProgramId = new Map<string, string>()

for (const program of programs) {
  titleToProgramId.set(program.name, program.id)
  if (program.activeCohortName) {
    titleToProgramId.set(program.activeCohortName, program.id)
  }
  for (const mod of program.modules) {
    titleToModuleId.set(mod.title, mod.id)
  }
}

export function localizeModuleTitle(title: string, locale: Locale): string {
  if (locale === 'en') return title
  if (title === 'Program complete') return catalogId.programComplete

  const moduleId = titleToModuleId.get(title)
  if (moduleId && catalogId.modules[moduleId]) return catalogId.modules[moduleId]

  const programId = titleToProgramId.get(title)
  if (programId && catalogId.programs[programId]) return catalogId.programs[programId].name

  return title
}

export function localizeModuleById(moduleId: string, fallback: string, locale: Locale): string {
  if (locale === 'en') return fallback
  return catalogId.modules[moduleId] ?? localizeModuleTitle(fallback, locale)
}

export function localizeCohortLabel(label: string, locale: Locale): string {
  if (locale === 'en') return label
  const programId = titleToProgramId.get(label)
  if (!programId) return label
  const t = catalogId.programs[programId]
  return t?.activeCohortName ?? t?.name ?? label
}

export function localizeField(field: Field, locale: Locale): Field {
  if (locale === 'en') return field
  const t = catalogId.fields[field.id]
  return t ? { ...field, name: t.name, description: t.description } : field
}

export function localizeProgram(program: Program, locale: Locale): Program {
  if (locale === 'en') return program
  const t = catalogId.programs[program.id]
  if (!t) return program
  return {
    ...program,
    name: t.name,
    description: t.description,
    activeCohortName: t.activeCohortName ?? program.activeCohortName,
    modules: program.modules.map((m) => ({
      ...m,
      title: catalogId.modules[m.id] ?? m.title,
    })),
  }
}

export function localizeMentorTitle(mentor: Mentor, locale: Locale): string {
  if (locale === 'en') return mentor.title
  return catalogId.mentorTitles[mentor.id] ?? mentor.title
}

export function localizeLearnerModules(modules: LearnerModule[], locale: Locale): LearnerModule[] {
  if (locale === 'en') return modules
  return modules.map((m) => ({
    ...m,
    title: catalogId.modules[m.id] ?? localizeModuleTitle(m.title, locale),
  }))
}

export function localizeProgramById(
  programId: string,
  name: string,
  cohortName: string,
  locale: Locale
): { name: string; cohortName: string } {
  if (locale === 'en') return { name, cohortName }
  const t = catalogId.programs[programId]
  return {
    name: t?.name ?? name,
    cohortName: t?.activeCohortName ?? localizeCohortLabel(cohortName, locale),
  }
}

export function localizeDropOffRisk(
  risk: string,
  t: (key: string) => string
): string {
  if (risk === 'Low') return t('content.riskLow')
  if (risk === 'Medium') return t('content.riskMedium')
  if (risk === 'High') return t('content.riskHigh')
  return risk
}

/** Replace known English module/program names inside free-form messages. */
export function localizeContentMessage(message: string, locale: Locale): string {
  if (locale === 'en') return message
  let result = message
  for (const [enTitle, moduleId] of titleToModuleId) {
    const localized = catalogId.modules[moduleId]
    if (localized) result = result.split(enTitle).join(localized)
  }
  for (const [enName, programId] of titleToProgramId) {
    const localized = catalogId.programs[programId]?.name
    if (localized) result = result.split(enName).join(localized)
  }
  return result.split('Program complete').join(catalogId.programComplete)
}

export function localizeNotificationMessage(
  id: string,
  message: string,
  locale: Locale
): string {
  if (locale === 'en') return message
  const translated =
    contentId.notifications[id as keyof typeof contentId.notifications]
  return translated ?? localizeContentMessage(message, locale)
}

export function localizeActivityLogMessage(
  id: string,
  message: string,
  locale: Locale
): string {
  if (locale === 'en') return message
  const translated = contentId.activityLogs[id as keyof typeof contentId.activityLogs]
  return translated ?? localizeContentMessage(message, locale)
}

export function localizeChatConversation(
  conversation: ChatConversation,
  locale: Locale
): ChatConversation {
  if (locale === 'en') return conversation
  const t = chatId.conversations[conversation.id as keyof typeof chatId.conversations]
  if (!t) return conversation
  return {
    ...conversation,
    courseLabel: t.courseLabel,
    lastMessage: t.lastMessage,
    messages: conversation.messages.map((msg) => ({
      ...msg,
      text: t.messages[msg.id as keyof typeof t.messages] ?? msg.text,
    })),
  }
}
