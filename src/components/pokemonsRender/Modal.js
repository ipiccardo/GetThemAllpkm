import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import PokemonData from "@/components/pokemonsRender/PokemonData";

const PokemonModal = ({
  isOpen,
  onClose,
  selectedPokemon,
  isCatched,
  onUpdateCatched,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: "lg", xm: "full" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textTransform="capitalize">
          {selectedPokemon?.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedPokemon && (
            <PokemonData
              pokemon={selectedPokemon}
              isCatched={isCatched}
              onUpdateCatched={onUpdateCatched}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonModal;
