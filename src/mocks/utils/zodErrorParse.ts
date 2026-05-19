import { proposalSubmitFieldsDictionary } from '@/entities/proposal/api/dictionary';
import { isProposalField } from '@/entities/proposal/model/typeGuards';
import { speakerFieldsDictionary } from '@/entities/speaker/api/dictionary';
import { isSpeakerField } from '@/entities/speaker/model/typeGuards';
import { ZodError } from 'zod';

type ParsedIssue = {
  path: PropertyKey[];
  message: string;
};

const formatValidationPath = (path: PropertyKey[]) => {
  if (path[0] === 'speakers' && typeof path[1] === 'number') {
    const speakerIdx = path[1] + 1;
    const field = path[2];

    if (isSpeakerField(field)) {
      return `Спикер №${speakerIdx}: ${speakerFieldsDictionary[field]}`;
    }
  }

  const field = path[0];

  if (isProposalField(field)) {
    return proposalSubmitFieldsDictionary[field];
  }

  return path.join('.');
};

const zodErrorParse = (error: ZodError): Record<string, string> => {
  const issues: ParsedIssue[] = error.issues.map((err) => ({
    path: err.path,
    message: err.message,
  }));

  return Object.fromEntries(
    issues.map((issue) => {
      const field = formatValidationPath(issue.path);
      const message = issue.message ?? 'Некорректное значение';

      return [field, message];
    }),
  );
};

export default zodErrorParse;
