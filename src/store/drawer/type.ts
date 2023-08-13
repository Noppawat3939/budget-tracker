export type UseDrawerStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onOpenChange: (newValue: boolean) => void;
};
