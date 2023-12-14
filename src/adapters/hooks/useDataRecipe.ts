import { useMemo } from 'react';

import type { TDataRecipe, TUseDataRecipe } from '@/types/schemaRecipe';

const useDataRecipe = ({ isRecipes, listicle, typeRecipe }: TUseDataRecipe) => {
  const getTitle = ({
    type = 'h2',
    value = '<></>',
    typeRecipes = 'single',
  }: {
    type: string;
    value: string;
    typeRecipes: string;
  }) => {
    const parent = document.createElement(type);
    parent.innerHTML =
      typeRecipes === 'multiple' ? value.replace('1. ', '') : value;
    return parent.outerText;
  };

  const { ingredients, instruction, title } = useMemo<TDataRecipe>(() => {
    if (typeof document === 'undefined' || !isRecipes) {
      return {
        ingredients: [],
        instruction: [],
        title: '',
      };
    }
    const listicleContent = listicle
      ?.filter(({ type }) =>
        ['ingredients', 'instructions', 'recipe_content'].includes(type)
      )
      .map((item) => {
        const { value } = item;
        const parent = document.createElement('div');
        parent.innerHTML = value;
        return {
          ...item,
          value: parent,
        };
      });
    const listicle1 = listicle?.find(
      ({ type, listicle_no }) =>
        ['recipe', 'ingredients_title'].includes(type) && listicle_no === 1
    );
    const ingredientsList: HTMLDivElement = listicleContent.find(
      ({ type, listicle_no }) =>
        ['ingredients', 'recipe_content'].includes(type) && listicle_no === 1
    )?.value as HTMLDivElement;
    const instructionList: HTMLDivElement = listicleContent.find(
      ({ type, listicle_no }) => {
        const typeOfListicle = typeRecipe === 'single' ? 2 : 1;
        return (
          ['instructions', 'recipe_content'].includes(type) &&
          listicle_no === typeOfListicle
        );
      }
    )?.value as HTMLDivElement;

    if (!ingredientsList && !instructionList)
      return {
        ingredients: [],
        instruction: [],
        title: '',
      };

    let ingList: string[] = [];
    let insList: string[] = [];
    if (typeRecipe === 'single') {
      ingList = Array.from(ingredientsList?.querySelectorAll('li') ?? []).map(
        (el, i) => `${i + 1}. ${el.outerText}`
      );
      insList = Array.from(instructionList?.querySelectorAll('li') ?? []).map(
        (el, i) => `${i + 1}. ${el.outerText}`
      );
    } else if (typeRecipe === 'multiple') {
      const docIng = Array.from(ingredientsList?.querySelectorAll('ol'))[0];
      const docIns = Array.from(instructionList?.querySelectorAll('ol'))[1];
      ingList = Array.from(docIng?.querySelectorAll('li') ?? []).map(
        (el, i) => `${i + 1}. ${el.outerText}`
      );
      insList = Array.from(docIns?.querySelectorAll('li') ?? []).map(
        (el, i) => `${i + 1}. ${el.outerText}`
      );
    }
    return {
      ingredients: ingList,
      instruction: insList,
      title: getTitle({
        type: listicle1?.type ?? 'h2',
        value: listicle1?.value ?? '<></>',
        typeRecipes: typeRecipe,
      }),
    };
  }, [isRecipes, listicle, typeRecipe]);

  return {
    data: {
      ingredients,
      instruction,
      title,
    },
  };
};
export { useDataRecipe };
