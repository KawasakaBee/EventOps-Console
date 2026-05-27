import { describe, expect, it } from 'vitest';
import {
  basicSchema,
  descriptionSchema,
  extraSchema,
  submitSchema,
  speakerBaseSchema,
} from './schema';

const validBasicCourse = {
  title:
    'Дизайн-система в реальном продукте: где заканчивается UI kit на реальном кейсе',
  format: 'workshop',
  duration: '90',
  level: 'middle',
  trackId: '1',
};

const validDescriptionCourse = {
  abstract:
    'Доклад относится к треку Frontend Platform и разбирает тему "Дизайн-система в реальном продукте: где заканчивается UI kit" на практическом примере. Спикер показывает исходную проблему, ограничения команды, принятые технические решения и ошибки, которые проявились уже после внедрения. В результате слушатели смогут сравнить несколько подходов, понять trade-offs и забрать чек-лист для применения в своём проекте. Формат ориентирован на разработчиков и тимлидов уровня middle, которым важны реальные production-кейсы, а не абстрактная теория.',
  takeaways:
    'Формат воркшопа позволит не только обсудить «Дизайн-система в реальном продукте: где заканчивается UI kit», но и руками пройти мини-кейс с ограничениями уровня middle, фокусом на Design Systems, Testing и Scalability и итоговым планом действий.',
  targetAudience:
    'Материал по теме «Дизайн-система в реальном продукте: где заканчивается UI kit» подойдёт для frontend-разработчиков, UI platform engineers и техлидов, которые уже сталкивались с похожими решениями и хотят разобрать их на уровне middle с фокусом на trade-offs, поддержку решений и влияние на командную разработку; фокус — Design Systems, Testing и Scalability.',
  prerequisites:
    'Нужен практический опыт разработки или сопровождения production-фич и понимание командных процессов. Для полного понимания кейса «Дизайн-система в реальном продукте: где заканчивается UI kit» пригодится понимание React, TypeScript и типичных ограничений frontend-платформы и готовность обсуждать компромиссы вокруг Design Systems, Testing и Scalability.',
};

const validSpeakerCourse = {
  id: 'speaker-013',
  name: 'Maxim Borisov',
  email: 'maxim.borisov@example.com',
  company: 'Open Source Lab',
  position: 'Fullstack Developer',
  bio: 'Maxim Borisov работает в Open Source Lab и регулярно выступает о практической разработке, архитектурных решениях и командных процессах. В докладах делает упор на реальные кейсы, ограничения бизнеса и решения, которые можно применить в продуктовой команде.',
  links: 'https://t.me/maxim_borisov',
};

const validExtraCourse = {
  tags: ['Design Systems', 'Testing', 'Scalability'],
  notes:
    'Дополнительно по теме «Дизайн-система в реальном продукте: где заканчивается UI kit на реальном кейсе»: планирую дать участникам короткое практическое упражнение и шаблон, который можно унести в свою команду. Можно добавить больше trade-offs, командных ограничений и решений, которые проявляются в сопровождении. Контекст трека — Frontend Platform, ключевые акценты — Design Systems, Testing, Scalability. Если слот уже назначен, могу подстроить тайминг под соседние сессии и оставить запас на вопросы. Отдельно подготовлю схему деградации функциональности.',
  consent: true,
};

const validCourse = {
  ...validBasicCourse,
  ...validDescriptionCourse,
  speakers: [validSpeakerCourse],
  ...validExtraCourse,
};

describe('basicSchema', () => {
  it('Валидная схема проходит', () => {
    const result = basicSchema.safeParse(validBasicCourse);

    expect(result.success).toBe(true);
  });

  it('Не пропускает пустое название заявки', () => {
    const result = basicSchema.safeParse({ ...validBasicCourse, title: '' });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined();
    }
  });

  it('Не пропускает название заявки длиной меньше 10 символов', () => {
    const result = basicSchema.safeParse({
      ...validBasicCourse,
      title: 'Заявка',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined();
    }
  });

  it('Не пропускает название заявки длиной больше 120 символов', () => {
    const result = basicSchema.safeParse({
      ...validBasicCourse,
      title:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.title).toBeDefined();
    }
  });

  it('Не пропускает формат не из допустимого списка', () => {
    const result = basicSchema.safeParse({
      ...validBasicCourse,
      format: 'lection',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.format).toBeDefined();
    }
  });

  it('Не пропускает продолжительность в виде числа', () => {
    const result = basicSchema.safeParse({
      ...validBasicCourse,
      duration: 5,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.duration).toBeDefined();
    }
  });

  it('Не пропускает без продолжительности', () => {
    const result = basicSchema.safeParse({
      ...validBasicCourse,
      duration: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.duration).toBeDefined();
    }
  });

  it('Не пропускает невалидную продолжительность', () => {
    const workshopResult = basicSchema.safeParse({
      ...validBasicCourse,
      format: 'workshop',
      duration: '30',
    });
    const talkResult = basicSchema.safeParse({
      ...validBasicCourse,
      format: 'talk',
      duration: '90',
    });
    const lightningResult = basicSchema.safeParse({
      ...validBasicCourse,
      format: 'lightning',
      duration: '45',
    });

    expect(workshopResult.success).toBe(false);
    expect(talkResult.success).toBe(false);
    expect(lightningResult.success).toBe(false);

    if (!workshopResult.success) {
      expect(workshopResult.error.flatten().fieldErrors.duration).toBeDefined();
    }
    if (!talkResult.success) {
      expect(talkResult.error.flatten().fieldErrors.duration).toBeDefined();
    }
    if (!lightningResult.success) {
      expect(
        lightningResult.error.flatten().fieldErrors.duration,
      ).toBeDefined();
    }
  });

  it('Валидная продолжительность проходит', () => {
    const workshopResult = basicSchema.safeParse({
      ...validBasicCourse,
      format: 'workshop',
      duration: '90',
    });
    const talkResult = basicSchema.safeParse({
      ...validBasicCourse,
      format: 'talk',
      duration: '30',
    });
    const lightningResult = basicSchema.safeParse({
      ...validBasicCourse,
      format: 'lightning',
      duration: '10',
    });

    expect(workshopResult.success).toBe(true);
    expect(talkResult.success).toBe(true);
    expect(lightningResult.success).toBe(true);
  });

  it('Не пропускает уровень не из допустимого списка', () => {
    const result = basicSchema.safeParse({
      ...validBasicCourse,
      level: 'strong-middle',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.level).toBeDefined();
    }
  });

  it('Не пропускает без выбранного трека', () => {
    const result = basicSchema.safeParse({
      ...validBasicCourse,
      trackId: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.trackId).toBeDefined();
    }
  });
});

