import Variable from './Variable';
import styles from './Home.module.scss';
import Search from '../components/Search';
import { useEffect, useState } from 'react';
import { getTranslateWord } from '../api/api';
import { TbArrowBigDownLinesFilled } from 'react-icons/tb';
import { CiDesktopMouse1 } from 'react-icons/ci';
import pascalImg from '../images/Pascal.png';
import camelImg from '../images/camel.png';
import snakeImg from '../images/snake.png';
import { FcSearch } from 'react-icons/fc';
import { BsChatSquareText } from 'react-icons/bs';
import { HiOutlineCode } from 'react-icons/hi';

export default function Home() {
  const [search, setSearch] = useState(''); // 검색 단어 저장 state
  const [translatedWord, setTranslatedWord] = useState(''); // 번역 단어 저장 state

  const handleLoad = async (searchQuery) => {
    const { translated_variable } = await getTranslateWord(searchQuery);
    // console.log(translated_variable);
    setTranslatedWord(translated_variable);
  };

  useEffect(() => {
    handleLoad(search);
  }, [search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target['search'].value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.variableWrapper}>
        <div className={styles.content}>
          <header>
            <HiOutlineCode className={styles.icon} />
            <p>
              이 단어는 <span>100</span>명이 검색했어요 🧐
            </p>
          </header>
          <div className={styles.result}>
            <p>
              🤔 &nbsp; ' <span>{search}</span> ' 변수명 추천 부탁해!
            </p>
            <TbArrowBigDownLinesFilled className={styles.arrow} />
            <p>
              🤓 &nbsp; 추천 변수명은 ' <span>{translatedWord}</span> ' 입니다.
            </p>
          </div>
        </div>
        <div className={styles.toDictionary}>
          무슨 뜻일까?? &nbsp;단어 뜻 검색
          <CiDesktopMouse1 className={styles.icon} /> &nbsp;Go!Go!
        </div>
      </div>
      <div className={styles.searchWrapper}>
        <div className={styles.chooseCase}>
          <p>Type 선택 &nbsp;:</p>
          <label>
            <input type="checkbox" />
            <img src={snakeImg} alt="snakeImage" /> snake_case
          </label>
          <label>
            <input type="checkbox" />
            <img src={camelImg} alt="camelImage" /> camelCase
          </label>
          <label>
            <input type="checkbox" />
            <img src={pascalImg} alt="pascalImage" /> PascalCase
          </label>
        </div>
        <form className={styles.search} onSubmit={handleSearchSubmit}>
          <BsChatSquareText className={styles.icon} />
          <input
            type="search"
            name="search"
            placeholder="변수명을 입력해주세요. &nbsp; (단어만 입력해주세요)"
          />
          <button type="submit">
            <FcSearch className={styles.icon} />
          </button>
        </form>
      </div>
      {/* <Variable />
      <Search /> */}
    </div>
  );
}
