/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getIncrementChoice, getResultQuiz } from '@/adapters/request';
import type { ImageLoaderProps, ModalProps } from '@/components';
import type {
  IDataBody,
  IDataFinalResult,
} from '@/types/responses/pages/detail-article';

import style from './quiz.module.scss';
import type { TResultModal } from './Result';

export type TQuizArticle = {
  type?: string | 'frequency-of-personality' | 'personality' | 'trivia';
  data?: IDataBody;
  title: string;
  article_url: string;
  excerpt: string;
};
const ImageLoader = dynamic<ImageLoaderProps>(() =>
  import('../../Images/index').then((mod) => mod.ImageLoader)
);
const ContainModal = dynamic<TResultModal>(() => import('./Result'));
const ModalResult = dynamic<ModalProps>(() =>
  import('../../Modal/index').then((mod) => mod.Modal)
);
const QuizText = ({
  choice,
  number,
  choiceIdx,
  showResult,
  slug,
}: {
  choice?: string;
  number: number;
  choiceIdx: number;
  slug: string | string[];
  showResult: (e: any) => void;
}) => {
  const getSiblings = (e: any) => {
    // for collecting siblings
    const siblings: any[] = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
      return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode?.firstChild;
    // collecting siblings
    while (sibling) {
      if (sibling.nodeType === 1) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  };
  const onChecked = (e: any) => {
    e.preventDefault();
    const Element = getSiblings(e.target);
    Element?.map((css) => css.classList.remove('checked'));
    e.target.classList.add('checked');
    const idxChoice: number = Element.findIndex((el) =>
      el.classList.contains('checked')
    );
    getIncrementChoice({ slug, end_point: 'increment-play' });
    showResult(idxChoice);
  };
  return (
    <li
      onClick={(e) => onChecked(e)}
      className="text-choice"
      data-testid="option-quiz"
    >
      <input
        type="radio"
        name={`question-text-${number + 1}`}
        value={choiceIdx}
        id={`question-text-${number + 1}-${choiceIdx + 1}`}
        className="radio-choice"
      />
      <label
        htmlFor={`question-text-${number + 1}-${choiceIdx + 1}`}
        className="w-[calc(100vw_-_50px)] md:w-full"
      >
        {choice}
        <img
          src="/v3/assets/images/global/check-pink.png"
          className="check-pink"
          alt="Radio"
        />
      </label>
      <style jsx>{`
        li {
          margin-bottom: 15px;
        }
        li .check-pink {
          position: absolute;
          top: 2px;
          left: 4px;
          z-index: 5;
          visibility: hidden;
          opacity: 0;
          transition: opacity 1s ease;
          width: auto;
        }
        li.checked > label {
          color: var(--color-primary); // font-weight: bold;
        }
        li.checked > label > .check-pink {
          visibility: visible;
          opacity: 1;
        }
      `}</style>
    </li>
  );
};
const Quiz = ({ data, title, excerpt, article_url }: TQuizArticle) => {
  const router = useRouter();
  const { query } = router;
  const [choiceCount, setChoiceCount] = useState<number[]>([]);
  const [totalQuetion] = useState<number>(data?.total_questions ?? 0);
  const [totalChoice] = useState<number>(data?.total_choices ?? 0);

  const [finalResult] = useState<IDataFinalResult[]>(data?.final_result ?? []);
  const [dataResult, setDataResult] = useState<IDataFinalResult>();
  const [isShowResult, setShowResult] = useState<boolean>(false);

  useEffect(() => {
    const obj: number[] = [];
    if (!isShowResult)
      for (let i = 0; i < totalChoice; i++) {
        obj[i] = 0;
      }
    setChoiceCount(obj);
    return () => {
      setChoiceCount([]);
    };
  }, [totalChoice, isShowResult]);
  const showResult = (idxChoice: number) => {
    const visibleResult = document.querySelectorAll('li.checked').length;
    const obj = choiceCount ?? [];
    if (idxChoice in obj) {
      obj[idxChoice]++;
    } else {
      obj[idxChoice] = 1;
    }
    setChoiceCount(obj);
    if (visibleResult !== totalQuetion) return false;
    let idxResult: number = 0;
    const max = Math.max.apply(null, obj);
    choiceCount.forEach((value, key) => {
      if (value === max) {
        idxResult = key;
      }
    });
    const resultData = finalResult.find((_, key) => idxResult === key);
    getResultQuiz({
      slug: query?.slug,
      id: resultData?.id,
      end_point: 'increment-result',
    });
    setDataResult(resultData);
    return setShowResult(true);
  };
  const closeResult = () => {
    setShowResult(false);
    const Element = Array.from(document.querySelectorAll('.checked'));
    Element.map((css) => css.classList.remove('checked'));
  };
  const { questions } = data ?? ({} as IDataBody);
  return (
    <div className={style['section-quiz-box']}>
      <div>
        {questions?.map((question, i) => {
          const classNames = style.open;
          return (
            <div
              key={i}
              className={`quiz-box ${style['split-page']} ${
                i === 1 && style[`quiz-box-2`]
              } ${classNames}`}
            >
              <div
                className={style['quiz-number']}
                data-testid={`number-of-quiz-${i + 1}`}
              >
                {i + 1} of {data?.total_questions ?? 0} Quiz
              </div>
              <div
                className={style['embed-image-quiz']}
                data-testid={`image-quiz-${i + 1}`}
              >
                <ImageLoader
                  alt={question.image ?? 'quiz-image'}
                  src={question.image ?? ''}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className={`${style['quiz-choice']} ${style.text}`}
                data-testid={`number-of-choice-${i + 1}`}
              >
                <ul>
                  {question?.choices?.map((choice, key) => (
                    <QuizText
                      slug={query?.slug ?? ''}
                      number={i}
                      choiceIdx={key}
                      choice={choice.label}
                      key={key}
                      showResult={(e) => showResult(e)}
                    />
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <ModalResult
        onClose={closeResult}
        isOpen={isShowResult}
        content={
          <ContainModal
            title={title}
            article_url={article_url}
            excerpt={excerpt}
            data={dataResult}
            closeModal={closeResult}
          />
        }
      />
    </div>
  );
};
export default Quiz;
