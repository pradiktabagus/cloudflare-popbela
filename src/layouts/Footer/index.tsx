import type { BoxProps, TextProps } from '@chakra-ui/layout';
import { Box, Container, HStack, Stack, Text, VStack } from '@chakra-ui/layout';
import { useMediaQuery } from '@chakra-ui/media-query';
import type { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';

import type { LinkProps } from '@/types/customLink';
import { LIST_SOCIAL } from '@/utils/listSocial';

const CustomLink = dynamic<LinkProps>(() =>
  import('@/components/Link').then((mod) => mod.CustomLink)
);
const FontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import('@fortawesome/react-fontawesome').then((mod) => mod.FontAwesomeIcon)
);
const LIST_STATIC_PAGE = [
  { name: 'About', href: '/about-us' },
  { name: 'Career', href: 'https://www.idn.media/career#hire' },
  { name: 'Policy', href: '/kebijakan-privacy' },
  { name: 'Cyber Guidlines', href: '/cyber-media-guidelines' },
  { name: 'Contact', href: '/hubungi-kami' },
];

const TEXT_BRAND = '© 2023 Popbela.com by IDN Media';

const LiIcon = ({
  icon,
  href,
  name,
}: {
  icon: IconDefinition;
  href: string;
  name?: string;
}) => {
  return (
    <Box
      as="li"
      px={{ base: '5px', md: '8px' }}
      listStyleType="none"
      data-testid={`share-${name}`}
    >
      <CustomLink
        className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white text-[#6e6e6e]"
        href={href}
      >
        <FontAwesomeIcon icon={icon} height="15px" />
      </CustomLink>
    </Box>
  );
};

const LinkStaticPages = (props: BoxProps) => (
  <Box as="nav" w="full" {...props}>
    <Stack
      direction={{ base: 'column', md: 'row' }}
      as="ul"
      justifyContent="space-between"
      textTransform="capitalize"
    >
      {LIST_STATIC_PAGE.map((item) => (
        <Box key={item.href} as="li" listStyleType="none">
          <CustomLink href={item.href}>{item.name}</CustomLink>
        </Box>
      ))}
    </Stack>
  </Box>
);

const LinkSocials = () => (
  <Stack direction={{ base: 'column', md: 'row' }} alignItems="baseline">
    <Text>Follow Us :</Text>
    <Box as="nav">
      <HStack as="ul">
        {LIST_SOCIAL.map((item) => (
          <LiIcon
            key={item.href}
            icon={item.icon}
            href={item.href}
            name={item.name}
          />
        ))}
      </HStack>
    </Box>
  </Stack>
);

const TextBrand = (props: TextProps) => (
  <Text fontSize={{ base: '85%', md: 'inherit' }} {...props}>
    {TEXT_BRAND}
  </Text>
);

export const Footer = () => {
  const [isTablet] = useMediaQuery('(max-width: 865px)');
  return (
    <Box
      as="footer"
      w="full"
      h={{ base: 'auto', md: '124px' }}
      p="30px 0"
      color="#fff"
      bgColor="#6e6e6e"
      fontFamily="futuraBook"
      data-testid="footer"
      pos="relative"
    >
      <Container maxW="1131px" centerContent>
        <HStack w="full" alignItems="flex-start">
          <Box flex={{ base: 4, md: isTablet ? 6 : 7 }}>
            {/* hidden on mobile */}
            <TextBrand display={{ base: 'none', md: 'block' }} />
            {/* hidden onn desktop */}
            <LinkStaticPages display={{ base: 'block', md: 'none' }} />
          </Box>
          <VStack
            flex={{ base: 8, md: isTablet ? 6 : 5 }}
            alignItems="flex-start"
            spacing="15px"
            transition="flex .3s ease-in-out"
          >
            {/* hidden on mobile */}
            <LinkStaticPages display={{ base: 'none', md: 'block' }} />
            <LinkSocials />
            {/* hidden onn desktop */}
            <TextBrand display={{ base: 'inline-block', md: 'none' }} />
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
};
