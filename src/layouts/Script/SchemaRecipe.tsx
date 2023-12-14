/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo } from 'react';

import { useDataRecipe } from '@/adapters/hooks/useDataRecipe';
import type { TSchemaRecipeScript } from '@/types/schemaRecipe';
import { toStringFromUnix } from '@/utils/toDateFromUnix';

const listTypeRecipes = ['resep-popbela', 'kumpulan-resep-popbela'];
const SchemaRecipe = ({ data }: TSchemaRecipeScript) => {
  const { tags } = data;
  const { isRecipes, typeRecipe } = useMemo(() => {
    const type = tags
      ?.map((i) => i.tag_slug)
      .some((tag) => listTypeRecipes.includes(tag));
    const recipe = () => {
      if (tags?.map((i) => i.tag_slug).includes('resep-popbela')) {
        return 'single';
      }
      if (tags?.map((i) => i.tag_slug).includes('kumpulan-resep-popbela')) {
        return 'multiple';
      }
      return 'non-recipe';
    };
    return { isRecipes: type, typeRecipe: recipe() };
  }, [tags]);
  const { data: dataRecipe } = useDataRecipe({
    listicle: data?.listicle,
    isRecipes: isRecipes ?? false,
    typeRecipe,
  });
  if (!isRecipes) return null;
  return (
    <script
      id="schema-recipe"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: `{
           "@context": "https://schema.org/", 
          "@type": "Recipe", 
          "name": "${dataRecipe.title}",
          "image": "${data?.cover?.source_url}", 
          "description": "${data.meta_description}",
          "keywords": "${data.tags?.map((tag) => tag.name)}",
          "author": {
            "@type": "Person",
            "name": "${data.author_name?.replace(/'/g, '&#39;')}" 
          },
          "datePublished": "${toStringFromUnix(
            data.release_date,
            'YYYY-MM-DD'
          )}", 
          "prepTime": "PT15M", // static
          "cookTime": "PT45M", // static
          "totalTime": "PT60M", // static
          "recipeCategory": "", 
          "recipeCuisine": "Indonesian", // static
          "recipeYield": "1", // static
          "nutrition": {
            "@type": "NutritionInformation",
            "calories": ""
          },
          "recipeIngredient": ${
            dataRecipe?.ingredients
              ? JSON.stringify(dataRecipe?.ingredients)
              : []
          },
          "recipeInstructions": ${
            dataRecipe?.instruction
              ? JSON.stringify(
                  dataRecipe?.instruction?.map((ins) => {
                    return {
                      '@type': 'HowToStep',
                      text: ins,
                    };
                  })
                )
              : []
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5", //static di isi 5
            "bestRating": "5", //static di isi 5
            "worstRating": "",
            "ratingCount": "5" //static di isi 5
          }  
        }`,
      }}
    />
  );
};
export { SchemaRecipe };
