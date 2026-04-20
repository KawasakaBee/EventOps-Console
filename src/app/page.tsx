import { redirect } from 'next/navigation';

const Root = () => {
  redirect('/login');
  const test: string = 123;
  console.log(test);
  return <>Hello world!</>;
};

export default Root;
