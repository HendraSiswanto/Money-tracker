import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    emote: string;
    type: "income" | "expense";
  }) => void;
  initialData?: {
    name: string;
    emote: string;
    type: "income" | "expense";
  } | null;
};

export function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: Props) {
  const [name, setName] = useState("");
  const [emote, setEmote] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");

  // fill form when editing
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmote(initialData.emote);
      setType(initialData.type);
    } else {
      setName("");
      setEmote("");
      setType("income");
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    onSubmit({ name, emote, type });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {initialData ? "Edit Category" : "New Category"}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <FormControl mb={3}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Emoji</FormLabel>
            <Input value={emote} onChange={(e) => setEmote(e.target.value)} />
          </FormControl>

          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select value={type} onChange={(e) => setType(e.target.value as any)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </Select>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleSubmit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
