import { redirect } from 'next/navigation';

const Root = () => {
  redirect('/login');
  return <>Hello world!</>;
};

export default Root;