describe('descriptionSchema', () => {
  it('Валидная схема проходит', () => {
    const result = descriptionSchema.safeParse(validDescriptionCourse);

    expect(result.success).toBe(true);
  });

  it('Не пропускает пустое описание заявки', () => {
    const result = descriptionSchema.safeParse({
      ...validDescriptionCourse,
      abstract: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.abstract).toBeDefined();
    }
  });

  it('Не пропускает описание заявки длиной меньше 100 символов', () => {
    const result = descriptionSchema.safeParse({
      ...validDescriptionCourse,
      abstract: 'Описание заявки',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.abstract).toBeDefined();
    }
  });

  it('Не пропускает описание заявки длиной больше 3000 символов', () => {
    const result = descriptionSchema.safeParse({
      ...validDescriptionCourse,
      abstract: 'a'.repeat(3005),
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.abstract).toBeDefined();
    }
  });

  it('Не пропускает пустые выводы заявки', () => {
    const result = descriptionSchema.safeParse({
      ...validDescriptionCourse,
      takeaways: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.takeaways).toBeDefined();
    }
  });

  it('Не пропускает пустую аудиторию заявки', () => {
    const result = descriptionSchema.safeParse({
      ...validDescriptionCourse,
      targetAudience: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.targetAudience).toBeDefined();
    }
  });

  it('Не пропускает пустые требования заявки', () => {
    const result = descriptionSchema.safeParse({
      ...validDescriptionCourse,
      prerequisites: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.prerequisites).toBeDefined();
    }
  });
});

describe('speakerBaseSchema', () => {
  it('Валидная схема проходит', () => {
    const result = speakerBaseSchema.safeParse(validSpeakerCourse);

    expect(result.success).toBe(true);
  });

  it('Не пропускает c числовым id', () => {
    const result = speakerBaseSchema.safeParse({
      ...validSpeakerCourse,
      id: 4,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.id).toBeDefined();
    }
  });

  it('Не пропускает c пустым именем', () => {
    const result = speakerBaseSchema.safeParse({
      ...validSpeakerCourse,
      name: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeDefined();
    }
  });

  it('Не пропускает c невалидные email', () => {
    const result = speakerBaseSchema.safeParse({
      ...validSpeakerCourse,
      email: 'my-speaker.com@!ru',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
    }
  });

  it('Не пропускает c пустым названием компании', () => {
    const result = speakerBaseSchema.safeParse({
      ...validSpeakerCourse,
      company: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.company).toBeDefined();
    }
  });

  it('Не пропускает c пустой должностью', () => {
    const result = speakerBaseSchema.safeParse({
      ...validSpeakerCourse,
      position: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.position).toBeDefined();
    }
  });

  it('Не пропускает c пустым описанием', () => {
    const result = speakerBaseSchema.safeParse({
      ...validSpeakerCourse,
      bio: '',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.bio).toBeDefined();
    }
  });

  it('Не пропускает c описанием меньше 50 символов', () => {
    const result = speakerBaseSchema.safeParse({
      ...validSpeakerCourse,
      bio: 'О себе',
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.bio).toBeDefined();
    }
  });
});

describe('extraSchema', () => {
  it('Валидная схема проходит', () => {
    const result = extraSchema.safeParse(validExtraCourse);

    expect(result.success).toBe(true);
  });

  it('Не пропускает без принятого согласия', () => {
    const result = extraSchema.safeParse({
      ...validExtraCourse,
      consent: false,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.consent).toBeDefined();
    }
  });
});

describe('submitSchema', () => {
  it('Валидная схема проходит', () => {
    const result = submitSchema.safeParse(validCourse);

    expect(result.success).toBe(true);
  });

  it('Не пропускает без спикеров', () => {
    const result = submitSchema.safeParse({
      ...validCourse,
      speakers: [],
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.speakers).toBeDefined();
    }
  });
});
