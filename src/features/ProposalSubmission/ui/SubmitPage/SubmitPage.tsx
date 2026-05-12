'use client';

import defaultValues from '../../model/defaultValues';
import { submitSchema, SubmitValues } from '../../model/schema';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitStepper from '../SubmitStepper/SubmitStepper';

const SubmitPage = () => {
  const methods = useForm<SubmitValues>({
    defaultValues,
    resolver: zodResolver(submitSchema),
    mode: 'onBlur',
    shouldUnregister: false,
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(() => null)}>
        <SubmitStepper />
      </form>
    </FormProvider>
  );
};
export default SubmitPage;
