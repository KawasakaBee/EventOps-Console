import { redirect } from 'next/navigation';

const Root = () => {
  redirect('/dashboard');
  return <>Hello world!</>;
};

export default Root;
