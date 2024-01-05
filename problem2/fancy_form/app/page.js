import Image from 'next/image'
import { SelectedOptionProvider } from '../components/header';
import Header from '../components/header';
import Main from '../components/main';

const style = {
  wrapper: `h-screen max-h-screen min-h-screen w-screen bg-[#131313] text-white select-none flex flex-col`
}

export default function Home() {
  return (
    <main className={style.wrapper}>
      <SelectedOptionProvider>
        <Header />
        <Main />
      </SelectedOptionProvider>
    </main>
  )
}
