import { Button } from '@chakra-ui/button';
import { Input, InputGroup } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onSubmitSearch: (arg: string) => void;
  placeholder?: string;
  baseColor?: string;
  keyword: string;
}

const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);

export const SearchBar = ({
  onSubmitSearch,
  placeholder = 'Masukkan kata kunci...',
  baseColor = 'primary',
  keyword,
}: SearchBarProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [keywordSearchValue, setKeywordSearchValue] = useState<string>(
    keyword ?? 'tes'
  );
  const handleSubmitSearching = (e: any) => {
    e.preventDefault();
    onSubmitSearch(keywordSearchValue);
  };

  useEffect(() => {
    setKeywordSearchValue(keyword);
  }, [keyword]);
  return (
    <form onSubmit={handleSubmitSearching}>
      <InputGroup fontFamily="bahijMitra" data-testid="search-bar">
        <Input
          flex={1}
          height={{ base: '30px', lg: '47px' }}
          bgColor="white"
          borderRadius={0}
          borderColor="#c7c7c7"
          borderWidth={1}
          focusBorderColor={baseColor}
          _focus={{
            boxShadow:
              'inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(239 130 176 / 60%)',
          }}
          p={{ base: '2px 10px', lg: '10px 16px' }}
          fontSize={{ base: '16px', lg: '22px' }}
          fontFamily="bahijMitra"
          placeholder={placeholder}
          _placeholder={{ color: 'gray' }}
          ref={inputRef}
          defaultValue={keyword}
          onChange={(e) => setKeywordSearchValue(e.target.value)}
        />
        <Button
          aria-label="Search"
          borderRadius={0}
          type="submit"
          bgColor={baseColor}
          borderColor={baseColor}
          _hover={{ backgroundColor: '#484C4E', color: '#333' }}
          _focus={{
            backgroundColor: '#484C4E',
            color: '#333',
          }}
          color="white"
          p="auto"
          px={{ base: '10px', lg: '20px' }}
          fontSize={{ base: '15px', lg: '24px' }}
          h="auto"
        >
          <Box boxSize={{ base: '15px', lg: '24px' }}>
            <FontAwesomeIcon icon={faSearch} />
          </Box>
        </Button>
      </InputGroup>
    </form>
  );
};
export const SearchBarPopup = ({
  onSearch,
  placeholder = 'Masukkan kata kunci...',
  baseColor = 'primary',
}: SearchBarProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickSearch = React.useCallback(() => {
    if (onSearch) {
      onSearch(inputRef.current?.value ?? '');
    }
  }, [onSearch]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickSearch();
    }
  };

  return (
    <InputGroup fontFamily="bahijMitra" data-testid="search-bar">
      <Input
        flex={1}
        height={{ base: '30px', lg: '47px' }}
        bgColor="white"
        borderRadius={0}
        borderColor="#c7c7c7"
        borderWidth={1}
        focusBorderColor={baseColor}
        _focus={{
          boxShadow:
            'inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(239 130 176 / 60%)',
        }}
        p={{ base: '2px 10px', lg: '10px 16px' }}
        fontSize={{ base: '16px', lg: '22px' }}
        fontFamily="bahijMitra"
        placeholder={placeholder}
        _placeholder={{ color: 'gray' }}
        ref={inputRef}
        onKeyDown={onKeyDown}
      />
      <Button
        aria-label="Search"
        borderRadius={0}
        bgColor={baseColor}
        borderColor={baseColor}
        _hover={{ backgroundColor: '#484C4E', color: '#333' }}
        _focus={{
          backgroundColor: '#484C4E',
          color: '#333',
        }}
        color="white"
        p="auto"
        px={{ base: '10px', lg: '20px' }}
        fontSize={{ base: '15px', lg: '24px' }}
        h="auto"
        onClick={onClickSearch}
      >
        <Box boxSize={{ base: '15px', lg: '24px' }}>
          <FontAwesomeIcon icon={faSearch} />
        </Box>
      </Button>
    </InputGroup>
  );
};
