import {
  Modal as ChakraModal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/modal';
import { motion } from 'framer-motion';

import type { DeviceViewProps } from '@/types';

export type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  content?: React.ReactNode;
  bgOverlay?: string;
  marginTop?: string | number;
  center?: boolean;
} & DeviceViewProps;

export const Modal: React.FC<ModalProps> = ({
  isOpen = false,
  onClose = () => {},
  content,
  bgOverlay = 'blackAlpha.900',
  marginTop = 0,
  center = true,
  isMobile,
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered={center}>
      <ModalOverlay
        bg={bgOverlay}
        data-testid="overlay"
        marginTop={marginTop}
      />
      <ModalContent
        marginTop={marginTop}
        marginBottom={0}
        w={isMobile ? '100%' : '757px'}
        maxW="container.lg"
        maxH="100vh"
        borderRadius={0}
        bg="transparent"
        as={motion.div}
        initial={{ y: '-100vh', opacity: 0 }}
        exit={{ y: '-100vh', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-testid="modal-content"
      >
        {content}
      </ModalContent>
    </ChakraModal>
  );
};
