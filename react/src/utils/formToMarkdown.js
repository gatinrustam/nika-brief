// utils/formToMarkdown.js

import briefSteps from '@/data/briefSteps';

export function formToMarkdown(formData) {
  let markdown = `# Бриф от ${formData?.contactInfo?.name || 'Неизвестный'}\n`;

  for (const step of briefSteps) {
    const answer = formData[step.id];

    if (
      answer === undefined ||
      (typeof answer === 'string' && answer.trim() === '') ||
      (Array.isArray(answer) && answer.length === 0) ||
      (typeof answer === 'object' &&
        !Object.keys(answer).length &&
        !answer.choice && !answer.domain)
    ) {
      continue;
    }

    markdown += `\n## ${step.label}\n`;

    if (Array.isArray(answer)) {
      for (const val of answer) {
        const opt = step.options?.find(o => o.value === val);
        const label = opt?.label || val;
        const image = opt?.image;

        if (image) {
          markdown += `- [${label}](${image})\n`;
        } else {
          markdown += `- ${label}\n`;
        }
      }
    } else if (typeof answer === 'object' && answer.choice) {
      const opt = step.options?.find(o => o.value === answer.choice);
      const label = opt?.label || answer.choice;
      const domain = answer.domain ? ` (${answer.domain})` : '';
      const image = opt?.image;

      if (image) {
        markdown += `- [${label}${domain}](${image})\n`;
      } else {
        markdown += `- ${label}${domain}\n`;
      }
    } else if (step.id === 'contactInfo' && typeof answer === 'object') {
      if (answer.phone) markdown += `- **Телефон:** ${answer.phone}\n`;
      if (answer.email) markdown += `- **Email:** ${answer.email}\n`;
      if (answer.extraContacts) markdown += `- **Дополнительно:** ${answer.extraContacts}\n`;
    } else {
      const opt = step.options?.find(o => o.value === answer);
      const label = opt?.label || answer;
      const image = opt?.image;

      if (image) {
        markdown += `- [${label}](${image})\n`;
      } else {
        markdown += `- ${label}\n`;
      }
    }
  }

  return markdown;
}
